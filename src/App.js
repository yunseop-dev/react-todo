import { Switch, Route } from "react-router-dom";
import Register from './page/Register'
import Login from './page/Login'
import Logout from './page/Logout'
import Profile from './page/Profile'
import Todo from './page/Todo'

import React from "react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import useLocalStorage from "./lib/useLocalStorage"
import styled from "styled-components";
import useUser from "./swr/useUser";

const Header = styled.header`
    display: flex;
    justify-content: space-between;
    position: sticky;
    top: 0;
    font-size: 2rem;
    margin: 1rem;
`

const Navigation = styled.nav`
    ul {
        display: flex;
        li {
            margin: auto 1rem;
            a {
              color: inherit;
              text-decoration: none;
              &:hover {
                background: #eee;
              }
            }
        }
    }    
`

const routes = [
  { path: '/register', component: Register },
  { path: '/login', component: Login },
  { path: '/logout', component: Logout },
  { path: '/profile', component: Profile },
  { path: '/todo', component: Todo },
]

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [token] = useLocalStorage('token');
  const { user } = useUser(token);

  useEffect(() => {
    if (token || user) setIsLoggedIn(true)
  }, [token, user])

  return (<>
    <Header>
      {user ? <span>{user.name}'s Todo</span> : <span>Todo App</span>}
      <Navigation>
        <ul>
          {
            (!isLoggedIn ? [
              { path: '/register', name: '회원가입' },
              { path: '/login', name: '로그인' },
            ] : [
              { path: '/profile', name: '프로필' },
              { path: '/todo', name: '할일' },
              { path: '/logout', name: '로그아웃' },
            ]).map(({ path, name }) => <li key={path}><Link to={path}>{name}</Link></li>)
          }
        </ul>
      </Navigation>
    </Header>
    <Switch>
      {routes.map(({ path, exact, component: Component }) => <Route key={path} path={path} exact={exact}><Component /></Route>)}
    </Switch>
  </>
  );
}

export default App;
