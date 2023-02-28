import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import sessions from 'express-session'
import msIdExpress from 'microsoft-identity-express'
import cors from 'cors'
import {CLIENT_ID, TENANT_ID, CLIENT_SECRET} from './credentials.js'
import cors from 'cors'

import models from './models.js'

import apiRouter from './routes/api.js';

const appSettings = {
    appCredentials: {
        clientId:  CLIENT_ID,
        tenantId:  TENANT_ID,
        clientSecret:  CLIENT_SECRET,
    },	
    authRoutes: {
        redirect: "http://localhost:9000/redirect", //note: you can explicitly make this "localhost:3000/redirect" or "examplesite.me/redirect"
        error: "/error", // the wrapper will redirect to this route in case of any error.
        unauthorized: "/unauthorized" // the wrapper will redirect to this route in case of unauthorized access attempt.
    }
};

import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { ppid } from 'process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'Frontend/build')));


app.use(function(req, res, next) {
    req.models = models;
    next();
});


const oneDay = 1000 * 60 * 60 * 24
app.use(sessions({
    secret: "this is some secret key I am making up 09532poi fn4eelhu jfcbds",
    saveUninitialized: true,
    cookie: {maxAge: oneDay},
    resave: false
}))

const msid = new msIdExpress.WebAppAuthClientBuilder(appSettings).build()
app.use(msid.initialize())
  


app.use('/api', apiRouter);

app.get('/signin',
    msid.signIn({postLoginRedirect: '/'})
)

app.get('/signout',
    msid.signOut({postLogoutRedirect: '/'})
)

app.get('/error', (req, res) => {
    res.status(500).send("Error: Server error")
})

app.get('/unauthorized', (req, res) => {
    res.status(401).send("Error: Unauthorized")
})


export default app;
