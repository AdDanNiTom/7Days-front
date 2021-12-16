import React, { useState, useContext } from "react";
import {
  Button,
  Modal,
  InputGroup,
  FormControl,
  Form,
  Card,
} from "react-bootstrap";
import Comment from "./Comment";
import { AuthContext } from "../../context/auth.context";
import axios from "axios";
import { Link } from "react-router-dom";
import { Chat } from "react-bootstrap-icons";

const API_URI = process.env.REACT_APP_API_URI;
const storedToken = localStorage.getItem("authToken");

function CommentsModal(props) {
  const { comments } = props;
  const [show, setShow] = useState(false);
  const [formState, setFormState] = useState("");
  const { user } = useContext(AuthContext);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleInput = (e) => setFormState(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        `${API_URI}/api/comments`,
        { content: formState, authorId: user._id, eventId: props.eventId },
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      )
      .then((response) => {
        setFormState("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Link
        className="text-light text-decoration-none"
        to="#"
        variant="primary"
        onClick={handleShow}
      >
        <Card.Text>
          <Chat />
          {"  "} Comments
        </Card.Text>
      </Link>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Comments Title</Modal.Title>
        </Modal.Header>
        {comments &&
          comments.map((oneComment) => <Comment comment={oneComment} />)}

        <Modal.Footer>
          <Form onSubmit={handleSubmit}>
            <InputGroup className="mb-3">
              <FormControl
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                value={formState}
                onChange={handleInput}
              />
              <Button
                type="submit"
                variant="outline-secondary"
                id="button-addon2"
              >
                Post
              </Button>
            </InputGroup>
          </Form>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CommentsModal;
