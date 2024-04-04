import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignIn from './pages/SignIn'
import Links from './pages/Links'
import { generateGrad } from './utils'
import SignUp from './pages/SignUp'


function App() {
  console.log(generateGrad());
  return (
    <div className='flex justify-center items-center h-full overflow-y-scroll noscrollbar'>
      <BrowserRouter>
      <Routes>
        <Route path='/signin' element={<SignIn/>}></Route>
        <Route path='/signup' element={<SignUp/>}></Route>
        <Route path='/links' element={<Links/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
