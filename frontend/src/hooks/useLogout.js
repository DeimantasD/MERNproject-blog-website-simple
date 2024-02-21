import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const {dispatch} = useAuthContext()

  const logout = () => {
    // deleting user from localStorage
    localStorage.removeItem('user')

    // deleting JWT
    dispatch({type: 'LOGOUT'})
  }
  return {logout}
}