const Customer = require("../models/Customer.schema");
const { buildQuery } = require("../helpers/QueryParser.helper");

exports.addCustomer = async (_customer) => {
  const { name, email } = _customer;
  const customer = new Customer({ name, email });
  await customer.save();
};

exports.getFilteredCustomers = async (filters) => {
  const query = buildQuery(filters);
  return await Customer.find(query);
};
