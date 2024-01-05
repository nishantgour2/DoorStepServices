import React,{useState,useEffect} from 'react'
import { getProvider
    ,getBraintreeClientToken
    ,processPayment,
    createOrder

} from './apiCore';
import {emptyCart} from './cartHelpers'
import Layout from './Layout';
import Card from './Card';
import {isAuthenticated} from '../auth/index'
import {Link} from 'react-router-dom'
import DropIn from 'braintree-web-drop-in-react'

const Booking = ({providers}) => {

    const [data,setData] = useState({
        success: false,
        clientToken: null,
        error: '',
        instance: {},
        address: ''
    })

        const userId = isAuthenticated() && isAuthenticated().user._id
        const token = isAuthenticated() && isAuthenticated().token

        const getToken = (userId,token) => {
                getBraintreeClientToken(userId,token).then(data => {
                    if (data.error){
                        setData({...data,error: data.error})
                    } else{
                        setData({...data,clientToken:data.clientToken})
                    }
                })
        }

        useEffect(() => {
            getToken(userId,token)
        },[])

const handleAddress = event => {
    setData({...data,address: event.target.value})
}


    const getTotal = () => {
        return providers.reduce((currentValue,nextValue) => {
            return currentValue + nextValue.count * 30
        },0 )
    }

const showCheckout = () => {
   return isAuthenticated() ? (
   <div >{showDropIn()}</div>
    ) : (
        <Link to="/signin">
        <button className='btn btn-primary'>Signin To Book</button>
        </Link>
    ) 
}

let deliveryAddress = data.address

const boooki = () => {
    // send the nonce to your answer
    // nonce = data.instance.requestPaymentMethod()
    let nonce;
    let getNonce = data.instance.requestPaymentMethod()
    .then(data => {
        // console.log(data)    
        nonce = data.nonce
        // once you have nonce (card type, card number) send nonce as 'paymentMethodNonce
        // and also total to be charged
        // console.log('send nonce and total to process: ',nonce,getTotal(providers))

        const paymentData = {
            paymentMethodNonce: nonce,
            amount: getTotal(providers)
        }

        processPayment(userId,token,paymentData)
        .then(response => {

            const createOrderData = {
                providers : providers,
                transaction_id: response.transaction_id,
                amount: response.transaction.amount,
                address: deliveryAddress

            }
        createOrder(userId,token,createOrderData)

        setData({...data,success:response.success})
        emptyCart(() => {
            console.log('payment success and empty cart')
            setData({loading : false,success:true})
        })

        })
        .catch(error => console.log(error))
  
    })

    .catch(error => {
        // console.log('dropin error: ',error)
        // setData({...data,error:error.message})
        setData({loading:false})

    })

}

    const showDropIn = () => (
        <div onBlur={() => setData({...data,error: ""})}>
            {data.clientToken !=null && providers.length>0 ? (
                <div>
                    <div>
                        <label className='gorm-group mb-3'>Home Address:</label>
                        <textarea onChange={handleAddress}
                        className="form-control"
                        value={data.address}
                        placeholder='Type Your Confirm & Exact Home address......'
                        />
                                               </div>
                    <DropIn options={{
                        authorization: data.clientToken,
                        googlePay:{
                            flow:"vault"
                        },paypal:{
                            flow:"vault"
                        }
                    }}  onInstance={instance => (data.instance = instance)}/>
                        <button onClick={boooki} className='btn btn-success'>Pay</button>
                </div>
            ) : null }
        </div>
    )

    const showError = error => (
    <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>{error}</div>
    )

    const showSuccess = success => (
        <div className="alert alert-info" style={{display: success ? '' : 'none'}}>Thanks! Payment Successful!</div>
        )

    return <div>
        <h2> : ₹{getTotal()}</h2>
        {showError(data.error)}
        {showSuccess(data.success)}

        {showCheckout()}
        

        </div>

}


export default Booking