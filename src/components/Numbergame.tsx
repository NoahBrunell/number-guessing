'use client'

import { useEffect, useState } from "react";
import Results from "./Results";

import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export default function Numbergame() {

  const [update, setUpdate] = useState(0)
  const [data, setData] = useState([]);
  const [random, setRandom] = useState(Math.floor(Math.random() * 100) + 1)
  const [computerNumber, setComputerNumber] = useState(Math.floor(Math.random() * 100) + 1)
  const [number, setNumber] = useState(0)

  async function sendData(result:boolean) {
    const res = await fetch(`http://localhost:3000/api/sendResults?random=${random}&computerNumber=${computerNumber}&number=${number}&result=${result}&cacheBuster=${String(Date.now())}`)

    setRandom(Math.floor(Math.random() * 100) + 1)
    setComputerNumber(Math.floor(Math.random() * 100) + 1)

    setUpdate(update + 1)
  }

  function handleSubmit() {
    let result = null
    const diffUser = Math.abs(number - random);
    const diffComputer = Math.abs(computerNumber - random);

    if (diffUser < diffComputer) {
      result = true
    } else if (diffComputer < diffUser) {
      result = false
    } else {
      alert('Draw!')
      setRandom(Math.floor(Math.random() * 100) + 1)
      setComputerNumber(Math.floor(Math.random() * 100) + 1)
    }
    
    if (result !== null) {
      sendData(result)

    }
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`http://localhost:3000/api/getResults?cacheBuster=${String(Date.now())}`);
        if (!res.ok) throw new Error("Failed to fetch data");
        const jsonData = await res.json();
        console.log(jsonData);
        
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, [update]);


  return (
    <>
      <div className="w-screen flex flex-col items-center">
        <div className="">
          <h1 className="text-4xl font-medium mt-8">Choose a number between 1 and 100!</h1>
          <p className="text-2xl mt-2">Can you guess better than the computer? Your score will be stored and displayed</p>
        </div>

        <div className="mt-12 flex gap-4">
           <input className="w-60 pl-4 h-12 border-2 border-black rounded-md" type="text" placeholder="Number 1 - 100" onChange={(e) => {setNumber(Number(e.target.value))}} />
           <button className="w-20 h-12 border-2 border-black rounded-md text-white bg-blue-500" type="submit" onClick={handleSubmit}>Submit</button>
        </div>
      </div>

      <Results props={data} />
    </>
  )
}
