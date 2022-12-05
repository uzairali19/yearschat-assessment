import {useState} from 'react'

interface chatProps {
    socket: any;
}

const Chat: React.FC<chatProps> = ({socket}) => {
    const [message, setMessage] = useState('')

    const sendMessage = () => {
        socket.emit('send-message', message)
        setMessage('')
    }
    return (
        <div className="container mx-auto flex flex-col justify-between min-h-[90vh] h-full">
            <div className="flex flex-col h-full">
                <div className="flex-1 overflow-y-scroll">
                    <div className="chat chat-start">
                        <div className="chat-bubble">It's over Anakin, <br/>I have the high ground.</div>
                    </div>
                    <div className="chat chat-end">
                        <div className="chat-bubble">You underestimate my power!</div>
                    </div>
                </div>
            </div>
            <div className="flex">
                <form action="" className="relative min-w-[85vw]">
                    <textarea placeholder="Type your message here..." className="p-4 border-2 rounded w-full h-32 resize-none" />
                    <button className="btn btn-primary absolute right-2 bottom-4 h-8 min-h-0 px-14 py-0 text-xs ">Send</button>
                </form>
            </div>
        </div>
    )
}

export default Chat