## **WebRTC-based teleconferencing** 

### **URL of our website:** https://videochat-705.herokuapp.com/

## **1. Introduction**
>Project G1 - Group 16

This project is a simple and light-weight teleconferencing service that can be easily accessed through the web browser without any installations. For the research purpose on improvement of user interaction and usability perspective, we added some new features such as post new questions, new question alert, question list, and user list.

Our research question focused on "The impact of question notification of a WebRTC-based video conferencing service in online education". However, we may expand or change this question further in our presentation or final report.

By using our new version (https://videochat-705.herokuapp.com/) and the original version (https://video-group-meeting.herokuapp.com/) of the application, experimenters were able to complete a series of experimental questions about whether the question list feature in the online meetings was effective in improving the user experience of students and teachers during the learning and teaching process.

## **2. Technologies**

- HTML + JavaScript + CSS

- React

- Node + Express

- WebRTC

- Socket.io

## **3. Features**
> Features in the original source code 👇

- Join/Create room

- Multi-participants

- Video/Audio streaming

- Mute/Unmute video/audio stream

- Expand participants' stream

- Screen Sharing

- Text chat

> Features that we added 👇

- Post new questions 

- New question alert 

- View question list 

- Check/Delete questions 

- View user list

- Show room name 

## **4. Deployed Application (Remote)**
We use Heroku to host our web application:
https://www.heroku.com/

You do not need to complie or install anything in order to use this application. It is running at: 
https://videochat-705.herokuapp.com/

If the application is not working, please contact tliu204@aucklanduni.ac.nz

## **5. Testing Locally (Windows, VS Code)**
**Before running**
- Download/Clone this project to your computer
- Check Node.js and npm are installed in the terminal: 
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
- UI improvement

- Customize users' stream windows size

- The ability to separate users into different rooms

- Mobile compatible

## **7. Differences with the project plan**
In the project plan, our research question was "The impact of innovative pop-up message notification of a WebRTC-based video conferencing service in online education". During the actual implementation, we found that pop-up messages could lead to problems with too many messages affecting the video screen. And some questions asked by students may be drowned out by various other messages, resulting in questions being ignored and left unanswered. What's more, according to our previous literature review, we found that sending a question in the chat box during the class is considered a more casual way, and the student would be less stressed. However, the teacher usually does not click on the chat box frequently because it will affect the pace of his class. 

Therefore we changed the research question. Based on the research question, we have implemented an additional question list area. Participants can choose to send questions directly to the question list in the chat box, and if a new question is asked, a "New Question!" message will pop up at the top of the screen (without affecting the video screen), making it easier for the hosts or teachers to notice that a new question has been asked. After the question has been answered, the teacher can tick the box at the end of the question, and the background colour of that question will change from blue to green, and there is also a button to delete the question in the list.

## **8. Declaration**
Open-source code used in this project, licensed under MIT: 
https://github.com/Hyunse/video-group-meeting

# :sparkling_heart: :sparkling_heart:  Thank you  :sparkling_heart: :sparkling_heart: