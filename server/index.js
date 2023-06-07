const express = require('express');
const fs = require('fs');
const http = require('http');
const cors = require('cors');
const app = express();

const employeeRouter = require('./employee-routes')

app.use(express.json());

const port = 3000;


app.use(cors());

app.use('/api/employee', employeeRouter);

app.listen(port, () => {
    console.log('running on port');
});

