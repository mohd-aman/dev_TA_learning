import { useContext } from "react";
import {auth} from "../Firebase";

import { authContext } from "../AuthProvider";
import { Redirect } from "react-router-dom";

let Home = ()=>{
    let user = useContext(authContext);
    return(
        <>
        {user?"":<Redirect to="/login"/>}
        <h1>Home</h1>
        <button onClick = {()=>{
            auth.signOut();
        }}>
            LogOut
        </button>
        </>
    );
};

export default Home;