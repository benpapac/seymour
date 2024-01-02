import {useState, useEffect} from 'react';
import { Link} from 'react-router-dom';
import { useMutation, gql } from '@apollo/client';
import {client} from '../../index';

import './Api.css';
import ApiSidePanel from './ApiSidePanel';
const Api = () => {
     const LOGIN = gql`
       mutation login($email: String!, $password: String!) {
            login(email: $email, password: $password) {
                token
                user {
                    name
                }
            }
}
    `;
    
    const [login, {data, loading, error}] = useMutation(LOGIN);
    const [loginMessage, setLoginMessage] = useState( !sessionStorage.getItem("token") ? "Log In" : "Log Out");
    const [formState, setFormState] = useState({ email: '', password: ''});
    const [loggedIn, setLoggedIn] = useState(false);


    const handleChange = (e) => {
        e.preventDefault();

        let key = e.target.id;
        let val = e.target.value;

        setFormState({...formState, [key]: val});
    }

    const logOut = ()=>{
        client.clearStore();
            sessionStorage.clear();
            setLoginMessage("Log In");
            setLoggedIn(false);
    }

    const  handleSubmit = async (e) => {
        e.preventDefault();

        if(sessionStorage.getItem("token")) {
            logOut();
        }

        else try {
            const res = await login({variables: {email: formState.email, password: formState.password} });

            sessionStorage.setItem("token", res.data.login.token);
            setFormState({email: '', password: ''});
            setLoginMessage("Log Out");
            setLoggedIn(true);
            
        } catch(error) {
            console.error(error);
        }
    };

    useEffect(()=>{
        if(sessionStorage.getItem('token')) setLoggedIn(true);

        if(loggedIn) setTimeout(()=> {
            logOut();
        }, 1200000);
    }, [loggedIn]);

    // add a logout that deletes session token, and tell backend to delete its token as well.

    if (loading) return 'Submitting...';
    if (error) return `Submission error! ${error.message}`;
    if (loggedIn) return <ApiSidePanel loggedIn={loggedIn}/>;

    return <form 
            action="submit" 
            className="api-form" 
            onSubmit={handleSubmit}
        >
            <input id="email" type="email" onChange={handleChange} value={formState.email} placeholder="email address"/>
                    <label htmlFor="email">email </label>
                    <input id="password" type="password" onChange={handleChange} value={formState.password} placeholder="password"/>
                    <label htmlFor="password">password </label>
            <button 
                type="submit" 
                style={{marginTop: "20vh"}}
            > 
                {loginMessage}
            </button>
        </form>
};

export default Api;