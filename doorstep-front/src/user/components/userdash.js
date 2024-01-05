// import React from 'react'
// import { isAuthenticated } from '../../auth/index'
// import '../components/dashboard.css'

// const {user:{_id,name,email,role}} = isAuthenticated()



// export const userLinks = () => {
//     return (
//         <div className="card">
//                 <h4 className="card-header ">User Settings</h4>
//                 <li className="list-group-item ">
//                     <Link className="nav-link hh" to="/cart">My Cart</Link>
//                 </li>
//                 <li className="list-group-item ">
//                 <Link className="nav-link hh" to="/profile/update">Edit Profile</Link>

//                 </li>
//         </div>
//     )
// }


// export const userInfo = () => {
//     return (
//         <div className='card mb-5'>
//             <h3 className='card-header'>User Information</h3>
//             <ul className='list-group'>
//                 {/* <li className="list-group-item">Name</li> */}
//                 <li className="list-group-item">Username :  {name}</li>
//                 <li className="list-group-item">Email : {email}</li>
//                 <li className="list-group-item">Pincode : 462023</li>
//                 <li className="list-group-item">Address : Highway Road, Mars</li>

//             <li className="list-group-item">Status : {role ===1 ? 'Admin' : 'Registered User'}</li>
//             </ul>
//         </div>
//     )
// }

//   export  const purchaseHistory = () => {
//         return (
//             <div className='card mb-5'>
//     <h3 className='card-header'>Service History</h3>

//     <ul className='list-group'>
//                 <li className="list-group-item">History</li>
               
//             </ul>
//     </div>
//         )
//     }