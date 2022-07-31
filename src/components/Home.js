import React, {useState, useEffect, useCallback, useRef} from 'react';
import { Modal } from './Modal';

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toggle, setToggle] = useState(true);
  const [toggleText, setToggleText] = useState("Sort by name")
  const [status, setStatus] = useState("")
 
  useEffect(() => {
   fetch(`https://reqres.in/api/users`, {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
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
  .then((actualData) => setData(actualData.data), setLoading(false))
  .catch((err) => {
    console.log(err.message);
  });
 
  }, []);


  function deletePost(id){
    const requestOptions = {
        method: 'DELETE',
        headers: { 
            'Authorization': 'Bearer test123',
        }
    };
    fetch(`https://reqres.in/api/users/${id}`, requestOptions)
        .then(() => setStatus('Delete successful'));
  }

  const toggleTime = () => {
    const newToggle = !toggle;
    setToggle(newToggle);
    newToggle ? setToggleText("Sort by name") : setToggleText("Sort by ID")
    setData((preData) =>
      preData.sort((a, b) => {
        return newToggle
          ? a.id - b.id
          : a.first_name > b.first_name ? 1 : -1;
      })
    );
  };

  const modalRef = useRef(null);
  const closeModal = useCallback(() => {
    if (modalRef.current) modalRef.current.closeModal();
  }, []);

  const openModal = useCallback(() => {
    if (modalRef.current) modalRef.current.openModal();
  }, []);


  return(
    <div className="App">
    {loading && <div>A moment please...</div>}
    {error && (
      <div>{`There is a problem fetching the post data - ${error}`}</div>
    )}
    <ul>
      {data &&
        data.map((data) => (
          <>
          <li key={data.id}>
            <h3 onClick={openModal}>{data.first_name}</h3>
            <h4>{data.id}</h4>
            <button onClick={() => {deletePost(data.id)}}>Delete</button>
          </li>
          <Modal key={data.first_name} ref={modalRef} name={data.first_name} lastName={data.last_name} email={data.email} />
          </>
        ))}
    </ul>
    <button onClick={toggleTime}>{toggleText}</button>
  </div>
    
  );
}
