import { useEffect } from 'react';
import ItemCount from '../ItemCount/ItemCount'
import { CartContext } from "../CartContext/CartContext";
import { useState, useContext } from "react";


export const ItemDetail = ({ id, name, price, image, category, description }) => {
  const {addItem}=useContext(CartContext)
  const [producto, setProducto] = useState();


  const onAdd=(contador) =>{
    console.log(`Recibo ${contador}`)
  
  const productToAdd = {
    id,
    name,
    price,
    image,
    category,
    description,
  }

  if (contador>0) {
    addItem(productToAdd, contador)
  };
};
console.log("image",image)
return (
  <div>
    <div>
    <div style={{border:"2px solid black", width:"400px", marginLeft:"490px", backgroundColor:"GrayText", marginTop:"30px"}}>
      <div style={{fontFamily:"serif", fontSize:"30px", textDecoration:"underline", marginBottom:"25px"}}>{name}</div>
      <img style={{width:"300px", height:"auto"}} src={image} alt="" />      <h1>{category}</h1>
      <div style={{fontSize:"12px"}}>{description}</div>
      <div style={{fontSize:"12px", textAlign:"center", marginBottom:"10px"}}>${price}</div>
    </div>
    </div>
     <p>
      <ItemCount initial={1} stock={10} onAdd={onAdd}/>
    </p>
  </div>
);
};

export default ItemDetail;