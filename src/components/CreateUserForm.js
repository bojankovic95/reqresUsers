import React, {useState, useEffect} from 'react';
import useToken from './useToken';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function CreateUserForm() {

    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [date, setDate] = useState(new Date());
    const [message, setMessage] = useState("");
    // const [startDate, setStartDate] = useState(new Date());

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

          console.log(res);

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
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          value={lastName}
          placeholder="Last Name"
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <DatePicker selected={date} onChange={(date) => setDate(date)} />

        <button type="submit">Create</button>

        <div className="message">{message ? <p>{message}</p> : null}</div>
      </form>
    </div>
    );
}