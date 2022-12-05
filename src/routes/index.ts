const expressRouter = require('express').Router();
const yup = require('yup');

const db:any = []

const userSchema = yup.object().shape({
    username: yup.string()
    .required('Username is required')
    .min(3,'Username too short!')
    .max(20,'Username too long!'),
});


expressRouter.post('/login', (req:any, res:any) => {
    const { username } = req.body;
    userSchema.validate({ username })
    .then((valid:any) => {
        if (valid && req.session.username !== username) {
            req.session.username = username;
            res.status(200).json({ loggedIn:true, username: username });
        }
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

module.exports = expressRouter;