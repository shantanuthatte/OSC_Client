var ab2str=function(buf) {
  return String.fromCharCode.apply(null, new Uint8Array(buf));
};

function read(readSock, callback)
{
  //console.log("Reading from port");
  chrome.socket.recvFrom(readSock, 1024, function(recvFromInfo){
      console.log('Server: recvFromInfo: ' + recvFromInfo.address + ":" + recvFromInfo.port.toString(), 'Message: ' + ab2str(recvFromInfo.data));
      if(recvFromInfo.resultCode >= 0)
      {
          //console.log(readSock, 'Received message from client ' + recvFromInfo.address + ':' + recvFromInfo.port.toString() + ': ' + ab2str(recvFromInfo.data), recvFromInfo.address, recvFromInfo.port);
          //console.log(new Uint8Array(recvFromInfo.data));
          callback(recvFromInfo.data)
          read(readSock, callback);
      }
      else
          console.error('Server read error!');
  });
}

function connect(sockRef, callback){
  chrome.socket.create(sockRef.protocol, null, function(createInfo){
    sockRef.socket = createInfo.socketId;
    if(sockRef.type == "bind" && sockRef.protocol == "udp")
    {
      chrome.socket.bind(sockRef.socket, '0.0.0.0', 8899, function(result){
          console.log('chrome.socket.bind: result = ' + result.toString());
      });
      read(sockRef.socket, callback);
    }
  });
}