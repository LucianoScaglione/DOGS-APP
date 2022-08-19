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

const Home = () => {
  const [currentUser, setCurrentUser] = useState(UserContext)
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
    history.push('/');
  };
  useEffect(() => {
    dispatch(showDogs())
  }, [dispatch])
  return (
    <div className='home bg-sky-600'>
      <div className='bg-blue-900 flex flex-row justify-between items-center mt-3'>
        <div className='flex flex-row'>
          <a href="https://github.com/LucianoScaglione" target="_blank"><img className='h-12 m-1' src={github} alt='' /></a>
          <a href="https://www.linkedin.com/in/luciano-scaglione-8b5737234/" target="_blank"><img className='h-12 m-1' src={linkedin} alt='' /></a>
        </div>
        <button onClick={() => handleLogOut()}>{user && <p>Logout</p>}</button>
        <Link to='/login'>
          <p>{!user && <p>Login</p>}</p>
        </Link>
        {/* <p>Bienvenido {user ? user.user.fullname : ''}</p> */}
        <Link to='/create'>
          <h3 className='mr-6 text-3xl'>Create Dog</h3>
        </Link>
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
          <div className='inline-block max-w-[300px] mx-4 my-10 bg-cyan-200 items-center justify-center rounded-lg hover:scale-105'>
            <div key={d.id}>
              <Link to={`/detail/${d.id}`}>
                <h1 className='m-6 font-black text-black' style={{
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden"
                }}>{d.name}</h1>
                <img className='h-60 w-80' src={d.image} />
                <p className='m-2 text-black font-medium'>{d.breed_group ? d.breed_group : "Unknown breed"}</p>
                <p className='m-2 text-black font-medium'>{d.origin ? d.origin : "Unknown origin"}</p>
              </Link>
            </div>
          </div>
        )
      })}
    </div >
  )
}

export default Home