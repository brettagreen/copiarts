import { BrowserRouter } from 'react-router-dom';
import { Box } from '@mui/material';
import CopiartsRoutes from './CopiartsRoutes';
import NavigationBar_SinglePage from './NavigationBar_SinglePage';
import UserContext from "../userContext";
import Footer from './Footer';
// import FeaturesTest from './FeaturesTest';
import root from './main';
import '../css/App.css';

/**
 * @component /frontend/src/comonents/App_SinglePage
 * @requires module:react-router-dom.BrowserRouter
 * @requires module:module:mui/material/Box
 * @requires module:/frontend/src/userContext
 * @requires module:/frontend/src/components/NavigationBar_SinglePage
 * @requires module:/frontend/src/components/CopiartsRoutes
 * @requires module:/frontend/src/components/Footer
 * 
 * @description App component. Parent component of rest of application. Provides UseContext.Provider for downstream
 * components. Instructs the page to arrange components in a single page application manner.
 * @author Brett A. Green <brettalangreen@proton.me>
 * @version 1.0
 * 
 * @returns {JSX.Element} UserContext, NavBar_SinglePage, BrowserRouter and singlePage argument passed to CopiartsRoutes component
 *
 */

function App_SinglePage() {

	let show;

	if (sessionStorage.getItem('featuresPanel')) {
		show = sessionStorage.getItem('featuresPanel');
		show = show === 'open' ? true : false;
	} else {
		show = true;
	}

	return (
		<UserContext.Provider value={{root}}>
			<div id="app">
				<Box className="SiteBox" component="main">
					<NavigationBar_SinglePage className="NavBar"/>
					<BrowserRouter>
						<CopiartsRoutes singlePage={true}/>
					</BrowserRouter>
					{/* <FeaturesTest show={show} checked={true} /> */}
					<Footer className="Footer"/>
				</Box>
			</div>
		</UserContext.Provider>
	);
}

export default App_SinglePage;
