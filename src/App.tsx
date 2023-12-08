import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login'
import Home from './pages/Home';
import Cars from './pages/Cars';
import CreateCar from './pages/CreateCar';
import UpdateCar from './pages/UpdateCar';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/car' element={<Cars/>} />
        <Route path='/create-car' element={<CreateCar/>} />
        <Route path='/update-car/:carId' element={<UpdateCar/>} />
      </Routes>
    </>
  )
}

export default App
