import { Switch, Route } from "react-router-dom";
import Register from './page/Register'
import Login from './page/Login'
import Logout from './page/Logout'
import MainPage from './page/MainPage'
import Profile from './page/Profile'
import Todo from './page/Todo'

const routes = [
  { path: '/', exact: true, component: MainPage },
  { path: '/register', component: Register },
  { path: '/login', component: Login },
  { path: '/logout', component: Logout },
  { path: '/profile', component: Profile },
  { path: '/todo', component: Todo },
]

function App() {
  return (
    <Switch>
      {routes.map(({ path, exact, component: Component }) => <Route key={path} path={path} exact={exact}><Component /></Route>)}
    </Switch>
  );
}

export default App;
