import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function Comment(props) {
  const { comment } = props;
  return (
    <>
      {comment ? (
        <Card className="">
          <Card.Text className="m-1 mb-0">
            <div className="d-flex align-items-center">
            <img className="photo-comment" src={comment.author.profilePhoto} alt="" />
            <Link className="ml-2 text-decoration-none" to={"/profile/" + comment.author._id}>
              <b >{comment.author.username}:</b>
            </Link>

            <p className="m-0">&nbsp;{`${comment.content}`}</p></div>
          <p className="p-0 m-0 text-muted"> <i>{comment.createdAt}</i></p>
          </Card.Text>
      
        </Card>
      ) : (
        "empty content"
      )}
    </>
  );
}

export default Comment;
