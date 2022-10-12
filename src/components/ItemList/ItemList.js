import Item from "../Item/Item";

export const ItemList = ({ itemsList }) => {
  return (
    <>
      {itemsList &&
        itemsList.map((producto) => {
          return (
            <Item
              {...producto}
              key={producto.id}
              // name={producto.name}
              // description={producto.description}
              // price={producto.price}
              // image={producto.image}
              // id={producto.id}
            />
          );
        })}
    </>
  );
};

export default ItemList;