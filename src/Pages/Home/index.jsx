import { useState, useEffect } from 'react'
import Card from '../../Components/Card'
import KitchenCard from '../../Components/KitchenCard'

const Home = ({userId}) => {
  const [user, setUser] = useState()
  const [items, setItems] = useState(null)
  const [kitchenOrders, setKitchenOrders] = useState(null)

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //        const [userData, productsData, kitchenOrdersData] = await Promise.all([
  //         fetch(`http://localhost:8000/users/${userId}`, {
  //           method: 'GET',
  //           headers: {
  //             Authorization: `Bearer ${JSON.parse(
  //               window.localStorage.getItem('accessToken')
  //             )}`,
  //             'Content-Type': 'application/json',
  //           },
  //         }).then((res) => res.json()),
  //         fetch('http://localhost:8000/productos/', {
  //           method: 'GET',
  //           headers: {
  //             Authorization: `Bearer ${JSON.parse(
  //               window.localStorage.getItem('accessToken')
  //             )}`,
  //             'Content-Type': 'application/json',
  //           },
  //         }).then((res) => res.json()),
  //         fetch('http://localhost:8000/pedidos/', {
  //           method: 'GET',
  //           headers: {
  //             Authorization: `Bearer ${JSON.parse(
  //               window.localStorage.getItem('accessToken')
  //             )}`,
  //             'Content-Type': 'application/json',
  //           },
  //         }).then((res) => res.json()),
  //       ]);
  //       setUser(userData);
  //       setItems(productsData);
  //       setKitchenOrders(kitchenOrdersData);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  
  //   fetchData();
  // }, [{userId}]);

  useEffect(() => {
    const fetchData = async () => {
      try {
         const [userData, kitchenOrdersData] = await Promise.all([
          fetch(`http://localhost:8000/users/${userId}`, {
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
        setUser(userData);
        setKitchenOrders(kitchenOrdersData);
        //solo si es rol recepcionista hace fectch a productos
        if (userData.group_name == 'recepcionista') {
          const productsData = await fetch('http://localhost:8000/productos/', {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${JSON.parse(
                window.localStorage.getItem('accessToken')
              )}`,
              'Content-Type': 'application/json',
            },
          }).then((res) => res.json());
          setItems(productsData);
        }
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
