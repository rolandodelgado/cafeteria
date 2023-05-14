import { useContext } from 'react'
import { OrderContext } from '../../Context'
import {PlusIcon} from '@heroicons/react/24/outline'

const Card = (data) => {
    //Order . count items
    const context = useContext(OrderContext)
    //funcion para agregar items a la orden
    const addItemsToOrder = (event, itemData) => {
        event.stopPropagation()
        //context.setCount(context.count +1)
        context.setItems([...context.ordersItems, itemData])
        context.openOrder()
    }
    //funcion para mostrar orden
    const showOrder = (orderDetail) => {
        context.openOrder()
        //context.setItems(orderDetail)
    }

    return(
        <div 
            className='bg-gradient-to-br from-sky-700 ...  cursor-pointer w-36 h-32 rounded-2xl'
            // onClick={() => context.openOrder()}
            >
            <div 
                className='relative mb-2 w-full h-4/5'
                onClick={() => showOrder(data.data)}>
                <div 
                    className='absolute top-0 right-0 justify-center items-center text-black  bg-white w-6 h-6 rounded-full m-2 p-1'
                        onClick={(event) => addItemsToOrder(event, data.data)}>
                        <PlusIcon></PlusIcon>
                    </div>
                <div className='text-lg text-transparent'>A</div>
                <div><p className='relative text-lg font-semibold'>{data.data.nombre}</p></div>
                <div><p className='absolute bottom-0 text-xl font-bold right-2'>Gs.: {data.data.precio.toLocaleString()}</p></div>                    
            </div>
        </div>
    )
}

export default Card