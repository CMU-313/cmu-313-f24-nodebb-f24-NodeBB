const _ = require('lodash');
const db = require('../database');
const plugins = require('../plugins');

module.exports = function (Posts) {
    Posts.togglePinned = async function (pid, isPinned) {
        const postData = await db.getObject(`post:${pid}`);
        
        if (!postData) {
            throw new Error('[[error:post-not-found]]');
        }

        postData.isPinned = isPinned;

        await db.setObject(`post:${pid}`, postData);

        await plugins.hooks.fire('action:post.togglePinned', { post: postData, isPinned: isPinned });

        return postData;
    };
}
