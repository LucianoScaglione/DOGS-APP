import { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import { login } from './AuthService'

const Login = () => {

  const [input, setInput] = useState({ email: '', password: '' })
  
  const history = useHistory()

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(input.email, input.password);
      history.push('/');
      setInput({ email: '', password: '' })
    } catch (error) {
      console.error('error', error);
    }
  };

  return (
    <div className='flex justify-center m-5'>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input name='email' type='email' value={input.email} onChange={handleChange} />
        <label>Password:</label>
        <input name='password' type='password' value={input.password} onChange={handleChange} />
        <button>Send</button>
      </form>
    </div>
  )
}

export default Login
