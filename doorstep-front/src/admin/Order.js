import React,{useState, useEffect} from "react";
import {isAuthenticated} from "../auth/index";
import {Link} from "react-router-dom";
import './addcat.css'
import {listOrders,getStatusValues,updateOrderStatus} from './apiAdmin'
import moment from 'moment'


const Orders = () => {

    const [orders,setOrders] = useState([])
    const [statusValues,setStatusValues] = useState([])

    const {user,token} = isAuthenticated()


    const loadOrders = () => {
        listOrders(user._id,token).then(data => {
            if(data.error){
                console.log(data.error)
            } 
            else{
                setOrders(data)
            }
        })
    }

    const loadStatusValues  = () => {
        getStatusValues(user._id,token).then(data => {
            if(data.error){
                console.log(data.error)
            } 
            else{
                setStatusValues(data)
            }
        })
    }

    useEffect(()=> {
        loadOrders()
        loadStatusValues()
    },[])

    const showOrdersLength = () => {
            if(orders.length>0){
                return (
                    <h1 className='text-success display-12'> Total Booking: {orders.length}</h1>
                )
            }
            else{
                return <h1 className='text-danger'>No orders</h1>
            }
       }

       const showInput = (key,value) => (
           <div className='input-group mb-2 mr-sm-2'>
               <div className='input-group-prepend'>
                    <div className='input-group-text'>{key}</div>
               </div>
               <input type='text' value={value} className="form-control" readOnly/>
           </div>
       )
       const handleStatusChange = (e,orderId) => {
           updateOrderStatus(user._id, token, orderId, e.target.value).then(data => {
               if(data.error){
                   console.log('status update failed')
               }
               else{
                    loadOrders()
                   
               }
           })
       };

        const showStatus = (o) => (
            <div className='form-group'>
                    <h3 className='mark mb-4'>Status: {o.status}</h3>
                    <select className='form-control' onChange={e => handleStatusChange(e,o._id)}>
                       {statusValues.map((status,index)=> (<option key={index} value={status}>
                           {status}
                       </option>))} 
                    </select>
            </div>
        )

        return (

            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showOrdersLength()}
                    {orders.map((o,oIndex) => {
                        return (
                            <div className='mt-5' key={oIndex} style={{borderBottom:'3px solid dodgerblue'}}>
                                <h2 className="mb-5">
                        <span className=''>Booking ID: {o._id}</span>
                                </h2>
                            
                            <ul className="list-group mb-2">
                        <li className='list-group-item'>Status: {showStatus(o)}</li>
                        <li className='list-group-item'>Transaction ID: {o.transaction_id}</li>
                        <li className='list-group-item'>Request Service Paid: {o.amount}</li>
                        <li className='list-group-item'>Booking BY:  {o.user.name}</li>
                        <li className='list-group-item'>Booked On:  {moment(o.createdAt).fromNow()}</li>
                        <li className='list-group-item'>Service Address:  {o.address}</li>
                        


                                <h3 className="mt-4 mb-4 font-italic">
                                    Total Service Provider in the Booking : {o.providers.length}
                                </h3>

                                {o.providers.map((p,pIndex) => (
                                    <div className='mb-4' key={pIndex} style={{padding: '20px',border:'1px solid grey'}}>
                                       {showInput('Service Provider name',p.name)}  
                                       {/* {console.log(p)} */}
                                     
                                       {/* {showInput('Service Provider Number',p.count)}   */}
                                       {showInput('Service Provider ID',p._id)}  

                                    </div>
                                ))}


                            </ul>

                            </div>
                        )
                    } )}
    
            </div>
            </div>
        )
    

}


export default Orders