import data from './mock-data'
import {useState, useEffect} from "react"
import ItemList from '../ItemList/ItemList'
import { useParams } from 'react-router-dom'
import {db} from "../../utils/firebase"
import { collection, doc, getDocs, query, where} from "firebase/firestore"



export const ItemListContainer = () => {
    const {categoryId}=useParams()
    const [items, setItems] = useState ([]);

    useEffect(() =>{
        //creamos la referencia de la coleccion.
        const queryRef= !categoryId ? collection(db, "items"): query(collection(db, "items"),where("categoria","==",categoryId));
        getDocs(queryRef).then(response=>{
            const resultados=response.docs.map(doc=>{


            const newItem={
                id:doc.id,
                ...doc.data()
            }
            return newItem
        });
        console.log(resultados)
        setItems(resultados)
})
},[categoryId])  

    return (
  
    <>
      <ItemList itemsList={items} />
    </>
      
    )
    }

    export default ItemListContainer
  