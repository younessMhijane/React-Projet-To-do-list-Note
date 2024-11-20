import React, { useState } from 'react'
import './FormNote.css'
export default function FormNote({ closeForm,addNote }) {
    const repeatUnderscores = '_'
    const [noteName, setNoteName] = useState('');
    const [noteText, setNoteText] = useState('');
    const handlAddNote = ()=>{
        addNote(noteName,noteText)
    }
  return (
    
    <form>
        <button  className='btnClose' onClick={closeForm}>X</button>
        <div className='nomNote'>
            <label>Name</label> 
            <input value={noteName}  onChange={(e)=>{setNoteName(e.target.value)}} type='text'/>
        </div>
        <br/>
        <div className='textNote'>
            <label>{repeatUnderscores.repeat(2300)}</label> 
            <textarea value={noteText} onChange={(e)=>setNoteText(e.target.value)} placeholder='Text' maxLength='1370'></textarea>
        </div>
        <button onClick={handlAddNote} id='button' className="bg-transparent hover:bg-yellow-500 text-yellow-700 font-semibold hover:text-white py-1 px-4 border border-yellow-500 hover:border-transparent rounded">
            OK
        </button>
    </form>
  )
}
