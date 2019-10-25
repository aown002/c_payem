const Sequelize = require('sequelize');
const Op = Sequelize.Op

const Employees = require('../../models/').C_EMP;
const ProfileAttributes = require('../../models/').C_EMP_XM;
const ListValue = require('../../models/').C_LST_VAL;

async function getEmployees(req, res, next) {
    Employees.findAll({
    }).then(data => {
        res.status(200).json({
            mesage: 'got employees',
            data: data
        })
    }).catch(err => {
        res.send("Error " + err);
    })
}

async function getEmployee(req, res, next) {
    Employees.findAll({
        where: { row_id: req.params.id }
    }).then(data => {
        res.status(200).json({
            messgae: 'got employee',
            iddd: req.params.id,
            data: data
        })
    }).catch(err => {
        res.send("Error " + err)
    })
}

async function createEmployee(req, res, next) {
    console.log(req.body.data)
    try {
        let data = await Employees.create({
            ...req.body.data
        })
        res.status(200).json({
            status: 200,
            data,
            message: 'Employee was created'
        })
    }

    catch (err) {
        err.status = 400
        err.message = `Database Error: ${err}`
        next(err)
        console.log(err)
    }
}

async function updateEmployee(req, res, next) {
    console.log("DAATAAAA", req.body.newData)
    Employees.findOne({
        where: { row_id: req.params.id }
    }).then(employee => {
        if (employee) {
            employee.update(
                req.body.newData
            ).then(employee => {
                console.log("UPDATED DATAAAA", employee)
                res.status(200).json({
                    data: employee,
                    messge: 'employee was updated'
                })
            }).catch(err => {
                console.log("ERRRRRRORRRR ", err)
                res.send("Error " + err)
            })
        }
    })
        .catch(err => {
            console.log("ERRRRRRRR " + err)
            res.send("Error " + err)
        })
}

async function deleteEmployee(req, res, next) {
    Employees.findOne({
        where: { row_id: req.params.id }
    }).then(employee => {
        if (employee) {
            employee.destroy({}).then(employee => {
                res.status(200).json({
                    messgae: 'employee was deleted'
                })
            })
        }
    }).catch(err => {
        res.send("Error " + err)
    })
}

async function getContributions(req, res, next) {
    ProfileAttributes.findAll({
        where: { type: 'contribution', }
    }).then(data => {
        res.status(200).json({
            mesage: 'got record',
            data: data
        })
    }).catch(err => {
        res.send("Error " + err);
    })
}

async function getContribution(req, res, next) {
    ProfileAttributes.findAll({
        where: { par_row_id: req.params.id, type: 'contribution' }
    }).then(data => {
        res.status(200).json({
            messgae: 'got record',
            iddd: req.params.id,
            data: data
        })
    }).catch(err => {
        res.send("Error " + err)
    })
}

async function createContribution(req, res, next) {
    console.log(req.body.data)
    try {
        let data = await ProfileAttributes.create({
            ...req.body.data
        })
        res.status(200).json({
            status: 200,
            data,
            message: 'Record was created'
        })
    }

    catch (err) {
        err.status = 400
        err.message = `Database Error: ${err}`
        next(err)
        console.log(err)
    }
}

async function updateContribution(req, res, next) {
    console.log("DAATAAAA", req.body.newData)
    ProfileAttributes.findOne({
        where: { row_id: req.params.id }
    }).then(value => {
        if (value) {
            value.update(
                req.body.newData
            ).then(value => {
                console.log("UPDATED DATAAAA", value)
                res.status(200).json({
                    data: employee,
                    messge: 'record was updated'
                })
            }).catch(err => {
                console.log("ERRRRRRORRRR ", err)
                res.send("Error " + err)
            })
        }
    })
        .catch(err => {
            console.log("ERRRRRRRR " + err)
            res.send("Error " + err)
        })
}

async function deleteContribution(req, res, next) {
    ProfileAttributes.findOne({
        where: { row_id: req.params.id }
    }).then(value => {
        if (value) {
            value.destroy({}).then(value => {
                res.status(200).json({
                    messgae: 'Record was deleted'
                })
            })
        }
    }).catch(err => {
        res.send("Error " + err)
    })
}

async function getDeductions(req, res, next) {
    ProfileAttributes.findAll({
        where: { type: 'deduction', }
    }).then(data => {
        res.status(200).json({
            mesage: 'got record',
            data: data
        })
    }).catch(err => {
        res.send("Error " + err);
    })
}

async function getDeduction(req, res, next) {
    ProfileAttributes.findAll({
        where: { par_row_id: req.params.id, type: 'deduction' }
    }).then(data => {
        res.status(200).json({
            messgae: 'got record',
            iddd: req.params.id,
            data: data
        })
    }).catch(err => {
        res.send("Error " + err)
    })
}

async function createDeduction(req, res, next) {
    console.log(req.body.data)
    try {
        let data = await ProfileAttributes.create({
            ...req.body.data
        })
        res.status(200).json({
            status: 200,
            data,
            message: 'Record was created'
        })
    }

    catch (err) {
        err.status = 400
        err.message = `Database Error: ${err}`
        next(err)
        console.log(err)
    }
}

async function updateDeduction(req, res, next) {
    console.log("DAATAAAA", req.body.newData)
    ProfileAttributes.findOne({
        where: { row_id: req.params.id }
    }).then(value => {
        if (value) {
            value.update(
                req.body.newData
            ).then(value => {
                console.log("UPDATED DATAAAA", value)
                res.status(200).json({
                    data: employee,
                    messge: 'record was updated'
                })
            }).catch(err => {
                console.log("ERRRRRRORRRR ", err)
                res.send("Error " + err)
            })
        }
    })
        .catch(err => {
            console.log("ERRRRRRRR " + err)
            res.send("Error " + err)
        })
}

async function deleteDeduction(req, res, next) {
    ProfileAttributes.findOne({
        where: { row_id: req.params.id }
    }).then(value => {
        if (value) {
            value.destroy({}).then(value => {
                res.status(200).json({
                    messgae: 'Record was deleted'
                })
            })
        }
    }).catch(err => {
        res.send("Error " + err)
    })
}

async function _getSalary(req, res, next) {
    let dataToSend = []
    let a = 0;

    ListValue.findAll({
        raw: true,
        where: {
            type: 'tax',
        },
    }).then(tax => {
        //console.log("LLLLLLLLEEEEEENNNNNNNGGGGTttthhhh ", tax.length)
        tax.map(t => {
            Employees.findOne({
                raw: true,
                where: {
                    ATTRIB_14: {
                        [Op.and]: [
                            { [Op.gte]: t.ATTRIB_11 },
                            { [Op.lte]: t.ATTRIB_12 },
                        ]
                    }
                }
            }).then(data => {
                a++;
                let taxAmount = data.ATTRIB_14 * t.ATTRIB_17 / 100;
                let payAfterTax = data.ATTRIB_14 - taxAmount;
                // data['payAfterTax'] = payAfterTax;
                // dataToSend.push(data)
                // if (a === tax.length) {
                //     res.status(200).json({
                //         mesage: 'got record',
                //         data: dataToSend
                //     })
                // }
                if (a === tax.length) {
                    ProfileAttributes.findAll({
                        raw: true,
                        //attributes: [[sequelize.fn('sum', sequelize.col('ATTRIB_12')), 'total']],
                        where: {
                            par_row_id: data.row_id,
                        }
                    }).then(empxm => {
                        console.log("iiiiiiiiiiiiiiiiiiiiiddddddddddddddddddd ", data.row_id)
                        //console.log("TTTTTTTTTTTOOOOOOTTTTAAAALLLLL ", empxm.total)
                        console.log("SSSSSSSUUUUUUUMMMMM ", empxm)
                        // let payAfterContribution = empxm.ATTRIB_12 + payAfterTax;
                        // data['Pay After Contribution'] = payAfterContribution;
                        // dataToSend.push(data);
                    })
                }
            }).catch(err => {
                res.send("Error " + err);
            })
        })
    })
}

async function __getSalary(req, res, next) {
    
    try {
        let employees = await Employees.findAll({
            raw: true
        })

        Prmoise.all(employees.map(async employee => {
            let netPay = employee.ATTRIB_14;
            let payWithTax = await payAftertax(employee);
            let payWithContribution = await payAfterContribution(employee);
            let grossPay = netPay - payWithTax + payWithContribution;
            employee['Tax Amount'] = payWithTax;
            employee['Contributions Amount'] = payAfterContribution;
            employee['Gross Pay'] = grossPay;
            //dataToSend.push(employee);
            //console.log("Inner Data to Send ", dataToSend)
            return employee;
        })).then(dataToSend => {
            console.log("Data To Send ", dataToSend)
            res.status(200).json({
                mesage: 'got record',
                data: dataToSend
            })
        })
        .catch(err => {
            console.log("ERRROR ", err)
        })
    }
    catch (err) {
        err.status = 400
        err.message = `Database Error: ${err}`
        next(err)
    }
}

async function getSalary(req, res, next) {
    
    let dataToSend = [];
    try {
        let employees = await Employees.findAll({
            raw: true
        })
        let a = 0;
        let arr = await employees.map(async employee => {
            console.log("Employees Length ", employees.length)
            a++;
            let netPay = employee.ATTRIB_14;
            let payWithTax = await payAftertax(employee);
            let payWithContribution = await payAfterContribution(employee);
            let grossPay = netPay - payWithTax + payWithContribution;
            employee['Tax Amount'] = payWithTax;
            employee['Contributions Amount'] = payAfterContribution;
            employee['Gross Pay'] = grossPay;
            //dataToSend.push(employee);
            return employee;
            //console.log("data to Send ", dataToSend);
            //console.log("AAAAAAAAAAAAAAAAAAAAAAAAAA", a);
            //console.log("Inner Data to Send ", dataToSend)
        })

        console.log("DAAATTA TO SEND ", dataToSend)
        res.status(200).json({
            mesage: 'got record',
            data: dataToSend
        })
    }
    catch (err) {
        err.status = 400
        err.message = `Database Error: ${err}`
        next(err)
    }
}

async function payAftertax(employee) {
    let taxAmount = null;
    try {
        let payAfterTax = await ListValue.findOne({
            raw: true,
            where: {
                type: 'tax',
                ATTRIB_11: {
                    [Op.lte]: employee.ATTRIB_14,
                },
                ATTRIB_12: {
                    [Op.gte]: employee.ATTRIB_14,
                }
            }
        })

        if (payAfterTax !== null) {
            let tax = payAfterTax.ATTRIB_17 / 100;
            taxAmount = employee.ATTRIB_14 * tax;
        }

        return taxAmount;
    }
    catch (err) {
        err.status = 400
        err.message = `Database Error: ${err}`
        next(err)
    }
}

async function payAfterContribution(employee) {
    let contribution = null
    try {
        let payAfterContribution = await ProfileAttributes.findOne({
            where: {
                type: 'contribution',
                par_row_id: employee.row_id
            },
            attributes: [[Sequelize.fn('sum', Sequelize.col('ATTRIB_12')), 'total']],
            raw: true
        })
        console.log("Pay After Contribution ", payAfterContribution);
        if (payAfterContribution !== null) {
            contribution = payAfterContribution.total;
        }

        return contribution;
    }
    catch (err) {
        err.status = 400
        err.message = `Database Error: ${err}`
        next(err)
    }
}

module.exports = {
    getEmployee,
    getEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee,

    getContributions,
    getContribution,
    createContribution,
    updateContribution,
    deleteContribution,

    getDeductions,
    getDeduction,
    createDeduction,
    updateDeduction,
    deleteDeduction,

    getSalary,
}