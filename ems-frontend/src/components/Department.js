import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const BASE_URL = "http://localhost:8080/api/department"

function Department() {


    const [departmentName, setDepartmentName] = useState("");
    const [departmentDescription, setDepartmentDescription] = useState("");

    const navigator = useNavigate();

    const { id } = useParams();

    useEffect(() => {
        if (id) {
            fetch(`${BASE_URL}/${id}`)
                .then(response => response.json())
                .then(data => {
                    setDepartmentName(data.departmentName)
                    setDepartmentDescription(data.departmentDescription)
                })
        }
    }, [id])

    const [errors, setErrors] = useState({
        departmentName: "",
        departmentDescription: "",
    })

    function validateForm() {
        let valid = true

        const errorsCopy = { ...errors };

        if (departmentName.trim()) {
            errorsCopy.departmentName = "";
        } else {
            errorsCopy.departmentName = "Department name is required";
            valid = false;
        }

        if (departmentDescription.trim()) {
            errorsCopy.departmentDescription = "";
        } else {
            errorsCopy.departmentDescription = "Department description is required";
            valid = false;
        }

        setErrors(errorsCopy)

        return valid
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (validateForm()) {
            let empDetails = { departmentName, departmentDescription }

            if (id) {
                fetch(`${BASE_URL}/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(empDetails)
                })
                    .then(response => response.json())
                    .then(data => {
                        navigator("/")
                    });
            } else {
                fetch(BASE_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(empDetails)
                })
                    .then(response => response.json())
                    .then(data => {
                        navigator("/")
                    });
            }
        }

    }


    return (
        <div className='container mt-5'>
            <div className='row'>
                <div className='col'>
                    <div className="card">
                        <div className="card-header text-center h3">
                            {id == null ? "Add" : `Update`} Department
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="department_name" className="form-label">Department Name</label>
                                    <input type="text" value={departmentName} onChange={(e) => setDepartmentName(e.target.value)} className={`form-control ${errors.departmentName ? 'is-invalid' : ''}`} id="department_name" placeholder='First name' aria-describedby="department_name" />
                                    {errors.departmentName && <div className='invalid-feedback'>{errors.departmentName}</div>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="department_description" className="form-label">Department Description</label>
                                    <input type="text" value={departmentDescription} onChange={(e) => setDepartmentDescription(e.target.value)} className={`form-control ${errors.departmentDescription ? 'is-invalid' : ''}`} id="department_description" placeholder='Last name' aria-describedby="department_description" />
                                    {errors.departmentDescription && <div className='invalid-feedback'>{errors.departmentDescription}</div>}
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Department