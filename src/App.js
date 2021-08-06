import { Switch, Route } from "react-router-dom";
import Register from './page/Register'
import Login from './page/Login'
function App() {
  return (
    <Switch>
      <Route path='/' exact>
        Todo App
      </Route>
      <Route path="/register">
        <Register />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
    </Switch>
  );
}

export default App;
