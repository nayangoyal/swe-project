import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import HomePage from './pages/HomePage/homePage';
import FeedBack from './pages/FeedbackPage/feedbackPage';
import ContactUs from './pages/ContactPage/contactPage';
import BookNow from './pages/BookPage/bookPage';
import Login from './pages/Authentication/Login';
import Signup from './pages/Authentication/Signup';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AvailCard from './components/AvailCard';
import DiningCard from './components/DiningCard';
import RulesCard from './components/RulesCard';
import AdminScreen from './pages/AdminPage/Admin';
import ThankYou from './components/ThankYou';
// import OTP from './components/Otp';
import verifyToken from './utils/auth';

function App() {
  // const emailId = localStorage.getItem('userEmail');
  // console.log(JSON.parse(emailId),process.env.ADMIN_EMAIL)
  // let isvalid=0;
  // if(JSON.parse(emailId) === "21ucs137@lnmiit.ac.in")
  // {
  //   console.log()
  //   isvalid =1;
  // }
  const isvalid = verifyToken();

  console.log(isvalid);
  return (
            <div>
            <Router>
            <Navbar />
              <Routes>
                <Route exact path = "/" element = {<HomePage />}></Route>
                <Route exact path = "/Book" element = {<BookNow />}></Route>
                <Route exact path = "/Feedback" element = {<FeedBack />}></Route>
                <Route exact path = "/Contact" element = {<ContactUs />}></Route>
                <Route exact path = "/login" element = {<Login />}></Route>
                <Route exact path = "/Signup" element = {<Signup />}></Route>
                <Route exact path = "/Available" element = {<AvailCard />}></Route>
                <Route exact path = "/Rules" element = {<RulesCard />}></Route>
                <Route exact path = "/Dining" element = {<DiningCard />}></Route>
                <Route exact path = "/thankyou" element = {<ThankYou />}></Route>
                {<Route exact path = "/admin" element = {(isvalid === 1)&&<AdminScreen />}></Route>}
              </Routes>
            <Footer />
              </Router>
            </div>
        
 
  );
}

export default App;
