import './App.css'
import React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import MenuBar from './components/MenuBar'
import { AuthorProvider } from './context/auth'
import AuthRoute from './utils/authRouter'
function App() {
  return (
    <AuthorProvider>
      <BrowserRouter>
        <Container>
          <MenuBar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route
              exact
              path="/login"
              element={
                <AuthRoute>
                  <Login />
                </AuthRoute>
              }
            />
            <Route
              exact
              path="/register"
              element={
                <AuthRoute>
                  <Register />
                </AuthRoute>
              }
            />
          </Routes>
        </Container>
      </BrowserRouter>
    </AuthorProvider>
  )
}

export default App
