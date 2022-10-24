import React, { createContext, useReducer } from 'react'
import jwtDecode from 'jwt-decode'

const initState = {
  user: null
}
if (localStorage.getItem('jwtToken') !== 'null') {
  const jwtUserDate = jwtDecode(localStorage.getItem('jwtToken'))
  if (jwtUserDate.exp * 1000 < Date.now()) {
    localStorage.setItem('jwtToken', null)
  } else {
    initState.user = jwtUserDate
  }
}
// 创建可以共享的上下文数据
const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {}
})

// 创建处理数据的方法
function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload
      }
    case 'LOGOUT':
      return {
        ...state,
        user: null
      }
    default:
      return state
  }
}
// 创建提供数据的组件
function AuthorProvider(props) {
  // initState 用于初始化state，despach用户更新上下文
  const [state, dispatch] = useReducer(authReducer, initState)
  function login(userData) {
    localStorage.setItem('jwtToken', userData.token)
    dispatch({
      type: 'LOGIN',
      payload: userData
    })
  }
  function logout() {
    dispatch({
      type: 'LOGOUT'
    })
  }
  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logout }}
      {...props}
    />
  )
}

export { AuthContext, AuthorProvider }
