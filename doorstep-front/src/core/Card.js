import React, { Children, useState } from 'react';
import {Link, Redirect} from 'react-router-dom';
import "./Card.css"
import moment from 'moment';
import ShowImage from '../core/showImage' 
import {addItem,removeItem} from './cartHelpers'

const Card = ({provider,className,
    style,showViewProviderButton=true,
    showViewCartButton=true,
    showRemoveProviderButton=false,
    setRun = f => f, 
  run = undefined

}) => {


    const [redirect,setRedirect] = useState(false)

    
    const showViewButton = (showViewProviderButton) => { 
        return (
                    showViewProviderButton &&
                        (
                            <Link to={`/provider/${provider._id}`}>

                                <button className=" btn btn-primary mt-1 mb-1 bytn">
                                <p className="fooont">View</p>
                                </button>
                            </Link>

                        )
                )
    }

    const showViewCart = (showViewCartButton) => { 
        return (
            showViewCartButton && (
                // <Link to={`/provider/${provider._id}`}>

                <button onClick={addToCart} className="btn btn-warning mt-1 mb-1 bytn">
                            <p className="fooont f">Add to Cart</p>
                        </button>
                    // </Link>

            )
        )
    }

    const addToCart = () => {
        addItem(provider,() => {
                setRedirect(true)
        })
    }


    
    const showStock = (service_avail) => {
        return service_avail > 0 ?(<span className="badge badge-success badge-pill kk">Service Available</span> ):(
             <span className="badge badge-danger badge-pill kk">Home Service Not Available</span>)
    }


    
    const shouldRedirect = redirect => {
        if(redirect){
            return <Redirect to='/cart'/>
        }
    }
    


    const showRemoveButton = (showRemoveProviderButton) => { 
        return (
            showRemoveProviderButton && (
                // <Link to={`/provider/${provider._id}`}>

                <button onClick={()=>{removeItem(provider._id);setRun(!run)}} className="btn btn-danger mt-1 mb-1 bytn">
                            <p className="fooont ">Remove </p>
                        </button>
                    // </Link>

            )
        )
    }





   

    
    return (
        <div className={className}>
            
            <div className="Card box " style={style} >
             {/* <div className="card-header cardheadersd" >{provider.name}</div>  */}
                <div className="card-body">
                    {shouldRedirect(redirect)}
                    <div >
                    <ShowImage  item={provider} url="provider"/>
                    </div>
                    <h5 className='card-title'>{provider.name} </h5>

                    <p className='card-text'>{provider.description.substring(0,30)} </p>
                    <p className="card-text">Category : {provider.category && provider.category.name}</p>
                    <p className='blockquote-footer'>Registered On {moment(provider.createdAt).fromNow()} </p>

                 

                    {showStock(provider.service_avail)}
                    <br/>

                        {showViewButton(showViewProviderButton)}
                        {showViewCart(showViewCartButton)}
                        {showRemoveButton(showRemoveProviderButton)}
                </div>
            </div> 
         </div>
        
    )
}




export default Card;