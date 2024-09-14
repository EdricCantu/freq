Math.blog = (b,y)=>(Math.log(y)/Math.log(b))
modc = (f,c)=>(f/(2**(c/-1200)))
cdiff = (f1,f2)=>(1200*Math.blog(2, f2/f1));
var context, oscillator, gain, panner;
var x = 0;
//                       o        s        c        f                 f      c      s      o
var ids = "pan freq waves octvDown semiDown centDown freqDown playPause freqUp centUp semiUp octvUp volume volumeLabel".split(" ")
for(const id of ids){
  window[id] = document.getElementById(id);
}


/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/


var x = 0;
var f = 440;

function changeFreq(frequency){
  f = frequency;
  freq.value = Math.round( f * 100 ) / 100;
  freqRange.value = cdiff(1,f);
  if(oscillator){
    oscillator.frequency.value = f ;
  }
}

function initOsc(){
  if(!(x++)){
    context = new AudioContext();
    gain = context.createGain();
    panner = context.createStereoPanner();
    panner.connect(context.destination);
    gain.connect(panner);
  }
  gain.gain.value = 0;//nvm, starting wo popping
  oscillator = context.createOscillator();
  oscillator.type = waves.querySelector("input:checked").value;
  oscillator.frequency.value = freq.value;
  oscillator.connect(gain);
}
var stopping = false, starting = false;
function play(){
  if(stopping) return;
  starting = true;
  playpause.children[0].src = "pause.svg"
  initOsc();
  oscillator.start(0);
  gain.gain.setTargetAtTime(volume.value, context.currentTime, 0.01);

  setTimeout(()=>{
    starting = false;
  },  75);
}
function stop(){
  if(starting) return;
  stopping = true;
  playpause.children[0].src = "play.svg"
  gain.gain.setTargetAtTime(0, context.currentTime, 0.01)

  setTimeout(()=>{
    oscillator.stop();
    oscillator = undefined;
    stopping = false;
  },  75);
}


/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/


freqUp.addEventListener("mousedown",()=>{
  changeFreq(f+1)
  freqUp.timeout = setTimeout(()=>{
    freqUp.interval = setInterval(()=>{
      changeFreq(f+1)
    },75);
  },250)
})
freqUp.addEventListener("mouseup",()=>{
  clearTimeout(freqUp.timeout);
  clearInterval(freqUp.interval)
  delete freqUp.timeout;
  delete freqUp.interval;
})
freqUp.addEventListener("mouseleave",()=>{
  clearTimeout(freqUp.timeout);
  clearInterval(freqUp.interval)
  delete freqUp.timeout;
  delete freqUp.interval;
})
/*****************************************/
freqDown.addEventListener("mousedown",()=>{
  changeFreq(f-1)
  freqDown.timeout = setTimeout(()=>{
    freqDown.interval = setInterval(()=>{
      changeFreq(f-1)
    },75);
  },250)
})
freqDown.addEventListener("mouseup",()=>{
  clearTimeout(freqDown.timeout);
  clearInterval(freqDown.interval)
  delete freqDown.timeout;
  delete freqDown.interval;
})
freqUp.addEventListener("mouseleave",()=>{
  clearTimeout(freqUp.timeout);
  clearInterval(freqUp.interval)
  delete freqUp.timeout;
  delete freqUp.interval;
})

/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/

centUp.addEventListener("mousedown",()=>{
  changeFreq(   Math.round(modc(f, 5) * 1000)/1000   );
  centUp.timeout = setTimeout(()=>{
    centUp.interval = setInterval(()=>{
      changeFreq(   Math.round(modc(f, 5) * 1000)/1000   );
    },25);
  },250)
})
centUp.addEventListener("mouseup",()=>{
  clearTimeout(centUp.timeout);
  clearInterval(centUp.interval)
  delete centUp.timeout;
  delete centUp.interval;
})
centUp.addEventListener("mouseleave",()=>{
  clearTimeout(centUp.timeout);
  clearInterval(centUp.interval)
  delete centUp.timeout;
  delete centUp.interval;
})
/*****************************************/
centDown.addEventListener("mousedown",()=>{
  changeFreq(   Math.round(modc(f, -5) * 1000)/1000   );
  centDown.timeout = setTimeout(()=>{
    centDown.interval = setInterval(()=>{
      changeFreq(   Math.round(modc(f, -5) * 1000)/1000   );
    },25);
  },250)
})
centDown.addEventListener("mouseup",()=>{
  clearTimeout(centDown.timeout);
  clearInterval(centDown.interval)
  delete centDown.timeout;
  delete centDown.interval;
})
centDown.addEventListener("mouseleave",()=>{
  clearTimeout(centDown.timeout);
  clearInterval(centDown.interval)
  delete centDown.timeout;
  delete centDown.interval;
})

/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/

semiUp.addEventListener("mousedown",()=>{
  changeFreq(   Math.round(modc(f, 100) * 1000)/1000   );
  semiUp.timeout = setTimeout(()=>{
    semiUp.interval = setInterval(()=>{
      changeFreq(   Math.round(modc(f, 100) * 1000)/1000   );
    },200);
  },250)
})
semiUp.addEventListener("mouseup",()=>{
  clearTimeout(semiUp.timeout);
  clearInterval(semiUp.interval)
  delete semiUp.timeout;
  delete semiUp.interval;
})
semiUp.addEventListener("mouseleave",()=>{
  clearTimeout(semiUp.timeout);
  clearInterval(semiUp.interval)
  delete semiUp.timeout;
  delete semiUp.interval;
})
/*****************************************/
semiDown.addEventListener("mousedown",()=>{
  changeFreq(   Math.round(modc(f, -100) * 1000)/1000   );
  semiDown.timeout = setTimeout(()=>{
    semiDown.interval = setInterval(()=>{
      changeFreq(   Math.round(modc(f, -100) * 1000)/1000   );
    },200);
  },250)
})
semiDown.addEventListener("mouseup",()=>{
  clearTimeout(semiDown.timeout);
  clearInterval(semiDown.interval)
  delete semiDown.timeout;
  delete semiDown.interval;
})
semiDown.addEventListener("mouseleave",()=>{
  clearTimeout(semiDown.timeout);
  clearInterval(semiDown.interval)
  delete semiDown.timeout;
  delete semiDown.interval;
})

/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/

octvUp.addEventListener("mousedown",()=>{
  changeFreq(   Math.round(modc(f, 1200) * 1000)/1000   );
  octvUp.timeout = setTimeout(()=>{
    octvUp.interval = setInterval(()=>{
      changeFreq(   Math.round(modc(f, 1200) * 1000)/1000   );
    },500);
  },250)
})
octvUp.addEventListener("mouseup",()=>{
  clearTimeout(octvUp.timeout);
  clearInterval(octvUp.interval)
  delete octvUp.timeout;
  delete octvUp.interval;
})
octvUp.addEventListener("mouseleave",()=>{
  clearTimeout(octvUp.timeout);
  clearInterval(octvUp.interval)
  delete octvUp.timeout;
  delete octvUp.interval;
})
/*****************************************/
octvDown.addEventListener("mousedown",()=>{
  changeFreq(   Math.round(modc(f, -1200) * 1000)/1000   );
  octvDown.timeout = setTimeout(()=>{
    octvDown.interval = setInterval(()=>{
      changeFreq(   Math.round(modc(f, -1200) * 1000)/1000   );
    },500);
  },250)
})
octvDown.addEventListener("mouseup",()=>{
  clearTimeout(octvDown.timeout);
  clearInterval(octvDown.interval)
  delete octvDown.timeout;
  delete octvDown.interval;
})
octvDown.addEventListener("mouseleave",()=>{
  clearTimeout(octvDown.timeout);
  clearInterval(octvDown.interval)
  delete octvDown.timeout;
  delete octvDown.interval;
})

freq.addEventListener("change", ()=>{
  changeFreq(parseInt(freq.value));
});

playpause.addEventListener("click",()=>{
  if(playpause.children[0].getAttribute("src") == "play.svg"){
    play()
  }else{
    stop()
  }
});


volume.addEventListener("input", ()=>{
  
  volumeLabel.innerText = (Math.round(volume.value * 1000)/10) + "%";
  if(gain) gain.gain.value = volume.value;

  //no
  if(volume.value === 1){
    volumeBoost.style.display = "none";
  }else{
    volumeBoostButton.style.display = "none";
    volume
  }
});

pan.addEventListener("input", ()=>{
  
  if(panner) panner.pan.value = pan.value;
});

freqRange.addEventListener("input", ()=>{
  changeFreq(
    Math.round(modc(1,freqRange.value) * 1000) / 1000
  );
});


for(var wave of waves.querySelectorAll("input")){
  wave.addEventListener("input", function(){
    if(oscillator){
      oscillator.type = this.value;
    }
  })
}











function parseNote(note){
  if(["#", "b", "♯", "♭"].includes(note[1])){
    return {   letter: note.slice(0,2), octave: (parseInt(note.slice(2))||null)   };
  }else{
    return {   letter: note[0], octave: (parseInt(note.slice(1))||null)   };
  } 
}

noteMap = [];
octave = -2;
notes = "CC CD DD DE EE FF FG GG GA AA AB BB".split(" ");
while(octave++ < 9) noteMap.push(...(notes.map(letter=>(letter+octave))));
notesSharp = "C C# D D# E F F# G G# A A# B".split(" ");
notesFlat = "C Db D Eb E F Gb G Ab A Bb B".split(" ");
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

function noteToMidi(note){
  const {letter, octave} = parseNote(note);
  return noteMap.indexOf(normalizeLetter(letter)+octave);
}

function ntf(note, tune = "A4=440"){
  tune = tune.split("=");
  tune = {note: noteToMidi(tune[0], pitch: parseInt(tune[1])};
  note = noteToMidi(note);
  const interval = note - tune.note;
  return modc(tune.pitch, interval*100);
}
