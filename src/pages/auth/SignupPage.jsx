import React from 'react'
import { useEffect } from 'react';
import Signup from '../../components/auth/Signup'

const SignupPage = () => {
  useEffect(() => {
        window.scrollTo(0, 0);
      });
  return (
    <div>
      <Signup/>
    </div>
  )
}

export default SignupPage
