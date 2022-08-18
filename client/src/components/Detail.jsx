import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { detailDogs } from '../redux/actions'

const Detail = (props) => {
  const id = props.match.params.id
  const dispatch = useDispatch()
  const detailDog = useSelector(state => state.detailDog)
  useEffect(() => {
    dispatch(detailDogs(id))
  }, [dispatch])
  return (
    <div>
      <Link to='/home'>
        <p>Volver</p>
      </Link>
      <div>
        <img src={detailDog.image} alt='Not found' />
        <p>Weight: {detailDog.weight}</p>
        <p>Bred for: {detailDog.bred_for}</p>
        <p>Life span: {detailDog.life_span}</p>
        <p>Temperament: {detailDog.temperament}</p>
      </div >
    </div>
  )
}

export default Detail
