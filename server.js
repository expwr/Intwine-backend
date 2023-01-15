const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();


const { readdirSync } = require('fs');

const app = express();
app.use(express.json())
app.use(cors({
    origin: ["http://localhost:3000", "https://intwine-web-app.onrender.com"]
}));



// routes to nav
readdirSync('./routes').map((r) => app.use('/', require('./routes/' + r)));


// database
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('database connected successfully'))
.catch((err) => console.log('error connecting to mongodb', err))

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

console.log(+new Date() * Math.random().toString().substring(0, 1))
