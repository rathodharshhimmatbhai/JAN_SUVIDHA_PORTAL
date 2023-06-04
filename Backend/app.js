import express from "express";
import "./DB/conn.js";
import router from "./Router/auth.js";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
const app=express();
app.use(cookieParser());
// app.use(express.static('Front_end/public'));
// app.use('/', dynamicContentRoute);
import dotenv from "dotenv";
dotenv.config({path:"../config.env"});
const __dirname = path.resolve();
app.use(express.json());
// app.set("view engine","hbs");
app.use(cors());
app.use(router);
app.set('view engine', 'hbs');
// console.log(__dirname);
const Path=path.join(__dirname,'../Front_end/views');
// console.log(Path);
app.set('views', path.join(__dirname, '../Front_end/views'));

app.use(express.static(path.join(__dirname, '../Front_end')));


// Define the route for rendering the index.html file
// app.get('/', (req, res) => {
//   res.render('index');
// });
// app.get('/login', (req, res) => {
//     res.render('login');
// });
// app.get('/register', (req, res) => {
//     res.render('register');
// });

app.listen(9000,(e)=>{
    console.log(`you are hearing from port No ${process.env.PORT}`);
})