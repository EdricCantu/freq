Math.blog = (b,y)=>(Math.log(y)/Math.log(b))
modc = (f,c)=>(f/(2**(c/-1200)))
cdiff = (f1,f2)=>(1200*Math.blog(2, f2/f1));
var context, oscillator, gain;
var x = 0;
//                       o        s        c        f                 f      c      s      o
var ids = "freq waves octvDown semiDown centDown freqDown playPause freqUp centUp semiUp octvUp volume volumeLabel".split(" ")
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
  if(oscillator){
    oscillator.frequency.value = f ;
  }
}

function initOsc(){
  if(!(x++)){
    context = new AudioContext();
    gain = context.createGain();
    gain.connect(context.destination);
    gain.gain.value = volume.value;
  }
  oscillator = context.createOscillator();
  oscillator.type = waves.querySelector("input:checked").value;
  oscillator.frequency.value = freq.value;
  oscillator.connect(gain);
}
var stopping = false;
function play(){
  if(stopping) return;
  playpause.children[0].src = "pause.svg"
  initOsc();
  oscillator.start();
}
function stop(){
  playpause.children[0].src = "play.svg"
  gain.gain.exponentialRampToValueAtTime(1e-9, context.currentTime+0.1);
  stopping = true;
  setTimeout(()=>{
    oscillator.stop();
    oscillator = undefined;
    stopping = false;
  });
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
})


for(var wave of waves.querySelectorAll("input")){
  wave.addEventListener("input", function(){
    if(oscillator){
      oscillator.type = this.value;
    }
  })
}



normalizeNote = function(note){
  var noteMap = {
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
  }
  /*
  var smap = {
    "C":,    //-----------
    "CD":,   //------@@@@@
    "D":,    //-----------
    "DE":,   //------@@@@@
    "E":,    //-----------
    "F":,    //-----------
    "FG":,   //------@@@@@
    "G":,    //-----------
    "GA":,   //------@@@@@
    "A":,    //-----------
    "AB":,   //------@@@@@
    "B":,    //-----------
  }*/
}

function noteFreq(note, tune = "A4=440"){
  tune = tine.split("=");
  tuningnote = tune[0];
  tuningfreq = tune[1];
}
