import React from 'react'
import {API} from '../config'

const ShowImage = ({item,url}) => (
<div className="product-img">
    <img src={`${API}/${url}/photo/${item._id}`} alt={item.name} className="mb-3 card-img-top" 
    style={{maxHeight:"100%",
    maxWidth:'100%',
    width:'420px',
    height:'200px',
    marginTop:'-2%'
    
    }} /> 
</div>
)


export default ShowImage