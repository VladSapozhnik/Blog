import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { registerUser, checkIsAuth } from "../redux/features/auth/authSlice";
import { toast } from "react-toastify";

export const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {status} = useSelector(state => state.auth);
  const isAuth = useSelector(checkIsAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (status) {
      toast(status);
    }
    if (isAuth) navigate("/");
  }, [status, isAuth, navigate])

  const handleSubmit = () => {
    try {
      if (username.length && password.length) {
        dispatch(registerUser({username, password}));
      }

      setPassword('');
      setUsername('');
    } catch (error) {
      console.log(error)
    }
  }


  return <form onSubmit={e => e.preventDefault()} className="w-1/4 h-60 mx-auto mt-40">
    <h1 className="text-lg text-white text-center">Регистрация</h1>
    <label className="text-xs text-gray-400">
      Username:
      <input type="text" name="username" value={username} onChange={e => setUsername(e.target.value)} autoComplete="on" placeholder="username" className="mt-1 text-black w-full rounded-lg bg-gray-400 border-1 py-1 px-2 text-xs outline-none placeholder:text-gray-700"/>
    </label>
    <label className="text-xs text-gray-400">
      Password:
      <input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} autoComplete="on" placeholder="password" className="mt-1 text-black w-full rounded-lg bg-gray-400 border-1 py-1 px-2 text-xs outline-none placeholder:text-gray-700"/>
    </label>
    <div className="flex gap-8 justify-center mt-4">
      <button type="submit" onClick={handleSubmit} className="flex justify-center items-center text-xs bg-gray-600 py-2 px-4 text-white rounded-sm py-w px-4">
        Потвердить
      </button>
      <Link to="/login" className="flex justify-center items-center text-xs text-white">Зарегистрированный?</Link>
    </div>
  </form>
}
