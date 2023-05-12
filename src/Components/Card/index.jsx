import { useContext } from 'react'
import { OrderContext } from '../../Context'
import BuildingStorefrontIcon from '@heroicons/react/24/outline/BuildingStorefrontIcon'


const Card = (data) => {
    //Order . count items
    const context = useContext(OrderContext)
    //funcion para agregar items a la orden
    const addItemsToOrder = (event, itemData) => {
        event.stopPropagation()
        context.setCount(context.count +1)
        context.setOrders([...context.ordersItems, itemData])
        context.openOrder()
    }
    //funcion para mostrar orden
    const showOrder = (orderDetail) => {
        context.openOrder()
        context.setOrders(orderDetail)
    }

    return(
        <div 
            className='grid place-items-start'
            onClick={() => context.openOrder()}>
         <div 
                className='bg-gradient-to-br from-sky-700 ... w-60 h-30 rounded-2xl'
                onClick={() => showOrder(data.data)}>
                <figure className='relative mb-3 w-auto'>
                   <div 
                        className='text-black text-lg font-bold absolute py-2 bottom-2 right-2 flex justify-center items-center bg-white w-8 h-8 p-1 rounded-full'
                        onClick={(event) => addItemsToOrder(event, data.data)}>
                        <BuildingStorefrontIcon></BuildingStorefrontIcon>
                    </div>
                    <h1 className='text-center py-2 text-3xl'>{data.data.nombre}</h1>
                    <h1 className='text-center py-2 text-2xl font-bold'>Gs.: {data.data.precio.toLocaleString()}</h1>
                </figure>
            </div>
        </div>
    )
}

export default Card