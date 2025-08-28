import createTheme from "@mui/material/styles/createTheme";

/**
 * @module /frontend/src/css/styles
 * @requires module:mui/material/styles/createTheme
 * @author Brett A. Green <brettalangreen@proton.me>
 * @version 1.0
 * 
 * @description defines various css override values as it pertains to certain mui components.
 * These Theme objects are used throughout the app on a per-use basis using the mui ThemeProvider
 * component with the theme prop.
 * @example  <ThemeProvider theme={formTheme}>
 *               <div className="BackdropWrapper">
 *                   <form autoComplete="off" noValidate encType="multipart/form-data" onSubmit={submitAndClear}>
 *					...
 *			 </ThemeProvider>
 * @returns {Theme} - various Theme objects
 */

const featuresTheme =
	createTheme({
		components: {
			MuiButton: {
				styleOverrides: {
					root: {
						backgroundColor: '#131a15'
					}
				}
			}
		}
	});
 
const toolbarMenuTheme =
	createTheme({
		components: {
			MuiAppBar: {
				styleOverrides: {
					root: {
					background: 'inherit',
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
						backgroundColor: 'rgba(205,202,206,.1)',
						borderRadius: '5px',
						width: '58%',
						height: 'clamp(33vw, 50vw, 60vw)',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)'
					}
				}
			},
			MuiLink: {
				styleOverrides: {
					root: {
						textAlign: 'center'
					}
				}
			}
		}
	});

const paginationTheme =
	createTheme({
		components: {
			MuiPaginationItem: {
				styleOverrides: {
					root: {
						color: '#fffbfb'
					}
				}
			}
		}
	});

const formTheme = 
	createTheme({
		components: {
			MuiMenuList: {
				styleOverrides: {
					root: {
						"&.Mui-selected": {
							backgroundColor: '#fcfafa'
						},
						"&.:hover": {
							backgroundColor: '#f3f2f2'
						}
					}
				}
			},
			MuiInputBase: {
				styleOverrides: {
					root: {
						height: '2em',
						marginTop: '.5em',
						marginBottom: '.8em',
						width: '100%',
						color: 'rgba(0, 0, 0, 0.87)',
						borderColor: 'rgba(0, 0, 0, 0.87)',
						'&.Mui-focused': {
							borderColor: "rgba(0,0,0,.9)"
						}
					}
				}
			},
			MuiFormLabel:  {
				styleOverrides: {
					root: {
						'&.:after': {
							color: "rgba(0, 0, 0, 0.9)"
						},
						fontWeight: 'bold',
						textAlign: 'left',
					}
				}
			},
			MuiButton: {
				styleOverrides: {
					root: {
						color: '#f3f2f2',
						fontSize: '.6em',
						borderColor: '#f3f2f2'
					},
					'&.:hover': {
						bgcolor: 'transparent',
						borderColor: '#171515'
					},
					'&.Mui-focused': {
						borderColor: '#171515'
					}
				}
			},
			MuiFormHelperText: {
				styleOverrides: {
					root: {
						marginTop: '-4px',
						marginBottom: '14px'
					}
				}
			},
			MuiTextField: {
				styleOverrides: {
					root: {
						fontWeight: 'bold'
					}
				}
			},
			MuiTypography: {
				styleOverrides: {
					root: {
						font: 'inherit'
					}
				}
			}
		}
	});

const textareaTheme =
	createTheme({
		components: {
			MuiInputBase: {
				styleOverrides: {
					root: {
						height: 'inherit',
						marginTop: '.5em',
						marginBottom: '.5em',
						width: '100%'
					}
				}
			}
		}
	});

const eventFormTheme =
	createTheme({
		components: {
			MuiTextField: {
				styleOverrides: {
					root: {
						margin: '1rem'
					}
				}
			}
		}
	});

const toggleButtonsTheme =
	createTheme({
		components: {
			MuiToggleButton: {
				styleOverrides: {
					root: {
						marginRight: '1em',
						color: 'white',
						backgroundColor: '#383b39',
						'&.Mui-selected': {
							color: 'inherit',
							backgroundColor: 'inherit'
						}
					}
				}
			}
		}
	});

const mobilePaperTheme =
	createTheme({
		components: {
			MuiPaper: {
				styleOverrides: {
					root: {
						marginTop: '0.6em',
						marginLeft: '-0.5em',
						background: 'rgba(250, 245, 245, .8)',
						width: '90vw',
						height: '90vh'
					}
				}
			}, 
			MuiLink: {
				styleOverrides: {
					root: {
						color: 'black'
					}
				}
			}
		}
	});

// const instaButtonTheme =
// 	createTheme({
// 		components: {
// 			MuiTButton: {
// 				styleOverrides: {
// 					root: {
// 						float: 'left',
// 						color: 'black',
// 						marginLeft: '1em',
// 						padding: '1em'
// 					}
// 				}
// 			},
// 			MuiPagination: {
// 				styleOverrides: {
// 					root: {
// 						float: 'left'
// 					}
// 				}
// 			}
// 		}
// 	});

// const instaButtonMobileTheme =
// 	createTheme({
// 		components: {
// 			MuiToggleButton: {
// 				styleOverrides: {
// 					root: {
// 						float: 'right',
// 						color: 'black',
// 						marginRight: '7vw',
// 						display: 'inline-flex',
// 						padding: '1em'
// 					}
// 				}
// 			},
// 			MuiPagination: {
// 				styleOverrides: {
// 					root: {
// 						width: '50%'
// 					}
// 				}
// 			}
// 		}
// 	});


export {featuresTheme, toolbarMenuTheme, galleryTheme, formTheme, textareaTheme, eventFormTheme,
			 toggleButtonsTheme, mobilePaperTheme, paginationTheme};
