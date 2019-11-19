import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import {
  withRouter
} from "react-router-dom";

import Config from '../Config';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      loading: false,
    };

    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.login = this.login.bind(this);
  }

  onEmailChange(e) {
    this.setState({email: e.target.value});
  }

  onPasswordChange(e) {
    this.setState({password: e.target.value});
  }

  login(e) {
    e.preventDefault();
    const { history } = this.props;
    const url = Config.apiUrl + '/auth/login';
    const data = {
      email: this.state.email,
      password: this.state.password
    };

    axios.post(url, data, {withCredentials: true})
        .then(response => {
          history.push('/admin');
        });
  }

  render() {
    return (
      <Container className="mt-5 pt-5">
        <Row>
          <Col xl={{span: 4, offset: 4}}>
            <Form onSubmit={this.login}>
              <Form.Group controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                    value={this.state.email}
                    type="email"
                    onChange={this.onEmailChange}
                    placeholder="Enter email" />
              </Form.Group>

              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    value={this.state.password}
                    type="password"
                    onChange={this.onPasswordChange}
                    placeholder="Password" />
              </Form.Group>
              <Button
                  variant="primary"
                  type="submit"
                  disabled={this.state.loading}>
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default withRouter(Login);
