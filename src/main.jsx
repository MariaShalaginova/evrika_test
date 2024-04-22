import React from 'react'
import ReactDOM from 'react-dom/client'
// import { Routes, Route, BrowserRouter } from 'react-router-dom';
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      {/* <BrowserRouter>
        <Routes> */}
         <App /> 
        {/* </Routes>
      </BrowserRouter> */}
  </React.StrictMode>,
)
