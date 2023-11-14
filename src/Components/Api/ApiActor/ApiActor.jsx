import { useState, useEffect, useContext } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import ActorApiForm from './ActorApiForm';
import '../Api';
import AddNewForm from '../AddNewForm';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../../Util/Context';
import { ACTORS_QUERY, DEL_ACTOR } from '../../../Util/GraphQL';

const ApiActor = () => {
    const navigate = useNavigate();
    const [editing, setEditing] = useState(false);
    // const {actorsData} = useContext(Context);
    const actorsData = useQuery(ACTORS_QUERY).data;
    const [deleteActor, {data, loading, error}] = useMutation(DEL_ACTOR);
    const [actorId, setActorId] = useState('');
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
        <button className="api-create-button" onClick={()=> navigate('/api/actors/create')}>Create new Actor. </button>
        {actorsData && (
            <>
                { 
                editing ? 
                    <ActorApiForm actorId={actorId} handleClick={handleClick} message={message} /> : actorsData && actorsData.actors.map(actor => (
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