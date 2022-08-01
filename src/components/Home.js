import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserPost from "./UserPost";
import LoadingSpinner from "./LoadingSpinner";

export default function Home() {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toggle, setToggle] = useState(true);
  const [toggleText, setToggleText] = useState("Sort by name");
  const [sortText, setSortText] = useState("Users sorted by ID");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true)
    fetch(`https://reqres.in/api/users`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        return response.json();
      })
      .then((actualData) => {
        setPeople(actualData.data)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err.message)
      });
  }, []);

  function deletePost(id) {
    const requestOptions = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    fetch(`https://reqres.in/api/users/${id}`, requestOptions)
      .then((response) =>
        response.status === 204
          ? setStatus("Delete succsessful")
          : setStatus("Some error occured")
      )
      .then(() => console.log(status))
      .catch((err) => {
        setError(err);
      });
  }

  const toggleTime = () => {
    const newToggle = !toggle;
    setToggle(newToggle);
    newToggle 
      ? setToggleText("Sort by name") 
      : setToggleText("Sort by ID");
    newToggle
      ? setSortText("Users sorted by ID")
      : setSortText("Users sorted by name");
    setPeople((data) =>
      data.sort((a, b) => {
        return newToggle ? a.id - b.id : a.first_name > b.first_name ? 1 : -1;
      })
    );
  };



  return (
    <div className="App">
      {error && (
        <div>{`There is a problem fetching the post data - ${error}`}</div>
      )}

      {loading 
      ? 
        <LoadingSpinner /> 
      : 
      <ul className="userList">
        {people.map((data) => (
          
            <div key={data.id}>
              <UserPost
                name={data.first_name}
                lastName={data.last_name}
                avatar={data.avatar}
                email={data.email}
                id={data.id}
                deletePost={deletePost}
              />
            </div>
      
        ))}
      </ul>}

      <div className="buttonsWrapper">
        <button className="ctrlButton" onClick={toggleTime}>
          {toggleText}
        </button>
        <button className="ctrlButton" onClick={() => navigate("/create-user")}>
          Add new user
        </button>
      </div>
      <p className="sorted">{sortText}</p>
    </div>
  );
}
