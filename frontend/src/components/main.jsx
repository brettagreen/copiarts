import { createRoot } from 'react-dom/client'
import App from './App'
import '../css/index.css'

const root = createRoot(document.getElementById('root'));

if (sessionStorage.getItem('font')) {
	document.getElementById('root').style.setProperty('font-family', sessionStorage.getItem('font'));
}

if (sessionStorage.getItem('color')) {
	document.getElementById('root').style.setProperty('background', sessionStorage.getItem('color'));
}

root.render(<App />);

export default root;
