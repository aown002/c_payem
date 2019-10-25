import React, { useEffect } from 'react';
import FormSection from '../widgets/FormSection';
import * as Yup from 'yup';
import Validation from '../validation/Validation';
import axios from 'axios';
import Snackbar from '../widgets/Snackbar';

const newDeductionFields = [
    {
        type: 'Select', label: 'Deduction',
        name: 'val',
        name2: 'name',
        id: 'val',
        disabled: false,
        indeterminate: true,
        requestParams: {
            endPoint: 'http://localhost:4000/deductions',
            selectMapping: ['val', 'val', null, null],
        }
    },
    {
        type: 'Select', label: 'Method',
        name: 'ATTRIB_06',
        name2: 'ATTRIB_21',
        id: 'ATTRIB_06',
        disabled: true,
        indeterminate: true,
        requestParams: {
            endPoint: 'http://localhost:4000/deductions',
            selectMapping: ['ATTRIB_06', 'ATTRIB_06', null, null],
        }
    },
    { type: 'TextField', label: 'Amount Limit', name: 'ATTRIB_14', name2: 'ATTRIB_11', disabled: true },
    { type: 'TextField', label: 'Amount Per Pay', name: 'ATTRIB_15', name2: 'ATTRIB_12', disabled: true },
    {
        type: 'Checkbox', label: 'Active', name: 'FLG_01', name2: 'FLG_01'
    }
]

const Sections = [
    {
        heading: 'Deduction Details',
        data: newDeductionFields
    }
]

const ValidationSchema = Yup.object().shape({
    val: Yup.string()
        .required('Deductions is Required'),
    ATTRIB_14: Yup.number()
        .required('Amount Limit is Required')
        .typeError('Amount Limit Must be a Number')
        .positive("Amount Limit Must be a Positive Number"),
    ATTRIB_15: Yup.number()
        .required('Amount Per Pay is Required')
        .typeError('Amount Per Pay Must be a Number')
        .positive("Amount Paer Pay Must be a Positive Number")
        .lessThan(Yup.ref('ATTRIB_14'), "Amount Per Pay should be less than Limit Amount"),
});

export default function EmployeeDeductionAdd(props) {
    const [data, setData] = React.useState();
    const [errors, setErrors] = React.useState([]);
    const [snackbar, setSnackbar] = React.useState({ open: false, });

    useEffect(() => {
        console.log(props.data[0])
        axios.get(`http://localhost:4000/deductions`)
            .then(res => {
                const data = res.data.data
                console.log(res.data.data[0])
                setData({ ...data, data })
                console.log("DATA ", data)
            })
    }, {});

    const onChangeValue = (e, fsData) => {
        console.log(e.target.type)
        if (e.target.isAsyncSelect) {
            var id = e.target.row.row_id
            console.log(id)
            axios.get(`http://localhost:4000/deductions/${id}`)
                .then(res => {
                    const data = res.data.data[0]
                    console.log(res.data.data[0])
                    setData({ ...data, data })
                    var keys = Object.keys(data);
                    keys.map(key => {
                        newDeductionFields.map(field => {
                            console.log(field)
                            if (field.name === key && field.name !== e.target.name) {
                                if (data[key] === null) {
                                    field.disabled = false
                                }
                                else {
                                    field.disabled = true
                                }
                            }
                        })
                        if (data[key] === null) {
                            setData({ ...data, [key]: '' })
                        } else {
                            setData({ ...data, data })
                        }
                    })
                })
        } else {
            let name = e.target.name
            let value = e.target.value

            if (e.target.type === 'checkbox') {
                if (e.target.checked) {
                    value = 'Yes'
                }
                else {
                    value = 'No'
                }
            }
            setData({ ...data, [name]: value })
        }
    }

    const onFormSubmit = async (e) => {
        e.preventDefault();
        let newObj = { type: 'deduction', par_row_id: props.data[0].row_id }
        newDeductionFields.forEach(field => {
            console.log(field.name2)
            console.log(data[field.name])
            newObj[field.name2] = data[field.name]
        })

        let err = await Validation(ValidationSchema, newObj, )
        if (err.isValid === false) {
            setSnackbar({ ...snackbar, open: true, variant: 'error', message: 'Error Adding Deduction' });
            setErrors(err.errors);
        } else {
            setData(newObj)
            axios.post(`http://localhost:4000/employees/deduction`, { data: newObj })
                .then(res => {
                    setSnackbar({ ...snackbar, open: true, variant: 'success', message: 'Deduction Added Successfully' });
                    setErrors();
                })
            console.log(data)
        }
    }

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbar({ ...snackbar, open: false })
        if (snackbar.variant === 'success') {
            window.location.reload();
        }
    }

    if (data) {
        console.log(data.data)
        return (
            <div>
                <FormSection
                    fields={Sections}
                    data={data}
                    handleChange={onChangeValue}
                    onFormSubmit={onFormSubmit}
                    errors={errors}
                />
                <Snackbar
                    variant={snackbar.variant}
                    message={snackbar.message}
                    open={snackbar.open}
                    handleClose={handleSnackbarClose}
                />
            </div>
        )
    }
    else {
        return null;
    }
}