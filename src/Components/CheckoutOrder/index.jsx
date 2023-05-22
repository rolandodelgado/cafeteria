import { useContext, useState } from "react";
import {XMarkIcon} from '@heroicons/react/24/solid'
import { OrderContext } from "../../Context"
import { totalPrice} from '../../utils'
import OrderCard from "../OrderCard";
import './style.css'
import React, { useRef } from 'react';

const CheckoutOrder = () => {
    const context = useContext(OrderContext)
    const clienteRef = useRef(null)
    const mesaRef = useRef(null)
    const [selectedValue, setSelectedValue] = useState("1");

    //funcion para elimitar items de Orders
    const handleDelete = (id) => {
        const filteredProducts = context.ordersItems.filter( product => product.id != id)
        context.setItems(filteredProducts)
    }

    const handleCheckout = async () => {
        const orderToAdd = {
            mesa: mesaRef.current.value ? mesaRef.current.value : 1,
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
                // context.closeOrder()
                // context.openOrders()
            } else {
                console.log(orderToAdd);
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
            <div className='flex justify-between items-center p-4' >
                <input className='w-40'
                    aria-label="Cliente"
                    placeholder="Ingrese nombre"
                    id="cliente"
                    type="text"
                    ref={clienteRef}
                    />
                <select className='w-10 h-9 border-transparent rounded-lg text-black bg-white' id="mesa" value={selectedValue} onChange={(e) => setSelectedValue(e.target.value)} ref={mesaRef}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </select>
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
                <button className="border-2 border-white w-full p-2 rounded hover:bg-blue-700" onClick={() => handleCheckout()}>Order</button>
            </div>
        </aside>
    )
}

export default CheckoutOrder