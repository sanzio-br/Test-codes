import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db} from "../../firebase-config";

function PostComment() {
    const [name , setName]= useState("")
    const [email , setEmail]= useState("")
    const [comment , setComment]= useState("")

  const postsCollectionRef = collection(db, "comments");

  const postComment = async () => {
    await addDoc(postsCollectionRef, {
        name,
        email,
        comment
    });
  };
  return (
    <div className="contact-form article-comment">
    <h4>Leave a Reply</h4>
    <form id="contact-form" method="POST">
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <input name="Name" id="name" placeholder="Name *" className="form-control" type="text" 
            onChange={(event) => {
              setName(event.target.value);
            }} />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <input name="Email" id="email" placeholder="Email *" className="form-control" type="email" 
            onChange={(event) => {
              setEmail(event.target.value);
            }}/>
          </div>
        </div>
        <div className="col-md-12">
          <div className="form-group">
            <textarea name="message" id="message" placeholder="Your message *" rows="4" className="form-control" onChange={(event) => {
    setComment(event.target.value);
  }}></textarea>
          </div>
        </div>
        <div className="col-md-12">
          <div className="send">
            <button className="px-btn theme" onClick={postComment}><span>Submit</span> <i className="arrow"></i></button>
          </div>
        </div>
      </div>
    </form>
  </div>
  );
}

export default PostComment;
