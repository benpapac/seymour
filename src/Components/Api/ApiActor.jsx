import { useState, useEffect } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import ActorApiForm from './ActorApiForm';
import './Api.css';
import AddNewForm from './AddNewForm';
import { useNavigate } from 'react-router-dom';



    const ACTORS_QUERY = gql `
    {
        actors {
             id
            name
            img
            alt
            imdb
            bio
        }
    }
    `;

    const DEL_ACTOR = gql `
    mutation deleteActor($name: String!){
        deleteActor(name: $name){
            id
            name
            img
            alt
            imdb
            bio
        }
    }
    `;




const ApiActor = () => {
    const navigate = useNavigate();
    const [editing, setEditing] = useState(false);
    const queryData = useQuery(ACTORS_QUERY).data;
    const [deleteActor, {data, loading, error}] = useMutation(DEL_ACTOR);
    const [actorId, setActorId] = useState('');
    const [newItem, setNewItem] = useState(false);

    const [message, setMessage] = useState("Update this Actor");


  

    const handleClick = async (e) => {
        e.preventDefault();

        await setActorId(e.target.id);

        if(!editing){
            setEditing(true);
            setMessage("Cancel");

        
        } else {
            setEditing(false);
            setMessage("Update Actor");
        }
    }

    const handleDelete= (name) => {

        const res = deleteActor({variables: {name: name}});
        console.log(res);
    }

    useEffect(()=>{
        if( !sessionStorage.getItem('token') ) navigate('/api');
    }, []);

if(loading) return 'submitting...';
if(error) return `Error: ${error}`;



    return (
        <>
        <button className="api-create-button" onClick={()=> setNewItem(true)}>Create new Actor. </button>
        {queryData && (
            <>
                    {!newItem ? null : <AddNewForm itemType="actor" />}
                    { 
                    editing && <ActorApiForm actorId={actorId} handleClick={handleClick} message={message} />}

                       {queryData && queryData.actors.map(actor => (
                            <>
                                    <div key={actor.id} className="api-div">
                                        <h2>{actor.name}</h2>
                                        <h4>image url: </h4> <p>{actor.img}</p>
                                        <h4>image alt: </h4> <p>{actor.alt}</p>
                                        <h4>bio: </h4><p>{actor.bio}</p>
                                        <div className='api-div-buttons'>
                                        <button  id={actor.id} onClick={handleClick}>{message}</button>
                                        <button onClick={() => handleDelete(actor.name)}>Delete this Actor</button>
                                        </div>
                                    </div>
                            </>
                    ))
                }

            </>
        )}
        </>
    );
};

export default ApiActor;