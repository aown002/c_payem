import React, { useEffect } from 'react';
import FormSection from '../widgets/FormSection';
import * as Yup from 'yup';
import Validation from '../validation/Validation';
import axios from 'axios';
import Snackbar from '../widgets/Snackbar';

const newContributionFields = [
    {
        type: 'Select', label: 'Contribution',
        name: 'val',
        name2: 'name',
        id: 'val',
        indeterminate: true,
        disabled: false,
        requestParams: {
            endPoint: 'http://localhost:4000/contributions',
            selectMapping: ['val', 'val', null, null],
        }
    },
    {
        type: 'Select', label: 'Method',
        name: 'ATTRIB_06',
        name2: 'ATTRIB_21',
        id: 'ATTRIB_06',
        indeterminate: true,
        disabled: true,
        requestParams: {
            endPoint: 'http://localhost:4000/contributions',
            selectMapping: ['ATTRIB_06', 'ATTRIB_06', null, null],
        }
    },
    {
        type: 'TextField', label: 'Amount Limit', name: 'ATTRIB_14', name2: 'ATTRIB_11', disabled: true
    },
    {
        type: 'TextField', label: 'Amount Per Pay', name: 'ATTRIB_15', name2: 'ATTRIB_12', disabled: true
    },
    {
        type: 'Checkbox', label: 'Active', name: 'FLG_01', name2: 'FLG_01'
    }
]

const Sections = [
    {
        heading: 'Contribution Details',
        data: newContributionFields
    }
]

const ValidationSchema = Yup.object().shape({
    type: Yup.string()
        .required('Contribution is Required'),
    ATTRIB_11: Yup.number()
        .required('Amount Limit is Required')
        .typeError('Amount Limit Must be a Number')
        .positive("Amount Limit Must be a Positive Number"),
    ATTRIB_12: Yup.number()
        .required('Amount Per Pay is Required')
        .typeError('Amount Per Pay Must be a Number')
        .positive("Amount Paer Pay Must be a Positive Number")
        .max(30, 'Amount Per Pay Too Long!')
        .lessThan(Yup.ref('ATTRIB_11'), "Amount Per Pay should be less than Limit Amount"),
});

export default function EmployeeContributionAdd(props) {
    const [data, setData] = React.useState();
    const [errors, setErrors] = React.useState([]);
    const [snackbar, setSnackbar] = React.useState({ open: false, });

    useEffect(() => {
        console.log(props.data[0])
        axios.get(`http://localhost:4000/contributions`)
            .then(res => {
                const data = res.data.data
                console.log(res.data.data[0])
                setData({ ...data, data })
                console.log("DATA ", data)
            })
    }, {});

    const onChangeValue = (e, fsData) => {
        if (e.target.isAsyncSelect) {
            var id = e.target.row.row_id
            console.log(id)
            axios.get(`http://localhost:4000/contributions/${id}`)
                .then(res => {
                    const data = res.data.data[0]
                    setData({ ...data, data })
                    var keys = Object.keys(data);
                    keys.map(key => {
                        newContributionFields.map(field => {
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
        let newObj = { type: 'contribution', par_row_id: props.data[0].row_id }
        newContributionFields.forEach(field => {
            newObj[field.name2] = data[field.name]
        })

        let err = await Validation(ValidationSchema, newObj, )
        if (err.isValid === false) {
            setSnackbar({ ...snackbar, open: true, variant: 'error', message: 'Error Adding Contribution' });
            setErrors(err.errors);
        } else {
            setData(newObj)
            axios.post(`http://localhost:4000/employees/contribution`, { data: newObj })
                .then(res => {
                    setSnackbar({ ...snackbar, open: true, variant: 'success', message: 'Contribution Added Successfully' });
                    setErrors();
                })
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