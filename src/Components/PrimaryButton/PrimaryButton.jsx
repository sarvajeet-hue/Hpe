import React from 'react'


export const PrimaryButton = ({children  , onClick}) => {
    
  return (
    <button  onClick={onClick} className='flex items-center p-3 bg-blue-400 text-white font-bold rounded-lg'>
        {children}
    </button>
  )
}
