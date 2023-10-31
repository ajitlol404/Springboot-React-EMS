import React from 'react'
import { NavLink } from 'react-router-dom'

function HeaderComponent() {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <div className="navbar-brand" href="#">Employee Management System</div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/employees">Employee</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/departments">Department</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default HeaderComponent