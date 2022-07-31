import React, {useState} from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../App.css'
import { useNavigate } from "react-router-dom";
import LoginButton from './LoginButton';

export default function CreateUserForm() {

    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [date, setDate] = useState(new Date());
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    let handleSubmit = async (e) => {
        e.preventDefault();
        try {
          let res = await fetch("https://reqres.in/api/users", {
            method: "POST",
            headers: {
              'Authorization': `Bearer ${localStorage.getItem("token")}`,
          }, 
            body: JSON.stringify({
              name: name,
              lastName: lastName,
              email: email,
              date: date
            }),
          });

          console.log(name, lastName, email, date);

          if (res.status === 201) {
            setName("");
            setLastName("");
            setEmail("");
            setDate("");
            setMessage("User created successfully");
          } else {
            setMessage("Some error occured");
          }
        } catch (err) {
          console.log(err);
        }
    }
  return(
    <>
    <div className="App">
      <button className='ctrlButton buttonsWrapper' onClick={() => navigate("/")}>Home</button>
        <form onSubmit={handleSubmit} className="loginForm">
          <input
            className='formInput'
            type="text"
            value={name}
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            required 
          />
          <input
            className='formInput'
            type="text"
            value={lastName}
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
            required 
          />
          <input
            className='formInput'
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
          <DatePicker 
            className='formInput' 
            selected={date}
            onChange={(date) => setDate(date)} 
            required 
          />

          {/* <button className='formButton' type="submit">Add user</button> */}
          <LoginButton value={"Add user"} />

        <div className="message">{message ? <p>{message}</p> : null}</div>
      </form>
    </div>
    </>
    );
}