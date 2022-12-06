const express = require('express');
const session = require('express-session');
const expressRouter = express.Router();
const app = express();
const {Server} = require('socket.io');
const server = require('http').createServer(app);
const port = 3001;
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const user = require('./model/userModel');

// Initiations
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true
    }
});

const db:any = {
    users: [],
    sessions: [
        { sid: 'sid', userId: 1 }
    ],
    messages: [
        { id: 1, text: 'Hello', userId: 1 },
        { id: 2, text: 'Hi', userId: 2 },
        { id: 3, text: 'How are you', userId: 1 },
        { id: 4, text: 'I am fine',
        userId: 2 },
    ]
}

// Middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
      secret: 'yearschat',
      credentials: true,
      name: "sid",
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: "auto",
        expires: 1000 * 60 * 60 * 24 * 7,
        sameSite: process.env.ENVIRONMENT === "production" ? "none" : "lax",
      },
    })
  );

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

// Routes
expressRouter.post('/login', (req:any, res:any) => {
    const { username } = req.body;
    user.validate({ username })
    .then((valid:any) => {
        const user = db.users.find((user:any) => user.username === username);
        if (valid && !user) {
            db.users.push({ id: uuidv4(), username });
            req.session.user = {
                userId: db.users[db.users.length - 1].id,
                username: username
            }
            res.status(200).json({ loggedIn: true, username: username });
        } else if (valid && user) {
            req.session.user = {
                userId: user.id,
                username: username
            }
            res.status(200).json({ loggedIn: true, username: username });
        }
        console.log(req.session)
    })
    .catch((err:any) => {
        res.status(422).send(err.errors);
    })
});

expressRouter.post('/logout', (req:any, res:any) => {
    req.session.destroy((err:any) => {
        if (err) {
            return res.status(422).send(err);
        }
    })
    res.status(200).json({ loggedIn:false, username: null });
})

app.use(expressRouter);

// Socket.io
io.on('connection', (socket:any) => {
    socket.on('join_room', () => {
        socket.join('yearschat');
    })

    socket.on('send_message', (data:any) => {
        console.log(data)
        socket.to('yearschat').emit('receive_message', data);
    })
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});


// Server
server.listen(port, () => {
    console.log(`listening on: ${port}`);
});