import axios from 'axios';
import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
const SingUp = () => {
    const { register, handleSubmit } = useForm()
    const navigate = useNavigate()
    
    const createUser = (data) =>{
        console.log(data)
        localStorage.setItem("data", data)
        alert("user created")
        axios.post("https://ecommerce-api-react.herokuapp.com/api/v1/users", data)
        .then(()=>{
                    navigate("/Login")})
        .catch(error => alert(error.response.data.message))
    }

    return (


        <div>
             <div className='container body' >
            <div className='login'>
            <Form onSubmit={handleSubmit(createUser)}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" placeholder="First Name" {...register("firstName")} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" placeholder="Last Name" {...register("lastName")} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Email" {...register("email")} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="text" placeholder="Password" {...register("password")} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control type="text" placeholder="Phone" {...register("phone")} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Role</Form.Label>
                    <Form.Control type="text" placeholder="role" {...register("role")} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            </div>
        </div>
        </div>
    );
};

export default SingUp;