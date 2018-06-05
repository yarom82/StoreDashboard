import React from 'react'
import { connect } from 'react-redux'
import LoginForm from '../forms/LoginForm.jsx' 
import { login } from '../../actions/auth'

class LoginPage extends React.Component {

  submit = (data) =>
    this.props.login(data)
      .then(result => result.sessionId.json())
      // .then(save sessionId in client)
      .then(() => this.props.history.push('/'))

  render() {
    return (
      <div>
        <LoginForm submit={this.submit} />
      </div>
    )
  }
}

export default connect(null, { login })(LoginPage)
