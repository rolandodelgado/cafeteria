import { useState, useEffect } from 'react'
import Card from '../../Components/Card'
import KitchenCard from '../../Components/KitchenCard'

const Home = ({userId}) => {
  const [user, setUser] = useState()
  const [items, setItems] = useState(null)
  const [kitchenOrders, setKitchenOrders] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
         const [userData, productsData, kitchenOrdersData] = await Promise.all([
          fetch(`http://localhost:8000/users/${userId}`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${JSON.parse(
                window.localStorage.getItem('accessToken')
              )}`,
              'Content-Type': 'application/json',
            },
          }).then((res) => res.json()),
          fetch('http://localhost:8000/productos/', {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${JSON.parse(
                window.localStorage.getItem('accessToken')
              )}`,
              'Content-Type': 'application/json',
            },
          }).then((res) => res.json()),
          fetch('http://localhost:8000/pedidos/', {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${JSON.parse(
                window.localStorage.getItem('accessToken')
              )}`,
              'Content-Type': 'application/json',
            },
          }).then((res) => res.json()),
        ]);

        // Filtrar los pedidos con estado diferente a 'Finalizado'
        const filteredKitchenOrdersData = kitchenOrdersData.filter(
          (pedido) => pedido.estado !== 'Finalizado'
        );
        
        setUser(userData);
        setItems(productsData);
        setKitchenOrders(filteredKitchenOrdersData);
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchData();
  }, [{userId}]);


  const role = user ? user.group_name : null

  const content = role && role === 'recepcionista' ? (
    <>
      <div className='flex'>
        <div className='flex w-60'></div>
        <div className='grid grid-cols-2 gap-2'>
          {items?.map(item => (<Card key={item.id} data={item}/>))}
        </div>
        <div className='flex w-60'></div>
      </div>
    </>
  ) :
        <div className='grid grid-cols-3 gap-4'>
          {kitchenOrders?.map(kitchenOrder => (<KitchenCard key={kitchenOrder.id} data={kitchenOrder}/>))}
        </div>

  return (
    <>
        {content}
    </>
  )
}

export default Home
