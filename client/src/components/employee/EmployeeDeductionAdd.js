import React, {useEffect} from 'react';
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
    { type: 'TextField', label: 'Amount Limit', name: 'ATTRIB_14', name2: 'ATTRIB_11' },
    { type: 'TextField', label: 'Amount Per Pay', name: 'ATTRIB_15', name2: 'ATTRIB_12' },
    {
        type: 'Checkbox', label: '',
        options:
        [
            { label: 'Active', value: '1' },
        ],
        name: 'FLG_01'
    }
]

const Sections = [
    {
        heading: 'Deduction Details',
        data: newDeductionFields
    }
]

const ValidationSchema = Yup.object().shape({
    type: Yup.string()
        .required('Deductions is Required'),
});

export default function EmployeeDeductionAdd(props) {

    const [data, setData] = React.useState();
    const [data2, setData2] = React.useState();
    const [errors, setErrors] = React.useState([]);
    const [snackbar, setSnackbar] = React.useState({ open: false, });

    useEffect(() => {
      
        // console.log(newDeductionFields[0].name2)
        // var arr = []
        // newDeductionFields.map(field => {
        //     console.log(field.name2)
        //     arr.push(field.name2)
        //     setData2({ ...data2, data })
        // })
        // console.log(arr)

        axios.get(`http://localhost:4000/deductions`)
            .then(res => {
                const data = res.data.data
                console.log(res.data.data[0])
                setData({ ...data, data })
                //setData2({ ...data2, data })
                console.log("DATA ", data)
            })
    }, {});

    const onChangeValue = (e, fsData) => {
        console.log(fsData)
        console.log(e.target)
        //console.log(e.target.row.row_id)
        console.log(fsData);
        console.log("NAME: ", e.target.name);

        if (e.target.isAsyncSelect) {
            var id = e.target.row.row_id
            console.log(id)
            axios.get(`http://localhost:4000/deductions/${id}`)
                .then(res => {
                    const data = res.data.data[0]
                    console.log(res.data.data[0])
                    setData({ ...data, data })
                    console.log("DATA ", data)
                })
        }else {
            let name = e.target.name
            let value = e.target.value
            setData({ ...data, [name]: value })
        }

        // if (e.target.getAttribute) {
        //     console.log("NAME2: ", e.target.getAttribute('name2'))
        //     let name = e.target.getAttribute('name2')
        //     let value = e.target.value
        //     setData2({ ...data2, [name]: value })
        //     console.log(data2)
        // }

        // if (e.target.name2) {
        //     console.log("NAME2: ", e.target.name2)
        //     let name = e.target.name2
        //     let value = e.target.value
        //     setData2({ ...data2, [name]: value })
        //     console.log(data2)
        // }
    }

    const onFormSubmit = async (e) => {
        e.preventDefault();

        let newObj = { type: 'deduction', par_row_id: props.data[0].row_id }
        newDeductionFields.forEach(field => {
            console.log(field.name2)
            console.log(data[field.name])
            newObj[field.name2] = data[field.name]
        })

        //setData({...data, [field.name2]: data[field.name]})
        let err = await Validation(ValidationSchema, data, )
        if (err.isValid === false) {
            console.log(err.isValid)
            setSnackbar({ ...snackbar, open: true, variant: 'error', message: 'Error Adding Deduction' });
            setErrors(err.errors);
        } else {
            console.log(newObj)
            console.log(data)
            console.log(err.isValid)
            setData(newObj)
            axios.post(`http://localhost:4000/employees/deduction`, { data: newObj })
                .then(res => {
                    console.log(res);
                    console.log(res.data);
                    setSnackbar({ ...snackbar, open: true, variant: 'success', message: 'Deduction Added Successfully' });
                })
            console.log(data)
        }
    }

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbar({ ...snackbar, open: false })
        if(snackbar.variant === 'success'){
            window.location.reload();   
        }
    }

    if(data){
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
    else{
        return null
    }
    
}