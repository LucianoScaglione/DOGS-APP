import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { detailDogs, clearState, createComment, getComments } from '../redux/actions'
import style from './styles/Detail.module.css'
import gifDog from '../images/dogRunning.gif'
import { isAuthenticated } from './AuthService'

const Detail = (props) => {
  const userId = isAuthenticated()
  const [comment, setComment] = useState('')
  const [seeMore, setSeeMore] = useState(false)
  const comments = useSelector(state => state.comments)
  console.log("comments: ", comments)
  const id = props.match.params.id
  const dispatch = useDispatch()
  const detailDog = useSelector(state => state.detailDog)
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(createComment({ id: id, comment: comment, userId: userId.user.id }))
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
          <p className={style.back}>Back</p>
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
      {!seeMore ? <button className={style.seeMore} onClick={() => setSeeMore(true)}>See more</button> : <button className={style.close} onClick={() => setSeeMore(false)}>Close</button>}
      {seeMore &&
        <div className={style.containerLower}>
          <h3 className={style.detailh3}>We would like to know what you think of this breed!</h3>
          <textarea className={style.detailTextArea} placeholder='Add your comment' maxLength={140} onChange={(e) => setComment(e.target.value)} /> <br />
          <button onClick={handleSubmit}>Send</button>
          <h4 className={style.detailh4}>Comments:</h4>
          {comments ? comments.map(c => {
            return (
              <div className={style.detailInfoUser} value={c.DogId}>
                <p>{c.User.fullname} says:</p>
                <p>{c.comment}</p>
              </div>
            )
          }) : <p>Without comments</p>}
        </div>
      }
    </div>
  )
}

export default Detail