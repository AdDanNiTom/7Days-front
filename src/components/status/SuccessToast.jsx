import { useState, useContext } from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import { AuthContext } from "../../context/auth.context";

function SuccessToast() {
  const [show, setShow] = useState(true);
  const { success, setSuccess } = useContext(AuthContext);

  
  setTimeout(() => {
    setSuccess(false);
  }, 3000); 

  console.log("popup popping up!")

  return (
    <ToastContainer className="p-3" position="top-center">
      <Toast
        bg="success"
        onClose={() => setShow(false)}
        show={show}
        delay={3000}
        autohide
      >
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">Success</strong>
          <small>error code</small>
        </Toast.Header>
        <Toast.Body>Success!</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

export default SuccessToast;
