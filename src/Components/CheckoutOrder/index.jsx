import { useContext } from "react";
import {XMarkIcon} from '@heroicons/react/24/solid'
import { OrderContext } from "../../Context"
import {totalPrice} from '../../utils'
import OrderCard from "../OrderCard";
import './style.css'
import React, { useRef } from 'react';

const CheckoutOrder = () => {
    const context = useContext(OrderContext)
    const clienteRef = useRef(null)

    //funcion para elimitar items de Orders
    const handleDelete = (id) => {
        const filteredProducts = context.ordersItems.filter( product => product.id != id)
        context.setItems(filteredProducts)
    }

    const handleCheckout = async () => {
        const orderToAdd = {
            mesa: 4,
            lista_productos: context.ordersItems.map(product => ({
                id: product.id,
                nombre: product.nombre,
                precio: product.precio,
            })),
            cliente: clienteRef.current.value ? clienteRef.current.value : "Sin nombre",
            total: totalPrice(context.ordersItems)
        }
    
        try {
            const response = await fetch('http://localhost:8000/pedidos/', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${JSON.parse(window.localStorage.getItem('accessToken'))}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderToAdd),
            })
    
            if (response.ok) {
                // Clear the order items if the order is successfully saved
                context.setItems([])
                clienteRef.current.value =""
                context.closeOrder()
                context.openOrders()
            } else {
                throw new Error('Failed to save the order')
            }
        } catch (error) {
            console.log(error)
        }
    }
    
    return (
        <aside
            className={`${context.isOrderOpen ? 'flex' : 'hidden'} checkout-side-menu flex-col fixed right-0  m-1 borde rounded-lg`}>
            {/* cabecera de la orden */}
            <div className='flex justify-between items-center p-4'>
                <h2 className='font-medium text-xl'>Order</h2>
                <div>
                    <XMarkIcon
                        className='h6 w-6 cursor-pointer'
                        onClick={() => context.closeOrder()}
                    ></XMarkIcon>
                </div>
            </div>
            {/* Nombre del cliente */}
            <div>
            <input className='m-4 w-auto'
                aria-label="Cliente"
                placeholder="Ingrese nombre"
                id="cliente"
                type="text"
                ref={clienteRef}
                />
            </div>
            {/* Lista de Ordenes */}
            <div className='px-4 overflow-x-hidden flex-1'>
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
                <p className='flex justify-between text-xl font-extrabold p-4'>
                    <span>Total Gs.: </span>
                    <span>{totalPrice(context.ordersItems).toLocaleString('es-PY')} </span>
                </p>
                <button onClick={() => handleCheckout()}>Checkout</button>
            </div>
        </aside>
    )
}

export default CheckoutOrder