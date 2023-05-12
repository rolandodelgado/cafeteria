import { createContext, useState } from 'react'

export const OrderContext = createContext()

export const OrderProvider = ({children}) => {
    //Order . count items
    const [count, setCount] = useState(0)

    //Orders . Add items
    const [ordersItems, setOrders] = useState([])

    // Open and Close
    const [isOrderOpen, setIsOrderOpen] = useState(false)
    const openOrder = () => setIsOrderOpen(true)
    const closeOrder = () => setIsOrderOpen(false)

    //console.log('COUNT: ', count)
    console.log(ordersItems)
    return(
        <OrderContext.Provider value={{
            count,
            setCount,
            openOrder,
            closeOrder,
            isOrderOpen,
            ordersItems,
            setOrders
        }}>
            {children}
        </OrderContext.Provider>
    )
}