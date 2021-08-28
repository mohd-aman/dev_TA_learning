import {useDispatch,useSelector} from "react-redux"
import {incrementCreator} from "./redux/action"

function App() {
  let state = useSelector(function(state){
    return state;
  });
  let dispatch = useDispatch();
  return (
    <>
    <button
    onClick={()=>{
      dispatch(incrementCreator());
    }
    }> + </button>
    <p>{state}</p>
    </>
  );
}

export default App;
