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



normalizeNote = function(letter){
  return {
    "Cb":"BB",     ////
    "C":"CC",      ////
    "C#":"CD",     ////---------@@@@@@@@@@    C# -- C Sharp
    "Db":"CD",         ////-----@@@@@@@@@@    Db -- D Flat
    "D":"DD",          ////
    "D#":"DE",         ////-----@@@@@@@@@@    D# -- D Sharp
    "Eb":"DE",     ////---------@@@@@@@@@@    Eb -- E Flat
    "E":"EE",      ////
    "E#":"F",      ////
    "Fb":"E",          ////
    "F":"FF",          ////
    "F#":"FG",         ////-----@@@@@@@@@@    F# -- F Sharp
    "Gb":"FG",     ////---------@@@@@@@@@@    Gb -- G Flat
    "G":"GG",      ////
    "G#":"GA",     ////---------@@@@@@@@@@    G# -- G Sharp
    "Ab":"GA",         ////-----@@@@@@@@@@    Ab -- A Flat
    "A":"AA",          ////
    "A#":"AB",         ////-----@@@@@@@@@@    A# -- A Sharp
    "Bb":"AB",     ////---------@@@@@@@@@@    Bb -- B Flat
    "B":"BB",      ////
    "B#":"CC"      ////
  }[letter];
}
function parseNote(note, normalize=true){
  console.log(note);
  var x = note.search(/\d/);
  if(x<0) x = note.length//
  letter = note.slice(0,x);
  octave = note.slice(x) || "4";//
  if(normalize) letter = normalizeNote(letter); 
  return {letter,octave};
}
var smap = [
  "CC",   //-----------
  "CD",   //------@@@@@
  "DD",   //-----------
  "DE",   //------@@@@@
  "EE",   //-----------
  "FF",   //-----------
  "FG",   //------@@@@@
  "GG",   //-----------
  "GA",   //------@@@@@
  "AA",   //-----------
  "AB",   //------@@@@@
  "BB",   //-----------
]; 
function sdiff(note1, note2) {
  // Parse notes into letter and octave components
  const { letter: letter1, octave: octave1 } = parseNote(note1);
  const { letter: letter2, octave: octave2 } = parseNote(note2);

  // Calculate the semitone difference based on letter positions in the smap array
  const semitone1 = smap.indexOf(letter1);
  const semitone2 = smap.indexOf(letter2);

  // Account for octave difference (12 semitones per octave)
  const octaveDiff = (octave2 - octave1) * 12;

  // Calculate semitone difference considering both letter position and octave
  return semitone2 - semitone1 + octaveDiff;
}

function noteFreq(note, tune = "A4=440"){
  var  [tuningnote,tuningfreq] = tune.split("=");
  return modc(tuningfreq, 100*sdiff(tuningnote, note))
}
