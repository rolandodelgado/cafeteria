import { useState, useEffect, useContext } from 'react'
import { OrderContext } from '../../Context'

const Navbar = ({onLogout, userId}) => {
    const [user, setUser] = useState()

    const context = useContext(OrderContext)

    const activeStyle =  'bg-red-500'
    
    const showOrder = () => {
        context.openOrder()
    }
    
    const showOrders = () => {
        context.openOrders()
    }
    
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
        <>
        <nav className='nav-top flex justify-between item-center z10 top-0 w-full py-5 px-20 text-sm font-light'>
            <ul className='flex items-center gap-4'>
                <li className='text-center'>
                    <div className='flex justify-center gap-1'>
                        <h4 className="font-sans italic text-2xl">It's</h4>
                        <h4 className="font-extrabold text-2xl">Coffee Time</h4>
                    </div>
                </li>
            </ul>
            <ul className='flex items-center gap-0'>
                { user && user.group_name === 'cocinero' ? null :
                <>
                    <li 
                        className='text-center block border border-transparent  rounded py-2 px-4 hover:bg-blue-700'
                        onClick={() => showOrder()}>
                            <h4>Order</h4>                    
                    </li>
                    <li className='text-center block border border-transparent rounded py-2 px-4 hover:bg-blue-700'
                        onClick={() => showOrders()}>
                            <h4>Orders</h4>              
                    </li>
                </>}
                {user  && (
                <li className="text-end right-0 text-lg font-light">
                    <h4>
                        Hola, {user.first_name}.
                    </h4>
                </li>
                )}
                <li className='text-center text-lg font-light rounded text-blue-500 py-2 px-0'>
                        <button onClick={logoutHandler}>Logout</button>
                </li>
            </ul>
        </nav>
        </>
    )
}

export default Navbar