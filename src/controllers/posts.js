'use strict';

const db = require('../database'); // Ensure that your database module is imported properly
const posts = require('../posts');
const privileges = require('../privileges');
const helpers = require('./helpers');


const postsController = module.exports;

postsController.redirectToPost = async function (req, res, next) {
	const pid = parseInt(req.params.pid, 10);
	if (!pid) {
		return next();
	}

	const [canRead, path] = await Promise.all([
		privileges.posts.can('topics:read', pid, req.uid),
		posts.generatePostPath(pid, req.uid),
	]);
	if (!path) {
		return next();
	}
	if (!canRead) {
		return helpers.notAllowed(req, res);
	}
	const qs = require('querystring').stringify(req.query);
	helpers.redirect(res, qs ? `${path}?${qs}` : path, true);
};

postsController.getRecentPosts = async function (req, res) {
	const page = parseInt(req.query.page, 10) || 1;
	const postsPerPage = 20;
	const start = Math.max(0, (page - 1) * postsPerPage);
	const stop = start + postsPerPage - 1;
	const data = await posts.getRecentPosts(req.uid, start, stop, req.params.term);
	res.json(data);
};

// Updated endorsePost function
postsController.endorsePost = async function (req, res) {
	const postId = req.params.pid;
	const { uid } = req;

	if (!postId || !uid) {
		return res.status(400).json({ error: 'Invalid request' });
	}

	try {
		const hasEndorsed = await db.isSetMember(`post:${postId}:endorsed`, uid);

		if (req.method === 'DELETE' && hasEndorsed) {
			// Unendorse logic
			await db.setRemove(`post:${postId}:endorsed`, uid);
			const endorsementCount = await db.decrObjectField(`post:${postId}`, 'endorsements');
			return res.status(200).json({ endorsed: false, endorsements: endorsementCount });
		} else if (req.method === 'PUT' && !hasEndorsed) {
			// Endorse logic
			await db.setAdd(`post:${postId}:endorsed`, uid);
			const endorsementCount = await db.incrObjectField(`post:${postId}`, 'endorsements');
			return res.status(200).json({ endorsed: true, endorsements: endorsementCount });
		}
		return res.status(400).json({ error: 'Invalid action' });
	} catch (err) {
		return res.status(500).json({ error: 'An error occurred while endorsing the post' });
	}
};
