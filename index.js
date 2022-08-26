import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session'
import userRouter from './routes/user.js';
import pokemonRouter from './routes/pokemon.js';
import fileUpload from 'express-fileupload';
import 'dotenv/config';


const db = process.env.BDD_URL;
const app = express();
const router = express.Router()
app.use(fileUpload({
    createParentPath: true
}));
app.use(session({secret: process.env.SECRET_KEY,saveUninitialized: true,resave: true}));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./assets')); 
app.use(router)
router.use(userRouter)
router.use(pokemonRouter)

//------------------------------------CONNEXION-PORT---------------------------------------//
app.listen(process.env.PORT,(err)=>{
    if (err) {
        console.log(err);
    }else{
        console.log(`Connected at port 2404 ${process.env.APP_URL}`);
    }
})

//----------------------------------CONNEXION-MONGOOSE-------------------------------------//
mongoose.connect(db,(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("vous etes connecter à mongoDB");
    }
})

//----------------------------------------ROUTE--------------------------------------------//
router.get("*", (req, res) => {
    res.redirect('/login')  
});

export default router
