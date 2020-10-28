import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { AuthContext } from '../states/AuthState'

interface PrivateRouteProps {
  path: string
  component: React.FC
  exact?: boolean
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ path, component, exact = false }) => {
  const { isAuthenticated } = useContext(AuthContext)
  
  if (isAuthenticated()) {
    return <Route path={path} exact={exact} component={component} />
  }

  return <Redirect to="/" />
}

export default PrivateRoute
