import { RiCloseLine } from "react-icons/ri";

const Modal = ({ setIsOpen, imgSrc }) => {
  return (
    <>
      <div  onClick={() => setIsOpen(false)} />
      <div className="modal_centered">
        <div className="modal">
          <img alt='img' className="review_photo_modal" alt="an exapnded image uploaded by the reviewer" src={imgSrc}/>
          <button className="modal_closeBtn" onClick={() => setIsOpen(false, null)}>
            <RiCloseLine style={{ marginBottom: "-3px" }} />
          </button>
        </div>
      </div>
    </>
  );
};

export default Modal;