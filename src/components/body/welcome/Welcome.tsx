function Welcome(){
    return (
        <div className="container flex justify-center min-h-screen flex-col mx-auto items-center">
            <h1 className="text-2xl" >Welcome to Years Chat</h1>
            <h3 className="text-sm my-5">Please enter your name below and click "Login"</h3>
            <div className="form-control">
                <input type="text" placeholder="Name" className="mb-5 p-4 border-4" />
                <button className="btn btn-primary">Login</button>
            </div>
        </div>
    )
}

export default Welcome