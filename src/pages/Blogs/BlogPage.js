import React, { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../firebase-config";
import '../../css/blogs.css'
import { Link } from 'react-scroll';
import PostComment from "./comments";
import logo from '../../logo.PNG'
function Blog() {
  const [postLists, setPostList] = useState([]);
  const postsCollectionRef = collection(db, "posts");
  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsCollectionRef);
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getPosts();
  }, []);
  return (
    <div className="blog-single gray-bg">
      <div className="container">
        <div className="row align-items-start">
          <div className="col-lg-8 m-15px-tb">
            {postLists.map(({ title, postText, author, id, url }) => {
              return (
                <article className="article" id={`${id}`} data-aos="fade-up" key={id}>
                  <div className="article-img">
                    <img src={url} title="" alt="" />
                  </div>
                  <div className="article-title">
                    <h3>{title}</h3>
                    <div className="media">
                      <div className="avatar">
                        <img src={logo} title="" alt="" />
                      </div>
                      <div className="media-body">
                        <label>Kalbo Admin</label>
                      </div>
                    </div>
                  </div>
                  <div className="article-content">
                    <p>{postText}</p>
                  </div>
                </article>
              )
            })}
            <PostComment />
          </div>
          <div className="col-lg-4 m-15px-tb blog-aside" data-aos="fade-left">
            <div className="widget widget-latest-post">
              <div className="widget-title">
                <h3>Latest Post</h3>
              </div>
              <div className="widget-body">
                {postLists.map(({ title, author, id ,url}) => {
                  return (
                    <div className="latest-post-aside media" key={id}>
                      <div className="lpa-left media-body">
                        <div className="lpa-title">
                          <Link to={`${id}`}>
                            <h5>{title}</h5>
                          </Link>
                        </div>
                        <div className="lpa-meta">
                          <a className="name" href="/">
                            {author.name}
                          </a>
                        </div>
                      </div>
                      <div className="lpa-right">
                        <a href={`${id}`}>
                          <img src={url} title="" alt="" />
                        </a>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Blog;
