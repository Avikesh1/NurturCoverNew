const { sql, connectDB } = require('../DBConnection');

exports.createCustomer = async (req, res) => {
  const { name, surname, id_number, popi_consent } = req.body;
  try {
    const pool = await connectDB();
    const result = await pool.request()
      .input('name', sql.VarChar, name)
      .input('surname', sql.VarChar, surname)
      .input('id_number', sql.VarChar, id_number)
      .input('popi_consent', sql.Bit, popi_consent ? 1 : 0)
      .query('INSERT INTO Customer (name, surname, id_number, popi_consent) OUTPUT INSERTED.customer_id VALUES (@name,@surname,@id_number,@popi_consent)');
    const id = result.recordset[0].customer_id;
    res.status(201).json({ message: 'Customer created', customer_id: id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

exports.getCustomers = async (req, res) => {
  try {
    const pool = await connectDB();
    const result = await pool.request().query('SELECT * FROM Customer');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCustomerById = async (req, res) => {
  try {
    const pool = await connectDB();
    const result = await pool.request()
      .input('id', sql.Int, req.params.id)
      .query('SELECT * FROM Customer WHERE customer_id=@id');
    if (result.recordset.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json(result.recordset[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateCustomer = async (req, res) => {
  try {
    const { name, surname, id_number, popi_consent } = req.body;
    const pool = await connectDB();
    await pool.request()
      .input('name', sql.VarChar, name)
      .input('surname', sql.VarChar, surname)
      .input('id_number', sql.VarChar, id_number)
      .input('popi_consent', sql.Bit, popi_consent ? 1 : 0)
      .input('id', sql.Int, req.params.id)
      .query('UPDATE Customer SET name=@name, surname=@surname, id_number=@id_number, popi_consent=@popi_consent WHERE customer_id=@id');
    res.json({ message: 'Customer updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteCustomer = async (req, res) => {
  try {
    const pool = await connectDB();
    await pool.request().input('id', sql.Int, req.params.id).query('DELETE FROM Customer WHERE customer_id=@id');
    res.json({ message: 'Customer deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
