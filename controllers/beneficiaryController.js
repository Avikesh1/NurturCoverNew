const { sql, connectDB } = require('../DBConnection');

exports.createBeneficiary = async (req, res) => {
  try {
    const { customer_id, name, relationship, id_number } = req.body;
    const pool = await connectDB();
    const result = await pool.request()
      .input('customer_id', sql.Int, customer_id)
      .input('name', sql.VarChar, name)
      .input('relationship', sql.VarChar, relationship)
      .input('id_number', sql.VarChar, id_number)
      .query('INSERT INTO Beneficiaries (customer_id, name, relationship, id_number) OUTPUT INSERTED.beneficiary_id VALUES (@customer_id,@name,@relationship,@id_number)');
    res.status(201).json({ beneficiary_id: result.recordset[0].beneficiary_id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBeneficiariesByCustomer = async (req, res) => {
  try {
    const pool = await connectDB();
    const result = await pool.request().input('customerId', sql.Int, req.params.customerId).query('SELECT * FROM Beneficiaries WHERE customer_id=@customerId');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
