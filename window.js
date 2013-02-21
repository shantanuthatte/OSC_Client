// Log events:

document.onwebkitfullscreenchange = function () {
  console.log("onwebkitfullscreenchange");
}

document.onwebkitfullscreenerror = function () {
  console.log("onwebkitfullscreenerror");
}

// Button handlers:

document.getElementById('enter').addEventListener('click', function(e) {
  document.body.webkitRequestFullscreen();
});

document.getElementById('exit').addEventListener('click', function(e) {
  document.webkitExitFullscreen();
});

function ab2str(buf) {
  return String.fromCharCode.apply(null, new Uint16Array(buf));
}

var sockets = {
    "recv": {
      protocol: "udp",
      port: 8899,
      socket: null,
      type: 'bind'
    }
}

var readTimeout;
var readSocket;

function readBack () {
  chrome.socket.recvFrom()
  console.log(data);
};

var ab2str=function(buf) {
  return String.fromCharCode.apply(null, new Uint8Array(buf));
};

function connect(sockRef){
  chrome.socket.create('udp', null, function(createInfo){
    readSocket = createInfo.socketId;

    chrome.socket.bind(readSocket, '0.0.0.0', 8899, function(result){
        console.log('chrome.socket.bind: result = ' + result.toString());
    });

    function read()
    {
      console.log("Reading from port");
        chrome.socket.recvFrom(readSocket, 1024, function(recvFromInfo){
            console.log('Server: recvFromInfo: ', recvFromInfo, 'Message: ', 
                ab2str(recvFromInfo.data));
            if(recvFromInfo.resultCode >= 0)
            {
                console.log(readSocket, 'Received message from client ' + recvFromInfo.address + ':' + recvFromInfo.port.toString() + ': ' + ab2str(recvFromInfo.data), recvFromInfo.address, recvFromInfo.port);
                
                  console.log(new Uint8Array(recvFromInfo.data));
                
                read();
            }
            else
                console.error('Server read error!');
        });
    }

    read();
  });
}

document.getElementById('test').addEventListener('click', function(e) {

// Create the Socket


connect(sockets['recv']);

console.log("Avail Height: "+screen.availHeight);
console.log("Avail Width: "+screen.availWidth);
console.log("Screen Height: "+screen.height);
console.log("Screen Width: "+screen.width);
console.log("outer Height: "+window.outerHeight);
console.log("outer Width: "+window.outerWidth);
});

// Attempt fullscreen on window creation.
// It will fail, but hopefully some day it won't:
// http://code.google.com/p/chromium/issues/detail?id=164624
document.body.webkitRequestFullscreen();

console.log(screen.availHeight);
console.log(screen.availWidth);
console.log(screen.height);
console.log(screen.width);