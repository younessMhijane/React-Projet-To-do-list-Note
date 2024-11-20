import React, { useState } from 'react';
import './Note.css';
import FormNote from './Compenents/FormNote';
import EditNote from './Compenents/EditNote';
import imgNote from './img/PIN-removebg-preview.png';

export default function Note() {
  const [notes, setNotes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showFormEdit, setShowFormEdit] = useState(false);
  const [currentEdit, setCurrentEdit] = useState({ name: '', text: '', index: null });

  const addNote = (noteName, noteText) => {
    setNotes([...notes, { name: noteName, text: noteText }]);
    setShowForm(false);
  };

  const deleteNote = (index) => {
    const confirm= window.confirm("Êtes-vous sûr de vouloir supprimer cette Note ?");
    if(confirm){
      const updatedNotes = notes.filter((_, i) => i !== index);
      setNotes(updatedNotes);
    }
  };

  const handleInputClick = () => {
    setShowForm(true);
  };

  const handleEditNote = (index) => {
    setCurrentEdit({ name: notes[index].name, text: notes[index].text, index });
    setShowFormEdit(true);
  };

  const saveEditedNote = (editedName, editedText) => {
    const updatedNotes = notes.map((note, i) => 
      i === currentEdit.index ? { name: editedName, text: editedText } : note
    );
    setNotes(updatedNotes);
    setShowFormEdit(false);
  };

  return (
    <div className='note'>
      <h2>
        <img src={imgNote} alt='imgNote' /> Notes
      </h2>
      <div className='formNote'>
        <div className='InputNote'>
          <input type='text' onClick={handleInputClick} readOnly placeholder='Ecrivez vos Notes' />
        </div>

        {showForm && <FormNote addNote={addNote} closeForm={() => setShowForm(false)} />}

        {showFormEdit && (
          <EditNote
            Name={currentEdit.name}
            Text={currentEdit.text}
            saveEdit={(name, text) => saveEditedNote(name, text)}
            closeFormEdit={() => setShowFormEdit(false)}
          />
        )}

        {!showForm && !showFormEdit && (
          <div className='noteList'>
            {notes.map((note, index) => (
              <div key={index} className='noteItem'>
                <div className='menuNote'>
                  <h3>{note.name.length>27 ? note.name.slice(0,26)+"...":note.name || `Note ${index}`}</h3>
                  <div className='menu'>
                    <button onClick={() => handleEditNote(index)}>
                      <svg className='h-6 w-6 text-yellow-500' viewBox='0 0 24 24' strokeWidth='2' stroke='currentColor' fill='none' strokeLinecap='round' strokeLinejoin='round'>
                        <path stroke='none' d='M0 0h24v24H0z' />
                        <path d='M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3' />
                        <path d='M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3' />
                        <line x1='16' y1='5' x2='19' y2='8' />
                      </svg>
                    </button>
                    <button onClick={() => deleteNote(index)}>
                      <svg className='h-6 w-16 text-red-500' width='24' height='24' viewBox='0 0 24 24' strokeWidth='2' stroke='currentColor' fill='none' strokeLinecap='round' strokeLinejoin='round'>
                        <path stroke='none' d='M0 0h24v24H0z' />
                        <line x1='4' y1='7' x2='20' y2='7' />
                        <line x1='10' y1='11' x2='10' y2='17' />
                        <line x1='14' y1='11' x2='14' y2='17' />
                        <path d='M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12' />
                        <path d='M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3' />
                      </svg>
                    </button>
                  </div>
                </div>
                <p>{note.text ? (note.text.length > 75 ? note.text.slice(0, 70) + "..." : note.text) : `Text ${index}`}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
