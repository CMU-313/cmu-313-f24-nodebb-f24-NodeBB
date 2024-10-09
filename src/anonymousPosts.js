'use strict';

const db = require('./database');

const posts = require.main.require('./src/posts');

const anonymousPosts = {};

anonymousPosts.getAnonymousPosts = async function () {
	try {
		console.log('Fetching anonymous posts from the database...');
		const posts = await db.getObjects('anonymous:posts');
		console.log('Anonymous posts fetched from the database:', posts);
		return posts;
	} catch (err) {
		console.error('Error fetching anonymous posts from the database:', err);
		throw err;
	}
};

anonymousPosts.updateAnonymousStatus = async function (pid, isAnonymous) {
	try {
		console.log(`Updating anonymous status for post ${pid} to ${isAnonymous}...`);

		const postData = await posts.getPostData(pid);
		if (!postData) {
			throw new Error('Post not found');
		}

		await posts.setPostField(pid, 'anonymous', isAnonymous);

		console.log(`Anonymous status for post ${pid} updated to ${isAnonymous}`);
		return { success: true };
	} catch (err) {
		console.error('Error updating anonymous status for post:', err);
		throw err;
	}
};

module.exports = anonymousPosts;
