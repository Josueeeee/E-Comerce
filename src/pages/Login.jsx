import axios from 'axios';
import React from 'react';
import { Button, Form, Nav } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Navigate, useNavigate } from 'react-router-dom';

const Login = () => {
    const { register, handleSubmit } = useForm()
    const navigate = useNavigate()


    const submit = (data) => {
        axios.post("https://ecommerce-api-react.herokuapp.com/api/v1/users/login", data)
            .then((res) => {
                navigate("/")
                localStorage.setItem("token", res.data.data.token)
                console.log(res.data)
            })
            .catch(
                error => {
                    if (error.response?.status === 404) {
                        alert("Credenciales no validas")
                    }
                    console.log(error.response)
                }
            )
    }

    return (
        <div className='container body' >
            <div className='login'>
            <Form onSubmit={handleSubmit(submit)}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" {...register("email")} />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" {...register("password")} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
                <p>Don't have a account?</p><a href="#/signup">Sing up</a>
            </Form>
            </div>
        </div>
    );
};

export default Login;