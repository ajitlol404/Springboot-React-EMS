import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const BASE_URL = "http://localhost:8080/api/employee"

function ListEmployeeComponent() {

    const [employees, setEmployees] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        getAllEmployee()
    }, [])

    function getAllEmployee() {
        fetch(BASE_URL)
            .then((response) => response.json())
            .then((data) => {
                setEmployees(data);
            }).catch(err => {
                console.log(err);
            })
    }

    function handleAddEmployee() {
        navigate("/add-employee")
    }

    function handleUpdateEmployee(id) {
        navigate("/edit-employee/" + id)
    }

    function handleDeleteEmployee(id) {

        fetch(`${BASE_URL}/${id}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (response.ok) {
                    getAllEmployee()
                } else {
                    throw new Error("Failed to delete employee")
                }
            })
            .catch(err => console.log(err))

    }

    return (
        <div className='container'>
            <h2 className='text-center'>List of Employee(s)</h2>
            <button type="button" className='btn btn-primary my-2' onClick={handleAddEmployee}>Add Employee</button>
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th scope="col">Employee ID</th>
                        <th scope="col">Employee First Name</th>
                        <th scope="col">Employee Last Name</th>
                        <th scope="col">Employee Email ID</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        employees.map(emp =>
                            <tr key={emp.id}>
                                <td>{emp.id}</td>
                                <td>{emp.firstName}</td>
                                <td>{emp.lastName}</td>
                                <td>{emp.email}</td>
                                <td>
                                    <button className='btn btn-info' onClick={() => handleUpdateEmployee(emp.id)}>Update</button>
                                    <button className='btn btn-danger ms-2' onClick={() => handleDeleteEmployee(emp.id)}>Delete</button>
                                </td>
                            </tr>)
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ListEmployeeComponent