import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { allTemperaments, filterByTemperaments, filterByOrder, filterByData } from '../redux/actions'
import style from './styles/Filter.module.css'

const Filters = ({ setActualPage, setOrder }) => {

  const dispatch = useDispatch()

  const temperaments = useSelector(state => state.temperaments)

  const handleChangeTemperaments = (e) => {
    e.preventDefault()
    dispatch(filterByTemperaments(e.target.value))
    setActualPage(1)
  }

  const handleChangeOrder = (e) => {
    e.preventDefault()
    dispatch(filterByOrder(e.target.value))
    setActualPage(1)
    setOrder(e.target.value)
  }

  const handleChangeData = (e) => {
    e.preventDefault()
    dispatch(filterByData(e.target.value))
    setActualPage(1)
    setOrder(e.target.value)
  }

  useEffect(() => {
    dispatch(allTemperaments())
  }, [dispatch])

  return (
    <div className={style.container}>
      <p>Temperaments:</p>
      <select className={style.selectTemperament} onChange={handleChangeTemperaments}>
        <option value='all'>All</option>
        {
          temperaments.length && temperaments.sort((a, b) => {
            if (a.name < b.name) {
              return -1;
            }
            if (a.name > b.name) {
              return 1;
            }
            return 0;
          }).map(t => {
            return (
              <option value={t.name}>{t.name}</option>
            )
          })
        }
      </select>
      <p>Order: </p>
      <select className={style.selectTemperament} onChange={handleChangeOrder}>
        <option hidden>Default</option>
        <option value='az'>A-Z</option>
        <option value='za'>Z-A</option>
      </select>
      <p>Data: </p>
      <select onChange={handleChangeData}>
        <option hidden>See from</option>
        <option value='api'>API</option>
        <option value='db'>DB</option>
      </select>
    </div>
  )
}

export default Filters
