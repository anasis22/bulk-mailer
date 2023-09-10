import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MailForm from './components/MailForm'

const App = () => {
  return (
    <div className='appContainer'>
      <Router>
        <Routes>
          <Route path='/' Component={MailForm} />
        </Routes>
      </Router>
    </div>
  )
}

// to main

export default App
