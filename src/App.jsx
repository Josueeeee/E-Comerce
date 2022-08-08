import { HashRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import './style/loadingScreen.css'
import { LoadingScreen, NavBar } from './components'
import { Home, Login, ProductDetails, Purchase } from './pages'
import {useSelector} from 'react-redux'

function App() {

  const isLoading = useSelector(state => state.loading)

  return (
    <HashRouter className="App">
      <NavBar/>
    {isLoading && <LoadingScreen/>}
       <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/Login' element={<Login/>} />
          <Route path="/purcharse" element={<Purchase/>}/>
          <Route path='/product/:id' element={<ProductDetails/>} />
       </Routes>
    </HashRouter>
  )
}

export default App
