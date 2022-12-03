

function Chat() {
    return (
        <div className="container mx-auto flex flex-col justify-between min-h-[90vh] h-full">
            <div className="flex flex-col h-full">
                <div className="flex-1 overflow-y-scroll">
                    <h3>User 1</h3>
                    <p>Message 1</p>
                    <h3>User 2</h3>
                    <p>Message 2</p>
                    <h3>User 1 edited</h3>
                    <p>Message 1 edited</p>
                    <h3>User 2</h3>
                    <p>This message has been deleted</p>
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