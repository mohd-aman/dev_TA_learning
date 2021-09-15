import { useHistory } from "react-router";
import "./product.css";
import {addCreator} from "../redux/actions"
import {useDispatch} from "react-redux"

let Product = (props) => {
    let history = useHistory();
  return (
    <div className="product-card">
        <div
            onClick={()=>{
                history.push(`/preview/${props.data.id}`);
            }}
            className = "product-img"
        >
            <img src={props.data.img}/>
        </div>
        <div className = "product-btn">
            <button>Add to Cart</button>
        </div>
    </div>
  );
};

export default Product;