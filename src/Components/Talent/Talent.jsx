import React, { useState, useEffect, useRef, useContext } from 'react';
import './Talent.css';
import './Actor/Actor.css';
import './Actor/Actor-phone.css';
import './LookBook.css';
import actors from '../../Json/actors.json';
import * as displayHOF from '../../Util/displays.js';
import {Context} from '../../Util/Context';
import Actor from './Actor/Actor';

const Talent = () => {

    //height
    const body = document.body;
    const html = document.documentElement;
    const height = Math.max( body.scrollHeight, body.offsetHeight, 
                   html.clientHeight, html.scrollHeight, html.offsetHeight );
    // const scrollPosition = useScrollPosition();
    const context = useContext(Context);
    const chooseFocus = context.chooseFocus;
    const focusPoints = context.focusPoints;

    // const displayBackground = displayHOF.displayBackground;
    const displayLookbook = displayHOF.displayLookbook;

    const [yScroll, setYScroll] = useState(0);
    const [oldY, setOldY] = useState(0);
    const [count, setCount] = useState(1);
    const [xTrans, setXTrans] = useState({
        1: {x: 100, y: 0},
        2: {x: 100, y: 0},
        3: {x: 100, y: 0},
        4: {x: 100, y: 0}
    }); //this will become a percentage
    const [currentActor, setCurrentActor] = useState(0);
    const [init, setInit] = useState(true);


	const handleScroll = (e) => {
        setOldY(yScroll);
		setYScroll( e.path[1].scrollY);
	};

    const getPos = (offset)=> {
            if(offset < 18.75) return 1;
            else if ( offset > 37.5 && offset <= 56.25 ) return 2;
            else if (offset > 56.25 && offset <= 75 ) return 3;
            else return 4;
        }

	useEffect(() => {
        if(init)window.addEventListener('scroll', handleScroll);
        setInit(false);

        let offset = yScroll/height*100;
        console.log(offset);
        let currentPos = getPos(offset);

        let scrollingDown = yScroll - oldY > 0;
        if(scrollingDown) {
            // first, reduce the currentPos xVal to 0.
            //then, increase the currentPos yVal to 100.
            //then, setCurrentPos to currentPos+1.

            //increment y
            if(xTrans[currentPos].x === 0) {
                setXTrans({...xTrans, [currentPos]: {...xTrans[currentPos], y: count} });
                if(count < 99) setCount(count + 1);
                else setCount(100);
            }

            //decrement x
            else {
                setXTrans({...xTrans, [currentPos]: {...xTrans[currentPos], x: count} });
                if(count > 1) setCount(count -1);
                else setCount(0);
            }
        }
        else {
           //decrement y
            if(xTrans[currentPos].x === 0) {
                setXTrans({...xTrans, [currentPos]: {...xTrans[currentPos], y: count} });
                if(count < 99) setCount(count - 1);
                else setCount(100);
            }

            //decrement x
            else {
                setXTrans({...xTrans, [currentPos]: {...xTrans[currentPos], x: count} });
                if(count > 1) setCount(count -1);
                else setCount(0);
            }
        }
        console.log('count: ', count);
		return () => {
			window.removeEventListener('onScroll', handleScroll);
		}
	}, [yScroll]);


    //style={{transform: `translate(${xTrans[idx]}%, 0)`}}
     //style={{transform: `translate(${xTrans[idx]}%, 0)`}}
    return (
        <section className='talent-box'>
            { window.innerWidth > 1050 ? displayLookbook(chooseFocus) : null}
            {/* {displayActors(focusPoints, chooseFocus)} */}

             
			{actors.map((actor, idx, arr) => {
				return (
                    <div
							key={`${actor.name}`}
							className={`actor ${actor.name}`}
							ref={focusPoints[`${actor.focus}`]}
                             style={window.innerWidth < 1050 ?{backgroundImage: `url(${actor.img})`} : null}
                    >
                        {window.innerWidth < 1050 ? <div className='talent-empty' /> : null}

                        <div className="actor-box" >
                            { window.innerWidth > 1050 ? <img className="actor-photo" src={`${actor.img}`} alt={`${actor.alt}`} /> : null}
                            <p className="actor-bio"> 
                            <p className='actor-name'>{actor.name}</p>
                                {actor.bio}
                                <br/>
                                <br/>
                                <a href={`${actor.imdb}`} target='_blank' rel='noreferrer'><img className='actor-a-tag' src='https://i.imgur.com/lTL68KV.png' alt='IMDb'/></a>
                            </p>
                        </div>
                    </div>
				);
			})}
        </section>
    );
};

export default Talent;