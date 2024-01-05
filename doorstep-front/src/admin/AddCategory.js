import React,{useState} from "react";
import {isAuthenticated} from "../auth/index";
import {Link} from "react-router-dom";
import './addcat.css'
import {createCategory} from './apiAdmin'

const AddCategory = () => {
    const [name,setName] = useState('')
    const [error,setError] = useState(false)
    const [success,setSuccess] = useState(false)

    // destrucutre user and token from localstorage

    const {user,token} = isAuthenticated()

    const handleChange = (e) => {
        setError('')
        setName(e.target.value)
    }

    const clickSubmit = (e) => {
        e.preventDefault()
        setError('')
        setSuccess(false)
        // make api request
        createCategory(user._id,token,{name}).then(data => 
            {
            if(data.error){
                setError(true)
            }
            else{
                setError('')
                setSuccess(true)
            }
        })
    }

    const newCategoryFom = () => (

        <div>
        <form onSubmit={clickSubmit}>
            <div className="form-group">
                <label className="text-muted">Category Name :  </label>
                <input type="text" className='form-control' onChange={handleChange} value={name} autoFocus required/>

            </div>
            <button className="btn btn-outline-warning ">Create Category</button>

        </form>
        <div className="mt-5">
            <Link to="/admin/dashboard" className="text-secondary">Back to Dashboard</Link>

        </div>
        </div>
    )

    const showSuccess = () => {
        if(success){
        return <h2 className="text-success">{name} is created</h2>
        }
    }

    const showError = () => {
        if(error){
        return <h2 className="text-danger">{name.toLowerCase()} already exists !</h2>
        }
    }


   

    return (

        <div className="backss">
            <div className='heading'> 
                <h2>Welcome!</h2>
                <h4>Create A New Category</h4>
                {/* <hr/> */}
            </div>
        <div className="row">
            <div className="col-md-8 offset-md-2">
                {showSuccess()}
                {showError()}
                {newCategoryFom()}</div>
                {/* {goBack()} */}

        </div>
        </div>
    )


}


export default AddCategory;