"use client";
import axios from 'axios';
import React, { useState } from 'react'

const Page = () => {
    const [text, setText] = useState('');
    const handleClick = async () => {
        try{
            const data = await axios.get('http://localhost:8000/');
            setText(data.data);
        }
        catch(err){
            console.log(err);
        }
    }
  return (
    <div className='container pt-20'>
      <button className='btn' onClick={handleClick}>Click</button>
      <p>{text}</p>
    </div>
  )
}

export default Page
