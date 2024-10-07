'use strict';

const assert = require('assert');

const db = require('../mocks/databasemock');

const user = require('../../src/user');
const utils = require('../../src/utils');



describe('delete.js', () => {
	describe('.deleteUserFromFollowers()', () => {
		let followerUid;
		let followingUid;

		beforeEach(async () => {
			followerUid = await user.create({
				username: utils.generateUUID(),
				password: utils.generateUUID(),
				gdpr_consent: 1,
			});

			followingUid = await user.create({
				username: utils.generateUUID(),
				password: utils.generateUUID(),
				gdpr_consent: 1,
			});

			await user.follow(followingUid, followerUid);
		});

		it('should remove a user from following when user deletes account ', async () => {
			await user.deleteAccount(followerUid);
			const followers = await db.getSortedSetMembers(`uid:${followingUid}:followers`);
			assert.strictEqual(followers.length, 0);
		});
	});
});
