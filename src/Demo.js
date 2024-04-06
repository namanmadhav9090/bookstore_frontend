import React, { useState, useEffect } from "react";

export default function App(props) {
  const [list, setList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState();
  const [newItemValue, setNewItemValue] = useState("");

  const getData = async () => {
    const data = await fetch(`https://dummyjson.com/products`);
    const resp = await data.json();
    setList(resp?.products);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDelete = (index) => {
    const newlist = [...list];
    newlist.splice(index, 1);
    setList(newlist);
  };

  const handleEdit = (item, index) => {
    setEditIndex(index);
    setEditValue(item?.title);
  };

  const handleUpdate = (index) => {
    const newlist = [...list];
    newlist[index].title = editValue;
    setList(newlist);
    setEditIndex(null);
  };

  const handleCreate = () => {
    if (newItemValue.trim() === "") return; // Prevent adding empty items
    setList([...list, { title: newItemValue }]);
    setNewItemValue(""); // Clear input field after adding
  };


  return (
    <div className="App">
      <h1>Hello React.</h1>
      <h2>Start editing to see some magic happen!</h2>
      <input
        type="text"
        value={newItemValue}
        onChange={(e) => setNewItemValue(e.target.value)}
      />
      <button onClick={handleCreate}>Create</button>
      {list &&
        list?.map((item, index) => {
          return (
            <div key={index}>
              {editIndex == index ? (
                <>
                  <input
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                  />
                  <button onClick={() => handleUpdate(index)}>update</button>
                </>
              ) : (
                <>
                  <p>{item?.title}</p>
                  <div>
                    <button onClick={() => handleEdit(item, index)}>
                      Edit
                    </button>
                    <button onClick={() => handleDelete(index)}>Delete</button>
                  </div>
                </>
              )}
            </div>
          );
        })}
    </div>
  );
}
