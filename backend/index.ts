import express from 'express'
import postRoutes from './routes/post.js';
import userRoutes from './routes/user.js';
import cors from 'cors'

const port = 3000;

const app = express();
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
  }))

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/post", postRoutes);

app.listen(port, ()=>{
    console.log("app is running at port: ", port);
})
