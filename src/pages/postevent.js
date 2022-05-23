import { useState, useEffect } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase-config";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import { ProgressBar } from "react-bootstrap";
const EventsPost = ({ isAuth }) =>{
    const [progress, setProgress] = useState(0)
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState("");
    const [destination, setDestination] = useState("");
    const [date, setDate] = useState("");
    const [numOfDays, setnumOfDays] = useState("");
    const [price, setPrice] = useState("");
    const postsCollectionRef = collection(db, "events");
    let navigate = useNavigate();
    useEffect(() => {
        if (!isAuth) {
            navigate("/login");
        }
    });
    const addlist = async (event) => {
        try {
            var storagePath = 'uploads/' + file.name;

            const storageRef = ref(storage, storagePath);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on('state_changed', (snapshot) => {
                // progrss function ....
                const progressValue = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(progressValue)
                console.log('Upload is ' + progressValue + '% done');
            },
                (error) => {
                    console.log(error);
                },
                () => {
                    // complete function ....
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        console.log('File available at', downloadURL);
                        function postevent() {
                            addDoc(postsCollectionRef, {
                                title,
                                destination,
                                date,
                                numOfDays,
                                price,
                                url: downloadURL,
                                author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
                            });
                            navigate("/Events");
                            console.log()
                            console.log("post event")
                        };
                        postevent()
                    });
                });
        } catch (error) { throw error; }
    }
    const progressInstance = <ProgressBar now={progress} label={`${progress}%`} />;
    return (
        <div className="createPostPage">
            <div className="cpContainer">
                <h1>Post Event</h1>
                <div className="inputGp">
                    <label> Title:</label>
                    <input
                        required
                        placeholder="Title..."
                        onChange={(event) => {
                            setTitle(event.target.value);
                        }}
                    />
                </div>
                <div className="inputGp">
                    <label> Destination :</label>
                    <input
                        required
                        placeholder="Location..."
                        onChange={(event) => {
                            setDestination(event.target.value);
                        }}
                    />
                </div>
                <div className="inputGp">
                    <label> Date : formart DD/MM/YYYY</label>
                    <input
                        required
                        placeholder="date..."
                        onChange={(event) => {
                            setDate(event.target.value);
                        }}
                    />
                </div>
                <div className="inputGp">
                    <label> Number of days:</label>
                    <input
                        required
                        placeholder="number of days"
                        onChange={(event) => {
                            setnumOfDays(event.target.value);
                        }}
                    />
                </div>
                <div className="inputGp">
                    <label> price:</label>
                    <input
                        required
                        type="number"
                        placeholder="price"
                        onChange={(event) => {
                            setPrice(event.target.value);
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
                {progressInstance}
                <button onClick={addlist}> Submit Event</button>
            </div>
        </div>
    );
}

export default EventsPost;
