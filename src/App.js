import { Switch, Route } from "react-router-dom";
import Register from './page/Register'
import Login from './page/Login'
import Logout from './page/Logout'
import MainPage from './page/MainPage'

function App() {
  return (
    <Switch>
      <Route path='/' exact>
        <MainPage />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/logout">
        <Logout />
      </Route>
    </Switch>
  );
}

export default App;
