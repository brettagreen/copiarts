import { createRoot } from 'react-dom/client'
import App from './App'
import App_SinglePage from './App_SinglePage';
import '../css/index.css'

const root = createRoot(document.getElementById('root'));
const styleRoot = document.getElementById('root');

const mediaQuery = window.matchMedia('(min-width: 1169px)');

mediaQuery.addEventListener("change", function() {
	if (mediaQuery.matches) {
		root.render(
			<App />
		)
	} else {
		root.render(
			<App_SinglePage />
		)
	}
});

if (sessionStorage.getItem('font')) {
	styleRoot.style.setProperty('font-family', sessionStorage.getItem('font'));
}

if (sessionStorage.getItem('color')) {
	styleRoot.style.setProperty('background', sessionStorage.getItem('color'));
}

if (mediaQuery.matches) {
	root.render(
		<App />
	)
} else {
	root.render(
		<App_SinglePage />
	)
}

export default root;
