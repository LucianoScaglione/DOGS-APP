import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { showDogs } from '../redux/actions'
import Paginated from './Paginated';
import github from '../images/github.png'
import linkedin from '../images/linkedin.png'
import Filters from './Filters';

const Home = () => {
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
  useEffect(() => {
    dispatch(showDogs())
  }, [dispatch])
  return (
    <div>
      <div className='bg-blue-400 flex flex-row justify-between items-center'>
        <div className='flex flex-row'>
          <a href="https://github.com/LucianoScaglione" target="_blank"><img className='h-12 m-1' src={github} alt='' /></a>
          <a href="https://www.linkedin.com/in/luciano-scaglione-8b5737234/" target="_blank"><img className='h-12 m-1' src={linkedin} alt='' /></a>
        </div>
        <Link to='/create'>
          <h3 className='mr-6 text-3xl'>Create Dog</h3>
        </Link>
      </div>
      <Filters setActualPage={setActualPage} setOrder={setOrder} />
      <Paginated
        dogs={dogs.length}
        dogsPerPage={dogsPerPage}
        paginated={paginated}
      />
      <div className='bg-red-400 p-35'></div>
      {showDogsFrom && showDogsFrom.map(d => {
        return (
          <div className='inline-block max-w-[300px] mx-4 my-10 bg-zinc-300 items-center justify-center'>
            <div key={d.id}>
              <Link to={`/detail/${d.id}`}>
                <h1 className='m-6'>{d.name}</h1>
                <img className='h-[100%] w-px[100%]' src={d.image} />
                <p>{d.breed_group ? d.breed_group : "unknown breed"}</p>
                <p>{d.origin ? d.origin : "unknown origin"}</p>
              </Link>
            </div>
          </div>
        )
      })}
    </div >
  )
}

export default Home