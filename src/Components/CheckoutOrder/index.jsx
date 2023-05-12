import { useContext } from "react";
import {XMarkIcon} from '@heroicons/react/24/solid'
import { OrderContext } from "../../Context"
import {totalPrice} from '../../utils'
import OrderCard from "../OrderCard";
import './style.css'

const CheckoutOrder = () => {
    const context = useContext(OrderContext)
    console.log('ORDER: ',context.ordersItems)

    //funcion para elimitar items de Orders
    const handleDelete = (id) => {
        const filteredProducts = context.ordersItems.filter( product => product.id != id)
        context.setOrders(filteredProducts)
    }

    return (
        <aside
            className={`${context.isOrderOpen ? 'flex' : 'hidden'} checkout-side-menu flex-col fixed mt-10 right-0 border-l-4 border-white rounded-2xl`}>
            {/* cabecera de la orden */}
            <div className='flex justify-between items-center p-6'>
                <h2 className='font-medium text-xl'>Orders</h2>
                <div>
                    <XMarkIcon
                        className='h6 w-6 cursor-pointer'
                        onClick={() => context.closeOrder()}
                    ></XMarkIcon>
                </div>
            </div>
            {/* Lista de Ordenes */}
            <div className='px-6 overflow-y-scroll'>
            {
                context.ordersItems.map(product => (
                    <OrderCard 
                        key={product.id}
                        id={product.id}
                        title={product.nombre}
                        price={product.precio}
                        handleDelete={handleDelete}
                    />
                ))
            }
            </div>
            {/* Precio Total */}
            <div className='px-6'>
                <p className='flex justify-between text-xl font-extrabold'>
                    <span>Total Gs.: </span>
                    <span>{totalPrice(context.ordersItems).toLocaleString('es-PY')} </span>
                </p>
            </div>
        </aside>
    )
}

export default CheckoutOrder