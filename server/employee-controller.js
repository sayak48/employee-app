const fs = require('fs');

// const tours = JSON.parse(
//     fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// );
const employeeData = JSON.parse(fs.readFileSync(`${__dirname}/employee-data.json`, 'utf-8'));


exports.getAllEmployees = (req, res) => {

    res.status(200).json({
        status: 'success',
        results: employeeData.length,
        data: {
            employeeData
        }
    });
};

exports.getemployee = (req, res) => {
    const id = req.params.id;
    const employee = employeeData.find(el => el.empId === id);
    if (employee) {
        res.status(200).json({
            status: 'success',
            data: {
                employee
            }
        });
    }
    else {
        res.status(404).json({
            status: 'failed',
            message: `Resouce not found`
        })
    }

};

exports.createEmployee = (req, res) => {
    console.log(req.body);
    let newEmployee = { ...req.body };
    newEmployee.country = newEmployee.country.toUpperCase();

    if (employeeData.find(ele => ele.empId === newEmployee.empId)) {
        // This is a schema validation
        res.status(409).json({
            status: 'failed',
            message: `Failed to create Employee as duplicate is not allowed`
        })
    }
    else {
        employeeData.push(newEmployee);

        fs.writeFile(
            `${__dirname}/employee-data.json`,
            JSON.stringify(employeeData),
            err => {
                res.status(201).json({
                    status: 'success',
                    data: {
                        newEmployee
                    }
                });
            }
        );
    }
};

exports.updateEmployee = (req, res) => {
    const id = req.params.id;
    const updatedEmployee = { ...req.body };
    const updateIndex = employeeData.findIndex(ele => ele.empId === id)

    if (updateIndex != -1) {
        employeeData[updateIndex] = { ...updatedEmployee };
        fs.writeFile(
            `${__dirname}/employee-data.json`,
            JSON.stringify(employeeData),
            err => {
                res.status(201).json({
                    status: 'success',
                    data: {
                        updatedEmployee
                    }
                });
            }
        );
    }
    else {
        res.status(404).json({
            status: 'failed',
            message: `Resource not Found`
        });
    }


};

exports.deleteEmployee = (req, res) => {
    const id = req.params.id;
    const deleteIndex = employeeData.findIndex(ele => ele.empId === id);

    if (deleteIndex != -1) {
        employeeData.splice(deleteIndex, 1);

        fs.writeFile(
            `${__dirname}/employee-data.json`,
            JSON.stringify(employeeData),
            err => {
                res.status(204).json({
                    status: 'success',
                    data: null
                });
            }
        );
    }
    else {
        res.status(404).json({
            status: 'failed',
            message: `Resource not Found`
        });
    }

};

