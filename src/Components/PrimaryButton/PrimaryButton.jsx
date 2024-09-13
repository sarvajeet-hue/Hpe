import React from 'react'
import { useNavigate } from 'react-router-dom'

export const PrimaryButton = ({children , linkto}) => {
    const navigate = useNavigate()
  return (
    <button onClick={() => navigate(linkto)} className='flex items-center p-3 bg-blue-400 text-white font-bold rounded-lg'>
        {children}
    </button>
  )
}
