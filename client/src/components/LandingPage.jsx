import { Link } from 'react-router-dom'
import dogRunning from '../images/dogRunning.gif'

const LandingPage = () => {
  return (
    <div className='landing'>
      <div className='flex flex-col justify-center items-center mt-[300px]'>
        <Link to='/home'><img src={dogRunning} alt='' /></Link>
        <h3 className='text-black'>Get in</h3>
      </div>
    </div>
  )
}

export default LandingPage