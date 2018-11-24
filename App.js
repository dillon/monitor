import React from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation'

// import the different screens
import Loading from './screens/Loading'
import SignUp from './screens/SignUp'
import Login from './screens/Login'
import Main from './screens/Main'
import PasswordReset from './screens/PasswordReset'




// create our app's navigation stack
const AppNavigator = createSwitchNavigator(
  {
    Loading,
    SignUp,
    Login,
    Main,
    PasswordReset
  },
  {
    initialRouteName: 'Loading'
  }
)
const AppContainer = createAppContainer(AppNavigator)

export default AppContainer