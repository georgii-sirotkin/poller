import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import Config from '../Config';

export default function Login({ isLoggedIn, onLogIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isInvalidData, setIsInvalidData] = useState(false);

  function handleEmailChange(e) {
    setEmail(e.target.value);
    setIsInvalidData(false);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
    setIsInvalidData(false);
  }

  function login(e) {
    e.preventDefault();

    if (isInvalidData) {
      return;
    }

    setIsLoading(true);

    const url = Config.apiUrl + '/auth/login';
    const data = { email, password };

    axios.post(url, data, { withCredentials: true })
      .then(response => {
        setIsLoading(false);
        onLogIn(response.data);
      })
      .catch(error => {
        if (error.response.status === 422) {
          setPassword('');
          setIsInvalidData(true);
          setIsLoading(false);
          return;
        }

        alert('Something went wrong');
      });
  }

  if (isLoggedIn) {
    return <Redirect to="/admin/dashboard/polls" />
  }

  return (
    <Container className="mt-5 pt-5">
      <Row>
        <Col xl={{span: 4, offset: 4}}>
          <Form onSubmit={login}>
            <Form.Group controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                  value={email}
                  type="email"
                  onChange={handleEmailChange}
                  placeholder="Enter email"
                  className={isInvalidData ? 'is-invalid' : ''}
                  required />
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                  value={password}
                  type="password"
                  onChange={handlePasswordChange}
                  placeholder="Password"
                  required />
            </Form.Group>
            <Button
                variant="primary"
                type="submit"
                disabled={isLoading}>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
