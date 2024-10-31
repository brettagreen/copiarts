import createTheme from "@mui/material/styles/createTheme";

/**
 * width of user's viewport.
 * basically being used to help calculate inline @media/ query so as to 
 * appropriately render borders for Issue Articles
 * 
 *@type {number}
*/
const VIEW_WIDTH = document.documentElement.clientWidth;

/**
 * @module /frontend/src/css/styles
 * @requires module:mui/material/styles/createTheme
 * @author Brett A. Green <brettalangreen@proton.me>
 * @version 1.0
 * 
 * @description defines various css override values as it pertains to certain mui components. These Theme objects are used throughout the app
 * on a per-use basis using the mui ThemeProvider component with the theme prop.
 * @example  <ThemeProvider theme={formTheme}>
 *               <div className="BackdropWrapper">
 *                   <form autoComplete="off" noValidate encType="multipart/form-data" onSubmit={submitAndClear}>
 *					...
 *			 </ThemeProvider>
 * @returns {Theme} - various Theme objects
 */
 const toolbarMenuTheme =
 createTheme({
	 components: {
		 MuiAppBar: {
			 styleOverrides: {
				 root: {
					 color: '#621282', //violet
					 background: 'linear-gradient(90deg, rgba(15, 107, 29, .85) 50%, rgba(227, 174, 100, .85))', //medium green, peach
					 width: '22vw'
				 }
			 }
		 },
		 MuiLink: {
			 styleOverrides: {
				 root: {
					 marginRight: '4.3em',
					 color: '#f3f2f2'
				 }
			 }
		 }
	 }
 });

 const galleryTheme =
 createTheme({
	 components: {
		 MuiModal: {
			 styleOverrides: {
				 backdrop: {
					 backgroundColor: 'rgba(0,0,0,.1)'
				 }
			 }
		 }
	 }
 });
export {toolbarMenuTheme, galleryTheme};
