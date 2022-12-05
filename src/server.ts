const express = require('express');
const session = require('express-session');
const app = express();
const {Server} = require('socket.io');
const server = require('http').createServer(app);
const port = 3001;
const cors = require('cors');
const authRouter = require('./routes/index');
const Redis = require('ioredis');
const RedisStore = require('connect-redis')(session);


const redisClient = new Redis();

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true
    }
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    store: new RedisStore({ client: redisClient }),
    name: 'sid',
    credentials: true,
    secret: 'keyboard',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        secure: false,
        httpOnly: true
    }
}))

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

app.use(authRouter)

io.on('connection', (socket:any) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.listen(port, () => {
    console.log(`listening on *:${port}`);
});