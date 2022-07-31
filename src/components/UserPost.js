import React from "react";

export default function UserPost({name, lastName, avatar, id, openModal, deletePost}) {
    return(
        <li className='userListItem'>
            <div className='userWrapper'>
                <img className='userImg' src={avatar} alt="user" />
                <div className='nameWrapper' onClick={openModal}>
                    <p className='name'>{name}</p>
                    <p className='name'>{lastName}</p>
                </div>
                    <button className='deleteButton' onClick={() => {deletePost(id)}}>Delete</button>
            </div>
        </li>
    )
}