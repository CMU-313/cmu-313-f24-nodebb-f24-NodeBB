'use strict';

const nconf = require('nconf');
const _ = require('lodash');

const categories = require('../categories');
const meta = require('../meta');
const pagination = require('../pagination');
const helpers = require('./helpers');
const privileges = require('../privileges');
const anonymousPosts = require('../anonymousPosts');

const categoriesController = module.exports;

categoriesController.list = async function (req, res) {
	res.locals.metaTags = [{
		name: 'title',
		content: String(meta.config.title || 'NodeBB'),
	}, {
		property: 'og:type',
		content: 'website',
	}];

	const allRootCids = await categories.getAllCidsFromSet('cid:0:children');
	const rootCids = await privileges.categories.filterCids('find', allRootCids, req.uid);
	const pageCount = Math.max(1, Math.ceil(rootCids.length / meta.config.categoriesPerPage));
	const page = Math.min(parseInt(req.query.page, 10) || 1, pageCount);
	const start = Math.max(0, (page - 1) * meta.config.categoriesPerPage);
	const stop = start + meta.config.categoriesPerPage - 1;
	const pageCids = rootCids.slice(start, stop + 1);

	const allChildCids = _.flatten(await Promise.all(pageCids.map(categories.getChildrenCids)));
	const childCids = await privileges.categories.filterCids('find', allChildCids, req.uid);
	const categoryData = await categories.getCategories(pageCids.concat(childCids));
	const tree = categories.getTree(categoryData, 0);
	await Promise.all([
		categories.getRecentTopicReplies(categoryData, req.uid, req.query),
		categories.setUnread(tree, pageCids.concat(childCids), req.uid),
	]);

	const data = {
		title: meta.config.homePageTitle || '[[pages:home]]',
		selectCategoryLabel: '[[pages:categories]]',
		categories: tree,
		pagination: pagination.create(page, pageCount, req.query),
	};

	data.categories.forEach((category) => {
		if (category) {
			helpers.trimChildren(category);
			helpers.setCategoryTeaser(category);
		}
	});

	if (req.originalUrl.startsWith(`${nconf.get('relative_path')}/api/categories`) || req.originalUrl.startsWith(`${nconf.get('relative_path')}/categories`)) {
		data.title = '[[pages:categories]]';
		data.breadcrumbs = helpers.buildBreadcrumbs([{ text: data.title }]);
		res.locals.metaTags.push({
			property: 'og:title',
			content: '[[pages:categories]]',
		});
	}

	res.render('categories', data);
};

categoriesController.renderAnonymousCategory = async function (req, res, apiResponse = false) {
    try {
        const posts = await anonymousPosts.getAnonymousPosts();
        console.log('Rendering anonymous category page with posts:', posts);
        
        // If the request is for the API, return the posts directly as JSON
        if (apiResponse) {
            return posts;  // Return the posts in JSON format for the API
        }

        // For regular page rendering
        res.render('anonymous-category', {
            title: 'Anonymous Category',
            template: 'anonymous-category',
            url: req.originalUrl,
            posts: posts
        });
    } catch (err) {
        console.error('Error rendering anonymous category:', err);
        res.status(500).send('Internal Server Error');
    }
};

categoriesController.handleAnonymousPost = async function (req, res) {
    try {
        const isAnonymous = req.body.isAnonymous === 'true';
        const { content, tid } = req.body;
        
        let postData = {
            tid: tid,
            content: content,
        };

        if (isAnonymous) {
            postData.uid = 0;  // Anonymous posts use a UID of 0
        } else {
            postData.uid = req.uid;  // Use the real user’s ID
        }

        // Call the Posts.create function to save the post in the database
        const pid = await Posts.create(postData);

        res.json({ success: true, pid: pid });
    } catch (err) {
        console.error('Error handling anonymous post:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = categoriesController;
