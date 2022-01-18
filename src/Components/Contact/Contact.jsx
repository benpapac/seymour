import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

export const Contact = () => {
  const form = useRef();
  const [myForm, setMyForm] = useState({
    user_name: '',
    user_email: '',
    message: '',
  })

  const updateForm = (e) => {
      let value = e.target.value;
      setMyForm({
          ...myForm,
          [e.target.name]: value,
      });
  } 

  const sendEmail = async (e) => {
    e.preventDefault();
    //will need to be updated when DEPLOYING
    const user = process.env.USER_ID;
    const service = process.env.SERVICE_ID;

    //the prefab version
    // emailjs.sendForm(`${service}`, 'contact_form', form.current, `${user}`)
    //   .then((result) => {
    //       console.log(result.text);

    //   }, (error) => {
    //       console.log(error.text);
    //   });

    //my async version, using myForm
    // try {
    //     await emailjs.sendForm(`${service}`, 'contact_form', myForm, `${user}`);
    // }
    // catch (err) {
    //     console.log(err);
    // }
  };

  return (
    <form ref={form} onSubmit={sendEmail}>
      <label>Name</label>
      <input  onChange={updateForm} type="text" name="user_name" />
      <label>Email</label>
      <input onChange={updateForm} type="email" name="user_email" />
      <label>Message</label>
      <textarea onChange={updateForm} name="message" />
      <input type="submit" value="Send" />
    </form>
  );
};

export default Contact;