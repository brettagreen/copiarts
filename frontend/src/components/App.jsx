import { BrowserRouter } from 'react-router-dom';
import { Box } from '@mui/material';
import CopiartsRoutes from './CopiartsRoutes';
import NavigationBar from './NavigationBar';
import { useState, memo } from 'react';
import UserContext from "../userContext";
import Footer from './Footer';
import FeaturesTest from './FeaturesTest';
import root from './main';

import '../css/App.css';

/**
 * @component /frontend/src/comonents/App
 * @requires module:react-router-dom.BrowserRouter
 * @requires module:react.useState
 * @requires module:module:mui/material/Box
 * @requires module:/frontend/src/userContext
 * @requires module:/frontend/src/components/NavigationBar
 * @requires module:/frontend/src/components/CopiartsRoutes
 * @requires module:/frontend/src/components/Footer
 * 
 * @description App component. Parent component of rest of application. Provides UseContext.Provider for downstream
 * components.
 * @author Brett A. Green <brettalangreen@proton.me>
 * @version 1.0
 * 
 * @returns {JSX.Element} UserContext, NavBar, BrowserRouter and everything in between
 *
 */

const App = memo(function App() {

	/**
	 * is user admin?
	 * @type {boolean}
	 */
	const [admin, setAdmin] = useState(false);

	return (
		<UserContext.Provider value={{admin, setAdmin, root}}>
			<div id="app">
				<Box className="SiteBox" component="main">
					<NavigationBar className="NavBar"/>
						<BrowserRouter>
							<CopiartsRoutes singlePage={false}/>
						</BrowserRouter>
					<FeaturesTest checked={false} />
					<Footer className="Footer"/>
				</Box>
			</div>
		</UserContext.Provider>
	);
});

export default App
