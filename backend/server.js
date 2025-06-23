import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/data", (req, res) => {
  res.json({ message: "hello from server" });
});

app.listen(3000, () => {
  console.log("Listening");
});
