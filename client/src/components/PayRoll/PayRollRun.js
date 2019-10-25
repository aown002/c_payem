import React, { useEffect } from 'react';
import MaterialTable from 'material-table';
import Table from '../widgets/Table';
import axios from 'axios';

const columns = [
    { title: 'Name', field: 'name' },
    { title: 'Total Days', field: 'status' },
    { title: 'Gross pay', field: 'pay_type' },
    { title: 'Net Pay', field: 'frequency' },
]

const data = [
    //{ id: '1', name: 'Sajeel', status: 'Active', pay_type: 'Salary', frequency: 'Monthly', registration: 'Complete' },
]

export default function PayRollRun(props) {
    const [state, setState] = React.useState({
        modalOpen: false,
    });

    useEffect(() => {
        axios.get('http://localhost:4000/employees/employee/salary')
            .then(res => {
                console.log(res)
                const data = res.data.data
                console.log(data)
                setState({ ...state, data })
               
            }).catch(err => {
                console.log("Error ", err)
            })
        console.log(state)
    }, {});

    return (
        <React.Fragment>
            <Table
                title="Run PayRoll"
                columns={columns}
                data={state.data}
            />
        </React.Fragment>
    )
}