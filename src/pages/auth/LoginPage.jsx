import React from 'react'
import { useEffect } from 'react';
import Login from '../../components/auth/Login'

const LoginPage = () => {
  useEffect(() => {
        window.scrollTo(0, 0);
      });
  return (
    <div>
      <Login/>
    </div>
  )
}

export default LoginPage
