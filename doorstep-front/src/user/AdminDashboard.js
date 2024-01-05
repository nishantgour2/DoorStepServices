import React from 'react'
import { isAuthenticated } from '../auth/index'
import {Link} from 'react-router-dom'

import './components/dashboard.css'






const AdminDashboard = () => {

    
const {user:{name,email,pincode,phone,address,role}} = isAuthenticated()



 const adminLinks = () => {
    return (
        <div className="card">
                <h4 className="card-header cardkaheader">Admin Settings</h4>
                <li className="list-group-item ">
                    <Link className="nav-link hh" to="/create/category">Create Category</Link>
                </li>
                <li className="list-group-item ">
                <Link className="nav-link hh" to="/create/provider">Add Service Provider</Link>

                </li>

                <li className="list-group-item ">
                <Link className="nav-link hh" to="/admin/orders">View Bookings</Link>

                </li>

                <li className="list-group-item ">
                <Link className="nav-link hh" to="/admin/providers">Manage Service Provider</Link>

                </li>
        </div>
    )
}


 const adminInfo = () => {
    return (
        <div className='card mb-5'>
            <h3 className='card-header cardkaheader'>Admin Information</h3>
            <ul className='list-group'>
                {/* <li className="list-group-item">Name</li> */}
                <li className="list-group-item">Username :  {name}</li>
                <li className="list-group-item">Email : {email}</li>
                <li className="list-group-item">Pincode : {pincode}</li>
                <li className="list-group-item">Address : {address}</li>

            <li className="list-group-item">Status : {role ===1 ? 'Admin' : 'Registered User'}</li>
            </ul>
        </div>
    )
}



    return (
       
            <div className='bg'>

                <h1>Dashboard</h1>
                <h3 className='welcome'>Welcome! {name} </h3>
                {/* <hr> </hr> */}
                <div className="container">
                    <hr></hr>
            <div className='row'>
        <div className="col-3">
        {adminLinks()}
        </div>

        <div className='col-9'>
            {adminInfo()}
          
        </div>
        
            </div>
        
        </div>
        </div>
        
    )

}



export default AdminDashboard;