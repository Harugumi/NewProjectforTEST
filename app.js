const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();

app.use(express.static("public"));
app.use(express.static("views"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    secret: '2B855067', // ใส่คีย์ของคุณที่นี่
    resave: false,
    saveUninitialized: true
}));
const db = new sqlite3.Database("testdata.db");

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/1login.html");
});

app.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    db.get("SELECT * FROM Member WHERE username = ? AND password = ?", [username, password], (err, row) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Internal Server Error");
        }

        if (row) {
            req.session.loggedin = true;
            req.session.userid = row.id_mem;

            // Check if the user has a profile, if not, create one
            db.get("SELECT * FROM Profile WHERE id_mem = ?", [row.id_mem], (err, profileRow) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send("Internal Server Error");
                }

                if (!profileRow) {
                    // If the profile doesn't exist, create one
                    db.run("INSERT INTO Profile (id_mem) VALUES (?)", [row.id_mem], (err) => {
                        if (err) {
                            console.error(err);
                            return res.status(500).send("Internal Server Error");
                        }
                        res.redirect("/views/0index.html");
                    });
                } else {
                    // If the profile exists, redirect to index
                    res.redirect("/views/0index.html");
                }
            });
        } else {
            res.send("Invalid username or password");
        }
    });
});

app.get("/views/0index.html", (req, res) => {
    res.sendFile(__dirname + "/views/0index.html");
});

app.get("/views/2profileem.html", (req, res) => {
    if (!req.session.loggedin) {
        return res.redirect("/");
    }

    db.get("SELECT * FROM Profile WHERE id_mem = ?", [req.session.userid], (err, row) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Internal Server Error");
        }

        if (row) {
            res.render("2profileem", { user: row });
        } else {
            res.status(404).send("User not found");
        }
    });
});

// เพิ่ม endpoint /api/user/profile
app.get("/api/user/profile", (req, res) => {
    // ตรวจสอบว่าผู้ใช้ล็อกอินหรือไม่
    if (!req.session.loggedin) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    // ดึงข้อมูลผู้ใช้จากฐานข้อมูล
    db.get("SELECT * FROM Profile WHERE id_mem = ?", [req.session.userid], (err, row) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        if (row) {
            // ส่งข้อมูลผู้ใช้กลับไปยัง client
            res.json({
                id_mem: row.id_mem,
                fname: row.fname,
                lname: row.lname,
                department: row.department,
                email: row.email,
                phone: row.phone
            });
        } else {
            // ถ้าไม่พบข้อมูลผู้ใช้
            res.status(404).json({ error: "User not found" });
        }
    });
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



app.listen(9000, () => {
    console.log("Server is running on port 9000");
});