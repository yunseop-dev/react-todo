import {
  Switch,
  Route,
  Link
} from "react-router-dom";
import Register from './page/Register'
function App() {
  return (
    <Switch>
      <Route path='/' exact>
        Todo App
      </Route>
      <Route path="/register">
        <Register />
      </Route>
    </Switch>
  );
}

export default App;
