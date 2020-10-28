import React, { createContext, useContext, useEffect, useReducer } from 'react'
import { useHistory } from 'react-router-dom'
import { FirebaseContext } from './FirebaseState'

interface AuthState {
  loggedUser: firebase.User | undefined
  setLoggedUser: (user: firebase.User) => void
  authenticate: (login: string, password: string) => Promise<boolean>
  isAuthenticated: () => boolean
  logout: () => void
  isCheckingAuth: boolean
}

type TAuthActionTypes = 'SET_LOGGED_USER' | 'CHECKING_AUTH'

interface AuthActions {
  type: TAuthActionTypes
  payload: any
}

type TReducerHandler = {
  [key in TAuthActionTypes]: (action: AuthActions) => AuthState
}

const initialState: AuthState = {
  loggedUser: undefined,
  setLoggedUser: () => null,
  authenticate: () => Promise.resolve(false),
  isAuthenticated: () => false,
  logout: () => undefined,
  isCheckingAuth: false
}

export const AuthContext = createContext<AuthState>(initialState)

function reducer(state: AuthState, action: AuthActions): AuthState {
  const reducerHandler: TReducerHandler = {
    SET_LOGGED_USER: action => {
      return { ...state, user: action.payload, isCheckingAuth: false }
    },
    CHECKING_AUTH: action => {
      return { ...state, isCheckingAuth: true }
    }
  }
  return reducerHandler[action.type](action)
}

const AuthState: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const history = useHistory()

  const { auth } = useContext(FirebaseContext)

  async function authenticate(login: string, password: string): Promise<boolean> {
    if (!auth) {
      return false
    }

    try {
      const result = await auth.signInWithEmailAndPassword(login, password)
      return true
    } catch (e) {
      return false
    }
  }

  function setLoggedUser(user: firebase.User): void {
    dispatch({ type: 'SET_LOGGED_USER', payload: user })
  }

  function isAuthenticated(): boolean {  
    if (!auth) {
      return false
    }

    if (state.loggedUser) {
      return true
    }

    return auth.currentUser !== null
  }

  function logout() {
    if (!auth) {
      return
    }
    auth.signOut()
  }

  useEffect(() => {
    if (state.loggedUser || !auth) {
      return
    }

    dispatch({ type: 'CHECKING_AUTH', payload: null })

    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        dispatch({ type: 'SET_LOGGED_USER', payload: user })
        history.replace('/queue')
      } else {
        dispatch({ type: 'SET_LOGGED_USER', payload: null })
        history.replace('/')
      }
    })

    return () => {
      unsubscribe()
    }
  }, [auth, history])

  const contextValue = {
    ...state,
    setLoggedUser,
    authenticate,
    isAuthenticated,
    logout
  }

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

export default AuthState
