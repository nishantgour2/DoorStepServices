// import { Fragment } from "react"
import React,{useState,useEffect,Fragment} from 'react'


const RadioBox = ({works,handleFilters}) => {
    const [value,setValue] = useState(0)


    const handleChange = (event) => {
        // 
        handleFilters(event.target.value)
        setValue(event.target.value);
    }


    return works.map((w,i) => (
        <div key={i} >
            <input onChange={handleChange} name={w} value={`${w._id}`} type='radio' className='mr-2 ml-4'/>
    <label className='form-check-label '>{w.name}</label>
        </div>
    ))

} 


export default RadioBox;