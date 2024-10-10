### Front-end New Features
1. Added `Endorse Topic` in Topic Tools drop-down menu. Button is activated upon clicked, and the topic will get endorsed.
2. Added Unendorse Topic feature that can undo Endorse Topic action. Will appear and replace Endorse Topic for endorsed topics.
3. Endorsement actions are logged just like other actions, i.e., lock and pin.
4. Added Endorsed tag in topic list (displayed after clicking on a category) for endorsed topics.
5. Configured `topic.json` and `error.json` for correct rendering.

### Front-end New Testing
1. Ensures correct API calls and privileged users have access to this feature.
2. Rendering test is done by user testing. All new features won't trigger explicit errors.

### Back-end Features
1. Added API calls for `endorse` and `unendorse` 
2. Configured API response format to include `endorse`
3. Configured routes for `endorse`

### Back-end Testing
1. Automated test suite is included in `./test/topic.js`, primarily testing features of endorsement.
   (describe what the test cases are doing)
2. Successful API calls are necessary to pass the test case. 
   However, do note that API calls are tested in pre-written test file `./test/api.js` and no modifications are made to it.
