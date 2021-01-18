const { webFrame, ipcRenderer } = require('electron');

document.querySelector('#zoom-in').addEventListener('click', () => {
  const zoom = webFrame.getZoomLevel();
  webFrame.setZoomLevel(zoom + 1);
});

document.querySelector('#zoom-out').addEventListener('click', () => {
  const zoom = webFrame.getZoomLevel();
  webFrame.setZoomLevel(zoom - 1);
});

document.querySelector('#reset-zoom').addEventListener('click', () => {
  webFrame.setZoomLevel(0);
});

const sendMessage = () => {
  ipcRenderer.send('message:send', {
    message: 'Hello from renderer process.',
    value: 300,
  });
};

sendMessage();

ipcRenderer.on('message:response', (e, value) => {
  console.log(`Value from the main process: ${value}`);
});

document.querySelector('#close-app').addEventListener('click', () => {
  ipcRenderer.send('close:app');
  console.log('Click');
});

document.querySelector('#send-message').addEventListener('click', sendMessage);
