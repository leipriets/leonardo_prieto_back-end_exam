import React, { useEffect, useState } from 'react';
import { useHistory  } from "react-router-dom";

// api
import api from "../api";
const Login = () => {

const [loading, setLoading] = useState(false);
const history = useHistory();
const [email, setEmail] = React.useState('');
const [password, setPassword] = React.useState('');
const [redirect, setRedirect] = React.useState(false);

const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
        await api.login({email, password},'head').then( (res) => {
            console.log(res);
            switch (res.data.status_code) {
                case 422:
                    alert(res.data.message);
                    break;
            
                case 200:
                    sessionStorage.setItem('authenticated', res.data.access_token);
                    sessionStorage.setItem('access_level', res.data.access_level);
                    sessionStorage.setItem('name', res.data.fname);
                    axios.defaults.headers.common["Authorization"] = "Bearer " +sessionStorage.getItem('authenticated');
                    axios.defaults.headers.common["Accept"] = "application/json";
                    setRedirect(true);
                    break;
            }
        });
    } catch (error) {
        alert("Something went wrong!");
    } finally {
        setLoading(false);
    }

    
}

if (redirect || sessionStorage.getItem('authenticated')) {
    // return  (<Redirect to={'/home'}></Redirect>);
    history.push('/home');
}



return  (
<div className="container mt-4">
    <div className="row justify-content-center">
        <div className="col-md-8">
            <div className="card">
                <div className="card-header">Login</div>

                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group row">
                            <label for="email" className="col-md-4 col-form-label text-md-right">Email Address</label>

                            <div className="col-md-6">
                                <input id="email" type="email" className="form-control " name="email" onChange={e => setEmail(e.target.value)} required />
                            </div>
                        </div>

                        <div className="form-group row">
                            <label for="password" className="col-md-4 col-form-label text-md-right">Password</label>

                            <div className="col-md-6">
                                <input id="password" type="password" className="form-control" name="password" onChange={e => setPassword(e.target.value)}  required />

                                    {/* <span className="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span> */}
                            </div>
                        </div>


                        <div className="form-group row mb-0">
                            <div className="col-md-8 offset-md-4">
                                <button type="submit" className="btn btn-primary">
                                    {loading ? 'LOADING...' : 'Login'}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
    );
}

export default Login;