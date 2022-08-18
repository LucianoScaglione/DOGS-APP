import { Link } from 'react-router-dom'
import dogRunning from '../images/dogRunning.gif'

const LandingPage = () => {
  return (
    <div className='landing'>
      <div className='m-auto'>
        <h1 className='text-center my-5 text-5xl text-emerald-500 '>Dogs App</h1>
        <h3 className='text-center  text-5xl text-emerald-500'>Get in</h3>
        <Link to='/home'><img src={dogRunning} alt='' /></Link>
      </div>
    </div>
  )
}

export default LandingPage