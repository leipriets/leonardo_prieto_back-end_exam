import React, { useEffect, useState } from 'react';
import { Redirect, Link, useHistory } from "react-router-dom";

// components
import AppContainer from "./AppContainer";
import Navbar from "./header/Navbar";

// api
import api from "../api";

const Home = () => {
    const [posts, setPosts] = useState(null);
    const [redirect, setRedirect] = useState(false);
    const history = useHistory();
    const access_level = sessionStorage.getItem('access_level');

    if (sessionStorage.getItem('authenticated')) {
        console.log('session started');
    }else {
        setRedirect(true);
    }

    const fetchUsers = () => {
        api.getAllUsers().then(res => {
            const result = res.data;
            console.log(res.data);
            setPosts(result);
        });
    }

    useEffect( () => { 
        fetchUsers();
     }, []);

     
     const renderPosts = () => {
         
         if(!posts) {
             return (
                 <tr>
                     <td colSpan="9" align="center">Loading....</td>
                 </tr>
             );
         }

         if (posts.length === 0) {
            return (
                <tr>
                    <td colSpan="9" align="center">No data available</td>
                </tr>
            );
         }


         return posts.map( (data) => (
             <tr key={data.id}>
                 <td >{data.photo}</td>
                 <td>{data.fullname}</td>
                 <td>{data.username}</td>
                 <td>{data.email}</td>
                 <td>{data.type}</td>
                 <td>
                    <Link to={`edit/${data.id}`} className="btn btn-warning">Edit</Link>
                 </td>
                 <td>
                     <button onClick={ () => {
                        if (confirm('are you sure you want to delete this record?')) {
                            api.deleteUser(data.id).then(res => {
                                let msg = res.data.message;
                                console.log(res.status)
                
                                if (res.status === 200) {
                                    fetchUsers();
                                    console.log(msg);
                                    alert(msg);
                                }
                                
                            });
                        }
                     } } type="button" className="btn btn-danger">Delete</button>
                 </td>
             </tr>
         ));
     }

     if (redirect) {
        history.push('/');
     }
    
    return  (
        <Navbar>
            <div className="container">
                <div className="ml-3">
                    <Link to="/add" className="btn btn-primary">Add User(s)</Link>
                </div>
                <AppContainer title="Users">
                    
                    <div className="mt-4 justify-content-center">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">Avatar</th>
                                    <th scope="col">Fullname</th>
                                    <th scope="col">Username</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">User Type</th>
                                    <th scope="col"></th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {renderPosts()}
                            </tbody>
                        </table>
                    </div>
                </AppContainer>
            </div>
       
       </Navbar>
    );
}

export default Home;