import express from 'express';
import questionModel from "../model/question.js";
const router = express.Router();

router.get("/", async (req, res) => {
       const rand = 10;
       let Questions = [];
       for(var i = 0; i < rand; i++){
             Questions[i] = await fetchQuiz();
       }
       res.render("home.ejs",{Quiz: Questions});
})
router.post("/", (req, res) => {
       let score = 0;
       const data = req.body;
       var result = [];
       // que and ans
       for(let i = 0; i < 10; i++){
         var tmpresp = "";
         if(data[String(i)][0] === "A"){
             tmpresp = data[String(i)][4];
         }else if(data[String(i)][0] === "B"){
             tmpresp = data[String(i)][5];
         }else if(data[String(i)][0] === "C"){
             tmpresp = data[String(i)][6];
         }else{
             tmpresp = data[String(i)][7];
         }
          if(data[String(i)][0] === data[String(i)][1]){
              result.push({
                que: data[String(i)][2],
                resp: tmpresp,
                ans: data[String(i)][3],
                verdict: "Correct"
              });
              score = score + 1;
          }else{
              result.push({
                que: data[String(i)][2],
                resp: tmpresp,
                ans: data[String(i)][3],
                verdict: "Wrong"
              })
          }
       }
   res.render("result.ejs", {data:result, score: score});   
})
const fetchQuiz = ()=> {
    return new Promise((resolve, reject) =>{
      questionModel.count().exec(function(err, count){
         var random = Math.floor(Math.random() * count);
         questionModel.findOne().skip(random).exec(
          function (err, result) {
             resolve(result);
         });
      });
    })
}

export default router;