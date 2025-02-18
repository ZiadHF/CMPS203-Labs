const fs = require('fs');

exports.getEmployees = async (req, res, next) => {
  const employee = JSON.parse(fs.readFileSync('./controllers/employees.json'));
  res.status(200).json({ data: employee });
};

// TODO
exports.deleteEmployee = async (req, res, next) => {
  const id = req.params.id;
  try {
    let employees = JSON.parse(fs.readFileSync('./controllers/employees.json'));
    employees = employees.filter((e) => e.id !== id);
    fs.writeFileSync('./controllers/employees.json', JSON.stringify(employees));
    res.status(200).json({ message: 'Employee deleted' });
    console.log('Employee deleted');
  } catch (error) {
    res.status(500).json({ message: 'Error deleting employee' });
    console.log('Error deleting employee');
  }
};

// TODO
exports.createEmployee = async (req, res, next) => {
  const employee = req.body;
  console.log(employee);
  try {
    let employees = JSON.parse(fs.readFileSync('./controllers/employees.json'));
    const exists = employees.some((e) => e.id === employee.id);
    if (exists) {
      console.log('Employee already exists');
      return res.status(400).json({ message: 'Employee already exists' });
    }
    employees.push(employee);
    fs.writeFileSync('./controllers/employees.json', JSON.stringify(employees));
    res.status(201).json({ message: 'Employee created' });
    console.log('Employee created');
  } catch (error) {
    res.status(500).json({ message: 'Error creating employee' });
    console.log('Error creating employee');
  }
};