import { useContext,useEffect } from "react";
import { signInWithGoogle } from "../Firebase";
import { authContext } from "../AuthProvider";
import { Redirect } from "react-router-dom";

let Login = ()=>{
    let user = useContext(authContext);
    return(
        <>
        {user?<Redirect to="/"/>:""}
            <button
                onClick={()=>{
                    signInWithGoogle();
                }}
            >
                Login with Google
            </button>
        </>
    );
};

export default Login;
