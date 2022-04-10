import io from "socket.io-client";
import { WS_BASE_URL } from '../config';

const Socket = {
    // Our Socket.io connection to the server.
    io : null,
	appServerURL : `${WS_BASE_URL}`,
    startup : () => {

		let mySessionId;

		//establish connection to server
		Socket.io = io(Socket.appServerURL);
		
		Socket.io.on("connected", (data) => {
			mySessionId = data.userSessionId;	
			
            console.log('WS connection established');
		});

					

		Socket.io.on('connect_failed', () => {
            
		});
    
    	Socket.io.on("disconnect", () => {
            
		});        
    },
	setUp : () => {
		Socket.io.emit("newAppSetup");
	},
	checkDataUpdate : (date) => {
		Socket.io.emit("dataUpdate", {date});
	}
}

export default Socket;