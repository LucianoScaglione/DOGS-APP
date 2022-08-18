import { Route } from 'react-router-dom'
import CreateDog from './components/CreateDog'
import Detail from './components/Detail'
import Home from './components/Home'
import LandingPage from './components/LandingPage'

function App() {
  return (
    <>
      <Route exact path='/' component={LandingPage} />
      <Route exact path='/home' component={Home} />
      <Route exact path='/detail/:id' component={Detail} />
      <Route exact path='/create' component={CreateDog} />
    </>
  )
}

export default App
