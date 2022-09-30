import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
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


    /// we're going to create a login form, that sends a login request when submitted.
    // we're also going to... 

    const handleChange = (e) => {
        e.preventDefault();

        let key = e.target.id;
        let val = e.target.value;

        setFormState({...formState, [key]: val});
    }

    const  handleSubmit = async (e) => {
        e.preventDefault();

        if(sessionStorage.getItem("token")) {
            client.clearStore();
            sessionStorage.clear();
            setLoginMessage("Log In");
        }

        else try {
            const res = await login({variables: {email: formState.email, password: formState.password} });
            console.log(data);
            sessionStorage.setItem("token", res.data.login.token);
            setFormState({email: '', password: ''});
            setLoginMessage("Log Out");
        } catch(error) {
            console.error(error);
        }
    };

    // add a logout that deletes session token, and tell backend to delete its token as well.

if (loading) return 'Submitting...';
if (error) return `Submission error! ${error.message}`;

    return (
        <div>
            <button onClick={()=> navigate('/api/actors')}>
                review actors
            </button>
            <button onClick={()=> navigate('/api/testimonials')}>
                review testimonials
            </button>


    <form action="" onSubmit={handleSubmit}>

            <input id="email" type="email" onChange={handleChange} value={formState.email} placeholder="email address"/>
            <label htmlFor="email">email </label>
            <input id="password" type="password" onChange={handleChange} value={formState.password} placeholder="password"/>
            <label htmlFor="password">password </label>

            <button type="submit" style={{marginTop: "20vh"}}> {loginMessage}</button>
    </form>
        </div>
    );
};

export default Api;