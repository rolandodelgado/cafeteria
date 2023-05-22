import { createContext, useState } from 'react'

export const OrderContext = createContext()

export const OrderProvider = ({children}) => {
    //Home . user
    const [usuario, setUsuario] = useState()

    //Order . Add items to order
    const [ordersItems, setItems] = useState([])

    //kitchen cards . Add products
    const [products, setProducts] = useState([])

    //Orders . Add order to orders    
    const [orders, setOrders] = useState([])

    // Open and Close Order
    const [isOrderOpen, setIsOrderOpen] = useState(false)
    const openOrder = () => setIsOrderOpen(true)
    const closeOrder = () => setIsOrderOpen(false)

    // Open and Close Orders
    const [isOrdersOpen, setIsOrdersOpen] = useState(false)
    const openOrders = () => setIsOrdersOpen(true)
    const closeOrders = () => setIsOrdersOpen(false)

    // Tiempo transcurrido
    const [tiempo, setTiempo] = useState()

    // Número de Mesa
    const [mesa, setMesa] = useState()
    return(
        <OrderContext.Provider value={{
            usuario,
            setUsuario,
            openOrder,
            closeOrder,
            isOrderOpen,
            openOrders,
            closeOrders,
            isOrdersOpen,
            ordersItems,
            setItems,
            orders,
            setOrders,
            tiempo,
            setTiempo,
            mesa,
            setMesa,
            products,
            setProducts
        }}>
            {children}
        </OrderContext.Provider>
    )
}