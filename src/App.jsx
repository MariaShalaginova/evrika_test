
import { Route, Routes } from 'react-router-dom'
import './App.scss'
import Main from './components/Main/Main'

function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        {/* <Route path="/Entrance" element={<Entrance />} />
        <Route path="/Flat" element={<Flat />} /> */}
      </Routes>

    </>
  )
}

export default App
