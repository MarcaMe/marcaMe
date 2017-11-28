export default function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register(`http://marcame.herokuapp.com/sw.js`)
      .then(function(register) {
        console.log('worked', register);
      })
      .catch(function(err) {
        console.log('Error', err);
      });
  }
}
