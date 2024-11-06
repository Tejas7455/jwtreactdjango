import React from 'react'
import { NavLink} from 'react-router-dom';


function NavBar() {
  return (
    <>
    <nav>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
            <a className="navbar-brand" href="/">JWT AUTH</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
                <li>
                <NavLink className="nav-link active" aria-current="page"to="/register">Register</NavLink>
                </li>
                <li>
                <NavLink className="nav-link active" aria-current="page" to="/login">Login</NavLink>
                </li>
               
            </ul>
            </div>
        </div>
        </nav>
        <ul>
            
            
        </ul>
    </nav>
    </>
  );
}

export default NavBar;