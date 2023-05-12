import {XMarkIcon} from '@heroicons/react/24/solid'

const OrderCard = props => {
    const {id,title, price, handleDelete} = props
    return(
        <div 
            className='flex justify-between items-center'>
                <div className='flex items-center w-50 h-30 rounded-lg bg-gradient-to-br from-slate-500 to ...'>
                    <p className='text-sm font-light'>{title}</p>
                </div>
                <div className='flex items-center gap-2'>
                    <p className='text-lg font-medium'>{price.toLocaleString()}</p>
                   <XMarkIcon 
                        className='h-6 w-6 cursor-pointer'
                        onClick={() => handleDelete(id)}/>
                </div>
        </div>
    )
}

export default OrderCard