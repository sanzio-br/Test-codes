import React, { useEffect, useState } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import {AiOutlineCalendar} from 'react-icons/ai'
export default function Events( {isAuth}) {
    const [eventsList, setEventsList] = useState([]);
    const postsCollectionRef = collection(db, "events");
  
    useEffect(() => {
      const getEvents = async () => {
        const data = await getDocs(postsCollectionRef);
        setEventsList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      };
  
      getEvents();
    }, [deleteEvent()]);
  
    async function deleteEvent(id){
      const postDoc = doc(db, "posts", id);
      await deleteDoc(postDoc);
    };
    return (
        <div className="container">
            {eventsList.map(({title,destination,numOfDays,price,id,author})=>{
                return(
                    <div class="card">
                    <div className="deletePost">
                      {isAuth && author.id === auth.currentUser.uid && (
                        <button
                          onClick={() => {
                            deleteEvent(id);
                          }}
                        >
                          &#128465;
                        </button>
                      )}
                    </div>
                        <div class="card__header">
                            <img src="https://source.unsplash.com/600x400/?computer" alt="card__image" class="card__image" width="600" />
                        </div>
                        <div class="card__body">
                            <h4>{title}</h4>
                            <small>{destination}</small>
                        </div>
                        <div class="card__footer">
                            <div className="details">
                                <AiOutlineCalendar/>
                                <small> No of days: </small>
                                <span>{numOfDays}</span>
                            </div>
                            <div className="payments">
                                <div className="price">
                                <span>Ksh</span> {price}<span>/=</span>
                                </div>
                                <div id="button">
                                    <button>Book Now</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}