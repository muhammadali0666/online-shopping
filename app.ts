import express from "express"
import dotenv from "dotenv"

const app = express()
dotenv.config()

const PORT = process.env.PORT || 4000

app.use(express.json())


app.listen(PORT, () => {
  console.log(`Application running at http://localhost:${PORT}`);
  
})

