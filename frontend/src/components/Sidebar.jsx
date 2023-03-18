import React from 'react';
import { Link } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';
import '../sidebar.css'
import useUserContext from '../hooks/useUserContext';

const Sidebar = props => {
    const { user, dispatch} = useUserContext()


    function handleClick(e) {
      e.preventDefault()
      dispatch({type: 'LOGOUT'})
      localStorage.removeItem('user')
      localStorage.removeItem('cart')
    }
  return (
    <Menu right className="resp-nav">
      {/* <a className="menu-item" href="/">
        Home
      </a>
      <a className="menu-item" href="/salads">
        Salads
      </a>
      <a className="menu-item" href="/pizzas">
        Pizzas
      </a>
      <a className="menu-item" href="/desserts">
        Desserts
      </a> */}
        {(!user)
        && (
        <>
          <Link to="/login" className="menu-item">Login</Link>
          <Link to="/register" className="menu-item">Register</Link>
        </>
        )}
        {(user && (user.type === "Farmer")) && 
        (<>
        <Link to="/truck" className="menu-item">Truck Management</Link>
        <Link to='/farmersub' className="menu-item">Pricing</Link>
        </>)
        }

        {(user && (user.type === "TruckDriver")) && 
        (<>
        <Link to="/truckForm" className="menu-item">Truck Enrollment</Link>
        </>)
        }

        {(user && (user.type === "Buyer")) && 
        (
        <Link to="/trackorder" className="menu-item">Track Order</Link>
        )}

        <Link to="/shop" className="menu-item">Shop</Link>
        {/* <input type='text' placeholder='Search' className='search-box'/> */}
        

        {(user && (user.type === "Buyer")) && 
        ( <>
          <Link to="/cart" className="menu-item"><i class="fa-solid fa-cart-shopping"></i></Link>
          <Link to='/buyersub' className="menu-item">Pricing</Link>
          </>
        )}
        {(user)
        && (
        <>
          {/* <div>{user.email}</div> */}
          <button type="submit" className="logout-btn" onClick={handleClick}>Logout</button>
        </>
        )}
    </Menu>
  );
};

export default Sidebar