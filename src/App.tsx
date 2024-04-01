import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignIn from './pages/SignIn'
import Links from './pages/Links'
import { generateGrad } from './utils'


function App() {
  console.log(generateGrad());
  return (
    <div className='flex justify-center items-center h-full overflow-hidden'>
      <BrowserRouter>
      <Routes>
        <Route path='/signin' element={<SignIn/>}></Route>
        <Route path='/links' element={<Links/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
