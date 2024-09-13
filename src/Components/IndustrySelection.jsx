import React from 'react'
import { PrimaryButton } from './PrimaryButton/PrimaryButton'

export const IndustrySelection = () => {
  return (
    <div className='flex items-center justify-center gap-6'>
        <PrimaryButton linkto={'/clickphoto'}>Compute</PrimaryButton>
        <PrimaryButton >Storage</PrimaryButton>
    </div>
  )
}
