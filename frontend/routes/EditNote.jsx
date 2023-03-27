import React from 'react'
import EditIcon from '../src/assets/edit.png'
import { NavLink } from 'react-router-dom'

const EditNote = () => {
  return (
    <div className='flex flex-col'>
        <div className='flex brand'>
            <input className='bg-y-bg border-2 border-black w-60 font-bold text-center' type='text' placeholder='Enter your title here' />
            <img className="h-12 w-12 ml-auto" src={EditIcon} alt="Image of Edit Icon" />
        </div>
        <div className="mt-5">
            <textarea className="bg-y-bg border-2 border-black" name="content" id="content" cols="80" rows="10" placeholder='Enter your content here'></textarea>
        </div>
        <div className='flex ml-auto gap-3 mt-3'>
            <NavLink className="border-2 border-black py-2 px-3">Save</NavLink>
            <NavLink className="border-2 border-black py-2 px-3">Cancel</NavLink>
        </div>
    </div>
  )
}

export default EditNote