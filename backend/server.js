import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();

app.use(cors());
app.use(
  bodyParser.json({
    type(req) {
      return true;
    },
  })
);
app.use(function (req, res, next) {
  res.setHeader("Content-Type", "application/json");
  next();
});

let posts = [
  {id: 1, content: 'Пост, относящийся к курсу React 1', created: '20.12.2023'},
  {id: 2, content: 'Пост, относящийся к курсу React 2', created: '21.12.2023'},
  {id: 3, content: 'Пост, относящийся к курсу React 3', created: '22.12.2023'}
];
let nextId = 4;

app.get("/posts", (req, res) => {
  res.send(JSON.stringify(posts));
});

app.get("/posts/:id", (req, res) => {
  const postId = Number(req.params.id);
  const index = posts.findIndex((o) => o.id === postId);
  res.send(JSON.stringify({ post: posts[index] }));
});

app.post("/posts", (req, res) => {
  let d = new Date
  d = `${d.getDay()}.${d.getMonth()}.${d.getFullYear()}`
  posts.push({ ...req.body, id: nextId++, created: d });
  res.status(204);
  res.end();
});

app.put("/posts/:id", (req, res) => {
  const postId = Number(req.params.id);
  console.log(req.body)
  posts = posts.map((o) => {
    if (o.id === postId) {
      return {
        ...o,
        ...req.body,
        id: o.id,
      };
    }
    return o;
  });
  res.status(204).end();
});

app.delete("/posts/:id", (req, res) => {
  const postId = Number(req.params.id);
  const index = posts.findIndex((o) => o.id === postId);
  if (index !== -1) {
    posts.splice(index, 1);
  }
  res.status(204);
  res.end();
});

const port = process.env.PORT || 7071;
app.listen(port, () =>
  console.log(`The server is running on http://localhost:${port}`)
);
