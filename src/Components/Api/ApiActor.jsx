import { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';

    const ACTORS_QUERY = gql`
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
    const data = useQuery(ACTORS_QUERY).data;

    return (
        <>
        {data && (
            <>
            {data.actors.map(actor => (
                <>
                <h3>{actor.name}</h3>
                <p>image: {actor.image}, alt: {actor.alt}, imdb: {actor.imdb} </p>
                <h4>Bio</h4>
                <p>{actor.bio}</p>
                </>
            ))}
            </>
        )}
        </>
        
    );
};

export default ApiActor;