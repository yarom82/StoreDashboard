import React from 'react'
import { withStyles } from "@material-ui/core/styles"
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import CircularProgress from "@material-ui/core/CircularProgress"
import green from "@material-ui/core/colors/green"
import { Button } from "material-ui"

const styles = theme => ({
  loginCard: {
    backgroundColor: '#eee',
    width: 580,
    padding: 40,
    margin: '0 auto',
    color: 'black'
  },
  loadingProgress: {
    visibility: 'visible'
  },
  loadingProgressHidden: {
    visibility: 'hidden'
  },
  formItem: {
    padding: 20
  }
})

class LoginForm extends React.Component {
  state = {
    data: {
      username: '',
      password: ''
    },
    loading: false,
    errors: {}
  }

  onChange = (e) =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    })
  
  onSubmit = e => {
    const errors = this.validate(this.state.data)
    this.setState({ errors })
    if (!errors.username && !errors.password) {
      this.setState({ loading: true})
      this.props.submit(this.state.data)
        // .catch(err =>
          // this.setState({ errors: err.response.data.errors, loading: false })
        // )
    }
    e.preventDefault()
  }

  validate = (data) => {
    const errors = {}
    if (!data.username) errors.username = "Can't be blank"
    if (!data.password) errors.password = "Can't be blank"
    return errors
  }

  render() {
    const { data, errors, loading } = this.state
    const { classes } = this.props
    
    return (
      <div>
        <Card className={classes.loginCard}>
          <CardContent>
            <h3>Login page</h3>
            <div className={loading ? classes.loadingProgress : classes.loadingProgressHidden}>
              <CircularProgress style={{ color: green[500] }}/>
            </div>
            <form autoComplete="off" onSubmit={this.onSubmit}>
                <div className={classes.formItem}>
                  <FormControl fullWidth error={!!errors.username}>
                    <InputLabel htmlFor="username">User Name</InputLabel>
                    <Input id="username" name="username" value={data.username} onChange={this.onChange} />
                    <FormHelperText id="username-text">{errors.username}</FormHelperText>
                  </FormControl>
                </div>
                <div className={classes.formItem}>
                  <FormControl fullWidth error={!!errors.password}>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input type="password" id="password" name="password" value={data.password} onChange={this.onChange} />
                    <FormHelperText id="password-text">{errors.password}</FormHelperText>
                  </FormControl>
                </div>
                <div className={classes.formItem}>
                  <Button fullWidth type="submit">Login</Button>
                </div>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }
}

export default withStyles(styles)(LoginForm)
