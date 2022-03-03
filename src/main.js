let audioContext = new (window.AudioContext || window.webkitAudioContext)()
let source = null
let scriptProcessor = null
let videoNode = document.querySelector("video");
source = audioContext.createMediaElementSource(videoNode) 
scriptProcessor = audioContext.createScriptProcessor(4096,1,1) 
source.connect(scriptProcessor) 
scriptProcessor.connect(audioContext.destination)

let gainNode = audioContext.createGain();
source.connect(gainNode);
gainNode.connect(audioContext.destination);

scriptProcessor.onaudioprocess = function(e) {
    let buffer = e.inputBuffer.getChannelData(0)
    let maxVal = Math.max.apply(Math, buffer);
    let value = maxVal*100;
    // 输出分贝
    // console.log(value);
    // TODO
    console.log(getGain(value))
    gainNode.gain.value = getGain(value);
}

function getGain(x) {
    let k = -0.95 / 90;
    let b = 1 - 10*k;
    return k * x + b;
}
