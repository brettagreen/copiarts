import { BrowserRouter } from 'react-router-dom';
import { Box } from '@mui/material';
import CopiartsRoutes from './CopiartsRoutes';
import Home from './Home';
import About from './About';
import Gallery from './Gallery';
import AdditionalInformation from './AdditionalInformation';
import NavigationBar_SinglePage from './NavigationBar_SinglePage';
import { useState } from 'react';
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

function App_SinglePage() {

	/**
	 * is user admin?
	 * @type {boolean}
	 */
	const [admin, setAdmin] = useState(false);

	return (
		<UserContext.Provider value={{admin, setAdmin, root}}>
			<div id="app">
				<BrowserRouter>
					<Box className="SiteBox" component="main">
						<CopiartsRoutes singlePage={true}/>
						<NavigationBar_SinglePage className="NavBar"/>
						<Home singlePage={true} />
						<About />
						<Gallery />
						<AdditionalInformation />
						<FeaturesTest checked={true} />
						<Footer className="Footer"/>
					</Box>
				</BrowserRouter>
			</div>
		</UserContext.Provider>
	);
	
}

export default App_SinglePage;
