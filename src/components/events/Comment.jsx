import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function Comment(props) {
  const { comment } = props;
  return (
    <>
      {comment ? (
        <Card>
          <Card.Text>
            <Link to={"/profile/" + comment.author._id}>
              <b>@{comment.author.username}: </b>
            </Link>

            {comment.content}
          </Card.Text>
          {comment.createdAt}
        </Card>
      ) : (
        "empty content"
      )}
    </>
  );
}

export default Comment;
