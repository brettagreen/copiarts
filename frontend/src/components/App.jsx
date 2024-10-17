//typedefs
/**
 * @typedef {Object} user - user object 
 * @property {number} id 
 * @property {string} username
 * @property {string} userFirst
 * @property {string} userLast
 * @property {string} email
 * @property {boolean} isAdmin
 * @property {string} icon
 *
*/

/**
 * @typedef {Object} article - article object
 * @property {number} articleId
 * @property {string} articleTitle
 * @property {string} authorFirst
 * @property {string} authorLast
 * @property {string} authorHandle
 * @property {string} text
 * @property {number} issueId
 * @property {Date} pubDate
 */

import { BrowserRouter } from 'react-router-dom';
import Box from '@mui/material/Box';
import CopiartsRoutes from './CopiartsRoutes';

/**
 * @component /frontend/src/comonents/App
 * @requires module:react-router-dom.BrowserRouter
 * @requires module:react.useState
 * @requires module:module:mui/material/Box
 * @requires module:/frontend/src/useContext
 * @requires module:/frontend/src/components/NavigationBar
 * @requires module:/frontend/src/components/TigerlillyRoutes
 * @requires module:/frontend/src/components/Footer
 * @requires module:/frontend/src/api
 * 
 * @description App component. Parent component of rest of application. Holds state variables related
 * to storing/retrieving user state, search state, and provides UseContext.Provider for downstream
 * components.
 * @author Brett A. Green <brettalangreen@proton.me>
 * @version 1.0
 * 
 * @returns {JSX.Element} UserContext, NavBar, BrowserRouter and everything in between
 *
 */
function App() {
	return (
		<div className="App" style={{minHeight: '100vh'}}>
			<BrowserRouter>
				<Box className="SiteBox" component="main">
					<CopiartsRoutes />
				</Box>
			</BrowserRouter>
		</div>
	);
	
}

export default App;
