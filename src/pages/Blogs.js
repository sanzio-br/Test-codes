import React, { useEffect, useState } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase-config";

function Blogs({ isAuth }) {
  const [postLists, setPostList] = useState([]);
  const postsCollectionRef = collection(db, "posts");

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsCollectionRef);
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getPosts();
  }, [deletePost()]);

  async function deletePost(id) {
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);
  };
  return (
    <div className="homePage">
      {postLists.map(({ title, postText, author,id }) => {
        return (
          <div class="container">
            <div class="square">
            <div className="deletePost">
                {isAuth && author.id === auth.currentUser.uid && (
                  <button
                    onClick={() => {
                      deletePost(id);
                    }}
                  >
                    &#128465;
                  </button>
                )}
              </div>
              <img src="https://images.unsplash.com/photo-1504610926078-a1611febcad3?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=e1c8fe0c9197d66232511525bfd1cc82&auto=format&fit=crop&w=1100&q=80" class="mask" />
              <div class="h1">{title}</div>
              <p>{postText}</p>
              <div><a href="/" class="button">Read More</a></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Blogs;
