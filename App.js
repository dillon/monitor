import React from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation'

// import the different screens
import Loading from './screens/Loading'
import SignUp from './screens/SignUp'
import Login from './screens/Login'
import MainRouter from './screens/MainRouter'
import PasswordReset from './screens/PasswordReset'




// create our app's navigation stack
const AppNavigator = createSwitchNavigator(
  {
    Loading,
    SignUp,
    Login,
    MainRouter,
    PasswordReset
  },
  {
    initialRouteName: 'Loading'
  }
)
const AppContainer = createAppContainer(AppNavigator)

export default AppContainer