import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import { getCart,removeItem } from './cartHelpers';
import Layout from './Layout';
import Card from './Card';
import Booking from './Booking'



const Cart = () => {

    const [items,setItems] = useState([])
    const [run, setRun] = useState(false);

    useEffect(() => {
        console.log('MAX DEPTH ...');
        setItems(getCart());
      }, [run]);
     

    const showItems = items => {
        return (
            <div>
                <h4 className="text-muted">
                    You Added {`${items.length}`} Service Provider For Booking
                </h4>
                <hr/>
                {items.map((provider,i)=> (<Card key={i}
                 provider={provider} 
                 showViewCartButton={false} 
                 showRemoveProviderButton={true}
                 setRun={setRun}
            run={run}
                  />))}
            </div>
        )
    }

    const noItemsMessage = () => (
        <h2>Your Cart is empty. <br/><Link to="/shop">Please Add to service Cart</Link></h2>
    )


    return ( 

        <Layout title="Booking Cart" 
      description="Manage Your Service Cart | Request For Service " className="container-fluid"
      > 

            <div className="row">
                <div className="col-6">
                    {items.length > 0 ? showItems(items) : noItemsMessage()}
                </div>
                <div className="col-6">
                    <h3>Your Request Summary</h3>
                    <hr/>
                    <Booking providers={items}/>
                </div>
            </div>

      </Layout>
    
    )

}



export default Cart