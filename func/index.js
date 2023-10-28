const calculateBalanceWithPreviou = (data, previou) => {
  console.log(
    "🚀 ~ file: index.js:2 ~ calculateBalanceWithPreviou ~ previou:",
    previou
  );
  const recordAmount = data.record.amount;
  const recordTotal = data.record.total;
  const updateCurrentUnitCost = previou.currentUnitCost;
  if (data.type === 1) {
    console.log(
      "🚀 ~ file: index.js:3 ~ calculateBalanceWithPreviou ~ data.type: ENTRADA! => ",
      data.type
    );
    const balances = {
      amount: recordAmount + previou.amount,
      total: recordTotal + previou.total,
      currentUnitCost: (recordTotal + previou.total)/(recordAmount + previou.amount),
    };
    const newOperation = {
      ...data,
      balances: balances,
    };
    return newOperation;
  } else {
    console.log(
      "🚀 ~ file: index.js:3 ~ calculateBalanceWithPreviou ~ data.type: SALIDA! => ",
      data.type
    );
    const record = {
        amount: recordAmount,
        currentUnitCost: updateCurrentUnitCost,
        total: recordAmount * updateCurrentUnitCost,
      };
    const balances = {
      amount: previou.amount - recordAmount,
      currentUnitCost: updateCurrentUnitCost,
      total: previou.total - record.total,
    };
    const newOperation = {
      ...data,
      record: record,
      balances: balances,
    };
    return newOperation;
  }
};

const calculateBalanceAnyPreviou = (data) => {
  const balances = {
    amount: data.record.amount,
    currentUnitCost: data.record.currentUnitCost,
    total: data.record.total,
  };
  console.log("🚀 ~ file: index.js:45 ~ calculateBalanceAnyPreviou ~ balances:", balances);
  const newOperation = {
    ...data,
    balances: balances,
  };
  return newOperation;
};

module.exports = { calculateBalanceWithPreviou, calculateBalanceAnyPreviou };