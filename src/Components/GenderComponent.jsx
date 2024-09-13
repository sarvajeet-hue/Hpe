import React from 'react'
import { useNavigate } from 'react-router-dom'

export const GenderComponent = () => {

    const navigate = useNavigate()
  return (
    <div className='flex items-center justify-center gap-6'>
        <button onClick={() => navigate('/industry')} className='flex items-center justify-center bg-blue-400 p-2 rounded-xl'>Male</button>
        <button onClick={() => navigate('/industry')} className='flex items-center justify-center bg-blue-400 p-2 rounded-xl'>Femail</button>
    </div>
  )
}
