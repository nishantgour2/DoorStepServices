import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Signup from './user/Signup'
import Signin from './user/Signin'
import Home from './core/Home';
import Menu from './core/Menu';
import PrivateRoute from './auth/PrivateRoute'
import Dashboard from './user/UserDashboard'
import AdminRoute from './auth/AdminRoute'
import AdminDashboard from './user/AdminDashboard'
import AddCategory from "./admin/AddCategory"
import AddProvider from "./admin/addProvider"
import Service from './core/Service';
import Provider from './core/Provider';
import Cart from './core/Cart';

import Order from "./admin/Order"
import Profile from './user/Profile'
import ManageProviders from "./admin/ManageProviders"
import UpdateProvider from "./admin/updateProvider"








const Routes = () => {

    return(<BrowserRouter>
    <Menu/>
        <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/service' exact component={Service} />

            <Route path='/signin' exact component={Signin} />
            <Route path='/signup' exact component={Signup} />
            <PrivateRoute path="/user/dashboard" exact component={Dashboard} />
            
            <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
            <AdminRoute path="/create/category" exact component={AddCategory} />
            <AdminRoute path="/create/provider" exact component={AddProvider} />
            <Route path='/provider/:providerId' exact component={Provider} />

            <Route path='/Cart' exact component={Cart} />
        
            <AdminRoute path="/admin/orders" exact component={Order} />
            <PrivateRoute path="/profile/:userId" exact component={Profile} />
            <PrivateRoute path="/admin/providers" exact component={ManageProviders} />
            <AdminRoute path="/admin/provider/update/:providerId" exact component={UpdateProvider} />

        </Switch>
    </BrowserRouter>
    );
};

export default Routes;