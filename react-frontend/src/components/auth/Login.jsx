import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../Axios";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export default function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const location = useLocation();
    const navigate = useNavigate();

    function login(event) {
        event.preventDefault();

        axiosInstance
            .post(`token/`, {
                username: username,
                password: password
            })
            .then((response) => {
                localStorage.setItem('access_token', response.data.access);
                localStorage.setItem('refresh_token', response.data.refresh);
                axiosInstance.defaults.headers['Authorization'] =
                    'JWT ' + localStorage.getItem('access_token');
                navigate('/')
            });
    }

    return (
        // <form className="w-full max-w-sm" id="customer" onSubmit={login}>

        //     <div className="md:flex md:items-center mb-6">
        //         <div className="md:w-1/4">
        //             <label htmlFor="username">Username</label>
        //         </div>
        //         <div className="md:w-3/4">
        //             <input
        //                 id="username"
        //                 className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
        //                 type="text"
        //                 value={username}
        //                 onChange={(e) => {
        //                     setUsername(e.target.value)
        //                 }}
        //             />
        //         </div>
        //     </div>

        //     <div className="md:flex md:items-center mb-6">
        //         <div className="md:w-1/4">
        //             <label htmlFor="password">Password</label>
        //         </div>
        //         <div className="md:w-3/4">
        //             <input
        //                 id="password"
        //                 className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
        //                 type="password"
        //                 value={password}
        //                 onChange={(e) => {
        //                     setPassword(e.target.value)
        //                 }}
        //             />
        //         </div>
        //     </div>
        //     <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">Login</button>
        // </form>
        <Container>
            <Row>
                <Col>
                    <Form onSubmit={login}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Username" onChange={(e) => { setUsername(e.target.value) }} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={(e) => { setPassword(e.target.value) }} />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}
