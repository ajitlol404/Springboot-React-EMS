import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const BASE_URL_EMPLOYEE = "http://localhost:8080/api/employee"
const BASE_URL_DEPARTMENT = "http://localhost:8080/api/department"

function AddEmployee() {

    const [firstName, setFisrtName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [departmentId, setDepartmentId] = useState("");
    const [departments, setDepartments] = useState([]);

    const navigator = useNavigate();

    const { id } = useParams();

    useEffect(() => {
        if (id) {
            fetch(`${BASE_URL_EMPLOYEE}/${id}`)
                .then(response => response.json())
                .then(data => {
                    setFisrtName(data.firstName)
                    setLastName(data.lastName)
                    setEmail(data.email)
                    setDepartmentId(data.departmentId)
                })
        }
    }, [id])

    useEffect(() => {

        fetch(`${BASE_URL_DEPARTMENT}`)
            .then(response => response.json())
            .then(data => {
                setDepartments(data)
            }).catch(err => console.log(err))

    }, [])

    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
        department: ""
    })

    function validateForm() {
        let valid = true

        const errorsCopy = { ...errors };

        if (firstName.trim()) {
            errorsCopy.firstName = "";
        } else {
            errorsCopy.firstName = "First name is required";
            valid = false;
        }

        if (lastName.trim()) {
            errorsCopy.lastName = "";
        } else {
            errorsCopy.lastName = "Last name is required";
            valid = false;
        }

        if (email.trim()) {
            errorsCopy.email = "";
        } else {
            errorsCopy.email = "Email is required";
            valid = false;
        }

        if (departmentId) {
            errorsCopy.department = "";
        } else {
            errorsCopy.department = "Department is required";
            valid = false;
        }

        setErrors(errorsCopy)

        return valid
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (validateForm()) {
            let empDetails = { firstName, lastName, email, departmentId }

            if (id) {
                fetch(`${BASE_URL_EMPLOYEE}/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(empDetails)
                })
                    .then(response => response.json())
                    .then(data => {
                        navigator("/")
                    });
            } else {
                fetch(BASE_URL_EMPLOYEE, {
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
                            {id == null ? "Add" : `Update`} Employee
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="first_name" className="form-label">First Name</label>
                                    <input type="text" value={firstName} onChange={(e) => setFisrtName(e.target.value)} className={`form-control ${errors.firstName ? 'is-invalid' : ''}`} id="first_name" placeholder='First name' aria-describedby="first_name" />
                                    {errors.firstName && <div className='invalid-feedback'>{errors.firstName}</div>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="last_name" className="form-label">Last Name</label>
                                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className={`form-control ${errors.lastName ? 'is-invalid' : ''}`} id="last_name" placeholder='Last name' aria-describedby="last_name" />
                                    {errors.lastName && <div className='invalid-feedback'>{errors.lastName}</div>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={`form-control ${errors.email ? 'is-invalid' : ''}`} id="email" placeholder='Email' aria-describedby="email" />
                                    {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Department</label>
                                    <select className={`form-control ${errors.department ? 'is-invalid' : ''}`} value={departmentId} onChange={(e) => setDepartmentId(e.target.value)}>
                                        <option value="Select Department">Select Department</option>
                                        {
                                            departments.map(department =>
                                                <option key={department.id} value={department.id}>{department.departmentName}</option>
                                            )
                                        }
                                    </select>
                                    {errors.department && <div className='invalid-feedback'>{errors.department}</div>}
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

export default AddEmployee;