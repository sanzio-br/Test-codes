import React, { useState, useEffect } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { db, auth, storage } from "../firebase-config";
import { useNavigate } from "react-router-dom";
export default function CreatePost({ isAuth }) {
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  const [file, setFile] = useState("");

  const postsCollectionRef = collection(db, "posts");
  let navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  });
  const addlist = async (event) => {
    try {
        var storagePath = 'Posts/' + file.name;

        const storageRef = ref(storage, storagePath);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed', (snapshot) => {
            // progrss function ....
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
        },
            (error) => {
                console.log(error);
            },
            () => {
                // complete function ....
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                     function createPost(){
                      addDoc(postsCollectionRef, {
                        title,
                        postText,
                        url : downloadURL,
                        author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
                      });
                      navigate("/Blogs");
                    };
                    createPost();
                });
            });
    } catch (error) { throw error; }
}
  return (
    <div className="createPostPage">
      <div className="cpContainer">
        <h1>Create A Post</h1>
        <div className="inputGp">
          <label> Title:</label>
          <input
            placeholder="Title..."
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
        </div>
        <div className="inputGp">
          <label> Post:</label>
          <textarea
            placeholder="Post..."
            onChange={(event) => {
              setPostText(event.target.value);
            }}
          />
        </div>
        
        <div className="inputGp">
                    <label> Event photo:</label>
                    <input
                        type="file"
                        name="coverImage"
                        accept="image/x-png,image/gif,image/jpeg"
                        onChange={(event) => {
                            setFile(event.target.files[0]);
                        }
                        }
                    />
                </div>
        <button onClick={addlist}> Submit Post</button>
      </div>
    </div>
  )
}