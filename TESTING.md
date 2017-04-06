Who: Syrus Yeung, Jake Sagaser, Xavier Perches
Title: SyllabusLink
Vision: Simplicity is powerful

Automated tests: https://chrome.google.com/webstore/detail/advanced-rest-client/hgmloofddffdnphfgcellkdfbfbjeloo?hl=en-US

Screenshot 1:
![Alt text](/testing/testing1.png?raw=true "Optional Title")
This script ran multiple generated json objects of all the same data into our login and gave an error output which was not "prettied" so the literal error was  displayed. which was not able to accept multiple submission at the same time.

Screenshot 2: 
![Alt text](/testing/testing2.png?raw=true "Optional Title")
Generated a Json object to test standard single input case, gase gave "User created!" ouput - was a success

screenshot 3:
![Alt text](/testing/testing3.png?raw=true "Optional Title")
generated and submitted identical submissions seperately, resulting caught err giving: "username or email already" output message needs revising

Use case 1
    Navigate pages
Description
    Test localhost pages and outputs given correct URLs
Pre-conditions
    User can run MongoDB and node
Test steps
    1. connect to home page
    2. navigate to login page
    3. navigate to about page
    4. navigate to contact us page
Expected result
    User should be able to navigate to all pages give the URL's
Actual result
    User is has gone to each page flawlessly
Status (Pass/Fail)
    Pass
Notes
    N/A
Post-conditions
    User is connected to localhost and can access all pages
---------------------------------------------------------------------------------------------------------------------------
Use case 2
    Verify user creation with valid user name and password
Description
    Test the api backend login page
Pre-conditions
    User has unique username, password, and email
Test steps
    1. Navigate to login/user creation page
    2. Provide valid user name
    3. Provide valid password
    4. press create account
Expected result
    User should be able to create a user account and recieve success message
Actual result
    User recieved correct message and infor was added to the database
Status (Pass/Fail)
    Pass
Notes
    N/A
Post-conditions
    User is now part of the database.
---------------------------------------------------------------------------------------------------------------------------
Use case 3
    Verify login with valid user name and password
Description
    Test the SyllabusLink login page
Pre-conditions
    User has pre-registered user name and password
Test steps
    1. Navigate to login page
    2. Provide valid user name
    3. Provide valid password
    4. Click login button
Expected result
    User should be able to login
Actual result
    User tried loging in but could not login with correct information
Status (Pass/Fail)
    Fail
Notes
    need to correct MongoDB schema
Post-conditions
    User is not correctly validated with the server

