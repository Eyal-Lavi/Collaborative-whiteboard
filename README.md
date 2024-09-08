# Collaborative board

I created a drawing board, using html css js and node.js that you can draw and work on the same drawing with friends live via socket.
It is also possible to draw alone without cooperation mode and save the drawings for the next time we want to draw and continue from the same point where we stopped by saving the local storage,
All information passes through sockets between all users connected to the same room.


# Click on the image to see the video about the project:
[![Watch the video](https://i9.ytimg.com/vi/0BXKZgwE8IU/mqdefault.jpg?v=66ddab01&sqp=CLTZ9rYG&rs=AOn4CLBStslHhM7ZTP3HoNfA2GKSex75wg)](https://www.youtube.com/watch?v=0BXKZgwE8IU)

* Shapes can be added
* They can be dragged using the mouse
* You can open the settings window in two ways:
     - Mark focus on a shape and then open the settings window from the sidebar
     - Double click on the shape
* You can edit settings using the settings window that allows you to change:
    - Place
    - Color
    - Size
    - If it is text then edit the text
* You can save a drawing on the local storage to continue next time
* You can open a saved drawing from the local Sutraj
* You can create a room to draw with other people together
*And you can join an existing room

If a user enters a name of a room that does not exist then it
   Opens a new room, if the room exists it creates a new room.
There cannot be a situation where two users enter the same room with the same name.

## Technologies Used
- **Client-Side:**
  - JavaScript
  - HTML
  - CSS
- **Server-Side:**
  - Node.js
  - Express
  - Socket.io

# The collaborative version files can be found in the -online- folder

## Setup Instructions

### Client
1. Clone the repository:
   ```bash
   git clone https://github.com/username/repo-name.git
2. Navigate to the client directory
   cd repo-name/client
4. Open "index.html" in your web browser.

### Server
1. Navigate to the server directory:
   cd repo-name/server
2. Install the dependencies:
   ```bash
   npm install
3. Start the server:
   ```bash
   node server.js

 ### Usage
     1. Client:
          Use the sidebar to create new shapes or load an existing project.
          Click on shapes to edit their properties.
     2. Server:
          Manages user connections and real-time collaboration.
          Listens on port 8080 by default.
