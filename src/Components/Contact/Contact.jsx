import React, { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Contact = () => {
  const form = useRef();

  const [myForm, setMyForm] = useState({
			From: {
				Email: '',
				Name: '',
			},
			To: [
				{
					Email: 'ben.papac@gmail.com',
					Name: 'Ben',
				},
			],
			Subject: '',
			TextPart: '',
			HTMLPart:'',
			CustomID: 'An email from your website.',
		});

  const updateForm = (e) => {
    let fromContent = myForm.From;
    let name = e.target.name;
    let value = e.target.value;

    if(e.target.className){
      let newForm =  {
        ...myForm,
        From: {
          ...fromContent,
           [name]: value},
            HTMLPart: `<p>${myForm.TextPart}</p>`,
      }
      setMyForm(newForm);
      console.log(newForm);
    }
    else {
      let newForm = {
        ...myForm,
        [name]: value,
        HTMLPart: `<p>${myForm.TextPart}</p>`,
      }
      setMyForm(newForm);
      console.log(newForm);
    }
  }

  const sendEmail = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3050/emails', myForm);
  };

  return (
    <>
    <div className='contact'>
      <h4>Contact Nicole</h4>
      <p>She's pretty cool. Definitely worth talking to, even if you don't work together.</p>
    </div>
    <form ref={form} onSubmit={sendEmail}>
      <label for="Name">Name</label>
      <input type="text" name="Name" id="Name" className="From" value={myForm.From.Name} onChange={updateForm} placeholder="What's your name?"/>
      <label>Email</label>
      <input type="email" name="Email" id="Email" className="From" value={myForm.From.Email}  onChange={updateForm} placeholder="What's your email?"/>
      <label>Message</label>
      <label>Subject</label>
      <input type="text" name="Subject" id="Subject" value={myForm.Subject} onChange={updateForm} placeholder="What's on your mind?"/>
      <textarea name="TextPart" id="TextPart" value={myForm.TextPart} onChange={updateForm} placeholder='Type your message here.'/>
      <input type="submit" value="Send" />
    </form>
    </>
  );
};

export default Contact;
