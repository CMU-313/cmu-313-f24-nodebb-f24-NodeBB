# User Guide for "Mark Topics Solved/Unsolved" Feature

## Introduction

Welcome to the user guide for the new feature implemented in this version of the project. Unfortunately, due to technical issues and team changes, the new feature fell apart and did not function as intended during testing. Despite our best efforts, the feature encountered multiple failures.

We are providing this documentation to outline the intended functionality, as well as details on the automated tests we created. These tests, while set up, currently fail due to unresolved bugs in the implementation. Below, we detail the expected behavior of the features, how users were supposed to interact with them, and the steps taken for testing.

## New Feature Overview

This feature allows users to mark a topic as “solved” or “unsolved.” The status of the topic will be shown in the topic list for each topic for user convenience. It is designed to help both instructors and students keep track of which topics or questions have been resolved.

How to Use:

	1.	Navigate to the topic list on the forum.
	2.	To mark a topic as “solved”:
	    •	Open the topic you wish to mark as solved and click on the “Mark as Solved” button located in the bar.
	3.	To mark a topic as “unsolved”:
	    •	If a topic is already marked as solved, the “Mark as Unsolved” button will be available at the same place in the bar. Click on the button to revert the topic back to “unsolved.”

## Automated Tests

Automated tests have been implemented to verify the functionality of the Solved/Unsolved Topic Feature. These tests can be found in the test/topics/events.js file of the repository.

Solved Event Test:

	•	The test verifies that when a topic is marked as “solved,” a corresponding “solved” event is created.
	•	This ensures that the system is correctly tracking the status change of a topic when it is solved.

Unsolved Event Test:

	•	The test checks that when a previously solved topic is marked as “unsolved,” an “unsolved” event is generated.
	•	This ensures the system can correctly revert a topic’s status back to unsolved when necessary.

These tests ensure that the key events for marking topics as solved and unsolved are created correctly. The tests focus on the core functionality of the feature: namely, the creation of the appropriate event when a user marks a topic as solved or unsolved. By covering these critical paths, the tests confirm the basic functionality of the system.

Running Automated Tests:

To run the automated tests for the newly added feature:

	1.	Ensure you have all dependencies installed by running: npm install

	2.	Run the following command to start the test suite: npm run test

This will execute the tests and display the results in the terminal. If any test fails, review the test output to understand the cause and make necessary corrections.

## User Testing

We recommend users follow the steps below to manually test the new features:

Steps to Test the Solved/Unsolved Feature:

	1.	Create a new topic.
	2.	Mark the topic as solved.
	3.	Verify that the topic is now displayed as solved in the topic list.
	4.	Mark the topic as unsolved and confirm that the status has changed back.

However, the test will not be successful since the UI has not been implemented correctly right now. The member who was in charge of this dropped this class and we did not have enough time to catch this up.

## Conclusion

This guide provides an overview of the new feature implemented in this version of the project and how users can interact with them. Even though the functionality does not work currently, we still outline the testing strategies, which will work after we implemented the correct code. If you have any issues, feel free to reach out to us. 