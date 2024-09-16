import React from 'react'
import { PrimaryButton } from './PrimaryButton/PrimaryButton'
import { useNavigate } from 'react-router-dom'

export const IndustrySelection = () => {

  const navigate = useNavigate()
  return (
    <div className='flex items-center justify-center gap-6'>
        <PrimaryButton onClick={() =>navigate('/clickphoto')}>Compute</PrimaryButton>
        <PrimaryButton onClick={() =>navigate('/clickphoto')} >Storage</PrimaryButton>
    </div>
  )
}
