import React, { Component } from 'react'
import { signUpUser } from '../Utils/ApiUtils.js';


export default class SignupPage extends Component {
    state = {
        email: '',
        password: ''
    }


    handleEmailChange = (e) => this.setState({ email: e.target.value })

    handlePasswordChange = (e) => this.setState({ password: e.target.value })

    handleSubmit = async e => {
        e.preventDefault();
        try {
            const user = await signUpUser(this.state.email, this.state.password);

            this.props.handleUserChange(user);

            this.props.history.push('/favorites');
        } catch (e) {
            this.setState({ error: e.response.body.error })
        }
    }
    render() {
        return (
            <div>
                <h3>Sign Up</h3>

                <form onSubmit={this.handleSubmit}>
                    <label >
                        email
                    <input value={this.state.email} onChange={this.handleEmailChange} />
                    </label>

                    <label >
                        password
                    <input value={this.state.password} onChange={this.handlePasswordChange} />
                    </label>
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}
