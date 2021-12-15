import { useState, useContext } from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import { AuthContext } from "../../context/auth.context";

function Error(errorMessage) {
  const [show, setShow] = useState(true);
  const { error, setError } = useContext(AuthContext);

  console.log("error in errorcard", error);

  setTimeout(() => {
    console.log("hello");
    setError(false);
  }, 3000);

  return (
    <ToastContainer className="p-3" position="top-center">
      <Toast
        bg="danger"
        onClose={() => setShow(false)}
        show={show}
        delay={3000}
        autohide
      >
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">Error</strong>
          <small>error code</small>
        </Toast.Header>
        <Toast.Body>{error}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

export default Error;
