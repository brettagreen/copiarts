/**
 * @module /backend/api/instagram/loadInstagramPhotos
 * @requires module:axios
 * @requires module:/backend/routes/photos/setPhotos
 * @permalink Brett A. Green <brettalangreen@proton.me>
 * @version 1.0
 * @description Fetches Instagram photos using graph api. Allows for single source retrieval from frontend component(s)
 * 
 */

/**
 * axios
 * @const
 */
const axios = require('axios');

/**
 * array of returned photo/media objects as returned by API query
 * @const
 * @type {object}
 */
const photoArray = [];

/**
 * @description
 * https fetches photos/posts from the copiarts_test Instagram acct.
 * pushes results to /backend/routes/photos endpoint for easy retrieval by
 * relevant frontend component(s)
 */
async function authAndGetPhotos() {
	/**
	 * copiarts_test acct id
	 * @const
	 * @type {string}
	 */
	const ACCT = process.env.INSTA_ACCT;

	/**
	 * API token
	 * @const
	 * @type {string}
	 */
	const TOKEN = process.env.INSTA_TOKEN;

	/**
	 * API response object
	 * @const
	 * @type {object}
	 */
	const responseObject = await axios.get(
		`https://graph.instagram.com/v21.0/${ACCT}/media?access_token=${TOKEN}`
	);
	//console.log("response object", responseObject.data);
	/**
	 * response object items. in this case, photo/media items.
	 * @type {object}
	 */
	let ids = responseObject.data
	console.log('ids.length', ids.data.length);
	let resp1;
	// let resp2;
	// let resp3;
	// let comments = null;

	ids.data.forEach(async (id) => {
		resp1 = await axios.get(
			`https://graph.instagram.com/v21.0/${id.id}?fields=caption,media_url,permalink,timestamp&access_token=${TOKEN}`
		);

		/**
		 * apparently, Instagram/Facebook requires a lot of hoops to be jumped through before allowing access to comments
		 * on user owned threads. This logic may well hold going forward should we wish to jump through said hoops.
		 */

		/**
		 *
		resp2 = await axios.get( //GET /<IG_MEDIA_ID>/comments
			`https://graph.instagram.com/v21.0/${id.id}/comments?access_token=${token}`
		);
		
		 	if (resp2.data.paging) {
			console.log('resp2.data', resp2.data.paging.next);

			if (resp2.data.paging.cursors.before) {
				resp3 = await axios.get( 
					`https://graph.instagram.com/v21.0/${resp2.data.paging.cursors.before}?fields=hidden%2Cmedia%2Ctimestamp&access_token=${token}`
				)
				console.log('resp3.data1', resp3.data);
				comments = [];
				comments.push({"text": resp3.data.text, "username": resp3.data.username});
			}

			if (resp2.data.paging.cursors.after !== resp2.data.paging.cursors.before) {
				resp3 = await axios.get( 
					`https://graph.instagram.com/v21.0/${resp2.data.paging.cursors.after}?fields=text,username=&access_token=${token}`
				)
				comments.push({"text": resp3.data.text, "username": resp3.data.username});
			}

		}
		 */

		photoArray.push({"media_url": resp1.data.media_url, "caption": resp1.data.caption,
			"permalink": resp1.data.permalink, "timestamp": resp1.data.timestamp});
	});

	return photoArray;
}

module.exports = authAndGetPhotos;
