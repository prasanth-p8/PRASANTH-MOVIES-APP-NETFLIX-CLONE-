import {Switch, Route, Redirect} from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import NotFound from './components/NotFound'
import './App.css'

const App = () => (
  <Switch>
    <ProtectedRoute path="/" component={Home} />
    <Route path="not-found" component={NotFound} />
    <Redirect to="not-found" />
  </Switch>
)

export default App
