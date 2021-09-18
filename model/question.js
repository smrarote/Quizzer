import mongoose from 'mongoose';
const questionSchema = new mongoose.Schema({
        que: String,
        one: String,
        two: String,
        three: String,
        four: String,
        correct: String  
})
export default mongoose.model("question",questionSchema);