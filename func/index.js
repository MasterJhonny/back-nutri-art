const OperationService = require("../services/service.operations");
const service = new OperationService();

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
          service.update(list[i]._id, { partial: true, partialQuantity: 0 });
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
    return newOperation;
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
  return newOperation;
};

const buildDataOutOperation = (data, listOperations, lastOperation) => {
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
  const newOperation = {
    ...data,
    record: record,
    balances: balances
  };
  return newOperation;
};

module.exports = { buildDataInOperation, buildDataOutOperation };
