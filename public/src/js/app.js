let deferredPrompt;

if (!window.Promise) {
  window.Promise = Promise;
}

if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/sw.js')
      .then(() => {
        console.log('Service worker registered.');
      })
      .catch((err) => {
        console.log(err);
      });
}

window.addEventListener('beforeinstallprompt', (event) => {
  console.log('before install prompt fired');
  event.preventDefault();
  deferredPrompt = event;
  return false;
});

// var promise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     // resolve("This is executed once the timer is done");
//     reject({code: 500, message:"An error occured"});
//   }, 3000);
// });

var xhr = new XMLHttpRequest();
xhr.open('GET','https://httpbin.org/ip');
xhr.responseType = 'json';

xhr.onload = () => {
  console.log(xhr.response);
}

xhr.onerror = () => {
  console.log('Error!');
}

xhr.send();

fetch('https://httpbin.org/ip')
  .then((response) => {
    console.log(response);
    return response.json();
  })
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });

fetch('https://httpbin.org/post', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  body: JSON.stringify({message: 'Does this really works?'})
})
  .then((response) => {
    console.log(response);
    return response.json();
  })
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });

// promise
//   .then((text) => {
//     return text;
//   }).then((newText) => {
//     console.log(newText);
//   }).catch((err) => {
//     console.log(err);
//   }); 

// console.log("Run after set time out");