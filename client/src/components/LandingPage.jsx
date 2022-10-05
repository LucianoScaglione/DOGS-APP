import { Link } from 'react-router-dom'
import style from './styles/Landing.module.css'

const LandingPage = () => {
  return (
    <div className='landing'>
      <h1 className='m-5 font-bold text-lg'>Created by: Luciano Scaglione</h1>
      <div className='flex flex-col justify-center items-center mt-[220px]'>
        <Link to='/home'><button className={style.button}>Enter</button></Link>
      </div>
    </div>
  )
}

export default LandingPage

