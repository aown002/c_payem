import React from 'react';
import FormSection from '../widgets/FormSection';
import * as Yup from 'yup';
import Validation from '../validation/Validation';
import Snackbar from '../widgets/Snackbar';
import PayRollRun from './PayRollRun';

const fields = [
    { type: 'Date', label: 'Pay Period Start', name: '1' },
    { type: 'Date', label: 'Pay Period End', name: '2' },
    { type: 'Date', label: 'Pay Date', name: '3' },
]

const Sections = [
    {
        heading: 'PayRoll Details',
        data: fields
    },
]

const ValidationSchema = Yup.object().shape({
   
});

export default function PayRollDate() {
    const initialData = {
        type: 'payroll'
    }
    const [data, setdata] = React.useState(initialData);
    const [success, setSuccess] = React.useState(true);
    const [errors, setErrors] = React.useState([]);
    const [snackbar, setSnackbar] = React.useState({ open: false, });

    const onFormSubmit = async (e) => {
        e.preventDefault();
        let err = await Validation(ValidationSchema, data, )
        if (err.isValid === false) {
            console.log(err.isValid)
            setSnackbar({ ...snackbar, open: true, variant: 'error', message: 'Error Adding Contribution' });
            setErrors(err.errors);
        } else {
            console.log("Yes")
            setSuccess(false)
        }
    }

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackbar({ ...snackbar, open: false })
        
        if(snackbar.variant === 'success'){
            setdata({ ...initialData });
            window.location.reload();   
        }
    }

    const onChangeValue = (e) => {
        let name = e.target.name
        let value = e.target.value
        var checked = e.target.checked
        if(checked==true){
            checked = 'Yes'
        }else{
            checked = 'No'
        }
        console.log(e.target.type)
        if(e.target.type=='checkbox'){
            value = checked
        }
        console.log(checked)
        setdata({ ...data, [name]: value })
    }

    return (
        success ?
        <div>
            <FormSection
                fields={Sections}
                handleChange={onChangeValue}
                data={data}
                onFormSubmit={onFormSubmit}
                errors={errors}
            />

            <Snackbar
                variant={snackbar.variant}
                message={snackbar.message}
                open={snackbar.open}
                handleClose={handleSnackbarClose}
            />
        </div> :
        <PayRollRun />
    )
}