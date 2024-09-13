import React from 'react'
import { useNavigate } from 'react-router-dom'

export const Home = () => {

    const navigate = useNavigate()
  return (
    <div>
        <header>
            <h2 className='font-bold text-xl '>Hpe Discover More AI 2024</h2>
        </header>

        <div className='flex items-center justify-center flex-col gap-5'>
            <h1>Welcome to the event</h1>
            <p>please fill in your basic details</p>

            <form >
                <div className='flex flex-col items-center justify-center gap-3'>
                <input placeholder='Enter your name' type="text" />
                <input type="text" placeholder='company name' />
                <input type="text" placeholder='Email ID' />

                </div>

                <button onClick={() => navigate('/gender') } className='flex items-center p-3 bg-blue-400 text-white font-bold rounded-lg'> Submit</button>
            </form>
        </div>
    </div>
  )
}
