## **WebRTC-based teleconferencing** 

### **URL of our website:** https://videochat-705.herokuapp.com/

## **1. Introduction**
>Project G1 - Group 16

This project is a simple and light-weight teleconferencing service that can be easily accessed through the web browser without any installations. For the research purpose on improvement of user interaction and usability perspective, we added some new features such as post new questions, new question alert, question list, and user list.

Our research question focused on "The impact of question notification of a WebRTC-based video conferencing service in online education". However, we may expand or change this question further in our presentation or final report.

By using our new version and the companion original version of the application, experimenters were able to complete a series of experimental questions about whether the question list feature in the online meetings was effective in improving the user experience of students and teachers during the learning and teaching process.

## **2. Technologies**
HTML + JavaScript + CSS

React

Node + Express

WebRTC

Socket.io

## **3. Features**
> Features in the original source code 👇

Join/Create room

Multi-participants

Video/Audio streaming

Mute/Unmute video/audio stream

Expand participants' stream

Screen Sharing

Text chat

> Features that we added 👇

Post new questions 

New question alert 

View question list 

Check/Delete questions 

View user list

Show room name 

## **4. Deployed Application (Remote)**
We use Heroku to host our web application:
https://www.heroku.com/

You do not need to complie or install anything in order to use this application. It is running at: 
https://videochat-705.herokuapp.com/

If the application is not working, please contact tliu204@aucklanduni.ac.nz

## **5. Testing Locally (Windows, VS Code)**
**Before running**
- Download/Clone this project
- Check Node.js and npm are installed in the terminal
https://docs.npmjs.com/downloading-and-installing-node-js-and-npm

    ```
    node -v
    npm -v
    ```

**Client**
> Open this project using VS Code, then open a terminal, cd to client, then run 
<pre>
  <code>
    /* Install */
    npm install
    
    /* Run */
    npm start
  </code>
</pre>

**Server**
> Open a new terminal, cd to server, then run
<pre>
  <code>
    /* Install */
    npm install
    
    /* Run */
    npm run dev
  </code>
</pre>

- Go to http://localhost:3000
- Done!

## **6. Future Plan**
UI improvement

Customize users' stream windows size

The ability to separate users into different rooms

Mobile compatible

## **7. Declaration**

## **8. Differences**

<br>

# :sparkling_heart: :sparkling_heart:  Thank you  :sparkling_heart: :sparkling_heart: