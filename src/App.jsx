import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Collections from './components/Collections/Collections'
import CollectionShow from './components/Collections/CollectionShow'
import CollectionCreate from './components/CollectionCreate/CollectionCreate'
import SignUp from './components/SignUp/SignUp'
import SignIn from './components/SignIn/SignIn'
import Dashboard from './components/Dashboard/Dashboard'
import Navbar from './components/Navbar/Navbar'
import ItemCreate from './components/ItemCreate/ItemCreate'
import CollectionEdit from './components/CollectionEdit/CollectionEdit'
import ItemEdit from './components/ItemEdit/ItemEdit'
import ProfileEdit from './components/ProfileEdit/ProfileEdit'


function App() {

  return (
    <>

      <Navbar />

      <Routes>
        <Route path='/' element={<Navigate to='/collections' />} />
        <Route path='/collections' element={<Collections />} />
        <Route path='/collections/:id' element={<CollectionShow />} />
        <Route path='/collections/new' element={<CollectionCreate />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/collections/:collectionId/items/new' element={<ItemCreate />} />
        <Route path='/collections/:id/edit' element={<CollectionEdit />} />
        <Route path='/collections/:collectionId/items/:itemId/edit' element={<ItemEdit />} />
        <Route path='/profile/edit' element={<ProfileEdit />} />
      </Routes>
    </>
  )
}

export default App
