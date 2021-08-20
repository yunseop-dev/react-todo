import { Switch, Route } from "react-router-dom";
import Register from './page/Register'
import Login from './page/Login'
import Logout from './page/Logout'
import Profile from './page/Profile'
import Todo from './page/Todo'

import React, { useCallback } from "react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import useLocalStorage from "./lib/useLocalStorage"
import { getUser, Types } from './modules/user'
import useFetchInfo from "./lib/useFetchInfo";
import styled from "styled-components";
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
  const user = useSelector(state => state.user.user)
  const dispatch = useDispatch()
  const onLoadUser = useCallback(() => dispatch(getUser()), [dispatch])
  const [token] = useLocalStorage('token');
  const { isFetched } = useFetchInfo(Types.GET_USER)

  useEffect(() => {
    if (token || user) setIsLoggedIn(true)
  }, [token, user])

  useEffect(() => {
    if (!isFetched && token) {
      onLoadUser()
    }
  }, [onLoadUser, isFetched, token])

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
