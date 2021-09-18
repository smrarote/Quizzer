import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
const app = express();
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));



//Database Connection
dotenv.config();
mongoose.connect(process.env.DBURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

//Router 
import home from "./routes/home.js";
import contribute from "./routes/contribute.js";
app.use(home);
app.use(contribute);
//Listen Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("Server running on : " + PORT);
})