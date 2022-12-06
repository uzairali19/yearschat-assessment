import {useState} from "react";

interface welcomeProps {
    setLoggedIn: (loggedIn: boolean) => void;
    setUsername: (username: string) => void;
    socket: any;
}

const Welcome: React.FC<welcomeProps> = ({ setLoggedIn, setUsername, socket }) =>{
    const [name, setName] = useState("");
    const loginUser = async () =>{
        await fetch("http://localhost:3001/login", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: name.replace(/\s+/g, ' ').trim()
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.loggedIn){
                setLoggedIn(true);
                setUsername(name)
                socket.emit('join_room', name)
            }
        })
        .catch(err => console.log(err))
    }

    return (
        <div className="container flex justify-center min-h-screen flex-col mx-auto items-center">
            <h1 className="text-2xl" >Welcome to Years Chat</h1>
            <h3 className="text-sm my-5">Please enter your name below and click "Login"</h3>
            <div className="form-control">
                <input
                type="text"
                placeholder="Name"
                className="mb-5 p-4 border-2 rounded"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => {
                    if(e.key === "Enter"){
                        loginUser();
                    }
                }}
                />
                <button
                className="btn btn-primary"
                onClick={loginUser}
                >Login</button>
            </div>
        </div>
    )
}

export default Welcome