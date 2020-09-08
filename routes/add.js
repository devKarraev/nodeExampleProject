const {Router} = require("express")
const router = Router()
const Course = require("../models/course")

router.get("/", function (req, res) {
    res.render("add", {
        title: "Добавить курс",
        isAdd: true
    })
})

router.post("/", async function (req, res) {
    const course = new Course({
        title: req.body.title,
        price: req.body.price,
        img: req.body.img,
        userId: req.user._id
    })
    try {
        await course.save()
        res.redirect("/courses")
    } catch (e) {
        console.log(e)
    }
})

module.exports = router
