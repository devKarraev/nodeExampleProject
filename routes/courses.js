const {Router} = require("express")
const Courses = require("../models/course")
const router = Router()

router.get("/", async function (req, res) {
    const courses = await Courses.find()
        .populate("userId", "email name")
        .select("price title img")

    res.render("courses", {
        title: "Курсы",
        isCourses: true,
        courses
    })
})

router.get("/:id/edit", async (req, res) => {
    if (!req.query.allow) {
        return res.redirect("/")
    }

    const course = await Courses.findById(req.params.id)

    res.render("course-eddit", {
        title: `Редактировать ${course.title}`,
        course
    })
})

router.post("/edit", async (req, res) => {
    const {id} = req.body
    delete req.body.id
    await Courses.findByIdAndUpdate(id, req.body)
    res.redirect("/courses")
})

router.get("/:id", async (req, res) => {
    const course = await Courses.findById(req.params.id)
    res.render("course", {
        layout: "empty",
        title: `Курс ${course.title}`,
        course
    })
})

router.post("/remove", async (req, res) => {
    try {
        await Courses.deleteOne({_id: req.body.id})
        res.redirect("/courses")
    } catch (e) {
        console.log(e)
    }
})

module.exports = router
