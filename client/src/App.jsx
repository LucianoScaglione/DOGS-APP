import { Route } from 'react-router-dom'
import CreateDog from './components/CreateDog'
import Detail from './components/Detail'
import Home from './components/Home'
import LandingPage from './components/LandingPage'
import Loading from './components/Loading'
import Login from './components/Login'
// import { UserProvider } from './context/UserContext'

function App() {
  return (
    <>
      {/* <UserProvider> */}
      <Route exact path='/' component={LandingPage} />
      <Route exact path='/home' component={Home} />
      <Route exact path='/detail/:id' component={Detail} />
      <Route exact path='/create' component={CreateDog} />
      <Route exact path='/login' component={Login} />
      {/* </UserProvider> */}
    </>
  )
}

export default App
