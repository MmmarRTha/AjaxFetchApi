const express = require('express');
const morgan = require('morgan');
const app = express();

const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(morgan('tiny'));

let f = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.send({
        hola: "mundo"
    });
}

app.options("/", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "PUT");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authentication");
    res.status(204).send();
})

app.get("/", f);
app.post("/", f);
app.put("/", f);

app.listen(8080, ()=> console.log("Server started"));