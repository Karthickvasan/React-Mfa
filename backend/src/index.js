import express from 'express';
import session from 'express-session';
import passport from 'passport';
import dotenv from 'dotenv';
import cors from 'cors';
import dbConnect from './config/dbConnect.js';
import authRoutes from './routes/authRoutes.js';
import "./config/passportConfig.js";

dotenv.config();
dbConnect();

const app = express();

const corsOptions = {
    origin: "http://localhost:3001",
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.SESSION_SECRET || 'your_secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 60 * 1000, // 1 hour
        sameSite: "lax"
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    res.send('Server is running');
});

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 7002;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
