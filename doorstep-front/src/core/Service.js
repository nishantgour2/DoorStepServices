import React,{useState,useEffect} from 'react'
import { getProvider } from './apiCore';
import Layout from './Layout';
import Card from './Card';
import {getCategories,getFilteredProviders } from './apiCore'
import CheckBox from './CheckBox'
import {works} from './Totalwork'
import RadioBox from './RadioBox'
import "./Card.css"

const Service = () => {

    const[myFilters,setMyFilters]=useState({
        filters:{categories:[],worked:[]}
    })

    const [categories,setCategories] = useState([])
    const [error,setError] = useState(false)
    const [limit,setLimit] = useState(6)
    const [skip,setSkip] = useState(0)
    const [size,setSize] = useState(0)

    const [filteredResults,setFilteredResults] = useState([])



    const init = () => {
        getCategories().then(data => {
            if(data.error){
                setError(data.error)
            }
            else{
                setCategories(data)
            }
        })
    }

    const loadFilteredResults = newFilters => {
        getFilteredProviders(skip,limit,newFilters).then(data => {
            if(data.error){
                setError(data.error)
            }else{
                    setFilteredResults(data.data)
                    setSize(data.size)
                    setSkip(0)
            }
        })
    }

    const loadMore = () => {

        let toSkip = skip + limit

        getFilteredProviders(toSkip,limit,myFilters.filters).then(data => {
            if(data.error){
                setError(data.error)
            }else{
                    setFilteredResults([...filteredResults,...data.data])
                    setSize(data.size)
                    setSkip(toSkip)
            }
        })
    }

    const loadMoreButton = () => {
        return(
            size > 0 && size >= limit && (
                <button onClick={loadMore} className="btn btn-success mb-5">Load More</button>
            )
        )
    }

    useEffect(() => {
        init()
        loadFilteredResults(skip,limit,myFilters.filters)
    },[])


    const handleFilters = (filters,filterBy) => {
        const newFilters = {...myFilters}
        newFilters.filters[filterBy]= filters

        if(filterBy == 'worked'){
            let priceValues = handleWork(filters)
            newFilters.filters[filterBy]=priceValues
        }
        loadFilteredResults(myFilters.filters)
        setMyFilters(newFilters)
    } 

    const handleWork = value => {
        const data = works
        let array =[]

        for (let key in data){
            if(data[key]._id === parseInt(value)){
                array = data[key].array
            }
        }
        return array;
    }


    


    return (
        <div className="container-fluid mt-3">
            <hr/>
            <div className="row ">
                <div className="col-4 ">
                    <h4 className="leftsideq">Filter By Category</h4>
                    <ul>
                    <CheckBox className="leftsideq" categories={categories}  handleFilters={filters => handleFilters(filters,"category")}/>
                    </ul>
                    <hr></hr>
                        <h4 className="leftsideq">Filter By Work</h4>
                    <div className="leftsideq">
                    <RadioBox  works={works}  handleFilters={filters => handleFilters(filters,"worked")}/>
                    </div>
                {/* {JSON.stringify(categories)} */}
                </div>   

                <div className="col-8">
             
                <h2 className="mb-4 foont">Service Providers</h2>
                <div className="row">
                    {filteredResults.map((provider,i) => (
                      
                        <Card key={i} provider={provider} className='col-4 '/> 
                        
                    ))}
                    
                </div>
                <hr/>
                            {loadMoreButton()}
                
                </div>
            </div>
        </div>
    )
}



export default Service;