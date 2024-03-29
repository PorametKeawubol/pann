
import React, { useState } from 'react';
import { Form, Button,FloatingLabel,Stack,style,Container,Image} from 'react-bootstrap';
import axios from 'axios';
import axiosConfig from './axios-interceptor';
import { useNavigate } from 'react-router-dom';
import signInImage from './icons_311846.svg';
import { useSessionStorage } from './SessionStorage/useSessionStorage';



const LoginForm = () => {
    const navigate = useNavigate()
    const { setItem, getItem, removeItem, clearStorage } = useSessionStorage();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [submitEnabled, setSubmitEnabled] = useState(true);

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitEnabled(false);
    

        try {
            let result = await axios.post('http://localhost:1337/api/auth/local', {
                identifier: username,
                password: password
            })
            sessionStorage.setItem('jwt', result.data.jwt);
            setItem('jwt', result.data.jwt);
            axiosConfig.jwt = result.data.jwt

            result = await axios.get('http://localhost:1337/api/users/me?populate=role')
            if (result.data.role) {
                if (result.data.role.name == 'Student') {
                    navigate('/student');
                }
            }
            
            console.log(result)
            result = await axios.get('http://localhost:1337/api/users/me?populate=role')
            if (result.data.role) {
                if (result.data.role.name == 'Staff') {
                    navigate('/staff');
                }
            }
            console.log(result)
        } catch (e) {
            console.log(e)
            console.log('wrong username & password')
            setSubmitEnabled(true);
        }
    };

    

    return (
        
        <Form 
        onSubmit={handleSubmit}
        >
            <Stack gap={2} className="col-md-4  min-vh-100 dflex justify-content-center align-item-center mx-auto">
            <Image src={signInImage} alt="Sign In Image" className="mx-auto" width={240} height={240}/>
            
            <Form.Label className="mx-auto" ><h2 >Please sign in
            </h2></Form.Label>
            <Form.Group controlId="formBasicUsername">
            <FloatingLabel controlId="formBasicUsername" label="Username">
                <Form.Control
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={handleUsernameChange}
                    required
                /></FloatingLabel>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
            <FloatingLabel controlId="formBasicPassword" label="Password">
                <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                /></FloatingLabel>
            </Form.Group>

            <Button variant="primary" type="submit" disabled={!submitEnabled}>
                Submit
            </Button></Stack>
        </Form>
        
   
    );
};

export default LoginForm;
