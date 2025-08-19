import Home from './Home';
import About from './About';
import Gallery from './Gallery';
import AdditionalInformation from './AdditionalInformation';
import { Box } from '@mui/material';

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