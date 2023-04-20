import * as http from 'http';
import { Go1, Go1Mode } from "./go1";

let dog = new Go1();

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    if (req.url === '/forward') {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      dog.setMode(Go1Mode.walk);
      dog.goForward(0.25, 2000);
        //dog.go(0, -0.25, -0.25, 1000);
      res.end('Moving forward...');
    } else if (req.url === '/backward') {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Moving backward...');
    } else {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Endpoint not found');
    }
  } else {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Allow', 'GET');
    res.end('Method not allowed');
  }
});

const port = 3000;

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});