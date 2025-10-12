import Home from './Home';
import About from './About';
import Gallery from './Gallery';
import AdditionalInformation from './AdditionalInformation';
import { Box } from '@mui/material';

/**
 * @component /frontend/src/comonents/SinglePageStack
 * @requires module:/frontend/src/components/Home
 * @requires module:/frontend/src/components/About
 * @requires module:/frontend/src/components/Gallery
 * @requires module:/frontend/src/components/AdditionalInformation
 * 
 * @description SinglePageStack component. Home, About, Gallery, and AdditionalInformation components are stacked on top
 * of eachother resulting in a single-page application. Component is referenced in the CopiartsRoutes component.
 * @author Brett A. Green <brettalangreen@proton.me>
 * @version 1.0

 * @returns {JSX.Element} The single-page stack.
 */

function SinglePageStack() {

	return(
		<Box style={{display: 'flex', flexDirection: 'column'}}>
			<Home />
			<About />
			<Gallery />
			<AdditionalInformation />
		</Box>
	)
}

export default SinglePageStack;