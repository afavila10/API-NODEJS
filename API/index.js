import app from './src/app/app.js';
import dotenv from 'dotenv';

dotenv.config({path:'../env'});
const PORT = process.env.PORT || 3000; //Allow dynamic port configuration


//start the port

app.listen(PORT,() => {
    console.log(`servidor running .. on port ${PORT}`);
});
