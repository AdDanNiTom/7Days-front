import { useState } from "react";
import { Toast } from "react-bootstrap";

function Error() {
  const [show, setShow] = useState(true);
  return (
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
      <Toast.Body>There was an error somewhere!</Toast.Body>
    </Toast>
  );
}

export default Error;
