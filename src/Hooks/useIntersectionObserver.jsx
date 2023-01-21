import React, { useEffect, useState, useRef } from 'react';


// react implementation studied here:
// https://medium.com/the-non-traditional-developer/how-to-use-an-intersectionobserver-in-a-react-hook-9fb061ac6cb5
const useIntersectionObserver = ({givenNode = null, root = null, rootMargin, threshold = 0}) => {
    const [entry, updateEntry] = useState({});
    const [ node, setNode] = useState(givenNode);

    const observer = useRef(null);

    useEffect(()=>{
        if(observer.current) {
            observer.current.disconnect();
        }

        observer.current = new window.IntersectionObserver(
            ([entry]) => updateEntry(entry),
            { 
                root,
                rootMargin,
                threshold
            }
        );

        const { current: currentObserver} = observer;

        if( node ){
            currentObserver.observe(node);
        }

        return () => currentObserver.disconnect();
    },[node, root, rootMargin, threshold]);
    return [setNode, entry];
};

export default useIntersectionObserver;