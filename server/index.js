import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from "url";
import { addNewCourse } from "./controllers/courseController.js";
import { addNewEvent } from "./controllers/event.js";
import twilio from "twilio";


dotenv.config();
export const sendSms = (toPhoneNumber) => {
    const formattedPhoneNumber = `+216${toPhoneNumber}`; // E.164 format
    const client = new twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

    return client.messages
        .create({
            body: 'Thank you, Your Event Participation has been Accepted !',
            from: process.env.TWILIO_PHONE_NUMBER,
            to: formattedPhoneNumber // Format to +216 ( tunisian Number)
        })
        .then(message => console.log("Message sent:", message.sid))
        .catch(err => console.error("Error sending message:", err));
};


import  { createCategorie, updateCategorie }  from "./controllers/categorieController.js"; // Import des routes de catégorie




import eventRoutes from "./routes/Event.js";
import salleRoutes from "./routes/salle.js";
import reservationRoutes  from "./routes/Reservation.js";



import stageRouter  from "./routes/stageRoute.js";
import authRoutes from "./routes/auth.js";
import courseRoute from './routes/courseRoute.js'


import { register } from "./controllers/auth.js";


import categorieRoutes from "./routes/categorieRoutes.js"; // Import des routes de catégorie

import User from './models/User.js';
import { users } from "./data/index.js";

/* CONFIGURATION */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname,'public/assets')));


/* FILE STORAGE */
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null,"public/assets");
    },
    filename: function(req, file, cb) {
        cb(null,file.originalname);
    }
});
const upload = multer({ storage });

/* ROUTES WITH FILES*/
//app.post("/auth/register",upload.single("picture"),register);
app.post("/course/add",upload.single("picture"),addNewCourse);

app.post("/event/add",upload.single("picture"),addNewEvent);

app.post("/api/categories", upload.single("picture"), createCategorie);
app.put("/api/categories/:id", upload.single("picture"), updateCategorie);



/* ROUTES */
app.use("/auth",authRoutes);
app.use("/api/categories", categorieRoutes); 

app.use('/event', eventRoutes);


app.use("/stage",stageRouter);
app.use("/course",courseRoute);
app.use("/salle",salleRoutes);

app.use("/salle",salleRoutes);

app.use("/events",reservationRoutes);




/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => console.log(`Server port: ${PORT}`));

    /* ADD DATA ONE TIME*/
    // User.insertMany(users);
    //Post.insertMany(posts);
    
}).catch((error) => console.log(`${error} did not connect`));