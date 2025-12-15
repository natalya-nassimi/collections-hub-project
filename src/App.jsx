import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Collections from './components/Collections/Collections'
import CollectionShow from './components/Collections/CollectionShow'

function App() {

  return (
    <>
    <Routes>
      <Route path ='/' element={<Navigate to='/collections' />} />
      <Route path='/collections' element={<Collections />} />
      <Route path='/collections/:id' element={<CollectionShow />} />
    </Routes>
    </>
  )
}

export default App
