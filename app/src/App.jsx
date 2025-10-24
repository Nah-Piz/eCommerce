import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import RootLayout from './layouts/root'
import Home from './pages/home/home'
import Item from './pages/item/item'
import Aside from './pages/cart/aside'
import LoginPage from './pages/login/login'
import SignupPage from './pages/login/signup'

function App() { 

  const mainUI = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path='cart' element={<Aside />} />
        <Route path=':id' element={<Item />} />
        <Route path='auth/'>
          <Route path='signup' element={<LoginPage />} />
          <Route path='login' element={<SignupPage />} />
        </Route>
      </Route>
    )
  )

  return (
    <RouterProvider router={mainUI} />
  )
}

export default App
