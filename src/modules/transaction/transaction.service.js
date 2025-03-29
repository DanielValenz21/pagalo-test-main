// src/modules/transaction/transaction.service.js
const {
    createTransaction,
    createTransactionDetail,
  } = require('./transaction.model');
  
  async function saveTransactionFromPagalo(txData) {
    // 1. Inserta la transacción principal
    const newId = await createTransaction(txData);
  
    // 2. Inserta detalles si existen
    if (txData.transaction_details && txData.transaction_details.length) {
      for (const d of txData.transaction_details) {
        await createTransactionDetail(newId, d);
      }
    }
  
    return newId;
  }
  
  module.exports = {
    saveTransactionFromPagalo,
  };