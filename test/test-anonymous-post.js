'use strict';

const validator = require('validator');

const meta = {
	config: {
		allowGuestHandles: true, // Set this based on your actual configuration
	},
};

async function createAnonymousPost() {
	const postObj = {
		uid: 0, // Guest user
		handle: 'GuestUser',
		anonymous: 'true',
		content: 'This is an anonymous post',
		// Add other necessary fields
	};

	// Username override for guests, if enabled
	if (meta.config.allowGuestHandles && postObj.uid === 0 && postObj.handle) {
		postObj.user = {};
		postObj.user.username = validator.escape(String(postObj.handle));
		postObj.user.displayname = postObj.user.username;
	}

	// Anonymous user in posts
	if (postObj.anonymous === 'true') {
		postObj.user = postObj.user || {};
		postObj.user.username = 'Anonymous';
		postObj.user.displayname = 'Anonymous';
		postObj.user.userslug = 'Anonymous';
		postObj.user.status = 'away';
		postObj.user.postcount = 0;
		postObj.user.topiccount = 0;
		postObj.user.uid = -1;
		postObj.user['icon:text'] = '*';
		postObj.user['icon:bgColor'] = '#aaaaaa';
	}

	console.log('Anonymous post created:', postObj);
}

createAnonymousPost().catch(console.error);
