import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import './Contact.css';

 const ContactUs = () => {
	const form = useRef();
    const user_id = process.env.REACT_APP_USER_ID;
    const service_id = process.env.REACT_APP_SERVICE_ID;

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
				},
				(error) => {
					console.log(error.text);
				}
			);

			e.target.reset();
	};

	return (
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
	);
};

export default ContactUs;
