import { Link } from 'react-router-dom';
import React from 'react';
import useUserContext from '../hooks/useUserContext';
import Sidebar from './Sidebar';
function Navbar() {
  const { user, dispatch} = useUserContext()


  function handleClick(e) {
    e.preventDefault()
    dispatch({type: 'LOGOUT'})
    localStorage.removeItem('user')
    localStorage.removeItem('cart')
  }

  return (
    <div className="navbar">
      
      <Link to="/"><i class="fa-2x fa-solid fa-seedling"></i><h1 style={{display: 'inline', margin: '.3em'}}>Kisaan Link</h1></Link>
      <nav>
        {(!user)
        && (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
        )}
        {(user && (user.type === "Farmer")) && 
        (<>
        <Link to="/truck">Truck Management</Link>
        <Link to='/farmersub'>Pricing</Link>
        </>)
        }

        {(user && (user.type === "TruckDriver")) && 
        (<>
        <Link to="/truckForm">Truck Enrollment</Link>
        </>)
        }

        {(user && (user.type === "Buyer")) && 
        (
        <Link to="/trackorder">Track Order</Link>
        )}

        <Link to="/shop">Shop</Link>
        {/* <input type='text' placeholder='Search' className='search-box'/> */}
        

        {(user && (user.type === "Buyer")) && 
        ( <>
          <Link to="/cart"><i class="fa-solid fa-cart-shopping"></i></Link>
          <Link to='/buyersub'>Pricing</Link>
          </>
        )}
        {(user)
        && (
        <>
          {/* <div>{user.email}</div> */}
          <button type="submit" className="logout-btn" onClick={handleClick}>Logout</button>
        </>
        )}
      </nav>
      <Sidebar />

    </div>
  );
}

export default Navbar;
