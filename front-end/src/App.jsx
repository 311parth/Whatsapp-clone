import { useState } from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import RightSideSection from './component/RightSideSection'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import store from "../src/store/store"
import { Provider } from 'react-redux';

function App() {
  return (
   <>
       <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/"  element={<LoginPage />}></Route>
          <Route path="/home" element={<HomePage /> }></Route>
          <Route path="/chat/:chatId" element={<RightSideSection /> }></Route>
          <Route path="/signup"  element={<SignupPage />}></Route>
        </Routes>
      </BrowserRouter>
      </Provider>

   </>
  )
}

export default App
