import React, { useState, useContext, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'
import { AuthContext } from '../context/auth'

function MenuBar() {
  const { user, logout } = useContext(AuthContext)
  const { pathname } = useLocation()
  var path = pathname === '/' ? 'home' : pathname.substring(1)
  const [activeItem, setActiveItem] = useState(path)
  useEffect(() => {
    setActiveItem(path)
  }, [path])
  const navigator = useNavigate()
  const handleLogout = () => {
    navigator('/')
    logout()
  }

  const handleItemClick = (e, { name }) => setActiveItem(name)
  const menuBar = user ? (
    <div>
      <Menu pointing secondary color="teal" size="massive">
        <Menu.Item name={user.username} active />
        <Menu.Menu position="right">
          <Menu.Item name="Logout" onClick={handleLogout} />
        </Menu.Menu>
      </Menu>
    </div>
  ) : (
    <div>
      <Menu pointing secondary color="teal" size="massive">
        <Menu.Item
          name="home"
          active={activeItem === 'home'}
          onClick={handleItemClick}
          as={Link}
          to="/"
        />
        <Menu.Menu position="right">
          <Menu.Item
            name="login"
            active={activeItem === 'login'}
            onClick={handleItemClick}
            as={Link}
            to="/login"
          />
          <Menu.Item
            name="register"
            active={activeItem === 'register'}
            onClick={handleItemClick}
            as={Link}
            to="/register"
          />
        </Menu.Menu>
      </Menu>
    </div>
  )
  return menuBar
}
export default MenuBar
