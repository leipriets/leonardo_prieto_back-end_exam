import React from 'react';
import { Link, useHistory } from "react-router-dom";
const axios = window.axios;

const Navbar = ({children}) => {

    const history = useHistory();
    const name = sessionStorage.getItem('name');

    const logout = () => {
        sessionStorage.setItem('authenticated','');
        sessionStorage.clear();
        axios.defaults.headers.common["Authorization"] = "";
        history.push('/');
    }

    return  (
        <div classNameName="Navbar__container">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#">SSA</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link to="/home" className="nav-link">Home <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/trash" className="nav-link">Trashed <span className="sr-only">(current)</span></Link>
                    </li>
                    </ul>
                    <div className="form-inline my-2 my-lg-0">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item ">
                                <div className="mt-2">
                                    Welcome, {name}
                                </div>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link" role="button" onClick={logout}>
                                Logout
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="mt-4">
                {children}
            </div>
        </div>

    );
}

export default Navbar;