import React, { useState, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import './Contact.css';

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
		<div className='contact'>
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
			<form className='contact-form' ref={form} onSubmit={sendEmail}>
				<label>Name</label>
				<input type="hidden" name='to_name' value="Nic"/>
				<input className='input' type='text' placeholder='Name' name='name' />
				<label>Email</label>
				<input className='input' type='email' placeholder='Email Address' name='email' />
				<label >Subject</label>
				<input className='input' type="text" placeholder='Subject' name='subject'/>
				<label>Message</label>
				<textarea className='message' name='message' />
				<input className='button' type='submit' value='Send' />
			</form>
			</>
		)
		}
		</div>
	);
};

export default ContactUs;
