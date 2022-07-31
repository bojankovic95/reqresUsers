import React, { useCallback, useRef } from "react";
import { Modal } from "./Modal";

export default function UserPost({
  name,
  lastName,
  avatar,
  id,
  deletePost,
  email,
}) {
  const modalRef = useRef(null);

  const openModal = useCallback(() => {
    if (modalRef.current) modalRef.current.openModal();
  }, []);

  return (
    <li className="userListItem">
      <div className="userWrapper">
        <img className="userImg" src={avatar} alt="user" onClick={() => openModal()} />
        <div className="nameWrapper">
          <p className="name">{name}</p>
          <p className="name">{lastName}</p>
          <p className="name">{email}</p>
        </div>
        <button
          className="deleteButton"
          onClick={() => {
            deletePost(id);
          }}
        >
          Delete
        </button>
      </div>
      <Modal
        ref={modalRef}
        name={name}
        lastName={lastName}
        email={email}
        avatar={avatar}
      />
    </li>
  );
}
