// SignUp.js

import React from 'react'
import { StyleSheet, Text, TextInput, View, Button } from 'react-native'

import firebase from 'react-native-firebase'

export default class SignUp extends React.Component {
    state = { email: '', password: '', errorMessage: null }

    handleSignUp = () => {
        firebase.auth()
            .createUserWithEmailAndPassword(
                this.state.email,
                this.state.password
            )
            .then(
                () => this.props.navigation.navigate('Main')
            )
            .catch(
                error => this.setState({ errorMessage: error.message })
            )
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Sign Up</Text>
                {this.state.errorMessage &&
                    <Text style={{ color: 'red' }}>
                        {this.state.errorMessage}
                    </Text>}
                <TextInput
                    autoFocus
                    placeholder='Email'
                    autoCapitalize='none'
                    style={styles.textInput}
                    onChangeText={email => this.setState({ email })}
                    value={this.state.email}
                    returnKeyType='next'
                    onSubmitEditing={() => { this.secondTextInput.focus(); }}
                    blurOnSubmit={false}
                />
                <TextInput
                    secureTextEntry
                    selectTextOnFocus
                    placeholder='Password'
                    autoCapitalize='none'
                    style={styles.textInput}
                    onChangeText={password => this.setState({ password })}
                    value={this.state.password}
                    ref={(input) => { this.secondTextInput = input; }}
                    onSubmitEditing={this.handleSignUp}
                    returnKeyType='done'
                />
                <Button
                    style={styles.buttons}
                    title='Sign Up' onPress={this.handleSignUp} />
                <Button
                    style={styles.buttons}
                    title='Already have an account? Login'
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