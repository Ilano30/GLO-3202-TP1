const cors = require("cors");
const { validate } = require("jsonschema");
const express = require("express"),
  serveStatic = require("serve-static"),
  history = require("connect-history-api-fallback"),
  fs = require("fs"),
  port = process.env.PORT || 8000;

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

const listSchema = {
  type: "array",
  default: [],
  items: {
    type: "object",
    required: ["name", "id"],
    properties: {
      name: {
        type: "string",
      },
      id: {
        type: "integer",
      },
    },
  },
};

app.get("/task", (req, res) => {
  filePath = __dirname + "/data.txt";

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    if (!data) res.send("[]");
    else res.send(data);
  });
});

app.post("/task", (req, res) => {
  const result = validate(req.body, listSchema);
  if (!result.valid) {
    res.sendStatus(400);
    return;
  }
  const data = JSON.stringify(req.body);
  filePath = __dirname + "/data.txt";
  fs.writeFile(filePath, data, (err) => {
    if (err) {
      console.error(err);
    }
  });
  res.sendStatus(200);
});

app.use(serveStatic(__dirname + "/dist/spa"));
app.use(history());
app.listen(port);
