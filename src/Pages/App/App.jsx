import { useState, useEffect } from 'react'
import {OrderProvider} from '../../Context'
import jwtDecode from 'jwt-decode'
import Home from '../Home'
import SignIn from '../SignIn'
import Navbar from '../../Components/Navbar'
import Layout from '../../Components/Layout'
import CheckoutOrder from '../../Components/CheckoutOrder'
import StatusOrder from '../../Components/StatusOrders'

import '../../App.css'

function App() {
  
  const [userId, setUserId] = useState(null)

  useEffect(() => {
    const token = window.localStorage.getItem('accessToken')
    if (token){
      setUserId(jwtDecode(JSON.parse(token)).user_id)
    }
  }, [])

  const onLoginHandler = (userId) => {
    console.log(userId)
    setUserId(userId)
  }

  const onLogoutHandler = () => {
    setUserId(null)
    window.localStorage.removeItem('accessToken')
  }

  return (
    <>
      {userId ? (
        <OrderProvider>
            <Layout>
              <Navbar onLogout={onLogoutHandler} userId={userId} />
              <Home userId={userId} />
              <CheckoutOrder />
              <StatusOrder />
            </Layout>
        </OrderProvider>        
      ) : (
        <Layout>
          <SignIn onLogin={onLoginHandler} />
        </Layout>
        
      )}
    </> 
  )
}

export default App
