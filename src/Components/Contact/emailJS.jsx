import React, { useState, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import './Contact.css';
import puppy from '../../Assets/Nicole_Puppy.jpg'

 const ContactUs = () => {
	const form = useRef();
    const user_id = process.env.REACT_APP_USER_ID;
    const service_id = process.env.REACT_APP_SERVICE_ID;

	const [sent, setSent] = useState('');

	useEffect(() => {
		setSent('');
	}, [])

	const sendEmail = (e) => {
		e.preventDefault();

		emailjs
			.sendForm(
				`${service_id}`,
				'template_request',
				form.current,
				`${user_id}`
			)
			.then(
				(result) => {
					console.log(result.text);
					setSent('pass');
				},
				(error) => {
					console.log(error.text);
					setSent('fail')

				}
			);

			e.target.reset();
	};

	return (
		<div className='contact' 
			style={window.innerWidth < 1100 ? 
				{
					backgroundImage: `url(https://i.imgur.com/qIWZNrc.jpg)`, 
					backgroundSize: 'cover'
				}
			: null}
			>
				<img className='contact-photo' src={puppy} alt="Nicole and her dog, Seymour Seymour" />
		{sent === 'pass' ? 
		<>
		<h4>Your message was successfully sent!</h4> 
		</>
		: ( sent === 'fail' ?
			<>
			<h4>Oops! Something went wrong. Refresh the page, and try again.</h4>
			</>
			: 
			<>

			<div className='contact-box'>
			{window.innerWidth >= 1100 ? <div className='contact-background'/> : null}
				<p className='contact-blurb'>If you'd like to set up a consultation, send Nicole a quick message. </p> 
			</div>
			<div className='contact-filter'/>

			<form className='contact-form' ref={form} onSubmit={sendEmail}>
				<label className='label'>Name</label>
				<input type="hidden" name='to_name' value="Nic"/>
				<input className='input' type='text' placeholder='e.g. Nicole Seymour' name='name' />
				<label className='label'>Email</label>
				<input className='input' type='email' placeholder='username@email.com' name='email' />
				<label className='label'>Subject</label>
				<input className='input' type="text" placeholder="What's on your mind?" name='subject'/>
				<label className='label'>Message</label>
				<textarea className='message' name='message' />
				<input className='contact-button' type='submit' value='Send' />
			</form>

			</>
		)
		}
		</div>
	);
};

export default ContactUs;
