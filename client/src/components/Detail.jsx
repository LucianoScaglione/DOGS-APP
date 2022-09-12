import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { detailDogs, clearState, createComment, getComments } from '../redux/actions'
import style from './styles/Detail.module.css'
import gifDog from '../images/dogRunning.gif'

const Detail = (props) => {
  const [comment, setComment] = useState('')

  const comments = useSelector(state => state.comments)
  console.log("comments", comments)

  const id = props.match.params.id
  const dispatch = useDispatch()
  const detailDog = useSelector(state => state.detailDog)
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(createComment({id: id, comment: comment}))
    setComment('')
    window.location.reload()
  }
  useEffect(() => {
    dispatch(detailDogs(id)),
    dispatch(getComments(id))
    return () => {
      dispatch(clearState())
    }
  }, [dispatch])
  return (
    <div className={style.detail}>
      <div className={style.detailContainer}>
      <Link to='/home'>
        <p>Volver</p>
      </Link>
        <div className={style.detailBody}>
        <img className={style.detailImg} src={detailDog.image} alt='Not found' />
        <div className={style.detailDescription}>
          <h1 className={style.detailTitle}>{detailDog.name}</h1>
          <h3 className={style.detailAboutme}>About me</h3>
        <p className={style.detailCategory}>Weight: {detailDog.weight}</p>
        <p className={style.detailCategory}>Bred for: {detailDog.bred_for}</p>
        <p className={style.detailCategory}>Life span: {detailDog.life_span}</p>
        <p className={style.detailCategory}>Temperament: {detailDog.temperament}</p>
        <img className={style.detailGif} src={gifDog} />
        </div>
        </div>
      </div>
      <div className={style.prueba}>
      <p>¡Nos gustaría saber qué opinas de esta raza!</p>
    <textarea onChange={(e) => setComment(e.target.value)} />
    <button onClick={handleSubmit}>CLick</button>
    { comments.length ? comments.map(c => {
      return (
        <div value={c.DogId}>
          <p>{c.userID} dice:</p>
          <p>{c.comment}</p>
        </div>
      )
    }) : 'Without comments'}
    </div>
    </div>
  )
}

export default Detail
