import { useState } from 'react'
import { useDispatch } from 'react-redux'
import style from './styles/Login.module.css'
import { userRegister } from '../redux/actions'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom';

const Register = () => {

  const [input, setInput] = useState({ fullname: '', email: '', password: '' })
  const history = useHistory()
  const dispatch = useDispatch()

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      dispatch(userRegister(input))
      swal("Registration completed successfully!", "Thank you very much for registering on my page, I will send you to the login so that you can log in to your account!", "success");
      setInput({ fullname: '', email: '', password: '' })
      history.push('/login');
    } catch (error) {
      swal({
        title: "Error",
        text: "There is already a registered email",
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
            <label>Full name</label>
            <input name='fullname' type='text' value={input.fullname} onChange={handleChange} />
            <label>Email:</label>
            <input name='email' type='email' value={input.email} onChange={handleChange} />
            <label>Password:</label>
            <input name='password' type='password' value={input.password} onChange={handleChange} />
            <button>Register</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register;