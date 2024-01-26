import { useDispatch, useSelector } from "react-redux"
import {NavLink, Link} from "react-router-dom"
import { checkIsAuth, logout } from "../redux/features/auth/authSlice"
import { toast } from "react-toastify"

export const Navbar = () => {
  const isAuth = useSelector(checkIsAuth)
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
    window.localStorage.removeItem('token')
    toast("Вы вышли из системы");
  }

  const navList = [
    {
      id: 1,
      title: "Главная",
      href: "/"
    },
    {
      id: 2,
      title: "Мои посты",
      href: "/posts"
    },
    {
      id: 3,
      title: "Добавить пост",
      href: "/new"
    }
  ]

  const activeStyle = {
    color: "white"
  }

  const style = ({ isActive }) => isActive ? activeStyle : null;


  return (
    <div className="flex py-4 justify-between items-center">
      <Link to='/'>
        <span className="flex justify-center items-center w-6 h-6 bg-gray-600 text-xs text-white rounded-sm">
          VS
        </span>
      </Link>
      {
        isAuth && (
          <ul className="flex gap-8">
          {navList.map(item => <li key={item.id}>
            <NavLink to={item.href} style={style} className={"text-xs text-gray-400 hover:text-white"}>{item.title}</NavLink>
            </li>
          )}
        </ul>
        )
      }
      <div className="flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm px-4 py-2">
        {isAuth ? (
          <button onClick={logoutHandler}>
            Выйти
          </button>
        ) : (
          <Link to="/login">Войти</Link>
        )}
    
      </div>
    </div>
  )
}
