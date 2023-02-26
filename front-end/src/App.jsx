import { useState } from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Home from './pages/Home'

function App() {
  return (
   <>
       {/* <Navbar/> */}
       
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </BrowserRouter>

   </>
  )
}

export default App
