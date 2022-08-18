import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { allTemperaments, filterByTemperaments, filterByOrder } from '../redux/actions'

const Filters = ({ setActualPage }) => {
  const dispatch = useDispatch()
  const temperaments = useSelector(state => state.temperaments)
  useEffect(() => {
    dispatch(allTemperaments())
  }, [])
  const handleChangeTemperaments = (e) => {
    e.preventDefault()
    dispatch(filterByTemperaments(e.target.value))
    setActualPage(1)
  }
  const handleChangeOrder = (e) => {
    e.preventDefault()
    dispatch(filterByOrder(e.target.value))
  }
  return (
    <div>
      <p>Temperaments:</p>
      <select onChange={handleChangeTemperaments}>
        <option value='all'>All</option>
        {
          temperaments.length && temperaments.map(t => {
            return (
              <option value={t.name}>{t.name}</option>
            )
          })
        }
      </select>
      <p>Order: </p>
      <select onChange={handleChangeOrder}>
        <option hidden>Default</option>
        <option value='az'>A-Z</option>
        <option value='za'>Z-A</option>
      </select>
    </div>
  )
}

export default Filters
