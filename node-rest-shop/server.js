const http = require("http");
const app = require("./app");
const port = process.env.PORT || 8000;

const server = http.createServer(app);

server.listen(port, (err) => {
  if (!err) {
    console.log(`Server is listening on port ${port}`);
  }
});
