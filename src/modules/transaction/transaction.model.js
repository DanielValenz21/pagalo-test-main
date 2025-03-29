// src/modules/transaction/transaction.model.js
const pool = require('../../config/db');

// Inserta la transacción en la tabla 'transactions'
async function createTransaction(txData) {
  const sql = `
    INSERT INTO transactions (
      transaction_uuid, request_id, request_auth, business_uuid,
      client_name, first_name, last_name, email, country, city,
      postal_code, currency, total, date_transaction, request_status,
      request_code, status_transaction, type_payment, payment,
      identifier_payment, status_production, module, value_payment,
      branch_uuid
    )
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
  `;
  const [result] = await pool.query(sql, [
    txData.transaction_uuid,
    txData.request_id,
    txData.request_auth,
    txData.business_uuid,
    txData.client_name,
    txData.first_name,
    txData.last_name,
    txData.email,
    txData.country,
    txData.city,
    txData.postal_code,
    txData.currency,
    txData.total,
    txData.date_transaction,
    txData.request_status,
    txData.request_code,
    txData.status_transaction,
    txData.type_payment,
    txData.payment,
    txData.identifier_payment,
    txData.status_production,
    txData.module,
    txData.value_payment,
    txData.branch_uuid
  ]);
  return result.insertId; // Retorna el ID autogenerado
}

// Inserta el detalle de la transacción en la tabla 'transaction_details'
async function createTransactionDetail(transactionId, detail) {
  const sql = `
    INSERT INTO transaction_details (
      transaction_id, type_detail, product_uuid, description,
      quantity, amount, subtotal, observations
    )
    VALUES (?,?,?,?,?,?,?,?)
  `;
  const [result] = await pool.query(sql, [
    transactionId,
    detail.type_detail,
    detail.product_uuid,
    detail.description,
    detail.quantity,
    detail.amount,
    detail.subtotal,
    detail.observations || null
  ]);
  return result.insertId;
}

module.exports = {
  createTransaction,
  createTransactionDetail,
};