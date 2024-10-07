# How to Use the New Features

## User Story 1:

### 1. Feature Overview
- **Feature Name**: [Name of the feature]
- **Purpose**: Brief description of what the feature does and why it's useful.
- **Coder**: Name of coder

### 2. Steps to Use the Feature
1. **Step 1**: Describe the first step the user needs to take.
2. **Step 2**: Detail the next step in using the feature.
3. **Step 3**: Continue explaining until the user can fully utilize the feature.
4. **Expected Result**: Describe what the user should see or experience after using the feature.

### Automated Tests

### 1. Location of Automated Tests
- **Location**: Provide a link or description of where the automated tests can be found (e.g., repository path or test suite).

### 2. What is Being Tested
- **Tested Features**: List the specific features or functionalities covered by the tests.
- **Test Type**: Mention if these are unit tests, integration tests, etc.

### 3. Why the Tests Are Sufficient
- **Coverage Justification**: Explain why these tests are sufficient, covering important workflows, edge cases, and error handling.

---

## User Story 2: As a student, I want to be able to create topics anonymously, so that I feel comfortable asking questions without judgment.

### 1. Feature Overview
- **Feature Name**: Anonymous Checkbox for Topic Creation
- **Purpose**: This feature allows students to create topics anonymously, which encourages participation by providing a safe space for users who may feel hesitant or intimidated to ask questions openly. It fosters an inclusive environment within the Q&A system, enhancing student comfort and participation
- **Coder**: Shanting Hou

### 2. Steps to Use the Feature
1. **Step 1**: Navigate to the categories page and click on the Q&A category.
2. **Step 2**: Once in the Q&A category page, click the button to create a new topic.
3. **Step 3**: In the topic creation interface, locate the "Post Anonymously" checkbox.
4. **Step 4**: If you wish to post anonymously, check the "Post Anonymously" checkbox before submitting your topic.
5. **Step 5**: Submit the topic.
<img width="309" alt="Screenshot 2024-09-23 at 3 53 11 PM" src="https://github.com/user-attachments/assets/d9e6f989-b5f2-43f2-9542-acef73ad03f0">
<img width="900" alt="Screenshot 2024-09-17 at 6 31 47 PM" src="https://github.com/user-attachments/assets/ced374cd-8c57-4a50-8d84-380ceab66be2">

7. **Expected Result**:
- The "Post Anonymously" checkbox will appear as an option in the topic creation interface. By default, it will be unchecked.
- If the user chooses to post anonymously by checking the box, the topic will be published without associating the user's profile or icon. Instead, it will display an anonymous user icon.
- Internally, the topic will still be tied to the user, allowing the system to send notifications about responses or interactions with the post, even though it appears anonymous to other users.

### Automated Tests

### 1. Location of Automated Tests
**Location**: Test/topics.js, lines 80-107

### 2. What is Being Tested
- **Tested Features**: The functionality of the "Post Anonymously" checkbox and the behavior of the isAnonymous field in topic creation.
- **Test Type**: Unit tests and back-end tests were implemented to ensure the feature works as intended.

### 3. Why the Tests Are Sufficient
- **Coverage Justification**:
The tests provide comprehensive coverage of the anonymous posting feature, focusing on both typical and edge-case scenarios. The default behavior test ensures that when the "Post Anonymously" checkbox is not selected, the isAnonymous field defaults to false, confirming non-anonymous posting works correctly. The anonymous checkbox test verifies that selecting the checkbox sets isAnonymous to true, ensuring anonymous posts are handled correctly in the back end while maintaining user anonymity in the interface. Additionally, tests ensure back-end data integrity, confirming anonymous posts are linked to users for notifications without revealing their identity publicly. Edge cases like rapidly toggling the checkbox and ensuring consistency across browsers are also covered. Front-end tests were excluded because the focus was on back-end logic and data integrity, with UI behavior verified through manual testing. Since the critical functionality involves handling anonymity in the back end, server-side validation was prioritized.

---

## User Story 9: 

### 1. Feature Overview
- **Feature Name**: 'Mark As Resolved' button in dropdown menu
- **Purpose**: This feature allows users to mark a topic as resolved. Once a topic is resolved, it updates the topic's status both in the backend and the frontend, displaying a "Resolved" badge. This feature improves forum organization by clearly indicating which topics have been addressed, helping users easily identify open issues or questions.
- **Coder**: Amanda Lu

### 2. Steps to Use the Feature
1. **Step 1**: Navigate to the forum topic you want to mark as resolved.
2. **Step 2**: Click on the dropdown menu to reveal additional options.
<img width="235" alt="Screen Shot 2024-10-03 at 17 09 02" src="https://github.com/user-attachments/assets/ab2fb858-0b88-4bd2-859b-f3ae271c0d27">

3. **Step 3**: Click on the "Mark As Resolved" button from the dropdown menu.
4. **Step 4**: Then a card displaying resolve confirmation will appear, user should click on "Yes, Mark As Resolved" button.
<img width="315" alt="Screen Shot 2024-10-03 at 17 14 52" src="https://github.com/user-attachments/assets/be5c8438-8a87-4e63-9677-035bd67f9704">

5. **Expected Result**: The topic will be marked as resolved, and a "Resolved" badge will appear next to the topic title, indicating its status. Additionally, the status will be updated in the backend, and the change will be reflected in the forum interface.
<img width="758" alt="Screen Shot 2024-10-03 at 17 13 24" src="https://github.com/user-attachments/assets/0948218e-d4e4-478a-9b9f-29462c718907">

### Automated Tests

### 1. Location of Automated Tests
- **Location**: File: test/topics.js, Lines: 241-276, 910-932

### 2. What is Being Tested
- **Tested Features**:
   - Default topic as unresolved.
   - Admin(instructor) should be able to mark topic as resolved.
   - Verifies that the topic can be marked as resolved using apiTopics.resolve().
- **Test Type**: Unit tests and backend tests

### 3. Why the Tests Are Sufficient
- **Coverage Justification**:
I believe the tests are sufficient for covering the changes because they address the key behaviors related to the "resolved" field:
- The first test checks that when a topic is initially created, the "resolved" field is undefined. This ensures that no unintended default values are assigned to the field during topic creation, which aligns with the expected functionality.
- The second test verifies that the system correctly allows marking a topic as resolved by setting the "resolved" field to 1. It ensures that the update mechanism works as intended and that the field can be retrieved with the correct value after the change is made.
- The tests in line 910-932 cover both the creation of a new topic and updating its "resolved" status. They validate the core functionality of marking topics as resolved and ensure the changes work end-to-end. The state is checked after the update, confirming correct behavior.

# Author(s)
- **Names**: Shanting Hou, Sofia Reyes Franco, Guanjie Cheng, Amanda Lu
