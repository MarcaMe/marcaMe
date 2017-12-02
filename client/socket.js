import io from 'socket.io-client';
import store, { fetchAllContentForUser } from './store';
let socket;
if (global.window) {
  socket = io(global.window.location.origin);

  socket.on('connect', () => {
    console.log('Connected!');
    socket.on('new-message', message =>
      store.dispatch(fetchAllContentForUser(message))
    );
  });
}

export default socket;
