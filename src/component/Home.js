import React, { useState, useEffect } from "react";

function Home() {
  const [selectedValue, setSelectedValue] = useState("option1");
  const [data, setData] = useState(null);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  useEffect(() => {
    if (selectedValue === "option1") {
      fetch("https://jsonplaceholder.typicode.com/posts")
        .then((response) => response.json())
        .then((data) => {
          setData(data);
        });
    }
    if (selectedValue === "option2") {
      fetch("https://jsonplaceholder.typicode.com/posts/1/comments")
        .then((response) => response.json())
        .then((data) => {
          setData(data);
        });
    }
    if (selectedValue === "option3") {
      fetch("https://jsonplaceholder.typicode.com/posts/1")
        .then((response) => response.json())
        .then((data) => {
          setData(data);
        });
    }
  }, [selectedValue]);

  return (
    <div>
      <select value={selectedValue} onChange={handleChange}>
        <option value="option1">API Data-1</option>
        <option value="option2">API Data-2</option>
        <option value="option3">API Data-3</option>
      </select>
      {data && (
        <div>
          <h2>Data from API:</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default Home;
