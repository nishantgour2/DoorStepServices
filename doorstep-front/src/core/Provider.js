import React,{useState,useEffect} from 'react'
import { read,listRelated } from './apiCore';
import Layout from './Layout';
import Card from './Card';
import CarouselPage from './cours'



const Provider = (props) => {

    const [provider,setProvider] = useState({})
    const [relatedProvider,setRelatedProvider] = useState([])

    const [error,setError] = useState(false)

    const loadSingleProvider = providerId => {
        read(providerId).then(data => {
            if(data.error) {
                setError(data.error)
            }
            else{
                setProvider(data)
                // fetch related provider
                listRelated(data._id).then(data => {
                    if(data.error){
                        setError(data.error)
                    }
                    else{
                            setRelatedProvider(data)
                    }
                })
            }
        })
    }

    useEffect(() => {
        const providerId = props.match.params.providerId
        loadSingleProvider(providerId)
    },[props])


    return (
      <Layout title={provider && provider.name}  
      description={
          provider && provider.description && provider.description.substring(0,50) 
      } className="container-fluid"
      > 
          <h5 className="text-dark"> &nbsp; &nbsp;&nbsp;View Service Provider</h5>
          <div className="row">
              <div className="col-8">
            {provider && provider.description && <Card provider={provider} showViewProviderButton={false} style={{width:'900px'}} />}
          </div>

        <div className="col-4">
            <h4>Suggestions!</h4>
            {relatedProvider.map((p,i) => (
                <div className="mb-3">
                        <Card key={i} provider={p}/>
                </div>  
            ) )}
        </div>

          </div>
      </Layout>
    )
}



export default Provider