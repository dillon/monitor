// PasswordReset.js

// Login.js
import React from 'react'

import { StyleSheet, Text, TextInput, View, Button } from 'react-native'

import firebase from 'react-native-firebase'

export default class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = { email: '', password: '', errorMessage: null }
    }

    handleReset = () => {
        const { email } = this.state
        firebase.auth()
            .sendPasswordResetEmail(email)
            .then(() => this.props.navigation.navigate('Login', { confirmReset: 'Password Reset email sent.' }))
            .catch(error => this.setState({ errorMessage: error.message }))
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Reset Password</Text>
                {this.state.errorMessage &&
                    <Text style={{ color: 'red' }}>
                        {this.state.errorMessage}
                    </Text>}
                <TextInput
                    autoFocus
                    style={styles.textInput}
                    autoCapitalize="none"
                    placeholder="Email"
                    onChangeText={email => this.setState({ email })}
                    value={this.state.email}
                    onSubmitEditing={this.handleReset}
                    returnKeyType='done'
                />
                <Button title="Reset" onPress={this.handleReset} />
                <Button
                    title="Cancel"
                    onPress={() => this.props.navigation.navigate('Login')}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        marginTop: 100,
        alignItems: 'center'
      },
    textInput: {
        padding: 8,
        width: '90%',
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 8
    }
})
