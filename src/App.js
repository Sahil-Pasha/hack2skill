import React, { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { data } from './contants/data'
import Login from './components/Login'
import Dashboard from './components/Dashboard'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null)
  const [usersData] = useState(data.users)
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Login users={usersData} onLogin={setIsLoggedIn} />}
        />
        <Route
          path="/dashboard"
          element={
            <Dashboard
              users={usersData}
              highlightedUserId={isLoggedIn ? isLoggedIn.id : null}
            />
          }
        ></Route>
      </Routes>
    </Router>
  )
}

export default App
