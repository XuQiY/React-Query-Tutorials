import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import './App.css'
import { HomePage } from './components/Home.page'
import { RQSuperHeroesPage } from './components/RQSuperHeroes.page'
import { SuperHeroesPage } from './components/SuperHeroes.page'
import Todo from './components/Todos.page'
import {ReactQueryProvider} from './react-query'
function App() {
  return (
    <ReactQueryProvider>
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/super-heroes'>Traditional Super Heroes</Link>
            </li>
            <li>
              <Link to='/rq-super-heroes'>RQ Super Heroes</Link>
            </li>
            <li>
              <Link to='/todo'>Todo</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path='/super-heroes'>
            <SuperHeroesPage />
          </Route>
          <Route path='/rq-super-heroes'>
            <RQSuperHeroesPage />
          </Route>
          <Route path='/todo'>
            <Todo />
          </Route>
          <Route path='/'>
            <HomePage />
          </Route>
          
        </Switch>
      </div>
    </Router>
    </ReactQueryProvider>
  )
}

export default App
