//required imports
import { Workbox } from 'workbox-window';
import Editor from './editor';
import './database';
import '../css/style.css';
import Logo from '../images/logo.png';
//assign the install button to a variable by it's id
const installBtn = document.getElementById('buttonInstall');
//if viewing app as standalone download hide the install button
if (window.matchMedia('(display-mode: standalone)').matches) {
  installBtn.style.display = "none";
}
//defines install button behavior before/after initial install
window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  installBtn.style.visibility = 'visible';
  installBtn.addEventListener('click', () => {
    event.prompt();
    installBtn.setAttribute('disabled', true);
    installBtn.textContent = 'Installed!';
    });
  });
//upon initial install get a confirmation log
  window.addEventListener('appinstalled', (event) => {
    console.log('👍', 'appinstalled', event);
  });
//on page load get logo by id and assign it's src
window.addEventListener('load', function () {
  console.log("Load Listener: Engaged")
  document.getElementById('logo').src = Logo;
})
//get html element and assing to variable
const main = document.querySelector('#main');
main.innerHTML = '';
//append html to main
const loadSpinner = () => {
  const spinner = document.createElement('div');
  spinner.classList.add('spinner');
  spinner.innerHTML = `
  <div class="loading-container">
  <div class="loading-spinner" />
  </div>
  `;
  main.appendChild(spinner);
};
//assing new instance of editor method
const editor = new Editor();

if (typeof editor === 'undefined') {
  loadSpinner();
}

// Check if service workers are supported
if ('serviceWorker' in navigator) {

  //register service worker
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js');
  })

} else {
  console.error('Service workers are not supported in this browser.');
}
