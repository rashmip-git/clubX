import {useNavigate} from "react-router-dom";
import { useContext } from "react";
import MainPage from "../Mainpage";
import "./Home.css"
import { useContext } from "react";

const Home = () => {
    const {isAuthenticated} = useContext(AuthContext);
    
    const navigate = useNavigate();

    const handleGetStarted = () => {
        if(isAuthenticated){
            navigate("/MainPage");
        }
        else{
            
        }
    }
}
