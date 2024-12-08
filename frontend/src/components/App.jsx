import { BrowserRouter } from 'react-router-dom';
import { Box } from '@mui/material';
import CopiartsRoutes from './CopiartsRoutes';
import NavigationBar from './NavigationBar';
import { useState } from 'react';
import UserContext from "../userContext";
import Footer from './Footer';
import '../css/App.css';

function App() {

	const [admin, setAdmin] = useState(false);

	return (
		<UserContext.Provider value={{admin, setAdmin}}>
			<div className="App">
				<BrowserRouter>
					<Box className="SiteBox" component="main">
						<NavigationBar className="NavBar"/>
						<CopiartsRoutes />
						<Footer className="Footer"/>
					</Box>
				</BrowserRouter>
			</div>
		</UserContext.Provider>
	);
	
}

export default App
