'use client';

import { reverse } from "dns";
import { useEffect, useState } from "react";

interface Guess {
  id: number,
  randomnumber: number,
  computerguess: number,
  playerguess: number,
  result: boolean
}

export default function Results( props: any ) {
  let data = props.props

  return (
    <div className="flex flex-col items-center my-24">
      <div className="flex flex-col-reverse">
        {data.map((d:Guess, i:number) => (
          <div className="flex items-center" key={i}>
            <h1 className="text-2xl font-semibold w-12">{i+1}.</h1>
            {d.result ? (<h1 className="text-xl text-green-500 font-bold w-48">Win</h1>) : (<h1 className="text-xl text-red-500 font-bold w-48">Loss</h1>)}
            <h1 className="w-48">{d.randomnumber}</h1>
            <h1 className="w-48">{d.computerguess}</h1>
            <h1 className="w-48">{d.playerguess}</h1>
          </div>
        ))}
        <div className="flex items-center">
          <div className="w-12"></div>
          <h1 className="text-2xl font-semibold w-48">Result:</h1>
          <h1 className="text-xl w-48">Correct number:</h1>
          <h1 className="text-xl w-48">Computer guessed:</h1>
          <h1 className="text-xl">You guessed:</h1>
          <h1></h1>
        </div>
      </div>
    </div>
  );
}
