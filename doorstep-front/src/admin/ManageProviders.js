import React,{useState,useEffect} from "react";
import {isAuthenticated} from "../auth/index";
import {Link} from "react-router-dom";
import './addcat.css'
import {createCategory} from './apiAdmin'
import Layout from "../core/Layout";
import {getProviders,deleteProvider} from './apiAdmin'


const ManageProviders = () => {

    const [providers,setProviders] = useState([])

    const {user,token} = isAuthenticated()

    const loadProviders = () => {
        getProviders().then(data => {
            if(data.error){
                console.log(data.error)
            }else{
                setProviders(data)
            }
        })
    }

    const destroy = providerId => {
        deleteProvider(providerId,user._id,token).then(data=> {
            if(data.error){
                console.log(data.error)
            }else{
                loadProviders()
            }
        })
    }

    useEffect(() => {
        loadProviders()
    },[])


return (
    <Layout
    title = "Welcome to the Control Panel"
    description="Manage the service providers"
    className = "container-fluid">
       
        <div className="row">
            
                <div className="col-12" >
<h2 className="text-center">Total {providers.length} Service Provider Found </h2>
                    <ul className="list-group">
                                {providers.map((p,i)=> (
                        <li key={i} className='list-group-item d-flex justify-content-between align-items-center'>
                           <strong>{p.name}</strong> 
                           <Link to={`/admin/provider/update/${p._id}`}>
                               <span className='badge badge-warning badge-pill'>Update</span>
                           </Link>
                           <span onClick={() => destroy(p._id) } className="badge badge-danger badge-pill">
                                    Delete
                           </span>
                        </li>

                                ))}
                        </ul>
                </div>
            

        </div>
    </Layout>
)
    
}


export default ManageProviders;