# BayJDO
#### A Fast, Simple & Secure Way to Transfer Files between Devices
![GitHub release (latest by date including pre-releases)](https://img.shields.io/github/v/release/aswinshenoy/bayjdo?include_prereleases)
![GitHub](https://img.shields.io/github/license/aswinshenoy/bayjdo)
![GitHub last commit](https://img.shields.io/github/last-commit/aswinshenoy/bayjdo)

![BayJDO App](https://repository-images.githubusercontent.com/277010180/676eba80-bdbd-11ea-900a-108fc56a631c)

#### !!  NOT AN ORIGINAL IDEA. JUST A SIMPLE IMPLEMENTATION
```
To whomsoever it may concern,

- Neither the idea for this project, nor the technology used, were conceived originally
by the me (there is no invention of anything).  
- In fact, the project is somewhat still a basic & simple implementation of the 
already-popular technology in-use.
- I am no expert in the field, but only a learner trying to experiment with it.
- I do not claim any credit for the idea, & have always maintained & acknowledged the 
inspirations for the project (you can find as well as use them, I have mention them below 
in the inspiration section).
- I am open to any constructive criticism, and welcome any corrections / contributions.

Cheers,
Ashwin Shenoy
```

### 🔥 Features
* ✅ **Light** - Lightweight Progressive Web App that runs on your favorite browser!
* ✅ **Fast** - Does not use your internet too!
* ✅ **Secure** - P2P WebRTC-based End-to-End Encrypted File-Transfer
* ❌ **No Special Hotspot** - Works with any existing hotspot or network between devices.
* ❌ **No App Install** - Works on any device with a modern web browser.
* ❌ **No Non-Sense** - Open Source, No Ads, No User Info Asked/Stored

#### 🎈 How to Use?
0. Ensure both devices are in the same network
1. Open Bayjdo in both devices, and from any one of the device enter the code of the other. 
(You may also make use of in-built QR-Scanner & Scan the QR instead)
2. Select files to send 🗂
3. Wait till transfer is complete, 🎉

#### 💬 Frequently Asked Questions

##### What technology does it use?
The app is completely based on web-technologies and runs on any modern web browser.
For establishing the connection between two devices, a WebRTC signalling server 
(PeerJS) is used. This server is however not involved in the data transfer process.

##### How is privacy ensured? 🙈
All files being transmitted get encrypted by WebRTC standards, no one except the two
devices would be able to read them. For further clarification, no files are ever sent 
to any server, and the file are always transferred directly (P2P) from one device to
another through an encrypted WebRTC/WS channel. 

##### Are all browsers supported?
Sadly no. 😞 Only browsers with the support for WebRTC can support Bayjdo, however,
all modern & popular browsers do support WebRTC and hence Bayjdo 🍻 


### 🔧 Tech Stack
NextJS / PeerJS / WebRTC / WebSocket

### 💎 Contributions
Being an open source project, any sort of contributions - pull requests, bug reporting,
feature request, documentation help are all welcomed.

#### 🛠 How to Run Locally & Develop ?
To run and develop using docker-compose, you may use the following configuration 
in you `docker-compose.yml` -

```shell
version: '3.6'
services:
  bayjdo_server:
    container_name: bayjdo_server
    image: peerjs/peerjs-server
    ports:
      - 9000:9000
  bayjdo_webapp:
    container_name: bayjdo_webapp
    image: webapp
    ports:
      - 3000:3000
    environment:
      - PORT=3000
    volumes:
      - ./webapp:/app
      - /app/node_modules
      - /app/.next
    build:
      context: webapp
      dockerfile: Dockerfile-Dev
    command:
      "npm run dev"
```

#### 🌟 How to Contribute?
1. Fork the repository, clone it locally and run it following the installation instruction above.
2. Find an issue or feature to work on, and put up an issue.
3. Work on the patch or feature, test it and send a pull request referencing the issue.

###  🛑 Disclaimer
This project is only being developed, as a hobby project and does not intend to
replace any popular file transfer application. The implementation of this project is
currently very basic, and intends only to be a proof of concept for the technology used.
This app may have technical glitches, security & privacy vulnerabilities. 
If you plan to use it for transferring confidential files etc., please look 
elsewhere for now.

### 🐱 Inspirations
Neither the idea for this project, nor the technology used, were conceived originally
by me. This project only differs in implementations (+ some minor features), from
some of the following popular projects it was inspired from -
1. https://github.com/cowbell/sharedrop / https://www.sharedrop.io/
2. https://github.com/RobinLinus/snapdrop / https://snapdrop.net/


### ✒️ License
This project repository is licensed under GNU General Public License V3. 

#### Credits
1. Icons / illustrations - https://icons8.com/, https://icons8.com/ouch

----
Developed with ♥ by Ashwin Shenoy.
