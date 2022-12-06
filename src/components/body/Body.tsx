import { Welcome } from "./welcome";
import { Chat } from "./chat";

interface bodyProps {
    loggedIn: boolean;
    setLoggedIn: (loggedIn: boolean) => void;
    setUsername: (username: string) => void;
    socket: any;
    username: string;
}

const Body: React.FC<bodyProps> = ({loggedIn,setLoggedIn, setUsername, socket, username})=> {
    return (
        <>
            {loggedIn 
            ?
            <Chat
                socket={socket}
                username={username}
            /> :
            <Welcome
                setLoggedIn={setLoggedIn}
                setUsername={setUsername}
                socket={socket}
            />}
        </>
    )
}

export default Body;
