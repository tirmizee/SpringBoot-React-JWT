import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import AuthenManager from '../../commons/AuthenManager';
import ApiManager from '../../commons/APIManager';
import { Alert, Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row, FormFeedback, FormGroup } from 'reactstrap';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: {
        isError : false,
        errorMessage : ''
      }
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.validate = this.validate.bind(this); 
  }

  setSateError(error, callback){
    return this.setState({
      ...this.state,
      error : error
    }, callback);
  }

  onChange(e){
    this.setState({
      [e.target.name] : e.target.value
    }) 
  }

  validate(){
    let isValid = true;
    return isValid;
  }

  onSubmitForm(e){
    e.preventDefault();

    const {username , password} = this.state;
    let usernameAndPassword = username + ':' + password;
    let usernameAndPasswordBase64 = btoa(usernameAndPassword);

    AuthenManager.login(usernameAndPasswordBase64, (response) => {
      if (response.status == 200 && response.data.status){
        AuthenManager.setAuthenticated(response.data.data.token);
        this.props.history.push('/'); 
      } else {
        const error = {
          isError : true,
          errorMessage : '[ER001] : username or password invalid!'
        }

        this.setSateError(error, () => { 
          setTimeout(() => {
            this.setSateError({isError : false})
          },7000);
        });
       
      }
    });

  }

  render() {
    const {error} = this.state;
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form onSubmit={this.onSubmitForm}>
                      <h1>Login</h1>
                      <p className="text-muted"><small>Sign In to your account</small></p>
                      
                      {error.isError && 
                        <Alert color="danger">
                          {error.errorMessage}
                        </Alert>
                      }
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" name="username"  value={this.state.username} onChange={this.onChange} placeholder="Username" autoComplete="username" />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" name="password" value={this.state.password} onChange={this.onChange} placeholder="Password" autoComplete="current-password" />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button type="submit" color="primary" className="px-4">Login</Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">Forgot password?</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.</p>
                      <Link to="/register">
                        <Button color="primary" className="mt-3" active tabIndex={-1}>Register Now!</Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
