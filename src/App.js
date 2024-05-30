import {Switch, Route, Redirect} from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import Login from './components/Login'
import NotFound from './components/NotFound'
import Account from './components/Account'
import Popular from './components/Popular'
import Search from './components/Search'
import MovieItemDetails from './components/MovieItemDetails'
import './App.css'

const App = () => (
  <Switch>
    <Route path="/login" component={Login} />
    <ProtectedRoute path="/" component={Home} />
    <ProtectedRoute path="/popular" component={Popular} />
    <ProtectedRoute path="/account" component={Account} />
    <ProtectedRoute path="/movies/:id" component={MovieItemDetails} />
    <ProtectedRoute path="/search" component={Search} />
    <Route path="not-found" component={NotFound} />
    <Redirect to="not-found" />
  </Switch>
)

export default App
