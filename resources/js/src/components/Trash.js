import React, { useEffect, useState } from 'react';
import { Redirect, Link, useHistory } from "react-router-dom";

// components
import AppContainer from "./AppContainer";
import Navbar from "./header/Navbar";

// api
import api from "../api";

const Trash = () => {
    const [posts, setPosts] = useState(null);
    const [redirect, setRedirect] = useState(false);
    const history = useHistory();

    if (sessionStorage.getItem('authenticated')) {
        console.log('session started');
    }else {
        setRedirect(true);
    }

    const fetchDeletedUsers = () => {
        api.deletedUsers().then(res => {
            const result = res.data;
            console.log(res.data);
            setPosts(result);
        });
    }

    useEffect( () => { 
        fetchDeletedUsers();
     }, []);

     
     const renderPosts = () => {

        const forceDelete = (id) => api.forceDelete(id).then(res => { fetchDeletedUsers();  alert(res.data.message) });
         
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
                 <td>{data.full_name}</td>
                 <td>{data.username}</td>
                 <td>{data.email}</td>
                 <td>{data.type}</td>
                 <td>
                     <button onClick={ () => {
                        if (confirm('are you sure you want to restore this user?')) {
                            api.patchUser(data.id).then(res => {
                                let msg = res.data.message;
                                console.log(res.status)
                
                                if (res.status === 200) {
                                    fetchDeletedUsers();
                                    console.log(msg);
                                    alert(msg);
                                }
                                
                            });
                        }
                     } } type="button" className="btn btn-danger">Restore</button>
                 </td>  
                 <td>
                     <button onClick={ () => {
                        if (confirm('are you sure you want to permanent delete this user?')) {
                            forceDelete(data.id);
                        }
                     }} className="btn btn-danger">Permanent Delete</button>
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
                <AppContainer title="Deleted Users">
                    
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

export default Trash;