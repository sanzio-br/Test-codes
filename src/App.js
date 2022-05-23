import './App.css';
import {BrowserRouter as Router ,Routes, Route} from 'react-router-dom'
import { useState } from "react";
import CreatePost from './pages/Createpost';
import Home from './pages/Home';
import Postevent from './pages/postevent';
import Blog from './pages/Blogs/BlogPage';
import Events from './pages/events/EventsPage';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Navbar from './Navbar';
import SignIn from './pages/SignIn';
function App() {
  AOS.init();
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
  return (
    <Router>
      <Navbar isAuth={isAuth} setIsAuth={setIsAuth}/>
      <Routes>
        <Route path="/" exact element={ <Home isAuth={isAuth} /> } />
        <Route path ="/blogs" element={ <Blog />} />
        <Route path ="/tours" element={ <Events />}/>
        <Route path ="/createpost" element={ <CreatePost isAuth={isAuth}/>}/>
        <Route path ="/postevent" element={ <Postevent isAuth={isAuth}/>}/>
        <Route path ="/login" element={ <SignIn  setIsAuth={setIsAuth}/>}/>
      </Routes>
    </Router>
  );
}

export default App;
