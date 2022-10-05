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
  const [images, setImages] = useState([])
  const [input, setInput] = useState({
    name: '',
    weight: '',
    bred_for: '',
    breed_group: '',
    life_span: '',
    origin: '',
    temperaments: []
  })
  const [error, setError] = useState([])
  const temperaments = useSelector(state => state.temperaments)
  const dispatch = useDispatch()

  const handleChangeImage = (e) => {
    let indexImg;
    if (images.length) {
      indexImg = images[images.length - 1].index + 1;
    } else {
      indexImg = 0;
    }
    let newImgsToState = readmultifiles(e, indexImg);
    let newImgsState = [...images, ...newImgsToState];
    setImages(newImgsState);
  }

  const readmultifiles = (e, indexInicial) => {
    const files = e.currentTarget.files;
    const arrayImages = [];
    Object.keys(files).forEach((i) => {
      const file = files[i];
      let url = URL.createObjectURL(file);
      console.log("url: ", url)
      arrayImages.push({
        index: indexInicial,
        name: file.name,
        url,
        file
      });
      indexInicial++;
    });
    return arrayImages;
  }

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

  const handleDelete = (e) => {
    e.preventDefault()
    setInput({
      ...input,
      temperaments: input.temperaments.filter(t => t !== e.target.value)
    })
  }

  useEffect(() => {
    dispatch(showDogs())
    dispatch(allTemperaments())
  }, [dispatch])

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
            {error.name && (<p className={style.error}>*{error.name}</p>)}
            <label>Weight:</label>
            <input name='weight' type='number' value={input.weight} onChange={handleChange} disabled={!input.name || error.name ? true : false} />
            {error.weight && (<p className={style.error}>*{error.weight}</p>)}
            <label>Bred for:</label>
            <input name='bred_for' type='text' value={input.bred_for} onChange={handleChange} />
            {error.bred_for && (<p className={style.error}>*{error.bred_for}</p>)}
            <label>Breed group:</label>
            <input name='breed_group' type='text' value={input.breed_group} onChange={handleChange} />
            {error.breed_group && (<p className={style.error}>*{error.breed_group}</p>)}
            <div className={style.containerError}>
            </div>
          </div>
          <div className={style.wrap2}>
            <label>Life span:</label>
            <input name='life_span' type='text' value={input.life_span} onChange={handleChange} disabled={!input.weight || error.weight || error.bred_for || error.breed_group ? true : false} />
            {error.life_span && (<p className={style.error}>*{error.life_span}</p>)}
            <label>Origin:</label>
            <input name='origin' type='text' value={input.origin} onChange={handleChange} disabled={!input.life_span ? true : false} />
            {error.origin && (<p className={style.error}>*{error.origin}</p>)}


            <label>Image:</label>
            <input type="file" name="image" accept="image/*" onChange={handleChangeImage} disabled={images.length} />


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
                      <button value={t} className={style.x} onClick={(e) => handleDelete(e)}>X</button>
                    </div>
                  )
                })
              }
            </ul>
          </div>
          <div className={style.containerSend}>
      <button>Create dog</button>
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
          { images.length ? images.map(image => {
            return (<img className='h-60 w-80' src={image.url ? image.url : search} />)
          }) : <img className='h-60 w-80' src={search} alt=''/>
          }
          <p className='m-2 text-white font-[600]'>{input.breed_group ? input.breed_group : 'wi'}</p>
          <p className='m-2 text-white font-[600]'>{input.origin ? input.origin : 'wi'}</p>
          </div>
    </div> Agregar esta información en un modal para luego crear un botón que diga "mostrar progreso"*/}
    </div>
    
    )
  }

export default CreateDog