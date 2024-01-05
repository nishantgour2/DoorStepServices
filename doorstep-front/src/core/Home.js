import React,{useState,useEffect} from 'react'
import { getProvider } from './apiCore';
import Layout from './Layout';
import Card from './Card';
import CarouselPage from './cours'
import Search from './Search'
const Home = () => {

    const [providerByWork,setProviderByWork] = useState([])
    const [providerByArrival,setProviderByArrival] = useState([])
    const [error,setError] = useState(false)

    const loadProviderByWorked = () => {
        getProvider('worked').then(data => {
            if(data.error){
                setError(data.error)
            }
            else{
                setProviderByWork(data)
            }
        })
    }

    const loadProviderByArrival = () => {
        getProvider('createdAt').then(data => {
            if(data.error){
                setError(data.error)
            }
            else{
                setProviderByArrival(data)
            }
        })
    }

    useEffect(() => {
        loadProviderByArrival();
        loadProviderByWorked();
    },[])


   return ( 

    <div className="backhome">
        <div ><CarouselPage/></div>
        
   <div className="container-fluid">
       <Search/>
       <hr/>
      <h2 className="mb-4 best_service">Best Service Provider</h2>
      <div className="row">
      {/* <div className="col-4 "> */}
        
      {providerByWork.map((provider,i) => (<Card className="cardkijagah" key={i} provider={provider} className="col-3  mb-3" />) )}
      {/* </div> */}
      </div>
        <hr/>
      <h2 className="mb-4 best_service">New Opening</h2>
      <div className="row"> 

      {/* <div className="col-3  "> */}
      {providerByArrival.map((provider,i) => (<Card key={i} provider={provider}  className="col-3 mb-3" />) )}
      {/* </div> */}

      </div>
    </div> 

    </div>

)
}


export default Home;