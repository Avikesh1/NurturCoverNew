const express = require("express");
const bodyParser = require("body-parser");

const customerRoutes = require("./routes/customerRoutes");
const beneficiaryRoutes = require("./routes/beneficiaryRoutes");
const planRoutes = require("./routes/planRoutes");
const loginRoutes = require("./routes/loginRoutes");

const app = express();
app.use(bodyParser.json());

// Routes
app.use("/api/customers", customerRoutes);
app.use("/api/beneficiaries", beneficiaryRoutes);
app.use("/api/plans", planRoutes);
app.use("/api/login", loginRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
