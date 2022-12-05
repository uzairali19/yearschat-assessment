import { Welcome } from "./welcome";
import { Chat } from "./chat";

interface bodyProps {
    loggedIn: boolean;
    setLoggedIn: (loggedIn: boolean) => void;
    setUsername: (username: string) => void;
    socket: any;
}

const Body: React.FC<bodyProps> = ({loggedIn,setLoggedIn, setUsername, socket})=> {
    return (
        <>
            {loggedIn 
            ?
            <Chat
                socket={socket}
            /> :
            <Welcome
                setLoggedIn={setLoggedIn}
                setUsername={setUsername}
            />}
        </>
    )
}

export default Body;
