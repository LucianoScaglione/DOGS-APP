import { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import { login } from './AuthService'
import style from './styles/Login.module.css'
import swal from 'sweetalert';
import { Link } from 'react-router-dom';

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
      history.push('/home');
      setInput({ email: '', password: '' })
    } catch (error) {
      swal({
        title: "Error",
        text: "Email or password incorrect",
        icon: "error",
        button: "Ok",
      });      
    }
  };

  return (
    <div className={style.container}>
      <Link to='/home'>
        <p className={style.back}>⬅Back</p>
      </Link>
      <div className={style.containerForm}>
      <form onSubmit={handleSubmit}>
        <div className={style.children}>
        <label>Email:</label>
        <input name='email' type='email' value={input.email} onChange={handleChange} />
        <label>Password:</label>
        <input name='password' type='password' value={input.password} onChange={handleChange} />
        <button>Login</button>
        </div>
      </form>
        <div className={style.register}>
        <p>¿You do not have an account? Create one!</p>
        <button><Link to='/register'>Register</Link></button>
        </div>
        </div>
    </div>
  )
}

export default Login
