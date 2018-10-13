import React from 'react';
import { createSwitchNavigator } from 'react-navigation'

// import the different screens
import Loading from './screens/Loading'
import SignUp from './screens/SignUp'
import Login from './screens/Login'
import Main from './screens/Main'
import PasswordReset from './screens/PasswordReset'
import Transactions from './screens/Transactions'
import Wallets from './screens/Wallets'
import Settings from './screens/Settings'




// create our app's navigation stack
const App = createSwitchNavigator(
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

export default App