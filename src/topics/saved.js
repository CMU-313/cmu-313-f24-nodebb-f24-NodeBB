'use strict';

const async = require('async');

const db = require('../database');
const user = require('../user');

module.exports = function (Topics) {
	Topics.getUserSave = async function (tid, uid) {
		if (parseInt(uid, 10) <= 0) {
			return null;
		}
		return await db.sortedSetScore(`tid:${tid}:saves`, uid);
	};

	Topics.getUserSaves = async function (tids, uid) {
		if (parseInt(uid, 10) <= 0) {
			return tids.map(() => null);
		}
		return await db.sortedSetsScore(tids.map(tid => `tid:${tid}:saves`), uid);
	};

	Topics.setUserSave = async function (tid, uid, timestamp) {
		if (parseInt(uid, 10) <= 0) {
			return;
		}
		await db.sortedSetAdd(`tid:${tid}:saves`, timestamp, uid);
	};

	Topics.getTopicSaves = async function (tid) {
		return await db.getSortedSetRangeWithScores(`tid:${tid}:saves`, 0, -1);
	};

	Topics.updateTopicSaves = async function (tid) {
		const maxTimestamp = Date.now();
		const saves = await Topics.getTopicSaves(tid);

		const uidData = saves.map(s => ({ uid: s.value, saveTimestamp: parseInt(s.score, 10) }));

		await async.eachLimit(uidData, 50, async (data) => {
			const saveTimestamp = Math.min(data.saveTimestamp, maxTimestamp);

			// We don't need to adjust save timestamps based on post indices
			// as saves are not tied to specific post positions

			if (saveTimestamp === data.saveTimestamp) {
				return;
			}

			const settings = await user.getSettings(data.uid);
			if (settings.topicPostSort === 'most_votes') {
				return;
			}

			await Topics.setUserSave(tid, data.uid, saveTimestamp);
		});
	};
};
