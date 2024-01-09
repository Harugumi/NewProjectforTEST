const express = require("express");
const app = express();
const newsRoute = require("./routes/newsRoute");
const { callSearchData } = require("./controller/search.controller");

const mongoose = require("mongoose");
const uri = "mongodb+srv://thakornn:2B855067mongodb@project-lot.2wejuj3.mongodb.net/?retryWrites=true&w=majority";

async function connect() {
    try {
        await mongoose.connect(uri);
        console.log("Connected to mongoDB");
    } catch (error) {
        // กรณีเกิดข้อผิดพลาดในการดึงข้อมูล
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
    }
}

app.use(express.static("public"));
app.use(express.static("views"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/0index.html");
});

app.get("/views/0index.html", (req, res) => {
    res.sendFile(__dirname + "/views/0index.html");
});

app.get("/views/2profileem.html", (req, res) => {
    res.sendFile(__dirname + "/views/2profileem.html");
});

app.get("/views/3listeq.html", (req, res) => {
    res.sendFile(__dirname + "/views/3listeq.html");
});

app.get("/views/4borroweq.html", (req, res) => {
    res.sendFile(__dirname + "/views/4borroweq.html");
});

app.get("/views/5returneq.html", (req, res) => {
    res.sendFile(__dirname + "/views/5returneq.html");
});



//2023-01
app.get("/search", (req, res) => {
    const { month, year } = req.query;
    callSearchData(month, year, (data) => {
        res.send(data);
        res.end();
    });
});

app.listen(9000, () => {
    console.log("เซิร์ฟเวอร์ทำงานที่พอร์ต 9000");
});
