import { Link } from "react-router-dom";
import styles from "./item.module.css"

export const Item = ({image, name,price, description, id}) => {

  return (
    <div>
        <h1>{name}</h1>
        <div style={{border:"1px solid black", width:"300px", marginLeft:"520px", backgroundColor:"GrayText"}}>
          <img className={styles.imagen} src={image} alt="" />
          <h5>{description}</h5>
          <h5>${price}</h5>
        </div>
        <Link to={`item/${id}`}>
        <button className="boton-ver">Ver detalle</button>
      </Link>
    </div>
  );
};

export default Item;