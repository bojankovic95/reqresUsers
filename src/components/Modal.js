import React, {useState, useCallback, useImperativeHandle, forwardRef, useEffect} from 'react'
import ReactDOM from 'react-dom';
import '../App.css'

export const Modal = forwardRef(({name, lastName, email}, ref) => {
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
  
  if (showModal) {
    return ReactDOM.createPortal(
        <>
    <div className='backdrop' onClick={close}>
    </div>
          <div className='modal'>
          <input
              type="text"
              value={name}
              placeholder="Name"
            />
            <input
              type="text"
              value={lastName}
              placeholder="Last Name"
            />
            <input
              type="email"
              value={email}
              placeholder="Email"
            />
          </div>
          </>
    , document.body);
    
} 

return null;
  
})