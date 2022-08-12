import { HashRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import './style/loadingScreen.css'
import "./style/buttons.css"
import "./style/login.css"
import "./style/Footer.css"
import { Footer, LoadingScreen, NavBar, ProtectedRoutes } from './components'
import { Home, Login, ProductDetails, Purchase } from './pages'
import {useSelector} from 'react-redux'
import SingUp from './pages/SingUp'
import User from './pages/User'

function App() {

  const isLoading = useSelector(state => state.loading)

  return (
    <HashRouter className="App">
      <NavBar/>
        {isLoading && <LoadingScreen/>}
       <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/Login' element={<Login/>} />
          <Route path='/signup' element={<SingUp/>}/>
          <Route element={<ProtectedRoutes/>}>
            <Route path="/purchase" element={<Purchase/>}/>
            <Route path='/user' element={<User/>}/>
          </Route>
          <Route path='/product/:id' element={<ProductDetails/>} />
       </Routes>
       <Footer/>
    </HashRouter>
  )
}

export default App
