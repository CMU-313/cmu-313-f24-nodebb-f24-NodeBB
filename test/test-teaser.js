'use strict';

const utils = {
	toISOString: timestamp => new Date(timestamp).toISOString(),
	stripTags: ['<p>', '<a>'], // Example tags
};

const plugins = {
	hooks: {
		fire: async (hookName, data) => data,
	},
};

const posts = {
	parsePost: async post => post,
};

async function testTeaser() {
	const usersData = [
		{ uid: 1, username: 'User1' },
		{ uid: 2, username: 'User2' },
	];

	const postData = [
		{ uid: 1, timestamp: Date.now(), tid: 101 },
		{ uid: 2, timestamp: Date.now(), tid: 102 },
		{ uid: -1, timestamp: Date.now(), tid: 103 }, // Anonymous user
	];

	const users = {};
	usersData.forEach((user) => {
		users[user.uid] = user;
	});

	const tidToPost = {};

	postData.forEach((post) => {
		// If the post author isn't represented in the retrieved users' data,
		// then it means they were deleted, assume guest.
		if (!users.hasOwnProperty(post.uid)) {
			post.uid = 0;
		}

		post.user = users[post.uid];
		post.timestampISO = utils.toISOString(post.timestamp);
		tidToPost[post.tid] = post;

		// add anonymous user to topic
		if (post.user && post.user.uid === -1) {
			post.user = structuredClone(post.user);
			post.user.username = 'Anonymous';
			post.user.userslug = 'Anonymous';
			post.user.uid = -1;
			post.user.displayname = 'Anonymous';
			post.user['icon:text'] = '*';
			post.user['icon:bgColor'] = '#aaaaaa';
		} else if (post.uid === 0) {
			post.user = {
				username: 'Anonymous',
				displayname: 'Anonymous',
				userslug: 'Anonymous',
				status: 'away',
				postcount: 0,
				topiccount: 0,
				uid: -1,
				'icon:text': '*',
				'icon:bgColor': '#aaaaaa',
			};
		}
	});

	await Promise.all(postData.map(p => posts.parsePost(p)));

	const { tags } = await plugins.hooks.fire('filter:teasers.configureStripTags', {
		tags: utils.stripTags.slice(0),
	});

	console.log('Processed postData:', postData);
	console.log('Tags:', tags);
}

testTeaser().catch(console.error);
