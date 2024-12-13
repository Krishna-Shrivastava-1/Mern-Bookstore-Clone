import React from 'react'
import { Route, Routes } from 'react-router-dom'

import CreateBook from './Pages/CreateBook'
import ShowBook from './Pages/ShowBook'
import EditBook from './Pages/EditBook'
import DeleteBook from './Pages/DeleteBook'
import Home from './Pages/Home'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/'  element={<Home/>} />
        <Route path='/books/create'  element={<CreateBook/>} />
        <Route path='/books/details/:id'  element={<ShowBook/>} />
        <Route path='/books/edit/:id'  element={<EditBook/>} />
        <Route path='/books/delete/:id'  element={<DeleteBook/>} />
      </Routes>
    </div>
  )
}

export default App
