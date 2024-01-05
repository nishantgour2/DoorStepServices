import {API} from "../config"


export const createCategory = (userId, token, category) => {
    // console.log(name,email,password)  
    console.log(typeof category.name)
    category.name = category.name.toLowerCase()
    return fetch(`${API}/category/create/${userId}`,{
        method : "POST",
        headers : {
            Accept : 'application/json',
            "Content-Type" : "application/json",
            Authorization : `Bearer ${token}`
        },
        body : JSON.stringify(category)
    })

            .then(response => {
                return response.json()
            })
            .catch(err => {
                console.log(err)
                
            })
}


// ----------------------------------------------------------------

export const createProvider = (userId, token, provider) => {
    // console.log(name,email,password)  
    // console.log(typeof category.name)
    // category.name = category.name.toLowerCase()
    return fetch(`${API}/provider/create/${userId}`,{
        method : "POST",
        headers : {
            Accept : 'application/json',
            Authorization : `Bearer ${token}`
        },
        body : provider
    })

            .then(response => {
                return response.json()
            })
            .catch(err => {
                console.log(err)
                
            })
}


export const getCategories = () => {
    return fetch (`${API}/categories`,{
        method : "GET"
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}




export const listOrders = (userId, token) => {
    return fetch (`${API}/order/list/${userId}`,{
        method : "GET",
        headers : {
            Accept : 'application/json',
            Authorization : `Bearer ${token}`
        }  
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}


export const getStatusValues = (userId, token) => {
    return fetch (`${API}/order/status-values/${userId}`,{
        method : "GET",
        headers : {
            Accept : 'application/json',
            Authorization : `Bearer ${token}`
        }  
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}



    export const updateOrderStatus = (userId, token,orderId,status) => {
        return fetch (`${API}/order/${orderId}/status/${userId}`,{
            method : "PUT",
            headers : {
                Accept : 'application/json',
                "Content-Type":'application/json',
                Authorization : `Bearer ${token}`
            }  ,
            body:JSON.stringify({status,orderId})
        })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err))
    };


    export const getProviders = () => {
        return fetch (`${API}/providers?limit=100`,{
            method : "GET"
        })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
    }
    

    export const deleteProvider = (providerId,userId ,token) => {
        return fetch (`${API}/provider/${providerId}/${userId}`,{
            method : "DELETE",
            headers : {
                Accept : 'application/json',
                "Content-Type":'application/json',
                Authorization : `Bearer ${token}`
            }  
            
        })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err))
    };


    export const getProvider = (providerId) => {
        return fetch (`${API}/provider/${providerId}`,{
            method : "GET"
        })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
    }

    export const updateProvider = (providerId,userId ,token,provider) => {
        return fetch (`${API}/provider/${providerId}/status/${userId}`,{
            method : "PUT",
            headers : {
                Accept : 'application/json',
                Authorization : `Bearer ${token}`
            },
            body:provider  
            
        })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err))
    };