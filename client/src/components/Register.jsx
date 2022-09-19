import { useState } from 'react'
import style from './styles/Login.module.css'

const Register = () => {

  const [input, setInput] = useState({ fullname: '', email: '', password: '', photo: '' })
  // const history = useHistory()

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await login(input.email, input.password);
  //     history.push('/home');
  //     setInput({ email: '', password: '' })
  //   } catch (error) {
  //     swal({
  //       title: "Error",
  //       text: "Email or password incorrect",
  //       icon: "error",
  //       button: "Ok",
  //     });      
  //   }
  // };
  
  return (
    <div className={style.container}>
      <div className={style.containerForm}>
      <form>
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