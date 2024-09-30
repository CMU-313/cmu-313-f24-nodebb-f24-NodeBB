
'use strict';


define('forum/topic/events', [
	'forum/topic/postTools',
	'forum/topic/threadTools',
	'forum/topic/posts',
	'forum/topic/images',
	'components',
	'translator',
	'hooks',
	'helpers',
], function (postTools, threadTools, posts, images, components, translator, hooks, helpers) {
	const Events = {};

	const events = {
		'event:user_status_change': onUserStatusChange,
		'event:voted': updatePostVotesAndUserReputation,
		'event:bookmarked': updateBookmarkCount,

		'event:topic_deleted': threadTools.setDeleteState,
		'event:topic_restored': threadTools.setDeleteState,
		'event:topic_purged': onTopicPurged,

		'event:topic_locked': threadTools.setLockedState,
		'event:topic_unlocked': threadTools.setLockedState,

		'event:topic_pinned': threadTools.setPinnedState,
		'event:topic_unpinned': threadTools.setPinnedState,

		'event:topic_moved': onTopicMoved,

		'event:post_edited': onPostEdited,
		'event:post_purged': onPostPurged,

		'event:post_deleted': togglePostDeleteState,
		'event:post_restored': togglePostDeleteState,

		'posts.bookmark': togglePostBookmark,
		'posts.unbookmark': togglePostBookmark,

		'posts.upvote': togglePostVote,
		'posts.downvote': togglePostVote,
		'posts.unvote': togglePostVote,

		'event:post_endorsed': onPostEndorsed,

		'event:new_notification': onNewNotification,
		'event:new_post': posts.onNewPost,
	};

	Events.init = function () {
		Events.removeListeners();
		for (const eventName in events) {
			if (events.hasOwnProperty(eventName)) {
				socket.on(eventName, events[eventName]);
			}
		}
	};

	Events.removeListeners = function () {
		for (const eventName in events) {
			if (events.hasOwnProperty(eventName)) {
				socket.removeListener(eventName, events[eventName]);
			}
		}
	};

	function onUserStatusChange(data) {
		app.updateUserStatus($('[data-uid="' + data.uid + '"] [component="user/status"]'), data.status);
	}

	function updatePostVotesAndUserReputation(data) {
		const votes = $('[data-pid="' + data.post.pid + '"] [component="post/vote-count"]').filter(function (index, el) {
			return parseInt($(el).closest('[data-pid]').attr('data-pid'), 10) === parseInt(data.post.pid, 10);
		});
		const reputationElements = $('.reputation[data-uid="' + data.post.uid + '"]');
		votes.html(data.post.votes).attr('data-votes', data.post.votes);
		reputationElements.html(data.user.reputation).attr('data-reputation', data.user.reputation);
	}

	function updateBookmarkCount(data) {
		$('[data-pid="' + data.post.pid + '"] .bookmarkCount').filter(function (index, el) {
			return parseInt($(el).closest('[data-pid]').attr('data-pid'), 10) === parseInt(data.post.pid, 10);
		}).html(data.post.bookmarks).attr('data-bookmarks', data.post.bookmarks);
	}

	function onTopicPurged(data) {
		if (
			ajaxify.data.category &&
			ajaxify.data.category.slug &&
			parseInt(data.tid, 10) === parseInt(ajaxify.data.tid, 10)
		) {
			ajaxify.go('category/' + ajaxify.data.category.slug, null, true);
		}
	}

	function onTopicMoved(data) {
		if (data && data.slug && parseInt(data.tid, 10) === parseInt(ajaxify.data.tid, 10)) {
			ajaxify.go('topic/' + data.slug, null, true);
		}
	}

	function onPostEdited(data) {
		if (!data || !data.post || parseInt(data.post.tid, 10) !== parseInt(ajaxify.data.tid, 10)) {
			return;
		}
		const editedPostEl = components.get('post/content', data.post.pid).filter(function (index, el) {
			return parseInt($(el).closest('[data-pid]').attr('data-pid'), 10) === parseInt(data.post.pid, 10);
		});
		const postContainer = $(`[data-pid="${data.post.pid}"]`);
		const editorEl = postContainer.find('[component="post/editor"]').filter(function (index, el) {
			return parseInt($(el).closest('[data-pid]').attr('data-pid'), 10) === parseInt(data.post.pid, 10);
		});
		const topicTitle = components.get('topic/title');
		const navbarTitle = components.get('navbar/title').find('span');
		const breadCrumb = components.get('breadcrumb/current');

		if (data.topic.rescheduled) {
			return ajaxify.go('topic/' + data.topic.slug, null, true);
		}

		if (topicTitle.length && data.topic.title && data.topic.renamed) {
			ajaxify.data.title = data.topic.title;
			const newUrl = 'topic/' + data.topic.slug + (window.location.search ? window.location.search : '');
			history.replaceState({ url: newUrl }, null, window.location.protocol + '//' + window.location.host + config.relative_path + '/' + newUrl);

			topicTitle.fadeOut(250, function () {
				topicTitle.html(data.topic.title).fadeIn(250);
			});
			breadCrumb.fadeOut(250, function () {
				breadCrumb.html(data.topic.title).fadeIn(250);
			});
			navbarTitle.fadeOut(250, function () {
				navbarTitle.html(data.topic.title).fadeIn(250);
			});
		}

		if (data.post.changed) {
			editedPostEl.fadeOut(250, function () {
				editedPostEl.html(translator.unescape(data.post.content));
				editedPostEl.find('img:not(.not-responsive)').addClass('img-fluid');
				images.wrapImagesInLinks(editedPostEl.parent());
				posts.addBlockquoteEllipses(editedPostEl.parent());
				editedPostEl.fadeIn(250);

				if (data.post.edited) {
					const editData = {
						editor: data.editor,
						editedISO: utils.toISOString(data.post.edited),
					};

					app.parseAndTranslate('partials/topic/post-editor', editData, function (html) {
						editorEl.replaceWith(html);
						postContainer.find('[component="post/edit-indicator"]')
							.removeClass('hidden')
							.translateAttr('title', `[[global:edited-timestamp, ${helpers.isoTimeToLocaleString(editData.editedISO, config.userLang)}]]`);
						postContainer.find('[component="post/editor"] .timeago').timeago();
						hooks.fire('action:posts.edited', data);
					});
				}
			});
		} else {
			hooks.fire('action:posts.edited', data);
		}

		if (data.topic.tags && data.topic.tagsupdated) {
			require(['forum/topic/tag'], function (tag) {
				tag.updateTopicTags([data.topic]);
			});
		}

		postTools.removeMenu(components.get('post', 'pid', data.post.pid));
	}

	function onPostPurged(postData) {
		if (!postData || parseInt(postData.tid, 10) !== parseInt(ajaxify.data.tid, 10)) {
			return;
		}
		components.get('post', 'pid', postData.pid).fadeOut(500, function () {
			$(this).remove();
			posts.showBottomPostBar();
		});
		ajaxify.data.postcount -= 1;
		postTools.updatePostCount(ajaxify.data.postcount);
		require(['forum/topic/replies'], function (replies) {
			replies.onPostPurged(postData);
		});
	}

	function onPostEndorsed(data) {
		const postEl = $('[data-pid="' + data.postId + '"]');
		postEl.addClass('endorsed'); 
	}

	function togglePostDeleteState(data) {
		const postEl = components.get('post', 'pid', data.pid);

		if (!postEl.length) {
			return;
		}

		postEl.toggleClass('deleted');
		const isDeleted = postEl.hasClass('deleted');
		postTools.toggle(data.pid, isDeleted);

		if (!ajaxify.data.privileges.isAdminOrMod && parseInt(data.uid, 10) !== parseInt(app.user.uid, 10)) {
			postEl.find('[component="post/tools"]').toggleClass('hidden', isDeleted);
			if (isDeleted) {
				postEl.find('[component="post/content"]').translateHtml('[[topic:post-is-deleted]]');
			} else {
				postEl.find('[component="post/content"]').html(translator.unescape(data.content));
			}
		}
	}

	function togglePostBookmark(data) {
		const el = $('[data-pid="' + data.post.pid + '"] [component="post/bookmark"]').filter(function (index, el) {
			return parseInt($(el).closest('[data-pid]').attr('data-pid'), 10) === parseInt(data.post.pid, 10);
		});
		if (!el.length) {
			return;
		}

		el.attr('data-bookmarked', data.isBookmarked);

		el.find('[component="post/bookmark/on"]').toggleClass('hidden', !data.isBookmarked);
		el.find('[component="post/bookmark/off"]').toggleClass('hidden', data.isBookmarked);
	}

	function togglePostVote(data) {
		const post = $('[data-pid="' + data.post.pid + '"]');
		post.find('[component="post/upvote"]').filter(function (index, el) {
			return parseInt($(el).closest('[data-pid]').attr('data-pid'), 10) === parseInt(data.post.pid, 10);
		}).toggleClass('upvoted', data.upvote);
		post.find('[component="post/downvote"]').filter(function (index, el) {
			return parseInt($(el).closest('[data-pid]').attr('data-pid'), 10) === parseInt(data.post.pid, 10);
		}).toggleClass('downvoted', data.downvote);
	}

	function onNewNotification(data) {
		const tid = ajaxify.data.tid;
		if (data && data.tid && parseInt(data.tid, 10) === parseInt(tid, 10)) {
			socket.emit('topics.markTopicNotificationsRead', [tid]);
		}
	}

	return Events;
});
