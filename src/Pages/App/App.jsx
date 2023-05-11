import { useState, useEffect } from 'react'
import { useRoutes, BrowserRouter } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import Home from '../Home'
import MyAccount from '../MyAccount'
import NotFound from '../NotFound'
import Order from '../Order'
import Orders from '../Orders'
import SignIn from '../SignIn'
import Navbar from '../../Components/Navbar'
import '../../App.css'

const AppRoutes = () => {
  let routes = useRoutes([
    { path: '/', element: <Home />},
    { path: '/my-account', element: <MyAccount />},
    { path: '/order', element: <Order />},
    { path: '/orders', element: <Orders />},
    { path: '/sign-in', element: <SignIn />},
    { path: '/*', element: <NotFound />}
])
return routes
}

function App() {
  
  // return (
  //   //Encapsular las rutas
  //   <BrowserRouter>
  //     <Navbar />
  //     <AppRoutes /> 
  //   </BrowserRouter>
  // )
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
        <BrowserRouter>
          <Navbar />
          <Home onLogout={onLogoutHandler} userId={userId} />
        </BrowserRouter>
        
      ) : (
        <SignIn onLogin={onLoginHandler} />
      )}
    {/* </>
    <>
      {userId ? (
          // <BrowserRouter>
          // <Navbar />
          // <Home onLogout={onLogoutHandler} userId={userId} />
          //  <AppRoutes /> 
          // </BrowserRouter>
        <Home onLogout={onLogoutHandler} userId={userId} />
      ) : (
        <SignIn onLogin={onLoginHandler} />
      )}*/}
    </> 
  )
}

export default App
