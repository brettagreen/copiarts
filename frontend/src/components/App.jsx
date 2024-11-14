import { BrowserRouter } from 'react-router-dom';
import { Box } from '@mui/material';
import CopiartsRoutes from './CopiartsRoutes';
import NavigationBar from './NavigationBar';
import { useState } from 'react';
import UserContext from "../userContext";

function App() {

	const [admin, setAdmin] = useState(false);

	return (
		<UserContext.Provider value={{admin, setAdmin}}>
			<div className="App" style={{minHeight: '100vh'}}>
				<BrowserRouter>
					<NavigationBar />
					<Box className="SiteBox" component="main" 
						sx={{background: 'linear-gradient(90deg, rgba(98, 18, 130, .85), rgba(15, 107, 29, .85) 50%, rgba(227, 174, 100, .85))',
							marginTop: '105px', minHeight: '100vh', overflow: 'auto'
						}}>
						<CopiartsRoutes />
					</Box>
				</BrowserRouter>
			</div>
		</UserContext.Provider>
	);
	
}

export default App
