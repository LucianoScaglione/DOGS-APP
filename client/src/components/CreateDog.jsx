import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createDog, showDogs, allTemperaments } from '../redux/actions'

const CreateDog = () => {
  const dispatch = useDispatch()
  const [input, setInput] = useState({
    name: '',
    weight: '',
    bred_for: '',
    breed_group: '',
    life_span: '',
    origin: '',
    image: '',
    temperaments: []
  })
  const temperaments = useSelector(state => state.temperaments)
  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!(input.name && input.weight && input.bred_for && input.breed_group && input.life_span && input.origin && input.image && input.temperaments.length)) {
      alert('Incomplete')
    } else {
      dispatch(createDog(input))
      alert("Dog created")
      setInput({
        name: '',
        weight: '',
        bred_for: '',
        breed_group: '',
        life_span: '',
        origin: '',
        image: '',
        temperaments: []
      })
    }
  }
  const selectTemperament = (e) => {
    e.preventDefault()
    let container = [...input.temperaments]
    let found = container.filter(t => t === e.target.value)
    if (!found.length) {
      setInput({
        ...input, temperaments: [...input.temperaments, e.target.value]
      })
    } else {
      alert("Was already selected")
    }
  }
  useEffect(() => {
    dispatch(showDogs())
    dispatch(allTemperaments())
  }, [dispatch])
  return (
    <div className='flex flex-col m-5'>
      <form onSubmit={handleSubmit}>
        <h1>Create your dog!</h1>
        <label>Name:</label>
        <input name='name' type='text' value={input.name} onChange={handleChange} />
        <label>Weight:</label>
        <input name='weight' type='number' value={input.weight} onChange={handleChange} />
        <label>Bred for:</label>
        <input name='bred_for' type='text' value={input.bred_for} onChange={handleChange} />
        <label>Breed group:</label>
        <input name='breed_group' type='text' value={input.breed_group} onChange={handleChange} />
        <label>Life span</label>
        <input name='life_span' type='text' value={input.life_span} onChange={handleChange} />
        <label>Origin:</label>
        <input name='origin' type='text' value={input.origin} onChange={handleChange} />
        <label>Image:</label>
        <input type="file" name="image" accept="image/*" onChange={handleChange} />
        <label>Temperament:</label>
        <select onChange={(e) => selectTemperament(e)}>
          {
            temperaments.length && temperaments.map(t => {
              return (
                <option value={t.name}>{t.name}</option>
              )
            })
          }
        </select>
        <ul>
          {
            input.temperaments.map(t => {
              return (
                <div>
                  {t}
                </div>
              )
            })
          }
        </ul>
        <button>Send</button>
      </form>
    </div>
  )
}

export default CreateDog
