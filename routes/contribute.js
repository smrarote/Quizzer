import express from 'express';
import questionModel from "../model/question.js";
const router = express.Router();

router.get("/contribute", async(req, res) => {
       res.render("contribute.ejs");
})
router.post("/contribute",async(req,res) => {
       var question = new questionModel({
           que: req.body.quetext,
           one: req.body.option1,
           two: req.body.option2,
           three: req.body.option3,
           four: req.body.option4,
           correct: req.body.answer
       })
       try {
        await question.save();
        res.redirect("/");
       } catch (error) {
        res.status(500).send(error);
       }
})
export default router;