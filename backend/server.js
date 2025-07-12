import express from "express";
import cors from "cors"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.route.js";
// import answerRoutes from "./routes/answer.route.js"
// import notificationRoutes from "./routes/notification.route.js"
// import questionRoutes from "./routes/question.route.js"
// import voteRoutes from "./routes/vote.route.js"

dotenv.config();
const app = express();


app.use(express.json());
app.use(cors());

app.use('/auth', authRoutes)

app.get('/', (req, res) => {
    res.send('StackIt backend server running')
})

app.listen(process.env.PORT, () => {
    console.log(`server up at ${process.env.PORT}`)
})