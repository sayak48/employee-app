const express = require('express');
const employeeController = require('./employee-controller');

const router = express.Router();


router
    .route('/')
    .get(employeeController.getAllEmployees)
    .post(employeeController.createEmployee);

router
    .route('/:id')
    .get(employeeController.getemployee)
    .put(employeeController.updateEmployee)
    .delete(employeeController.deleteEmployee);

module.exports = router;
