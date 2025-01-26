import { createRoot } from 'react-dom/client'
//import { useEffect } from 'react';
import App from './App'
import App_SinglePage from './App_SinglePage';
import '../css/index.css'

const root = createRoot(document.getElementById('root'));

const mediaQuery = window.matchMedia('(min-width: 1169px)');

mediaQuery.addEventListener("change", function() {
	if (mediaQuery.matches) {
		console.log('event listener: rendering App')
		root.render(
			<App />
		)
	} else {
		console.log('event listener: rendering App_SinglePage')
		root.render(
			<App_SinglePage />
		)
	}
});

if (sessionStorage.getItem('font')) {
	root.style.setProperty('font-family', sessionStorage.getItem('font'));
}

if (sessionStorage.getItem('color')) {
	root.style.setProperty('background', sessionStorage.getItem('color'));
}

if (mediaQuery.matches) {
	console.log('on load: rendering App')
	root.render(
		<App />
	)
} else {
	console.log('on load: rendering App_SinglePage')
	root.render(
		<App_SinglePage />
	)
}
export default root;
