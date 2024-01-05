import React,{useState} from 'react'
import Layout from '../core/Layout'
import {Link} from 'react-router-dom'
import {signup} from '../auth/index'

import './signup.css'
// import Background from '../user/components/background'


const Signup = () => {

    const [values, setValues] = useState({
        name : '',
        email: '',
        password: '',
        pincode : '',
        phone : '',
        address : '',
        error: '',
        success : false
    })

    const {name, email, password,pincode,phone,address,success,error} =values

    const handleChange = name => event => {

        setValues({...values,error:false,[name]:event.target.value})

    }




    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({...values,error:false})
         signup({name,email,password,pincode,phone,address}) 
         .then(data=> {
             if(data.error){
                 setValues({...values, error:data.error,success:false})
             }
             else{
                 setValues({
                     ...values,
                     name:'',
                     email:'',
                     password:'',
                     pincode : '',
                     phone : '',
                     address : '',
                     error:'',
                     success:true
                 })
             }
         })
    }





    const signUpForm = () => (
    <div className='back'>
    <div class="container ">
    <div className="row">
      <div className="col-lg-10 col-xl-9 mx-auto">
        <div className="card card-signin flex-row my-5">
          <div className="card-img-left d-none d-md-flex">
            
          </div>
          <div className="card-body cardkibody">
            <h5 className="card-title text-center bb">Create Your Account !</h5>

            {/* form started */}
            <form className="form-signin">
            {showError()}
            {showSuccess()}


              <div className="form-label-group">
                <input onChange={handleChange('name')} value={name} type="text" id="inputUserame" className="form-control" placeholder="Username" required autofocus/>
                <label for="inputUserame">Username</label>
              </div>

              <div className="form-label-group">
                <input  onChange={handleChange('email')} value={email}  type="email" id="inputEmail" className="form-control" placeholder="Email address" required/>
                <label for="inputEmail">Email address</label>
              </div>
              
              <hr/>

              <div className="form-label-group">
                <input onChange={handleChange('password')} value={password}  type="password" id="inputPassword" className="form-control" placeholder="Password" required/>
                <label for="inputPassword">Password</label>
              </div>

              <div className="form-label-group">
                <input onChange={handleChange('pincode')} value={pincode}  type="number" id="inputPincode" className="form-control" placeholder="Pincode" required/>
                <label for="inputPincode">Pincode</label>
              </div>

              <div className="form-label-group">
                <input onChange={handleChange('phone')} value={phone}  type="number" id="inputPhone" className="form-control" placeholder="Phone" required/>
                <label for="inputPhone">Phone</label>
              </div>

              <div className="form-label-group">
                <input onChange={handleChange('address')} value={address}  type="text" id="inputAddress" className="form-control" placeholder="address" required/>
                <label for="inputAddress">LandMark</label>
              </div>

              
              
             

              <button  onClick={clickSubmit}  className="btn btn-lg btn-warning btn-block text-uppercase" type="submit">Register</button>
              <Link className="d-block text-center mt-2 small" to="/signin">Sign In</Link>
              
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>

  </div>

);


const showError = () => (
    <div className="alert alert-danger" style={{display:error ? '' : 'none'}}>
        {error}
    </div>
)


const showSuccess = () => (
    <div className="alert alert-info" style={{display:success ? '' : 'none'}}>
         Your Account Has Been Created, Please <Link to="/signin">Sign in</Link> !
    </div>
)
    
    
    return (
        // <Layout title="Registration Page" description="Door-Step Services Platform !  ">
        <div>
            {signUpForm()}
            {/* {JSON.stringify(values)} */}
            </div>
           
    ) 
}


export default Signup;