
import React from 'react'
import { NavLink } from 'react-router-dom'
import AddIcon from '../src/assets/add.png'

const CreateNote = () => {
  return (
    <div className='flex flex-col'>
        <div className='flex brand'>
            <input className='bg-y-bg border-2 border-black w-60 font-bold text-center' type='text' placeholder='Enter your title here' />
            <img className="h-9 w-9 ml-auto" src={AddIcon} alt="Image of Edit Icon" />
        </div>
        <div className="mt-5">
            <textarea className="bg-y-bg border-2 border-black w-full h-20" name="content" id="content" placeholder='Enter your content here'></textarea>
        </div>
        <div className='flex ml-auto gap-3 mt-3'>
            <NavLink className="border-2 border-black py-2 px-3">Save</NavLink>
            <NavLink className="border-2 border-black py-2 px-3">Cancel</NavLink>
        </div>
    </div>
  )
}

export default CreateNote