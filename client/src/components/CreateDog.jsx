import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createDog, showDogs, allTemperaments } from '../redux/actions'
import style from './styles/CreateDog.module.css'
import style2 from './styles/Home.module.css'
import { Link } from 'react-router-dom'
import swal from 'sweetalert';

const validations = (input) => {
  const errores = {}
  if (!input.name.length) {
    errores.name = "Field 'name' required"
  } else if (input.name.length < 3) {
    errores.name = "Very short name"
  } else if (!/^[a-zA-Z ]*$/.test(input.name)) {
    errores.name = "Only letters are allowed"
  }
  if (!input.weight.length) {
    errores.weight = "Field 'weight' required"
  }
  if (!/^[a-zA-Z ]*$/.test(input.bred_for)) {
    errores.bred_for = "Only letters are allowed"
  }
  if (!/^[a-zA-Z ]*$/.test(input.breed_group)) {
    errores.breed_group = "Only letters are allowed"
  }
  if (!input.life_span.length) {
    errores.life_span = "Field 'life span' required"
  }
  if (!input.origin.length) {
    errores.origin = "Field 'origin' required"
  } else if (!/^[a-zA-Z ]*$/.test(input.origin)) {
    errores.origin = "Only letters are allowed"
  }
  return errores
}

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
  const [error, setError] = useState([])
  const temperaments = useSelector(state => state.temperaments)
  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
    setError(validations({ ...input, [e.target.name]: e.target.value }))
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!(input.name && input.weight && input.life_span && input.origin)) {
      swal("Oops!", "You must fill in the required fields.");
    } else if (error.name || error.weight || error.bred_for || error.breed_group || error.life_span || error.origin) {
      swal("Oops!", "Check that there are no errors.");
    } else {
      swal({
        title: "Are you sure?",
        text: "Once accepted, your dog will be successfully created!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
        .then((willDelete) => {
          if (willDelete) {
            dispatch(createDog(input))
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
            swal("Your dog was successfully created!", {
              icon: "success",
            });
          } else {
            swal("The creation of your dog was canceled.", {
              icon: "error"
            });
          }
        });
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
      swal("Was already selected.", {
        icon: "error"
      })
    }
  }
  useEffect(() => {
    dispatch(showDogs())
    dispatch(allTemperaments())
  }, [dispatch])
  console.log("input temperaments: ", input.temperaments.length)
  return (
    <div className={style.containerPrimary}>
      <Link to='/home'>
        <button className={style.back}>⬅Back</button>
      </Link>
      <div className={style.container}>
        <form onSubmit={handleSubmit}>
          <h1>Create your dog!</h1>
          <div className={style.wrap1}>
            <label>Name:</label>
            <input name='name' type='text' value={input.name} maxLength={20} onChange={handleChange} />
            <label>Weight:</label>
            <input name='weight' type='number' value={input.weight} onChange={handleChange} />
            <label>Bred for:</label>
            <input name='bred_for' type='text' value={input.bred_for} onChange={handleChange} />
            <label>Breed group:</label>
            <input name='breed_group' type='text' value={input.breed_group} onChange={handleChange} />
            <button className={style.send}>Create dog</button>
            <div className={style.containerError}>
              {error.name && (<p className={style.error}>*{error.name}</p>)}
              {error.weight && (<p className={style.error}>*{error.weight}</p>)}
              {error.bred_for && (<p className={style.error}>*{error.bred_for}</p>)}
              {error.breed_group && (<p className={style.error}>*{error.breed_group}</p>)}
            </div>
          </div>
          <div className={style.wrap2}>
            <label>Life span</label>
            <input name='life_span' type='text' value={input.life_span} onChange={handleChange} />
            <label>Origin:</label>
            <input name='origin' type='text' value={input.origin} onChange={handleChange} />
            <label>Image:</label>
            <input type="file" name="image" accept="image/*" onChange={handleChange} />
            <label>Temperament:</label>
            <select onChange={(e) => selectTemperament(e)} disabled={!input.origin || error.origin || error.life_span || input.temperaments.length === 4 ? true : false}>
              <option hidden />
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
                    <div className={style.containerTemperaments}>
                      <p className={style.name}>{t}</p>
                      <p className={style.x} onClick={() => console.log('asd')}>X</p>
                    </div>
                  )
                })
              }
            </ul>
            <div className={style.containerError2}>
              {error.life_span && (<p className={style.error}>*{error.life_span}</p>)}
              {error.origin && (<p className={style.error}>*{error.origin}</p>)}
            </div>
          </div>
        </form>
      </div>
      {/* <div className={style2.container}>
        <div>
          <h1 className='m-6 font-black text-white' style={{
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden"
          }}>{input.name ? input.name : ''}</h1>
          <img className='h-60 w-80' src={input.image ? input.image : ''} />
          <p className='m-2 text-white font-[600]'>{input.breed_group ? input.breed_group : ''}</p>
          <p className='m-2 text-white font-[600]'>{input.origin ? input.origin : ''}</p>
        </div>
      </div> */}
    </div>
  )
}

export default CreateDog