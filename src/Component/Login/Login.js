import React, { useRef } from 'react';
import './Login.css'
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../App';
import { createUserWithEmailAndPassword, handleGoogle, initializeApp, signInWithEmailAndPassword} from './LoginManagement';
import { useHistory, useLocation } from 'react-router';
import Header from '../Home/Header/Header';
import { Button, Col, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import google from '../../images/google.svg'

initializeApp();
const Login = () => {
    const [newUser, setNewUser] = useState(false)
    const [user, setUser] = useState({
        error: '',
        name: ''
    });
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [loggedIn, setLoggedIn] = useContext(UserContext)
    const password = useRef({});
    password.current = watch("password", "");
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };
    const googleSignIn = () => {
        handleGoogle()
            .then(res => {
                setUser(res)
                setLoggedIn(res);
                if (!res.error) {
                    history.replace(from);
                }
            })
    }
    const onSubmit = (data) => {
        if (newUser === true) {
            createUserWithEmailAndPassword(data.name, data.email, data.password)
                .then(res => {
                    setUser(res);
                    setLoggedIn(res);
                    if (!res.error) {
                        history.replace(from);
                    }
                })
        }
        if (!newUser && data.email && data.password) {
            signInWithEmailAndPassword(data.email, data.password)
                .then(res => {
                    setUser(res)
                    setLoggedIn(res);
                    if (!res.error) {
                        history.replace(from);
                    }


                })
        }
    };
    return (
        <section className='loginContainer'>
            <Header></Header>
            <div>
                <Col md="5" className="mx-auto my-5  p-4 px-4 formStyle text-white text-center"
                >
                    <Form onSubmit={handleSubmit(onSubmit)}>

                        {
                            newUser && <h4>Create an account</h4>
                        }
                        {
                            !newUser && <h4>Login</h4>
                        }

                        {
                            newUser && <Form.Group controlId="name">
                                <Form.Control type="text" name="name" {...register("name", ({ required: true }))} placeholder="Write your name" />
                                {errors.name && <span className='text-danger'>This field is required</span>}

                            </Form.Group>
                        }
                        {newUser && errors.name && <span className="error">This field is required</span>}
                        <Form.Group controlId="email">
                            <Form.Control type="text" name="email" {...register("email", ({ required: true }))} placeholder="Your email" />
                            {errors.email && <span className='text-danger'>This field is required</span>}

                        </Form.Group>
                        <Form.Group controlId="password">
                            <Form.Control name="password" {...register("password", ({ required: true }))} type="password" placeholder="Your password" />
                            {errors.password && <span className='text-danger'>This field is required</span>}
                        </Form.Group>
                        {
                            newUser && <Form.Group controlId="confirmed">
                                <Form.Control type="password" name="confirmed" {...register('confirmed', {
                                    validate: value =>
                                        value === password.current || "The passwords do not match"
                                })}
                                    placeholder='Confirmed your password' />
                            </Form.Group>

                        }
                        {
                            newUser && errors.confirmed && <p className='text-danger'>{errors.confirmed.message}</p>
                        }
                        <Form.Group className="text-center">
                            <Button variant="info" type="submit" block>
                                {newUser ? "SignUp" : "Login"}
                            </Button>
                            {
                                newUser && <h6 onClick={() => setNewUser(!newUser)}>Already have an account?<Link to="#"> Login</Link></h6>
                            }
                            {
                                !newUser && <h6 className='mt-3' onClick={() => setNewUser(!newUser)}> <small>Don't have an account?<Link to="#"> Create an account</Link></small> </h6>
                            }
                        </Form.Group>
                        <button className='loginButton mt-2' onClick={googleSignIn}><img src={google} alt="" width='100' /></button>
                    </Form>

                </Col>
            </div>
        </section>
    );
};

export default Login;