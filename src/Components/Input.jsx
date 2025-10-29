import React from 'react'
import {useEffect, useState} from 'react'

function Input() {
  const [city, setCity] = useState("");

  return (
    <div className='flex flex-col gap-6 justify-center items-center h-screen'>
      <h1 className='font-bold text-5xl'>WEATHER APP</h1>
      <input type="text" className="h-12 w-64 bg-white border-solid border-2 border-black rounded" placeholder='Enter City name' value={city}/>
      <button onClick={()=>{
        alert("button clicked")
      }} className=''>Get Updates</button>
    </div>
  )
}

export default Input
