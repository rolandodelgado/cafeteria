import { NavLink } from "react-router-dom"

const Navbar = () => {
    const activeStyle =  'text-center block border border-blue-500 rounded py-2 px-4 bg-blue-500 hover:bg-blue-700'
    return (
        <nav className='flex justify-between item-center z10 top-0 w-full py-5 px-8 text-sm font-light'>
            <ul className='flex items-center gap-4'>
                <li className='font-semibold'>
                        <h2>Coffee Time</h2>          
                </li>
                <li className='text-center rounded text-blue-500 py-2 px-4'>
                    <NavLink to='/products'
                    className={({isActive}) =>
                        isActive ? activeStyle : undefined
                    }>
                        <h4>Menu</h4>
                    </NavLink>                    
                </li>
                <li className='text-center rounded text-blue-500 py-2 px-4'>
                    <NavLink to='/coffess'
                    className={({isActive}) =>
                        isActive ? activeStyle : undefined
                    }>
                        <h4>Coffees</h4>
                    </NavLink>                    
                </li>
                <li className='text-center rounded text-blue-500 py-2 px-4'>
                    <NavLink to='/drinks'
                    className={({isActive}) =>
                        isActive ? activeStyle : undefined
                    }>
                        <h4>Drinks</h4>
                    </NavLink>                    
                </li>
                <li className='text-center rounded text-blue-500 py-2 px-4'>
                    <NavLink to='/sandwiches'
                    className={({isActive}) =>
                        isActive ? activeStyle : undefined
                    }>
                        <h4>Sandwiches</h4>
                    </NavLink>                    
                </li>
                <li className='text-center rounded text-blue-500 py-2 px-4'>
                    <NavLink to='/bakery'
                    className={({isActive}) =>
                        isActive ? activeStyle : undefined
                    }>
                        <h4>Bakery</h4>
                    </NavLink>                    
                </li>
            </ul>
            <ul className='flex items-center gap-4'>
                <li className='text-center rounded text-blue-500 py-2 px-4'>
                    <NavLink to='/order'
                    className={({isActive}) =>
                        isActive ? activeStyle : undefined
                    }>
                        <h2>Order</h2>
                    </NavLink>                    
                </li>
                <li className='text-center rounded text-blue-500 py-2 px-4'>
                    <NavLink to='/orders'
                    className={({isActive}) =>
                        isActive ? activeStyle : undefined
                    }>
                        <h4>orders</h4>
                    </NavLink>                    
                </li>
                <li className='text-black/60'>
                    <NavLink to='/mailito'
                    className={({isActive}) =>
                        isActive ? activeStyle : undefined
                    }>
                        <h2>correo@coffeetime.com</h2>
                    </NavLink>                    
                </li>
                <li className='text-center rounded text-blue-500 py-2 px-4'>
                    <h4>Nombre</h4>                    
                </li>
                <li className='text-center rounded text-blue-500 py-2 px-4'>
                    <NavLink to='/'
                    className={({isActive}) =>
                        isActive ? activeStyle : undefined
                    }>
                        <h4>LogOut</h4>
                    </NavLink>                    
                </li>
            </ul>
        </nav>
        
    )
}

export default Navbar