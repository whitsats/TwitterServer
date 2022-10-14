import { useState } from 'react'
import React from 'react'
import { Form, Button } from 'semantic-ui-react'
import { useMutation, gql } from '@apollo/client'
import { useNavigate } from 'react-router-dom'
import { useForm } from '../utils/hook'
function Register() {
  // 使用跳转函数
  const navigate = useNavigate()
  // 收集表单信息
  const { onChange, onSubmit, values } = useForm(registerUser, {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  // 收集错误信息
  const [errors, setErrors] = useState({})
  // 突变查询
  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    variables: values,
    update(_, result) {
      // 更新后刷新页面
      navigate('/')
    },
    onError(err) {
      // 收集错误
      setErrors(err.graphQLErrors ? err.graphQLErrors[0].extensions.errors : {})
    }
  })
  function registerUser() {
    addUser()
  }

  return (
    <div style={{ width: '400px', margin: '0 auto' }}>
      <Form
        onSubmit={onSubmit}
        noValidate
        style={{ marginTop: '20px' }}
        className={loading ? 'loading' : ''}
      >
        <h1 style={{ textAlign: 'center' }}>Register</h1>
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
          label="Email"
          placeholder="Email..."
          name="email"
          type="email"
          error={errors.email ? true : false}
          value={values.email}
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
        <Form.Input
          label="Confirm Password"
          placeholder="Confirm Password..."
          name="confirmPassword"
          type="password"
          error={errors.confirmPassword ? true : false}
          value={values.confirmPassword}
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
const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createAt
      token
    }
  }
`
export default Register
