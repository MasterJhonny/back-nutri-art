const OperationService = require("../services/service.operations");
const LoteService = require("../services/service.lotes");

const { amountLotPerMonth, defaultLotSize } = require("../const");

const service = new OperationService();
const serviceLotes = new LoteService();

const updateCountLot = async (record, id) => {
  console.log("🚀 ~ file: index.js:8 ~ updateCountLot ~ record:", record);
  const lotes = await serviceLotes.findByMaterialId(id);
  const lote = lotes[lotes.length - 1];
  console.log("🚀 ~ file: index.js:10 ~ updateCountLot ~ lote:", lote);
  const countAdvance = lote.count + record.amount;
  console.log("🚀 ~ file: index.js:12 ~ updateCountLot ~ countAdvance:", countAdvance);
  await serviceLotes.update(lote._id, { count: countAdvance, costs: record.currentUnitCost, import: record.total });
  if (countAdvance >= lote.lotSize) {
    const newLote = {
      detail: lote.detail,
      count: 0,
      measure: lote.measure,
      import: 0,
      lotSize: lote.lotSize, 
      materialId: lote.materialId,
      numberLotSet: lotes.length + 1,
    }
    await serviceLotes.create(newLote);
    return {
      countAdvance: 0,
      numberLot: newLote.numberLotSet,
    };
  }
  return {
    countAdvance,
    numberLot: lote.numberLotSet,
  };
}

const applyPeps = (count, list = []) => {
  // declaration of var
  let amountAccumulate = 0;
  let listCost = [];
  let discountValue = count;
  let discountValueBefore;
  // run bucle
  for (let i = 0; i < list.length; i++) {
    if (discountValue <= 0) {
      console.log("toca salir! ----------------->");
      break;
    }
    // save unit const
    listCost.push(list[i].record.currentUnitCost[0]);

    if (list[i].available) {
      discountValueBefore = discountValue;
      discountValue = discountValue - list[i].record.amount;
      if (discountValue >= 0) {
        amountAccumulate =
          amountAccumulate +
          list[i].record.amount * list[i].record.currentUnitCost;
          service.update(list[i]._id, { available: false });
      } else {
        amountAccumulate =
          amountAccumulate +
          discountValueBefore * list[i].record.currentUnitCost;
          service.update(list[i]._id, { available: false, partial: true, partialQuantity: Math.abs(discountValue) });
      }
    } else {
      discountValueBefore = discountValue;
      discountValue = discountValue - list[i].partialQuantity;
      if (discountValue >= 0) {
        amountAccumulate =
          amountAccumulate +
          list[i].partialQuantity * list[i].record.currentUnitCost;
          service.update(list[i]._id, { partial: false, partialQuantity: 0 });
      } else {
        amountAccumulate =
          amountAccumulate +
          discountValueBefore * list[i].record.currentUnitCost;
          service.update(list[i]._id, { partialQuantity: Math.abs(discountValue) });
      }
    }
  }
  console.log(
    "🚀 ~ file: index.js:55 ~ list.map ~ amountAccumulate:",
    amountAccumulate
  );
  console.log("🚀 ~ file: index.js:72 ~ PEPS ~ listCost:", listCost);
  return {
    amountAccumulate,
    listCost,
  };
};

const buildDataInOperation = (data, listOperations) => {
  console.log(
    "🚀 ~ file: index.js:66 ~ buildDataInOperation ~ data: ENTRADA-------------------------->",
    data
  );
  if (listOperations.length === 0) {
    const newOperation = {
      ...data,
      balances: data.record,
      available: true,
      partial: false,
      partialQuantity: 0,
    };
    return {
      data: newOperation,
      countLot: 0
    };
  }
  // get end balances
  const previouOperation = listOperations[listOperations.length - 1];
  // build balaces
  const balances = {
    amount: data.record.amount + previouOperation.balances.amount,
    currentUnitCost: [data.record.currentUnitCost[0]],
    total: data.record.total + previouOperation.balances.total,
  };
  const newOperation = {
    ...data,
    balances: balances,
    available: true,
    partial: false,
    partialQuantity: 0,
  };
  return {
    data: newOperation,
    countLot: 0
  };
};

const buildDataOutOperation = async (data, listOperations, lastOperation) => {
  console.log(
    "🚀 ~ file: index.js:81 ~ buildDataOutOperation ~ data: SALIDA----------------------------->",
    data
  );
  const countOut = data.record.amount;
  console.log("🚀 ~ file: index.js:96 ~ buildDataOutOperation ~ countOut:", countOut);
  const dataForOut = applyPeps(countOut, listOperations);
  console.log("🚀 ~ file: index.js:98 ~ buildDataOutOperation ~ dataForOut:", dataForOut);
  const record = {
    amount: countOut, 
    currentUnitCost: [...dataForOut.listCost],
    total: dataForOut.amountAccumulate
  }
  const balances = {
    amount: lastOperation.balances.amount - data.record.amount,
    currentUnitCost: dataForOut.listCost,
    total: lastOperation.balances.total - dataForOut.amountAccumulate
  }
  // update count de of lot
  const dataLot = await updateCountLot(record, data.materialId);
  const newOperation = {
    ...data,
    record: record,
    balances: balances
  };
  return {
    data: newOperation,
    dataLot,
  };
};

const filterSetNumberLot = (lotes = [], numberLot = 1) => {
  const setLotes = lotes.filter(lot=> lot.numberLotSet === numberLot);
  return setLotes;
}

const generateCountLotes = (lotes = []) => {
  const numbersLot = lotes.map(lot=> lot.numberLotSet);
  const listCountLotes = [...new Set(numbersLot)];
  return listCountLotes;
}

const generateSummarySetLotes = (listLotes = [], listSummaryProducts = []) => {
  let listCountLotes = generateCountLotes(listLotes);
  if (listSummaryProducts.length > 0) {
    const listSummaryNumberLot = generateCountLotes(listSummaryProducts);
    listCountLotes = listCountLotes.filter(numberLot=> !listSummaryNumberLot.includes(numberLot));
  }
  const summariesLotes = [];
  for (let i = 0; i < listCountLotes.length; i++) {
    const numberLot = listCountLotes[i];
    const setLotes = listLotes.filter(lot=> lot.numberLotSet === numberLot);
    const isCompletedSetLot = setLotes.every(lot=> lot.lotSize === lot.count);
    const total = setLotes.reduce((adition, lot)=> adition + lot.import, 0);
    const newSummary = {
      numberLot,
      isCompletedSetLot,
      directMaterialCost: total
    }
    summariesLotes.push(newSummary);
  }
  return summariesLotes;
}

const buildDataSummary = (dataSummary, employes = [], incosts = []) => {
  const importWork = employes.reduce((adition, item) => adition + item.salary, 0);
  const importInCost = incosts.reduce((adition, item)=> adition + item.amountMoth, 0);
  const newSummary = {
    numberLotSet: dataSummary.numberLot,
    directMaterialCost: dataSummary.directMaterialCost,
    workforceCost: importWork/amountLotPerMonth,
    indirectCost: importInCost/amountLotPerMonth,
    productionCost: dataSummary.directMaterialCost + (importWork/amountLotPerMonth) + (importInCost/amountLotPerMonth),
    lotSize: defaultLotSize,
  }
  return {
    ...newSummary,
    unitCost: newSummary.productionCost/defaultLotSize,
  };
}

module.exports = { buildDataInOperation, buildDataOutOperation, filterSetNumberLot, generateSummarySetLotes, buildDataSummary };
