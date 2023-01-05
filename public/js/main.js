// const { generateImage } = require("../../controllers/openaiController");

const hamburger = document.querySelector('.hamburger');
const hamburger_icon = hamburger.querySelector('span');
const mobile_menu = document.querySelector('.mobile-menu');

hamburger.addEventListener('click', () => {
	hamburger_icon.innerText = hamburger_icon.innerText === 'menu' 
		? 'close'
		: 'menu';
	
	mobile_menu.classList.toggle('is-open');
})


function onSubmit(e) {
	e.preventDefault();
  
	document.querySelector('.msg').textContent = '';
	document.querySelector('#image').src = '';
  
	const prompt = document.querySelector('#prompt').value;
	const size = document.querySelector('#size').value;
  
	if (prompt === '') {
	  alert('Please add some text');
	  return;
	}
  
	generateImageRequest(prompt, size);
  }
  
  async function generateImageRequest(prompt, size) {
	try {
	  showSpinner();
  
	  const response = await fetch('/openai/generateimage', {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json',
		},
		body: JSON.stringify({
		  prompt,
		  size,
		}),
	  });
  
	  if (!response.ok) {
		removeSpinner();
		throw new Error('That image could not be generated');
	  }
  
	  const data = await response.json();
	  // console.log(data);
  
	  const imageUrl = data.data;
  
	  document.querySelector('#image').src = imageUrl;
  
	  removeSpinner();
	} catch (error) {
	  document.querySelector('.msg').textContent = error;
	}
  }
  
  function showSpinner() {
	document.querySelector('.spinner').classList.add('loader');
  }
  
  function removeSpinner() {
	document.querySelector('.spinner').classList.remove('loader');
  }
  
  document.querySelector('#image-form').addEventListener('submit', onSubmit);