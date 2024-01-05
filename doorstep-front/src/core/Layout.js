import React from 'react'
import './Menu.css'
import './layout.css'
const Layout = ({title="Title",description="description",

className,children}) => (
       <div >
        
            <div className='jumbotron  hu'>
                <h2>
                    {title}
                </h2>

                <p className="lead">{description}</p>

            </div>
            <div className={className}>
                {children}
            </div>
       
        </div>
        
)



export default Layout;