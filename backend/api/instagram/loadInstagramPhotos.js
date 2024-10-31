const axios = require('axios');
const { setPhotos } = require("../../routes/photos");
const photoArray = [];

async function authAndGetPhotos() {

	const acct = '17841469935859233'; //copiarts_test
	const token = 'IGQWRQN1BUNmVkTHJHZAVBnSWY4SUlnclNicFBQZAmdnYjBidm5OblpBOFZAERXlFR25BZAmpkODJlTDAwYWlLWUpob1hKX01ydE4ydFlIRmI2OFJqMkhDRVIzLVVHZAFZAnNGlEb3JjRlFoVnNUcHdnbS1SNUVUT3ZASckUZD';
	
	const responseObject =  await axios.get(
		`https://graph.instagram.com/v21.0/${acct}/media?access_token=${token}`
	);

	let ids = responseObject.data
	let resp1;
	let resp2;
	let resp3;
	let comments = null;

	ids.data.forEach(async (id) => {
		resp1 = await axios.get(
			`https://graph.instagram.com/v21.0/${id.id}?fields=caption,media_url,permalink,timestamp&access_token=${token}`
		);
		// resp2 = await axios.get( //GET /<IG_MEDIA_ID>/comments
		// 	`https://graph.instagram.com/v21.0/${id.id}/comments?access_token=${token}`
		// );
		
		// if (resp2.data.paging) {
		// 	console.log('resp2.data', resp2.data.paging.next);

		// 	// if (resp2.data.paging.cursors.before) {
		// 	// 	resp3 = await axios.get( 
		// 	// 		`https://graph.instagram.com/v21.0/${resp2.data.paging.cursors.before}?fields=hidden%2Cmedia%2Ctimestamp&access_token=${token}`
		// 	// 	)
		// 	// 	console.log('resp3.data1', resp3.data);
		// 	// 	comments = [];
		// 	// 	comments.push({"text": resp3.data.text, "username": resp3.data.username});
		// 	// }

		// 	// if (resp2.data.paging.cursors.after !== resp2.data.paging.cursors.before) {
		// 	// 	resp3 = await axios.get( 
		// 	// 		`https://graph.instagram.com/v21.0/${resp2.data.paging.cursors.after}?fields=text,username=&access_token=${token}`
		// 	// 	)
		// 	// 	comments.push({"text": resp3.data.text, "username": resp3.data.username});
		// 	// }

		// }

		photoArray.push({"media_url": resp1.data.media_url, "caption": resp1.data.caption,
			"permalink": resp1.data.permalink, "timestamp": resp1.data.timestamp});
	});
}

async function getPhotos() {
	await authAndGetPhotos();
	setPhotos(photoArray);
}

module.exports = getPhotos;
