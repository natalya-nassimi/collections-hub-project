import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Collections from './components/Collections/Collections'
import CollectionShow from './components/Collections/CollectionShow'
import CollectionCreate from './components/CollectionCreate/CollectionCreate'
import SignUp from './components/SignUp/SignUp'
import SignIn from './components/SignIn/SignIn'


function App() {

  return (
    <>
    <Routes>
      <Route path ='/' element={<Navigate to='/collections' />} />
      <Route path='/collections' element={<Collections />} />
      <Route path='/collections/:id' element={<CollectionShow />} />
      <Route path='/collections/new' element={<CollectionCreate />} />
      <Route path='/sign-up' element={<SignUp />} />
      <Route path='/sign-in' element={<SignIn />} />
    </Routes>
    </>
  )
}

export default App
