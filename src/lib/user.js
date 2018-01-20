import { GC_USER_ID, GC_AUTH_TOKEN } from './constants'

export const logout = () => {
  window.localStorage.removeItem(GC_USER_ID)
  window.localStorage.removeItem(GC_AUTH_TOKEN)
}

export const getUser = () => {
  return {
    userId: window.localStorage.getItem(GC_USER_ID),
    authToken: window.localStorage.getItem(GC_AUTH_TOKEN)
  }
}

export const setUser = (id, token) => {
  window.localStorage.setItem(GC_USER_ID, id)
  window.localStorage.setItem(GC_AUTH_TOKEN, token)
}
