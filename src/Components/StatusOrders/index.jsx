import { useState, useEffect, useContext } from 'react'
import { OrderContext } from "../../Context"
import {XMarkIcon} from '@heroicons/react/24/solid'
import OrdersCard from '../../Components/OrdersCard'
import './style.css'

const StatusOrders = () => {
    const context = useContext(OrderContext)
    const [orders, setOrders] = useState(null)
    
    useEffect(() => {
        fetch('http://localhost:8000/pedidos/', {
          method: 'GET' /* or POST/PUT/PATCH/DELETE */,
          headers: {
            Authorization: `Bearer ${JSON.parse(window.localStorage.getItem('accessToken'))}`,
            'Content-Type': 'application/json',
          },
        })
        .then((res) => res.json())
        .then((ordersData) => {
          // Filtrar los pedidos con estado diferente a 'Finalizado'
          const filteredOrdersData = ordersData.filter(
            (pedido) => pedido.estado !== 'Finalizado'
          );
    
          setOrders(filteredOrdersData);
        });
      }, [orders]) //orders como dependencia para renderizar cuando hay cambios
  
    return (
        <aside
        // className='flex checkout-side-menu flex-col fixed left-0  m-1 borde rounded-lg'>
        className={`${context.isOrdersOpen ? 'flex' : 'hidden'} checkout-side-menu flex-col fixed left-0  m-1 borde rounded-lg`}>
            {/* cabecera de la orden */}
            <div className='flex justify-between items-center p-4'>
                <h2 className='font-medium text-xl'>Orders</h2>
                <div>
                    <XMarkIcon
                        className='h6 w-6 cursor-pointer'
                        onClick={() => context.closeOrders()}
                    ></XMarkIcon>
                </div>
            </div>
            {/* lista de ordenes */}
            <div className='px-4 overflow-x-hidden flex-1 right-0'>
              {orders?.filter(order => order.estado !== 'Finalizado').map(order => (
              <OrdersCard 
                key={order.id}
                id={order.id}
                customer={order.cliente}
                table={order.mesa}
                status={order.estado} />
              ))}
            </div>
        </aside>
    )
}

export default StatusOrders