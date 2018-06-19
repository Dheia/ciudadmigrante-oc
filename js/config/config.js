
/* This file has to loaded before app.js */

window.config = window.config || {};

window.config.web = {};

/* Default language */
window.config.lang = 'es';

window.config.config = {

	'homepageSlug': 'espacios'

}

window.config.youtube = {
	'playerVars_web' : {
	    'autoplay': 1,
	    'controls': 1, 
	    'rel' : 0,
	    'showinfo' : 0,
	    'cc_load_policy': 0,
	    'color': 'white',
	    'fs': 0
	},
	'playerVars_kiosk' : {
	    'autoplay': 1,
	    'controls': 0, 
	    'rel' : 0,
	    'showinfo' : 0,
	    'cc_load_policy': 1,
	    'color': 'white',
	    'fs': 0
	}
}