import { useState, useContext } from 'react'
import React from 'react'
import { Form, Button } from 'semantic-ui-react'
import { useMutation, gql } from '@apollo/client'
import { useNavigate } from 'react-router-dom'
import { useForm } from '../utils/hook'
import { AuthContext } from '../context/auth'
function Login() {
  const context = useContext(AuthContext)
  const navigate = useNavigate()
  // 收集表单信息
  const { onChange, onSubmit, values } = useForm(userLogin, {
    username: '',
    password: ''
  })
  // 收集错误信息
  const [errors, setErrors] = useState({})
  // 突变查询
  const [login, { loading }] = useMutation(USER_LOGIN, {
    variables: values,
    update(_, { data: { login: userData } }) {
      // 更新后刷新页面
      context.login(userData)
      navigate('/')
    },
    onError(err) {
      // 收集错误
      setErrors(err.graphQLErrors ? err.graphQLErrors[0].extensions.errors : {})
    }
  })
  function userLogin() {
    login()
  }
  return (
    <div style={{ width: '400px', margin: '0 auto' }}>
      <Form
        onSubmit={onSubmit}
        noValidate
        style={{ marginTop: '20px' }}
        className={loading ? 'loading' : ''}
      >
        <h1 style={{ textAlign: 'center' }}>Login</h1>
        <Form.Input
          label="Username"
          placeholder="Username..."
          name="username"
          type="text"
          error={errors.username ? true : false}
          value={values.username}
          onChange={onChange}
        ></Form.Input>
        <Form.Input
          label="Password"
          placeholder="Password..."
          name="password"
          type="password"
          error={errors.password ? true : false}
          value={values.password}
          onChange={onChange}
        ></Form.Input>
        <Button type="submit" primary>
          Submit
        </Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map(error => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
const USER_LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createAt
      token
    }
  }
`
export default Login
