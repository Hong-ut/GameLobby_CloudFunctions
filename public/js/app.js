const requestModal = document.querySelector('.new-request');
const requestLink = document.querySelector('.add-request');

// open request modal
requestLink.addEventListener('click', () => {
    requestModal.classList.add('open');
});

// close request modal
requestModal.addEventListener('click', (e) => {
    if (e.target.classList.contains('new-request')) {
        requestModal.classList.remove('open');
    }
});

// say hello function call
const button = document.querySelector('.call');
button.addEventListener('click', () => {
    // get function reference
    // can use firebase. module because it was imported as scriptin index.html
    // will look for a 'callable' function named 'sayHello' in the 'functions' folder (which has index.js)
    // 노트!!!: since this JS is connected to html.index, it has access to all modules/files connected to html.index b4 it was imported 
    const sayHello = firebase.functions().httpsCallable('sayHello');
    // call the function and pass data
    // sayHello returns a promise here
    sayHello({ name: 'Shaun' }).then(result => { // result = return value of sayHello ('Hello Shaun')
        console.log(result.data);
    });
});