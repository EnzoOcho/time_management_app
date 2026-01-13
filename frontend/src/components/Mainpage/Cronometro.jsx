import { useState, useEffect, useRef } from "react";

export default function Cronometro({ setData, patchUserData, data }) {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalIdRef = useRef(null);
  const startTimeRef = useRef(0);

  useEffect(() => {

    if (isRunning) {
      intervalIdRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current);
      }, 10);
    }

    return () => {
      clearInterval(intervalIdRef.current);
    }
  }, [isRunning]);

  function start() {
    setIsRunning(true);
    startTimeRef.current = Date.now() - elapsedTime;
  }

  function stop() {
    setIsRunning(false);
  }

  function reset() {
    setElapsedTime(0);
    setIsRunning(false);
  }

  function formatTime() {

    let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
    let seconds = Math.floor(elapsedTime / (1000) % 60);
    let milliseconds = Math.floor((elapsedTime % 1000) / 10);

    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    milliseconds = String(milliseconds).padStart(2, "0");

    return `${hours}:${minutes}:${seconds}:${milliseconds}`;
  }


  //cosas que agregar:
  //-al usar addtime se tiene que sumarle el tiempo en un dia especifico del grafico
  //y que se suba al servidor

function addTime() {
  let timeToAdd = elapsedTime / 6000;

  setData(prevItems => {
    const lastDay = prevItems.length - 1;

    const updatedData = prevItems.map((item, index) =>
      index === lastDay
        ? { ...item, horas: prevItems[lastDay].horas + timeToAdd }
        : item
    );

    uploadNewData(updatedData);
    return updatedData;
  });
}

  //A CAMBIAR
  function uploadNewData (newData){
    const formatedData = {
      data: newData
    }
    patchUserData(formatedData)
  }

  function newDay() {
    let fechaa = new Date()
    let dia = fechaa.getDate()
    const mes = fechaa.getMonth() + 1;

    let fechaCompleta = `${dia}/${mes}`

    if (data[data.length - 1].name === fechaCompleta) return



    const updatedData = [...data, { name: `${fechaCompleta}`, horas: 0 }]

    setData(updatedData)

    const formatedData = {
      data: updatedData
    }
    patchUserData(formatedData)
  }

  return (
    <div className="timer_section flex cronometro">

      <div className="timer">{formatTime()}</div>
      <div className="controls">
        <button onClick={start} className="start-button">Start</button>
        <button onClick={stop} className="stop-button">Stop</button>
        <button onClick={reset} className="reset-button">Reset</button>
        <button onClick={newDay}>new day</button>
        <button onClick={addTime}>addTime</button>
      </div>

    </div>
  );
}

// style={{ textAlign: "center" }}
// const [isRunning, setIsRunning] = useState(false);
// const [elapsedTime, setElapsedTime] = useState(0);
// const intervalIdRef = useRef(null);
// const startTimeRef = useRef(0);

// useEffect(() => {

//   if (isRunning) {
//     intervalIdRef.current = setInterval(() => {
//       setElapsedTime(Date.now() - startTimeRef.current);
//     }, 10);
//   }

//   return () => {
//     clearInterval(intervalIdRef.current);
//   }
// }, [isRunning]);

// function start() {
//   setIsRunning(true);
//   startTimeRef.current = Date.now() - elapsedTime;
// }

// function stop() {
//   setIsRunning(false);
// }

// function reset() {
//   setElapsedTime(0);
//   setIsRunning(false);
// }

// function formatTime() {

//   let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
//   let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
//   let seconds = Math.floor(elapsedTime / (1000) % 60);
//   let milliseconds = Math.floor((elapsedTime % 1000) / 10);

//   hours = String(hours).padStart(2, "0");
//   minutes = String(minutes).padStart(2, "0");
//   seconds = String(seconds).padStart(2, "0");
//   milliseconds = String(milliseconds).padStart(2, "0");

//   return `${minutes}:${seconds}:${milliseconds}`;
// }

// return (
//   <div className="stopwatch">
//     <div className="display">{formatTime()}</div>
//     <div className="controls">
//       <button onClick={start} className="start-button">Start</button>
//       <button onClick={stop} className="stop-button">Stop</button>
//       <button onClick={reset} className="reset-button">Reset</button>
//     </div>
//   </div>
// );
// }