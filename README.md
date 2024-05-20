# Collaborative board

I created a drawing board, using html css js and node.js that you can draw and work on the same drawing with friends live via socket.
It is also possible to draw alone without cooperation mode and save the drawings for the next time we want to draw and continue from the same point where we stopped by saving the local storage,
All information passes through sockets between all users connected to the same room.


# Click on the image to see the video about the project:
[![Watch the video](https://i.ytimg.com/vi/lNyhSA_tsoA/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG\u0026rs=AOn4CLAG7v0PENaHYST29gr0kLy5w9u3Eg)](https://www.youtube.com/watch?v=lNyhSA_tsoA)

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

## Technologies on the client side
- Js
- HTML
- Css
## Server-side technologies
- Node.js

## Means of communication between users
- socket

# The collaborative version files can be found in the -online- folder
