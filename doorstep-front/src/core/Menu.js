import React,{Fragment} from 'react';
import {Link, withRouter,useHistory} from 'react-router-dom';
// import Background from '../user/components/background';
import './Menu.css'
import {signout,isAuthenticated} from '../auth/index'
import {itemTotal} from './cartHelpers'



const isActive = (history,paths) => {
    if(window.location.pathname === paths){
    return {color:'#ccff99'}
    } else {
        return {color:'#ffffff'}
    }
}
 


const Menu = () => {
let history = useHistory();
    
   return <div >
        <nav className="navbar  bg33">
        <h3 className='logo'>Doorstep</h3>

        <ul className='nav nav-tabs  men  navnav' >
            <li className="nav-item">
                <Link className="nav-link" style={isActive(window.history,'/')} to="/">Home</Link>
            </li>

            <li className="nav-item">
                <Link className="nav-link" style={isActive(window.history,'/service')} to="/service">Services</Link>
            </li>

            <li className="nav-item">
                
                <Link className="nav-link" style={isActive(window.history,'/cart')} 
                to="/cart">
                    Services Cart 
                    <sup><small className="cart-badge">{itemTotal()}</small></sup> </Link>
            </li>

            {isAuthenticated() && isAuthenticated().user.role === 0 && (
                <li className="nav-item">
                <Link className="nav-link" style={isActive(window.history,'/user/dashboard')} to="/user/dashboard">Dashboard</Link>
            </li>
            )}

            {isAuthenticated() && isAuthenticated().user.role === 1 && (
                <li className="nav-item">
                <Link className="nav-link" style={isActive(window.history,'/admin/dashboard')} to="/admin/dashboard">Dashboard</Link>
            </li>
            )}

            {!isAuthenticated() && (
                <Fragment>
                    <li className="nav-item">
                <Link className="nav-link" style={isActive(window.history,'/signin')} to="/signin">Signin</Link>
            </li>

            <li className="nav-item">
                <Link className="nav-link" style={isActive(window.history,'/signup')} to="/signup">Signup</Link>
            </li>
                </Fragment>
            )}

            {isAuthenticated() && (
                <Fragment>
                <li className="nav-item">
                <span className="nav-link" style={{cursor:'pointer',color:'white'}} onClick={() => signout(() =>{
                    
                    history.push('/')
                    
                } )}>Signout</span>
            </li>
            </Fragment>
            )}

        </ul>
        </nav>
    </div>

            }

export default withRouter(Menu);