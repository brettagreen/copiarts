import { createRoot } from 'react-dom/client'
import App from './App'
import App_SinglePage from './App_SinglePage';
import '../css/index.css'

/**
 * @component /frontend/src/components/main
 * @requires module:react-dom.client.createRoot
 * @requires module:/frontend/src/components/App
 * @requires module:/frontend/src/components/App_SinglePage
 * @description main component. attaches App component (website) to index.html div/root. renders single app or regular app depending on screen size
 * @author Brett A. Green <brettalangreen@proton.me>
 * @version 1.0
 * 
 * @returns {JSX.Element} returns website
 *
 */

/**
 * "root" div of document that website will be attached to
 * @const
 */
const root = createRoot(document.getElementById('root'));

/**
 * sets global property style(s) based on user's previous choices. not currently in use.
 * @const
 */
const styleRoot = document.getElementById('root');

/**
 * media query object which is used to determine if the site will render as a traditional app or a single-page app.
 * @const
 */
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
