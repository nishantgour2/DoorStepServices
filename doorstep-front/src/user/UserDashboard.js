import React,{useState, useEffect} from 'react'
import { isAuthenticated } from '../auth/index'
import {Link} from 'react-router-dom'
import {getPurchaseHistory} from './apiUser'
import './components/dashboard.css'
import moment from 'moment'
// import {userLinks,userInfo,purchaseHistory} from '../user/components/userdash'





const Dashboard = () => {

    const [history,setHistory] = useState([])

    const {user:{_id, name,email,pincode,phone,address,role}} = isAuthenticated()
    const token = isAuthenticated().token
    const init = (userId, token) => {
        getPurchaseHistory(userId,token).then(data => {
            if(data.error){
                console.log(data.error)
            }else{
                setHistory(data)
            }
        })
    }

    useEffect(() => {
        init(_id,token)
    },[])

    const userLinks = () => {
        return (
            <div className="card">
                    <h4 className="card-header cardkaheader">User Settings</h4>
                    <li className="list-group-item ">
                        <Link className="nav-link hh" to="/cart">My Cart</Link>
                    </li>
                    <li className="list-group-item ">
                    <Link className="nav-link hh" to={`/profile/${_id}`}>Edit Profile</Link>
    
                    </li>
            </div>
        )
    }
    
    
     const userInfo = () => {
        return (
            <div className='card mb-5'>
                <h3 className='card-header cardkaheader'>User Information</h3>
                <ul className='list-group'>
                    {/* <li className="list-group-item">Name</li> */}
                    <li className="list-group-item">Username :  {name}</li>
                    <li className="list-group-item">Phone Number : {phone}</li>
                    <li className="list-group-item">Email : {email}</li>
                    <li className="list-group-item">Pincode : {pincode}</li>
                    <li className="list-group-item">Address : {address}</li>
    
                <li className="list-group-item">Status : {role ===1 ? 'Admin' : 'Registered User'}</li>
                </ul>
            </div>
        )
    }
    
    const purchaseHistory = history => {
        return (
            <div className="card mb-5">
                <h3 className="card-header">Booking History</h3>
                <ul className="list-group">
                    <li className="list-group-item">
                        {history.map((h, i) => {
                            return (
                                <div>
                                    <hr />
                                    {h.providers.map((p, i) => {
                                        return (
                                            <div key={i}>
                                                <h6>Service Provider Name: {p.name}</h6>
                                                {/* <h6>Product price: ${p.price}</h6> */}
                                                <h6>
                                                    Booking date:{" "}
                                                    {moment(p.createdAt).fromNow()}
                                                </h6>
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </li>
                </ul>
            </div>
        );
    };
    



    return (
       
            <div className='bg'>

                <h1>Dashboard</h1>
                <h3 className='welcome'>Welcome! {name} </h3>
                {/* <hr> </hr> */}
                <div className="container">
                    <hr></hr>
            <div className='row'>
        <div className="col-3">
        {userLinks()}
        </div>

        <div className='col-9'>
            {userInfo()}
            {purchaseHistory(history)}
        </div>
        
            </div>
        
        </div>
        </div>
        
    )

}



export default Dashboard;