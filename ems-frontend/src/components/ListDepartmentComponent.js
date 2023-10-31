import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const BASE_URL = "http://localhost:8080/api/department"

function ListDepartmentComponent() {

    const [departments, setDepartments] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        getAllDepartment()
    }, [])

    function getAllDepartment() {
        fetch(BASE_URL)
            .then((response) => response.json())
            .then((data) => {
                setDepartments(data);
            }).catch(err => {
                console.log(err);
            })
    }


    function handleAddDepartment() {
        navigate("/add-department")
    }

    function handleUpdateDepartment(id) {
        navigate("/edit-department/" + id)
    }

    function handleDeleteDepartment(id) {

        fetch(`${BASE_URL}/${id}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (response.ok) {
                    getAllDepartment()
                } else {
                    throw new Error("Failed to delete department")
                }
            })
            .catch(err => console.log(err))

    }

    return (

        <div className='container'>
            <h2 className='text-center'>List of Department(s)</h2>
            <button type="button" className='btn btn-primary my-2' onClick={handleAddDepartment}>Add Department</button>
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th scope="col">Department ID</th>
                        <th scope="col">Department Name</th>
                        <th scope="col">Department Description</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        departments.map(dep =>
                            <tr key={dep.id}>
                                <td>{dep.id}</td>
                                <td>{dep.departmentName}</td>
                                <td>{dep.departmentDescription}</td>
                                <td>
                                    <button className='btn btn-info' onClick={() => handleUpdateDepartment(dep.id)}>Update</button>
                                    <button className='btn btn-danger ms-2' onClick={() => handleDeleteDepartment(dep.id)}>Delete</button>
                                </td>
                            </tr>)
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ListDepartmentComponent