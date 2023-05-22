import {CheckIcon} from '@heroicons/react/24/solid'
import { useCallback } from 'react'

const OrdersCard = props => {
    const {id, customer, table, status} = props
    
    const handleClick = useCallback(async () => {
        try {
            const response = await fetch(`http://localhost:8000/pedidos/${id}/`, {
              method: 'PATCH',
              headers: {
                Authorization: `Bearer ${JSON.parse(window.localStorage.getItem('accessToken'))}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                estado: 'Finalizado',
              })
            });
            const json = await response.json();
            console.log(json);            
          } catch (error) {
            console.error(error);
          }
        }, [id]);

    return(
        <div 
            className='flex justify-end items-center bg-gradient-to-r from-slate-800 ... rounded-xl m-1 pl-2'>
            
            <div className='flex items-center w-50 h-30 rounded-lg'>
                <p>{customer}: {table} - {status} </p>
            </div>
            <div>
            <CheckIcon 
                className='h-6 w-6 ml-1 cursor-pointer'
                onClick={() => handleClick(id)}/>
            </div>
        </div>
    )
}

export default OrdersCard