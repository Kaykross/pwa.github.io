// initialize service worker;
const registerServiceWorker = async () => {
   const resp = await navigator.serviceWorker.register("../../serviceWorker.js");
    if(!resp)console.error(`Registration failed with ${error}`);
    // console.log(resp);
  };

if(navigator.serviceWorker){
    registerServiceWorker();
}

const navLinks = document.querySelectorAll('nav a');
console.log(navLinks);
navLinks.forEach(link=>{
    link.onclick = (e)=>{
        console.log(e.target.href);
        e.preventDefault();
        window.location.href = e.target.href;
    };
});