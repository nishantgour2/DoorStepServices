import React,{useState} from 'react'
import Layout from '../core/Layout'
import {Link, Redirect} from 'react-router-dom'
import {signin,authenticate,isAuthenticated} from '../auth/index'

import './signup.css'
// import Background from '../user/components/background'


const Signin = () => {

    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        loading : false,
        redirectToReferrer :false
    })

    const { email, password,loading,error,redirectToReferrer} =values
    const {user} = isAuthenticated()

    const handleChange = name => event => {

        setValues({...values,error:false,[name]:event.target.value})

    }




    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({...values,error:false,loading:true})
         signin({email,password}) 
         .then(data=> {
             if(data.error){
                 setValues({...values, error:data.error,success:false,loading:false})
             }
             else{
                 authenticate(
                     data,
                     () => {
                        setValues({
                            ...values,
                            error:'',
                            redirectToReferrer:true
                        })
                     }
                 )
                 
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
          <div className="card-body">
            <h5 className="card-title text-center bb">Log in Your Account !</h5>

            {/* form started */}
            <form className="form-signin">
            {showError()}
            {showLoading()}


             
              <div className="form-label-group">
                <input  onChange={handleChange('email')} value={email}  type="email" id="inputEmail" className="form-control" placeholder="Email address" required/>
                <label for="inputEmail">Email address</label>
              </div>
              
              <hr/>

              <div className="form-label-group">
                <input onChange={handleChange('password')} value={password}  type="password" id="inputPassword" className="form-control" placeholder="Password" required/>
                <label for="inputPassword">Password</label>
              </div>

              
              
             

              <button  onClick={clickSubmit}  className="btn btn-lg btn-warning btn-block text-uppercase" type="submit">Register</button>
              <Link className="d-block text-center mt-2 small" to="/signin"> New User,Sign Up !</Link>
              
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>

  </div>

);


const showError = () => (
    <div className="alert alert-danger ero" style={{display:error ? '' : 'none'}}>
        {error}
    </div>
)


const showLoading = () => (
    loading && (<div className="alert alert-info"><h2>Loading....</h2></div>)
)


const redirectUser = () => {
    if(redirectToReferrer){
        if(user && user.role === 1) {
          return <Redirect to="/admin/dashboard" />
        }
        else{
          return <Redirect to="/user/dashboard" />
        }
    }

    if(isAuthenticated()){
      return <Redirect to="/" />

    }

}


    
    
    return (
        // <Layout title="Registration Page" description="Door-Step Services Platform !  ">
        <div>
            {signUpForm()}
            {redirectUser()}
            {/* {JSON.stringify(values)} */}
            </div>
           
    ) 
}


export default Signin;