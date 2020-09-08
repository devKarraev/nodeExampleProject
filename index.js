const express = require("express");
const app = express();
const mongoose = require("mongoose")
const path = require("path")
const Handlebars = require('handlebars')
const exphbs = require("express-handlebars")
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const hbs = exphbs.create({
    defaultLayout: "main",
    extname: "hbs",
    handlebars: allowInsecurePrototypeAccess(Handlebars)
})
const User = require("./models/user")

const homeRoutes = require("./routes/home")
const addRoutes = require("./routes/add")
const cartRoutes = require("./routes/cart")
const coursesRoutes = require("./routes/courses")

app.engine("hbs", hbs.engine)
app.set("view engine", "hbs")
app.set("views", "views")

app.use(async (req, res, next) => {
    try {
        const user = await User.findById("5f22a746728702eeb4e22d0b")
        req.user = user
        next()
    } catch (e) {
        console.log(e)
    }
})

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: false}))
app.use("/", homeRoutes)
app.use("/add", addRoutes)
app.use("/cart", cartRoutes)
app.use("/courses", coursesRoutes)

async function start() {
    try {
        const url = "mongodb+srv://Rasul:8pqEBFki5Db975uF@cluster0.d4ij2.mongodb.net/Shop"
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        const candidate = await User.findOne()
        if (!candidate) {
            const user = new User({
                email: "rasulkaraev3@gmail.com",
                name: "Rasul",
                cart: {items: []}
            })
            await user.save()
        }
        app.listen(3000, function () {
            console.log("Server is running")
        })
    } catch (e) {
        console.log(e)
    }
}

start()
