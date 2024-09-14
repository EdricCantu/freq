function parseNote(note){
  if(["#", "b", "♯", "♭"].includes(note[1])){
    return {   letter: note.slice(0,2), octave: parseInt(note.slice(2))||null   };
  }else{
    return {   letter: note[0], octave: parseInt(note.slice(1))||null   };
  } 
}

noteMap = [];
octave = -2;
notesSharp = "C C# D D# E F F# G G# A A# B".split(" ");
notesFlat = "C Db D Eb E F Gb G Ab A Bb B".split(" ");
notes = "CC CD DD DE EE FF FG GG GA AA AB BB".split(" ");
function normalizeLetter(letter){;
  switch(letter[1]){
    case "#":
    case "♯":
      return notes[notesSharp.indexOf(letter)];
      break;
    case "b":
    case "♭":
      return notes[notesFlat.indexOf(letter)];
      break;
    default: //undefined
      return letter.repeat(2);
      break;
  }
}
while(octave++ < 9) noteMap.push(...(notes.map(letter=>(letter+octave))));

function noteToMidi(note){
  const {letter,octave} = parseNote(note);
  return noteMap.indexOf(normalizeLetter(letter)+octave);
}







function ntf(note, tune = "A4=440"){
  tune = tune.split("=");
  tune = {note: noteToMidi(tune[0], pitch: parseInt(tune[1])};
  note = noteToMidi(note);
  interval = note - tune.note;
  return interval
}
