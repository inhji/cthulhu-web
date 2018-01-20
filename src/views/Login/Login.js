import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import { createUserMutation, signinUserMutation } from '../../lib/queries'
import { setUser } from '../../lib/user'
import {
  Container,
  Row,
  Col,
  CardGroup,
  Card,
  CardBody,
  Button,
  Input,
  InputGroup,
  InputGroupAddon
} from 'reactstrap'

class Login extends Component {
  state = {
    email: '',
    password: ''
  }

  handleLogin = async () => {
    const { email, password } = this.state

    console.log(this.props)

    try {
      this.setState({ error: null })
      const result = await this.props.signinUserMutation({
        variables: {
          email,
          password
        }
      })
      const id = result.data.authenticateUser.id
      const token = result.data.authenticateUser.token
      setUser(id, token)
      this.props.history.push('/habits')
    } catch (e) {
      console.log(e)
      // this.handleErrors(e)
    }
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup className="mb-4">
                <Card className="p-4">
                  <CardBody>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon>
                        <i className="icon-user" />
                      </InputGroupAddon>
                      <Input
                        type="email"
                        placeholder="Email"
                        onChange={e => this.setState({ email: e.target.value })}
                      />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon>
                        <i className="icon-lock" />
                      </InputGroupAddon>
                      <Input
                        type="password"
                        placeholder="Password"
                        onChange={e => this.setState({ password: e.target.value })}
                      />
                    </InputGroup>
                    <Row>
                      <Col xs="6">
                        <Button color="primary" className="px-4" onClick={this.handleLogin}>
                          Login
                        </Button>
                      </Col>
                      <Col xs="6" className="text-right">
                        <Button color="link" className="px-0">
                          Forgot password?
                        </Button>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
                <Card className="text-white bg-success d-md-down-none" style={{ width: 44 + '%' }}>
                  <CardBody className="text-center">
                    <img src="img/cthulhu.png" className="img-fluid" alt="Responsive image" />
                    <h3>Cthulhu v0.1</h3>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default compose(
  graphql(createUserMutation, { name: 'createUserMutation' }),
  graphql(signinUserMutation, { name: 'signinUserMutation' })
)(withRouter(Login))
