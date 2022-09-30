import {useEffect, useState} from 'react';
import { useQuery, useMutation, gql} from '@apollo/client';
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
        mutation updateActor($updateActorId: ID!, $name: String, $image: String, $alt: String, $imdb: String, $bio: String){
            mutation(id: $updateActorId, name: $name, img: $img, alt: $alt, imdb: $imdb, bio: $bio){
                id
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
    const [formState, setFormState] = useState({name: "", image: "", alt: "", imdb: "", bio: ""});

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
    const res = updateActor({ variables: {...formState} }, {Headers: {Authorization: `Bearer ${sessionStorage.getItem('token')}`} } );

    console.log(res);

}



useEffect(async ()=>{
    await queryData && setActor(queryData.data.actor);
}, [queryData])

if (loading) return 'Submitting...';
if (error) return `Submission error! ${error.message}`;

    return (
        <>
        {actor &&
        <>
        <h2>{ actor.name}</h2>
          <form key={actor.id} className="api-actor-form" onSubmit={handleSubmit}>

                    <label htmlFor="name">Name</label > 
                <input id="name" type="text" onChange={handleChange} placeholder={actor.name} value={formState["actor-form-name"]} />

                    <label htmlFor="image">Image Url</label> 
                <textarea id="image" type="url" cols="40" onChange={handleChange} placeholder={actor.img} value={ formState["actor-form-image"] } />

                    <label htmlFor="alt">Alt</label>  
                <input id="alt" type="text" onChange={handleChange} placeholder="If the pic didn't load." value={formState["actor-form-alt"]} />

                <label htmlFor="imdb">IMDB Link</label> 
                <textarea id="imdb" type="url" cols="40" onChange={handleChange} placeholder={actor.img} value={ formState["actor-form-image"] } />

                <label htmlFor="bio"></label> 
                <textarea id="bio" type="text" cols="50" rows="10" onChange={handleChange} placeholder={actor.bio}value={ formState["actor-form-bio"]} />
                
                <button type="submit" >Submit</button> 
                <button id={actor.id} onClick={handleClick}>{message}</button>
            </form>
            </>
            } 
        </>
    );
};

export default ActorApiForm;