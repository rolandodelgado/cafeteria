import { useState, useEffect, useContext } from 'react'
import { NavLink } from "react-router-dom"

const Navbar = ({onLogout, userId}) => {
    const [user, setUser] = useState()

    const activeStyle =  'text-center block border border-blue-500 rounded py-2 px-4 bg-blue-500 hover:bg-blue-700'
    
    const logoutHandler = () => {
        onLogout()
      }
    
      useEffect(() => {
          fetch('http://localhost:8000/users/' + userId, {
            method: 'GET' /* or POST/PUT/PATCH/DELETE */,
            headers: {
              Authorization: `Bearer ${JSON.parse(window.localStorage.getItem('accessToken'))}`,
              'Content-Type': 'application/json',
            },
          })
            .then((res) => res.json())
            .then((userData) => {
              setUser(userData)
            })
        }, [])

    return (
        <nav className='flex justify-between item-center z10 top-0 w-full py-5 px-8 text-sm font-light'>
            <ul className='flex items-center gap-4'>
                <li className='text-center rounded text-blue-500 py-2 px-4'>
                    <NavLink to='/'>
                        <h4 className="font-bold text-xl">Coffee Time</h4>
                    </NavLink>                    
                </li>
            </ul>
            <ul className='flex items-center gap-4'>
                <li className='text-center rounded text-blue-500 py-2 px-4'>
                    <NavLink to='/orders'
                    className={({isActive}) =>
                        isActive ? activeStyle : undefined
                    }>
                        <h4>Orders</h4>
                    </NavLink>                    
                </li>
                {user  && (
                <li className="text-center rounded text-blue-500 py-2 px-4">
                    <h4>
                        Hola, {user.first_name}
                    </h4>
                </li>
                )}
                <li className='text-center rounded text-blue-500 py-2 px-4'>
                        <button onClick={logoutHandler}>Logout</button>
                </li>
            </ul>
        </nav>
        
    )
}

export default Navbar