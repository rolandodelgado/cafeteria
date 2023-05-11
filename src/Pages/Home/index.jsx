import { useState, useEffect } from 'react'
import Card from '../../Components/Card'

const Home = ({ onLogout, userId }) => {
  const [user, setUser] = useState()
  const [items, setItems] = useState(null)

  // useEffect(() => {
  //   fetch('http://localhost:8000/users/' + userId, {
  //     method: 'GET' /* or POST/PUT/PATCH/DELETE */,
  //     headers: {
  //       Authorization: `Bearer ${JSON.parse(window.localStorage.getItem('accessToken'))}`,
  //       'Content-Type': 'application/json',
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((userData) => {
  //       setUser(userData)
  //     })
  // }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userData, productsData] = await Promise.all([
          fetch('http://localhost:8000/users/' + userId, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${JSON.parse(window.localStorage.getItem('accessToken'))}`,
              'Content-Type': 'application/json',
            },
          }).then(res => res.json()),
          fetch('http://localhost:8000/productos', {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${JSON.parse(window.localStorage.getItem('accessToken'))}`,
              'Content-Type': 'application/json',
            },
           }).then(res => res.json())
          //.then(res => console.log(res.json()))
        ])
        setUser(userData)
        setItems(productsData)
      } catch (error) {
        console.log(error)
      }
    }
  
    fetchData()
  }, [userId])
  

  const logoutHandler = () => {
    onLogout()
  }

  const role = user ? user.group_name : null

  const content = role && role === 'recepcionista' ? (
    <>
      <div className='grid grid-cols-2 gap-5 lg:grid-cols-4 md:grid-cols-3'>
        {items?.map(item => (<Card key={item.id} data={item}/>))}
      </div>
    </>
  ) : <p>Cocinero</p>;

  return (
    <>
      <button onClick={logoutHandler}>Logout</button>
      {user && <>
        <h1>Bienvenido {user.username}!</h1>
        <p>{user.group_name}</p>
        {content}
      </>}
    </>
  )
}

export default Home
