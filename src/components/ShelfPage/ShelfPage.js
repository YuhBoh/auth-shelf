import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
//impoty useState:
import { useState } from "react";

//This is where store goes -->

//this is the dispatch call for items reducer:

function ShelfPage() {
  const dispatch = useDispatch();

  const items = useSelector((store) => store.items);

  useEffect(() => {
    dispatch({ type: "GET_ITEMS" });
  }, []);

  const [description, setDescription] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  function clickHandler(event){
    event.preventDefault;
      dispatch({ 
        type: 'ADD_ITEMS',
        payload: {
          description: description,
          image_url: imgUrl
        }
      })
      //Reset input fields:
        setDescription = useState("");
        setImgUrl = useState("");
  }
  //Delete Handler function:
  const deleteHandler = (item) => {
    // console.log("ITEM ID:", item.id);
    dispatch({ 
      type: 'DELETE_ITEM',
      payload: item.id
    })
  }

  return (
    <div className="container">
      <h2>Shelf</h2>
      <form onSubmit={clickHandler}>
        <input
          placeholder="description"
          typeof="text"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <input
          placeholder="image url"
          typeof="text"
          value={imgUrl}
          onChange={(event) => setImgUrl(event.target.value)}
        />
        <button type='submit'>Add New Item</button>
      </form>

      <p>All of the available items can be seen here.</p>
      {items.map((item) => {
        return (
          <div key={item.id}>
            <h3>{item.description}</h3>
            <img src={item.image_url} />
            <button onClick={()=> {deleteHandler(item)}}>DELETE</button> 
          </div>
        );
      })}
    </div>
  );
}

export default ShelfPage;
