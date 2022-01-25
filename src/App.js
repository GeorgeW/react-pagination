import "./App.css";
import React, { useEffect, useState } from "react";

function App() {
  let shows = "https://api.tvmaze.com/shows";
  const options = {
    mode: "cors",
  };

  //
  //
  //
  //Start styles
  //
  //
  //

  const styles = {
    width: "100%",
    height: "50px",
    backgroundColor: "#999",
  };

  let containerWidth = 800 * 0.25;

  const container = {
    width: "800px",
    marginLeft: containerWidth,
  };

  const listStyle = {
    listStyle: "none",
    display: "inline",
    marginRight: 10,
  };

  const itemStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "column",
  };

  var linkStyle = {
    color: "#bada55",
    fontWeight: "normal",
  };

  const selectedLinkStyle = {
    color: "teal",
    fontWeight: "bold",
  };

  //
  //
  // start logic
  //
  //
  //

  const useFetch = (url, options) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
      const runFetch = async () => {
        setIsLoading(true);
        try {
          const res = await fetch(url, options);
          const json = await res.json();
          setData(json);
          setIsLoading(false);
        } catch (error) {
          setError(error);
        }
      };
      runFetch();
    }, []);
    return { data, error, isLoading };
  };

  const { data, error, isLoading } = useFetch(shows, options);

  // const original = data;
  let [dataChunk, setDataChunk] = useState([]);
  let pageNums;
  let [isSelected, setIsSelected] = useState(false);

  let useChunkData = (data, index) => {
    let temp = [];

    if (data != null) {
      let len = data.length;

      pageNums = len / 10; // sets 10 items per page probably could be set dynamically

      for (let i = 0; i < 10; i++) {
        temp.push(data[i]); // This is supposed to be initially set for the first ten items, but its broken for now, hence the shit below
      }
    }
    // console.log(temp);
    // useEffect(() => {
    //   let updateChunk = async () => {
    //     try {
    //       setDataChunk(temp);
    //     } catch (e) {
    //       console.log(e);
    //     }
    //   };
    //   updateChunk();
    // }, []);
  };

  useChunkData(data);

  let setPage = (e, page) => {
    e.preventDefault();
    e.target.className = "selected";

    // this is the magic here
    let current = Number(e.target.innerText) - 1;
    let lower = current * 10;
    let upper = lower + 10;
    let temp = [];
    if (data != null) {
      for (let i = lower; i < upper; i++) {
        temp.push(data[i]);
      }
      setDataChunk(temp);
    }
  };

  //
  //
  // Start container and visual parts of the app
  //
  //
  return (
    <div className="App">
      <div className="container" id="container" style={container}>
        <div className="pagination" style={styles}>
          <ul>
            {[...Array(pageNums)].map((page, i) => {
              return (
                <li style={listStyle} key={i}>
                  <a
                    href=""
                    data={i}
                    onClick={(e) => {
                      setPage(e);
                    }}
                    className={!isSelected ? "link" : "selected"}
                  >
                    {i + 1}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="body">
          {error && "Error...."}
          {isLoading && "Loading..."}
          {dataChunk &&
            dataChunk.map((item) => (
              <div key={item.id} style={itemStyle}>
                <div>{item.name}</div>
                <div>
                  <img src={item.image.medium} alt="" />
                </div>
              </div>
            ))}
        </div>
        <div className="pagination" style={styles}>
          <ul>
            {[...Array(pageNums)].map((page, i) => {
              return (
                <li style={listStyle} key={i}>
                  <a href="" data={i} onClick={setPage} style={linkStyle}>
                    {i + 1}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
