import {useState, useEffect} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import { useMutation, gql } from '@apollo/client';
import {client} from '../../index';
const Api = () => {
    const navigate = useNavigate();
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


    /// we're going to create a login form, that sends a login request when submitted.
    // we're also going to... 

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

    return (
        <div>
            <div className='api-links-box' style={loggedIn ? {display: 'flex'} : {display: 'none'} }>

            <Link  className="api-link" to={loggedIn ? "/api/actors" : '/api'}>
                Review Actors
            </Link>
            <Link className="api-link" to={loggedIn ? '/api/testimonials' : '/api/'}>
                Review Testimonials
            </Link>
            </div>


            <form action="submit" className="api-form" onSubmit={handleSubmit}>

                    { !loggedIn &&
                        <>
                        <input id="email" type="email" onChange={handleChange} value={formState.email} placeholder="email address"/>
                    <label htmlFor="email">email </label>
                    <input id="password" type="password" onChange={handleChange} value={formState.password} placeholder="password"/>
                    <label htmlFor="password">password </label>
                        </>
                    }

                    <div className='api-div-buttons'>
                    <button type="submit" style={{marginTop: "20vh"}}> {loginMessage}</button>
                    </div>
            </form>
        </div>
    );
};

export default Api;