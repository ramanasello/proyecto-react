import { useState, useEffect } from "react";
import React, {useContext} from 'react';
import { CartContext } from '../CartContext/CartContext';
import {Link} from 'react-router-dom'
import {db} from "../../utils/firebase"
import {collection, addDoc, doc, updateDoc} from "firebase/firestore"
import { clear } from '@testing-library/user-event/dist/clear';

export const CartContainer = () => {
    const {productCartList, removeItem, clear, getTotalPrice} = useContext(CartContext);
    const [idOrder, setIdOrder] = useState("");
    // console.log(productCartList)
  
    const sendOrder = (event)=>{
      event.preventDefault();

      const order = {
        buyer:{
          name: event.target[0].value,
          phone:event.target[1].value,
          email: event.target[2].value
        },
        items: productCartList,
        total: getTotalPrice()
      }
      alert("Su pedido fue aceptado")
      console.log("order", order)
      //crear la referencia donde se va guardar el documento
      const queryRef = collection(db, "orders");
      //crear el documento
      addDoc(queryRef, order).then(response=>{

        console.log("response", response);
        setIdOrder(response.id)
        clear();
        
      });
      
    }
  
    const updateOrder = ()=>{
      //creamos la referencia
      const queryRef = doc(db, "orders", "GbMMY0SYPjoTSuAvGKDF");
      //actualizar el documento
      updateDoc(queryRef,{
        total:80
      }).then(response=>console.log(response))
    }
  
    return (
      <div>
        {idOrder ?
          <>
            <p>su orden fue creado, id {idOrder}</p>
            <Link to="/">
              Ir al listado de productos
            </Link>
          </>
          :
          <div>
            {
              productCartList.length > 0 ?
              <div>
                {productCartList.map(item=>(
                  <div style={{border:"2px solid black", marginLeft:"605px", marginTop:"20px", width:"150px"}}>
                    <h4>{item.title}</h4>
                    <h4>Cantidad: {item.quantity}</h4>
                    <h4>Precio unitario: ${item.price}</h4>
                    <h4>Precio total: ${item.quantityPrice}</h4>
                    <button onClick={()=>removeItem(item.id)}>Eliminar producto</button>
                  </div>
                ))}
                <button onClick={clear}>Vaciar el carrito</button>
                <p>Precio final: ${getTotalPrice()}</p>
                <form onSubmit={sendOrder}>
                  <div style={{display:"flex", justifyContent:"flex-start", alignItems:"center", flexDirection:"column"}}>
                  <label>Nombre: </label>
                  <input type="text" />
                  <label>Telefono: </label>
                  <input type="text" />
                  <label>Correo: </label>
                  <input type="email" />
                  <button type='submit'>Enviar orden</button>
                  </div>
                </form>
              </div>
              :
                <>
                  <p>El carrito esta vacio, Agrega algun producto</p>
                  <Link to="/">
                    Ir al listado de productos
                  </Link>
                </>
            }
          </div>
        }
      </div>
    )
  }
  