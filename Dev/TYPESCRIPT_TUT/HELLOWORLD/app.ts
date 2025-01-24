console.log('script runs...');

let message: string = 'mp3 concatenator';
let text: string = 'This tool can concatenate multiple mp3 files into one mp3 file.';

let heading1 = document.createElement('h1');
let paragraph = document.createElement('p')

heading1.textContent = message;
paragraph.textContent = text;

document.body.appendChild(heading1);
document.body.appendChild(paragraph)

//div1
// takes user URL input
const div1 = document.createElement('div');
div1.id = 'step1-container';
div1.style.backgroundColor = 'lightblue';
div1.textContent = 'Add YouTube links below';
div1.style.padding ='200px';
div1.style.marginBottom = '20px'
div1.style.border ='1px solid';
document.body.appendChild(div1);

//make input for URLS
const input = document.createElement('input');
input.type = 'url';
input.placeholder = 'Enter YouTube URL'
div1.appendChild(input);//add to div1 as a child

//add button to for URLs
const addButton = document.createElement('button');
addButton.textContent = 'Add URL';
div1.appendChild(addButton)

//container show URLs added
const urlListContainer = document.createElement('div1');
urlListContainer.id = 'url-list-container';
urlListContainer.style.marginTop = '10px';
div1.appendChild(urlListContainer);

//track progress of URLs added 
const progressTracker = document.createElement('p');
progressTracker.textContent = 'URLs added: 0/10';
progressTracker.style.marginTop = '10px';
div1.appendChild(progressTracker);
let urlCount = 0;
const maxUrls = 20;

//event listener for add button, catches edge case too many URLs 
addButton.addEventListener('click', () => {
    const enteredUrl = input.value.trim();
    if (!enteredUrl) {
        alert('Please enter valid URL.');
        return;
    }
    if (urlCount >= maxUrls) {
        alert('You can add a max of 10 URLs at once');
        return;
    }
})

//create a new entry for the URL
const urlEntry = document.createElement('div');
urlEntry.textContent = ('enteredUrl');
urlEntry.style.marginTop = '5px';

//remove button for added URLs
const removeButton = document.createElement('button');
removeButton.textContent = 'remove';
removeButton.addEventListener('click', () => {
    urlListContainer.removeChild(urlEntry);
    urlCount--;
});

//append remove btn and URL entry
urlEntry.appendChild(removeButton);
urlListContainer.appendChild(urlEntry);

//clear the URL input box and increment the count of URLs added
input.value ='';
urlCount++;





//div2
//convert, download, combine
const div2 = document.createElement('div');
div2.id = 'step2-container';
div2.style.backgroundColor = 'blue';
div2.textContent = 'Download your custom album!';
div2.style.padding ='200px';
div2.style.marginBottom = '20px'
div2.style.border ='1px solid';
document.body.appendChild(div2);

