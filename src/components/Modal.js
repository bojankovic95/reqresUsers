import React, {useState, useCallback, useImperativeHandle, forwardRef} from 'react'
import ReactDOM from 'react-dom';
import '../App.css'

export const Modal = forwardRef(({name, lastName, email, avatar}, ref) => {
    const [showModal, setShowModal] = useState(false)
    const open = useCallback(() => {
        setShowModal(true);
    }, []);

    const close = useCallback(() => {
        setShowModal(false);
    }, []);

    useImperativeHandle(
        ref,
        () => {
            return {
                openModal: () => open(),
                closeModal: () => close(),
            };
        },
        [close, open]
    );  

    console.log(name);
  
    if (showModal) {
        return ReactDOM.createPortal(
            <>
                <div className='backdrop' onClick={close}>
                </div>
                <div className='modal'>
                    <form className="modalForm">
                        <p className='editTitle'>Edit user info</p>
                            <input
                                className='formInput'
                                type="text"
                                placeholder={name}
                            />
                            <input
                                className='formInput'
                                type="text"
                                placeholder={lastName}
                            />
                            <input
                                className='formInput'
                                type="email"
                                placeholder={email}
                            />
                            <input
                                className='formInput'
                                type="text"
                                placeholder={avatar}
                            />
                        </form>
                        <button className='formButton' type="submit">Update user</button>
                </div>
            </>
        , document.body);
        
    } 

return null;
  
})