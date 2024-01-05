import React,{useState, useEffect} from "react";
import {isAuthenticated} from "../auth/index";
import {Link,Redirect} from "react-router-dom";

import { MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBSelect,
  MDBModalFooter,
  MDBIcon,MDBInput,
  MDBCardHeader,
  MDBBtn } from 'mdbreact'
import './addcat.css'
import {getProvider,getCategories,updateProvider} from './apiAdmin'
import face2 from "../user/img/ded.png"



const UpdateProvider = ({match}) => {
    
    const {user,token} = isAuthenticated();

    const [values,setValues] = useState({

        name:'',
        description:'',
        address: '',
        categories:[],
        category:'',
        worked: '',
        photo:'',
        service_avail:'',
        loading:false,
        error:'',
        createdProvider : '',
        redirectToProfile:false,
        formData:''
    })

    const {
    name,
    description,
    address,
    categories,
    category,
    worked,
    service_avail,
    loading,
    error,
    createdProvider,
    redirectToProfile,
    formData } = values


    const init = (providerId) => {
        getProvider(providerId).then(data => {
            if(data.error){
                setValues({...values,error:data.error})
            } else{
                setValues({...values,name:data.name,
                description:data.description,
            category:data.category._id,
        service_avail:data.service_avail,
        worked:data.worked,
        address:data.address,
    formData:new FormData()})
                initCategories()
            }
        })
    }

        // load categories from the database
        const initCategories = () => {
            getCategories().then(data => {
                if(data.error){
                    setValues({...values,error:data.error})
                }
                else{
                    setValues({categories:data,formData:new FormData()})
                }
            })
        }


        useEffect(() => {
            init(match.params.providerId)
        },[])

    const handleChange = name => event => {
        const value = name === 'photo' ? event.target.files[0] : event.target.value
        formData.set(name,value)
        setValues({...values,[name]:value})
    }
    

    const clickSubmit = (event) => {
        event.preventDefault()
        setValues({...values,error:'',loading:true})
        updateProvider(match.params.providerId,user._id,token,formData)
        .then(data => {
            if(data.error){
                setValues({...values,error:data.error})
            }
            else{
                setValues({
                    ...values, 
                    name:'',
                    description:'',
                    address: '',
                    worked: '',
                    photo:'',
                    loading:false,
                    createdProvider:data.name
                })
            }
        })
    }


        const newPostForm = () => (
            
            <form className='mb-3 customform' onSubmit={clickSubmit}>
                <div className="bgsd">
                {showError()}
            {showLoading()}
            {showSuccess()}
            {redirectUser()}
                </div>
                
                    <h4>Upload Photo</h4>
                    <div className="form-group ">
                        <label className="btn btn-warning  form1">
                        <input onChange={handleChange('photo')} className="form1" type="file" name="photo" accept="image/*"/>
                        </label>    
                    </div>

            <div className="md-form">
                {/* <label className="text-dark">Name</label> */}
                <input onChange={handleChange('name')} type="text" placeholder="Name" className="form-control mag" value={name}/>
            </div>
            

            

            <div className="md-form">
                {/* <label className="text-dark">Adress</label> */}
                <input onChange={handleChange('address')} placeholder="Address" type="text" className="form-control" value={address}/>
            </div>

           
            
            <div className="md-form">
                {/* <label className="text-dark">Service Provided</label> */}
                <input onChange={handleChange('worked')} placeholder="Service Provided" type="number" className="form-control" value={worked}/>
            </div>
            

            <div className="md-form">
                {/* <label className="text-dark">Description</label> */}
                <textarea onChange={handleChange('description')}  placeholder="Description" className="form-control mag" value={description}/>
            </div>

            <div >
                <label className="text-muted">Category</label>
                <select onChange={handleChange('category')}  className="form-control mdb-select md-form" >
                <option  >Select :</option>                    
        {categories && categories.map((c,i) => (<option key={i} value={c._id}>{c.name}</option>))}
                </select>
            </div>

            <div >
                <label className="text-muted mdb-main-label">Service Available</label>
                <select onChange={handleChange('service_avail')}  className="form-control mdb-select md-form colorful-select dropdown-primary" >
                <option  >Select :</option>                    
                    
                    <option value="0" >No</option>
                    <option value="1" >Yes</option>

                </select>
            </div>

            <button className='btn btn-outline-primary'>Update Service Provider</button>
            </form>
            
    )

    const showError = () => (
        <div className="alert alert-danger" style={{display:error ? '' : 'none'}}>
        {error}
    </div>
    )

    const showSuccess = () => (
        <div className="alert alert-info" style={{display:createdProvider ? '' : 'none',"width": '10%'}}>
             <h4>{`${createdProvider}`} is Created</h4>
        </div>
    )

    const showLoading = () => (
        loading && (<div className="alert alert-warning"><h5>Loading....</h5></div>)
    )
    
      const redirectUser = () => {
            if(redirectToProfile){
                if(!error){
                    return <Redirect to='/'/>
                }
            }
      }  

    return (
        <div className="backssProv">
        <div className='heading'> 
            <h2>Welcome!</h2>
            <h4>Register A New Service Provider</h4>
            <img className="chotabacha" src={face2}/>
            
        </div>
    <div className="row">
        <div className="col-md-8 offset-md-2">
            
            {newPostForm()}


            {/* {newCategoryFom()} */}
            </div>
            {/* {goBack()} */}

    </div>
    </div>
    ); // end of return

}


export default UpdateProvider;
