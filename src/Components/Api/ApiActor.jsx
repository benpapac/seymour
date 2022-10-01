import { useState, useEffect } from 'react';
import { useQuery, useLazyQuery, useMutation, gql } from '@apollo/client';
import ActorApiForm from './ActorApiForm';
import './Api.css';
import AddNewForm from './AddNewForm';



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






const ApiActor = () => {
    const [editing, setEditing] = useState(false);
    const queryData = useQuery(ACTORS_QUERY).data;
    const [actorId, setActorId] = useState('');
    const [newItem, setNewItem] = useState(false);

    const [message, setMessage] = useState("Update Actor");


  

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







    return (
        <>
        <button onClick={()=> setNewItem(true)}>Create new Actor. </button>
        {queryData && (
            <>
                    {!newItem ? null : <AddNewForm itemType="actor" />}
                    { editing 
                    
                        ? (
                          <ActorApiForm actorId={actorId} handleClick={handleClick} message={message} />
                        )
                        :  queryData.actors.map(actor => (
                            <>
                                    <div key={actor.id}>
                                        <h2>{actor.name}</h2>
                                        <h4>image url: </h4> <p>{actor.img}</p>
                                        <h4>image alt: </h4> <p>{actor.alt}</p>
                                        <h4>bio: </h4><p>{actor.bio}</p>
                                        <button id={actor.id} onClick={handleClick}>{message}</button>
                                    </div>
                            </>
                    ))}

            </>
        )}
        </>
    );
};

export default ApiActor;