// implement your API here
const express = require('express');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send({api: "up and running"});
});

server,get('/api/users', (req, res) => {
    db.find()
    .then()
    .catch(error => {
        console.log("error on GET /hubs", error)
        res.status(404).json({message: "error getting users from database"})
    })
})


const port = 4000;
server.listen(port, () => {
    console.log(`\n ** API running on port ${port} **\n`)
});