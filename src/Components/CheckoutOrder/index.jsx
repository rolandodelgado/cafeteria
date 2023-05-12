import { useContext } from "react";
import {XMarkIcon} from '@heroicons/react/24/solid'
import { OrderContext } from "../../Context";
import './style.css'

const CheckoutOrder = () => {
    const context = useContext(OrderContext)

    return (
        <aside
            className={`${context.isOrderOpen ? 'flex' : 'hidden'} checkout-side-menu flex-col fixed mt-10 right-0 border-l-4 border-white rounded-2xl`}>
            <div className='flex justify-between items-center p-6'>
                <h2 className='font-medium text-xl'>Orders</h2>
                <div>
                    <XMarkIcon
                        className='h6 w-6 cursor-pointer'
                        onClick={() => context.closeOrder()}
                    ></XMarkIcon>
                </div>
            </div>  
            </aside>
    )
}

export default CheckoutOrder