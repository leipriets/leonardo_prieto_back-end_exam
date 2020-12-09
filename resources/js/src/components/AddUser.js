import React, { useEffect, useState } from 'react';
import { Redirect, Link, useHistory } from "react-router-dom";
import api from '../api';

// components
import AppContainer from "./AppContainer";
import Navbar from "./header/Navbar";


const AddUser = () => {

    const [redirect, setRedirect] = useState(false);
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [prefix, setPrefix] = useState('');
    const [suffix, setSuffix] = useState('');
    const [firstname, setFirstname] = useState('');
    const [middlename, setMiddlename] = useState('');
    const [lastname, setLastname] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [type, setType] = useState('');



    if (sessionStorage.getItem('authenticated')) {
        console.log('session started');
    }else {
        setRedirect(true);
    }



    const onAddSubmit = async () => {
        setLoading(true);
        try {
            await api.addUser({
                prefix,firstname, middlename, lastname, suffix, username, email, password, type
            }).then((res) => {
                var err = res.data.errors,
                    success_message = res.data.message,
                    status = res.data.status;

                switch (status){
                    case 200:
                       
                        alert(success_message);
                        history.push('/home');
                    
                    break;
                
                    case 402:

                        if (err.firstname) {
                            alert(err.firstname);
                            return false;
                        } else if(err.lastname) {
                            alert(err.lastname);    
                            return false;
                        } else if(err.username) {
                            alert(err.username);    
                            return false;
                        } else if(err.email){
                            alert(err.email);
                            return false;
                        } else if (err.password){
                            alert(err.password);
                            return false;
                        } 

                    break;
                }



    
            });

        } catch (err) {
            console.log(err);
            alert('Something went wrong!');
        } finally {
            setLoading(false);
        }
    }

    // const getOptions = async ()  =>{
    //     const res = await axios.getAccessLeveList();
    //     const data = res.data
    
    //     const options = data.map(d => ({
    //       "value" : d.access_level_id,
    //       "label" : d.description
    //     }))

    //     setAccessLevels({selectOptions: options});
    // }

    
    if (redirect) {
        history.push("/");
    }

    return  (
        <Navbar>
            <AppContainer title="Add User">
                <form>

                <div className="row">
                        <div className="col-md-2">
                            <div className="form-group">
                                <label>Prefix</label>
                                <select className="form-control" value={prefix}  onChange={e => setPrefix(e.target.value)}>
                                    <option value="Mr">Mr</option>
                                    <option value="Mrs">Mrs</option>
                                    <option value="Ms">Ms</option>
                                </select>  
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group">
                                <label>Firstname</label>
                                <input type="text" className="form-control" value={firstname} onChange={e => setFirstname(e.target.value)} />  
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group">
                                <label>Middlename</label>
                                <input type="text" className="form-control" value={middlename}  onChange={e => setMiddlename(e.target.value)} />  
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group">
                                <label>Lastname</label>
                                <input type="text" className="form-control" value={lastname} onChange={e => setLastname(e.target.value)}  />  
                            </div>
                        </div>
                        
                    </div>


                    <div className="row">
                        <div className="col-md-2">
                            <div className="form-group">
                                <label>Suffix</label>
                                <input type="text" className="form-control" value={suffix} onChange={e => setSuffix(e.target.value)} />  
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group">
                                <label>Username</label>
                                <input type="text" className="form-control" value={username} onChange={e => setUsername(e.target.value)}  />  
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" className="form-control" value={email}  onChange={e => setEmail(e.target.value)} />  
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" className="form-control" value={password}  onChange={e => setPassword(e.target.value)} />  
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-2">
                            <div className="form-group">
                                <label>User Type</label>
                                <select className="form-control" value={type} onChange={e => setType(e.target.value)} >
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <button type="button" onClick={onAddSubmit} disabled={loading} className="btn btn-success">{loading ? 'LOADING...' : 'ADD'} </button>  
                        </div>
                    </div>
                </form>
            </AppContainer>
        </Navbar>
    );
}

export default AddUser; 