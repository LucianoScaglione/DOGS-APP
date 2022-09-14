import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { showDogs } from '../redux/actions'
import Paginated from './Paginated';
import github from '../images/github.png'
import linkedin from '../images/linkedin.png'
import Filters from './Filters';
import { isAuthenticated } from './AuthService'
import UserContext from '../context/UserContext';
import Loading from './Loading';

const Home = () => {
  const [currentUser, setCurrentUser] = useState(UserContext)
  const [loading, setLoading] = useState(false)
  const user = isAuthenticated()
  console.log("user home: ", user)
  const [order, setOrder] = useState('')
  const dispatch = useDispatch()
  const dogs = useSelector(state => state.dogs)
  const [actualPage, setActualPage] = useState(1)
  const dogsPerPage = 16
  const indexLastDog = actualPage * dogsPerPage
  const indexFirstDog = indexLastDog - dogsPerPage
  const showDogsFrom = dogs.slice(indexFirstDog, indexLastDog)
  const paginated = (page) => {
    setActualPage(page)
  }
  const handleLogOut = () => {
    localStorage.removeItem('user');
    setCurrentUser({});
  };
  useEffect(() => {
    dispatch(showDogs())
  }, [dispatch])
  if (!dogs.length) {
    return <Loading />
  }
  return (
    <div className='home'>
      <div className='bg-gray-900 flex flex-row justify-between items-center p-[15px]'>
        <div className='flex flex-row'>
          <a href="https://github.com/LucianoScaglione" target="_blank"><img className='h-12 m-1 bg-white' src={github} alt='' /></a>
          <a href="https://www.linkedin.com/in/luciano-scaglione-8b5737234/" target="_blank"><img className='h-12 m-1' src={linkedin} alt='' /></a>
        </div>
        <div className='flex flex-row'>
          <Link to={'/create'}>
            <h3 className='text-3xl'>Create Dog</h3>
          </Link>
        </div>
        <div className='flex flex-row'>
          <Link to='/login'>
            {!user.user && <p className='mr-[10px]'>Login</p>}
          </Link>
          {user.user && <p>Hello, {user.user.fullname}</p>}
          {user.user && <button className='ml-[40px] mr-[10px]' onClick={() => handleLogOut()}>Logout</button>}
        </div>
      </div>
      <div className='inline-flex'>
        <h3 className='mt-5 ml-4'>Filter by:</h3>
        <Filters setActualPage={setActualPage} setOrder={setOrder} />
      </div>
      <Paginated
        dogs={dogs.length}
        dogsPerPage={dogsPerPage}
        paginated={paginated}
      />
      <div className='bg-red-400 p-35'></div>
      {showDogsFrom && showDogsFrom.map(d => {
        return (
          <div className='inline-block max-w-[300px] mx-4 my-10 border-2 border-white items-center justify-center rounded-lg hover:scale-105'>
            <div key={d.id}>
              <Link to={`/detail/${d.id}`}>
                <h1 className='m-6 font-black text-black' style={{
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden"
                }}>{d.name}</h1>
                <img className='h-60 w-80' src={d.image} />
                <p className='m-2 text-white font-[600]'>{d.breed_group ? d.breed_group : "Unknown breed"}</p>
                <p className='m-2 text-white font-[600]'>{d.origin ? d.origin : "Unknown origin"}</p>
              </Link>
            </div>
          </div>
        )
      })}
    </div >
  )
}

export default Home