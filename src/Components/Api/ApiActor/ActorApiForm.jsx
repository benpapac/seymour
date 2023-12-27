import {useEffect, useState} from 'react';
import { useQuery, useMutation, gql} from '@apollo/client';
import {client} from '../../../index';
import { assertCompositeType } from 'graphql';
// import './Api.css';

    const ACTOR_QUERY = gql`
       query actor($actorId: ID!) {
            actor(id: $actorId) {
                id
                name
                img
                alt
                imdb
                bio
            }
        }
    `;

        const UPDATE_ACTOR = gql `
        mutation updateActor(  $oldName: String! $name: String, $img: String, $alt: String, $imdb: String, $bio: String){
            updateActor( oldName: $oldName, name: $name, img: $img, alt: $alt, imdb: $imdb, bio: $bio){
                name
                img
                alt
                imdb
                bio
            }
        }
    `;


const ActorApiForm = ({ actorId, handleClick, message }) => {
    const queryData = useQuery(ACTOR_QUERY, {variables: {actorId: actorId} } );
    const [actor, setActor] = useState({});
    const [updateActor, {data, loading, error}] = useMutation(UPDATE_ACTOR);
    const [formState, setFormState] = useState({});




      const handleChange = (e) => {
        e.preventDefault();

        const key = e.target.id;
        const val = e.target.value;
        setFormState({
            ...formState,
            [key]: val,
        });
    }



    const handleSubmit = (e) => {
    e.preventDefault();
    const res = updateActor(
        {
         variables: {
            oldName: formState.oldName,
            name: formState.name,
            img: formState.img,
            alt: formState.alt,
            imdb: formState.imdb,
            bio: formState.bio,
         } ,
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            } 
        }
         );

        return res;
    }

    useEffect( ()=>{
        if(queryData.data){
            setActor(queryData.data.actor);
            setFormState({
                oldName: queryData.data.actor.name,
                name: queryData.data.actor.name,
                img: queryData.data.actor.img,
                alt: queryData.data.actor.alt,
                imdb: queryData.data.actor.imdb,
                bio: queryData.data.actor.bio,
            })
        }
    }, [queryData])

    if (loading) return 'Submitting...';
    if (error) return `Submission error! ${error.message}`;

    return (
        <>
        {actor &&
        <>
        <h2>{ actor.name}</h2>
          <form key={actor.id} className="api-form" onSubmit={handleSubmit}>

                    <label htmlFor="name">Name</label > 
                <input id="name" type="text" onChange={handleChange} placeholder={actor.name} value={formState.name} />

                    <label htmlFor="img">Image Url</label> 
                <textarea id="img" type="url" cols="40" onChange={handleChange} placeholder={actor.img} value={ formState.img } />

                    <label htmlFor="alt">Alt</label>  
                <input id="alt" type="text" onChange={handleChange} placeholder="If the pic didn't load." value={formState.alt} />

                <label htmlFor="imdb">IMDB Link</label> 
                <textarea id="imdb" type="url" cols="40" onChange={handleChange} placeholder={actor.imdb} value={ formState.imdb } />

                <label htmlFor="bio"></label> 
                <textarea id="bio" type="text" cols="50" rows="10" onChange={handleChange} placeholder={actor.bio}value={ formState.bio} />
                
                <button type="submit" >Submit</button> 
                <button id={actor.id} onClick={handleClick}>{message}</button>
            </form>
            </>
            } 
        </>
    );
};

export default ActorApiForm;