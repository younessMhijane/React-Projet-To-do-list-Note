import React, { useState } from 'react';
import './FormNote.css';

export default function Edit({ Name, Text, saveEdit, closeFormEdit }) {
  const repeatUnderscores = '_';
  
  const [noteName, setNoteName] = useState(Name);  // Initialise avec Name
  const [noteText, setNoteText] = useState(Text);  // Initialise avec Text

  const edit = (e) => {
    e.preventDefault();  // Empêche le rechargement de la page
    saveEdit(noteName, noteText);  // Enregistre les modifications
  };

  return (
    <form onSubmit={edit}> {/* Ajout du onSubmit pour appeler la fonction edit */}
        <button className='btnClose' onClick={closeFormEdit}>X</button>
        
        <div className='nomNote'>
            <label>Name</label> 
            <input 
              value={noteName} 
              onChange={(e) => setNoteName(e.target.value)} 
              type='text'
            />
        </div>
        <br/>
        
        <div className='textNote'>
            <label>{repeatUnderscores.repeat(2300)}</label> 
            <textarea  
              value={noteText} 
              onChange={(e) => setNoteText(e.target.value)} 
              placeholder='Text' 
              maxLength='1370'>
            </textarea>
        </div>
        
        <button type='submit' id='button' className="bg-transparent hover:bg-yellow-500 text-yellow-700 font-semibold hover:text-white py-1 px-4 border border-yellow-500 hover:border-transparent rounded">
            OK
        </button>
    </form>
  );
}
