import {API} from "../config"
import queryString from 'query-string'

export const getProvider = (sortBy) => {
    return fetch(`${API}/providers?sortBy=${sortBy}&order=desc&limit=6`,{
        method : "GET"
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}



export const getCategories = () => {
    return fetch(`${API}/categories`,{
        method : "GET"
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}



export const getFilteredProviders = (skip,limit,filters={}) => {
    // console.log(name,email,password)  
    

    const data = {
        limit,skip,filters
    }
    
    return fetch(`${API}/providers/by/search`,{
        method : "POST",
        headers : {
            Accept : 'application/json',
            "Content-Type" : "application/json",
          
        },
        body : JSON.stringify(data)
    })

            .then(response => {
                return response.json()
            })
            .catch(err => {
                console.log(err)
                
            })
}


 


export const list = params => {
    const query = queryString.stringify(params);
    return fetch(`${API}/providers/search?${query}`,{
        method : "GET"
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
}




export const read = (providerId) => {
    return fetch(`${API}/provider/${providerId}`,{
        method : "GET"
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}


export const listRelated = providerId => {
    return fetch(`${API}/providers/related/${providerId}`,{
        method : "GET"
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}


export const getBraintreeClientToken = (userId, token) => {
    return fetch(`${API}/braintree/getToken/${userId}`,{
        method : "GET",
        headers : {
            Accept : 'application/json',
            "Content-Type" : "application/json",
            Authorization: `Bearer ${token}`
          
        },
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

export const processPayment = (userId, token,paymentData) => {
    return fetch(`${API}/braintree/payment/${userId}`,{
        method : "POST",
        headers : {
            Accept : 'application/json',
            "Content-Type" : "application/json",
            Authorization: `Bearer ${token}`
          
        },
        body:JSON.stringify(paymentData)
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}



export const createOrder = (userId, token,createOrderData) => {
    return fetch(`${API}/order/create/${userId}`,{
        method : "POST",
        headers : {
            Accept : 'application/json',
            "Content-Type" : "application/json",
            Authorization: `Bearer ${token}`
          
        },
        body:JSON.stringify({order:createOrderData})
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}