import React,{useState,useEffect} from 'react'
import { getCategories,list } from './apiCore';
import Layout from './Layout';
import Card from './Card';
// import CarouselPage from './cours'


const Search = () => {

    const [data,setData] = useState({
        categories : [],
        category : "",
        search : "",
        results:[],
        searched : false
    })

    const {categories,category,search,results,searched} =data

    const loadCategories = () => {
        getCategories().then(data => {
            if(data.error){
                console.log(data.error)
            }
            else{
                setData({...data,categories:data})
            }
        })
    }

    useEffect(() => {
        loadCategories()
    },[])

    const searchData = () => {
        // console.log(search,category)
        if(search){
            list({search: search || undefined, category: category})
            .then(response => {
                if(response.error){
                    console.log(response.error)
                }
                else{
                    setData({...data, results:response, searched:true})
                }
            })
        }
    }


    const searchSubmit = (e) => {
        // 
        e.preventDefault()
        searchData()
    }

    const handleChange = name => event => {
        // 
        setData({...data, [name]: event.target.value, searched: false})
    }

    const searchMessage = (searched,results) => {
        if(searched && results.length>0){
            return `Found ${results.length} Service Providers`
        }

        if(searched && results.length<1){
            return `No Service Providers Found`
        }
    } 

    const searchedProviders = (results = []) => {
        

        return (
            <div>

        <h4 className="mt-4 mb-4 text-secondary">{searchMessage(searched,results)}</h4>

            <div className="row">
                    {results.map((provider,i) => (
                        <Card key={i} provider={provider} className="jagahcard"/>
                    ))}
            </div>

            </div>
        )
    }



    const searchForm = () => (
        <form onSubmit={searchSubmit}  >
            <span className="input-group-text bg-warning">
            <div className="input-group-prepend">
                <select className="btn mr-2 text-dark" onChange={handleChange("category")}>
                    <option value="All">All</option>
    {categories.map((c,i) => (<option key={i} value={c._id}>{c.name}</option> ))}
                </select>
            </div>

            <div className="input-group input-group-lg">
            <input type="search" className="form-control" onChange={handleChange('search')} placeholder="Search..."/> 
            </div>
                    <div className="btn input-group-append" style={{border:'none'}}>
                        <button className="input-group-text bg-muted">Search</button>
                    </div>
            </span>
        </form>
    )

    return (
        <div className="row">
            <div className="container mb-3 mt-4">
                {searchForm()}
                {/* {JSON.stringify(results)} */}
            </div>
            <div className="container-fluid mb-3 mt-4">
                {searchedProviders(results)}
            </div>
        </div>
    )
}


export default Search