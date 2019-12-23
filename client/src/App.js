import React, { useState } from "react";
import Chart from "./Chart.js";
import Pusher from "pusher-js";

Pusher.logToConsole = true;
var pusher = new Pusher("4b5c76ddf52f6399d215", {
  cluster: "ap2",
  forceTLS: true
});

var channel = pusher.subscribe("os");

function App() {
  const [active, fActive] = useState("");
  const [realTime, fRealTime] = useState({});

  const mySubmit = e => {
    e.preventDefault();
    console.log({ active: active });
    fetch(`http://localhost:3005/poll`, {
      method: "post",
      body: JSON.stringify({ os: active }),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
      })
      .catch(e => console.log(e));

    //Get all data
    fetch(`http://localhost:3005/poll`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        let temp = {
          windows: 0,
          linux: 0,
          mac: 0,
          others: 0
        };
        channel.bind("polling", function(data) {
          // alert(JSON.stringify(data));
          console.log(data.data);
          for (let x of data.data) {
            temp[x.os.toString()] += parseInt(x.count);
          }
          console.log(temp);
          fRealTime(temp);
          fActive("");
        });
      });
  };
  return (
    <div>
      <h1>Live Polling App</h1>
      <form
        style={{
          margin: "10px",
          padding: "10px",
          display: "flex",
          flexDirection: "column"
        }}
        onSubmit={mySubmit}
      >
        <div>
          <input
            type="radio"
            name="windows"
            value="windows"
            checked={active == "windows"}
            onChange={e => fActive(e.target.value)}
          />
          Windows
        </div>
        <div style={{ marginTop: "10px" }}>
          <input
            type="radio"
            name="windows"
            value="linux"
            checked={active == "linux"}
            onChange={e => fActive(e.target.value)}
          />
          Linux
        </div>
        <div style={{ marginTop: "10px" }}>
          <input
            type="radio"
            name="windows"
            value="mac"
            checked={active == "mac"}
            onChange={e => fActive(e.target.value)}
          />
          Mac
        </div>
        <div style={{ marginTop: "10px" }}>
          <input
            type="radio"
            name="windows"
            value="others"
            checked={active == "others"}
            onChange={e => fActive(e.target.value)}
          />
          Others
        </div>

        <input
          style={{
            marginTop: "10px",
            width: "100px",
            border: "2px solid balck",
            padding: "2px",
            background: "pink"
          }}
          type="submit"
          name="submit"
        />
      </form>
      <Chart realTime={realTime} />
    </div>
  );
}

export default App;
