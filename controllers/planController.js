const { sql, connectDB } = require('../DBConnection');

exports.createPlan = async (req, res) => {
  try {
    const { customer_id, plan_selected, inception_date, next_reward_date } = req.body;
    const pool = await connectDB();
    const result = await pool.request()
      .input('customer_id', sql.Int, customer_id)
      .input('plan_selected', sql.VarChar, plan_selected)
      .input('inception_date', sql.Date, inception_date)
      .input('next_reward_date', sql.Date, next_reward_date)
      .query('INSERT INTO Plans (customer_id, plan_selected, inception_date, next_reward_date) OUTPUT INSERTED.plan_id VALUES (@customer_id,@plan_selected,@inception_date,@next_reward_date)');
    res.status(201).json({ plan_id: result.recordset[0].plan_id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPlans = async (req, res) => {
  try {
    const pool = await connectDB();
    const result = await pool.request().query('SELECT * FROM Plans');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
