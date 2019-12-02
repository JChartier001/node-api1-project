// implement your API here
const express = require('express');

const server = express();

server.use(express.json());
server.use(cors());
const db = require('./data/db.js')

server.get('/', (req, res) => {
    res.send({api: "up and running"});
});

server.post('/users', (req, res) => {
const userData = req.body;

    db.insert(userData)
    .then(added => {
        if(added.name || added.bio === null){
            res.status(400).json({message: "Please provide name and bio for the user."});       
        } else {
            res.status(201).json(userData);            
        }
    })
    .catch(error => {
        console.log("error adding new user", error);
        res.status(500).json({message: "There was an error while saving the user to the database"});
    });
});

server.get('/users', (req, res) => {
    db.find()
    .then(users => {
        res.status(200).json(users);
    })
    .catch(error => {
        console.log("error on GET /hubs", error)
        res.status(500).json({message: "The users information could not be retrieved."})
    })
})

server.get('/users/:id', (req, res) => {
    const id = req.params.id
    db.findById(id)
    
    .then(user => {
        if(user.id === null){
            res.status(404).json({message: "The user with the specified ID does not exist."});
        }else
        res.status(200).json(user);
    })
    .catch(error => {
        console.log("error on GET /users/:id", error)
        res.status(500).json({message: "The users information could not be retrieved."});
    });
});


server.delete('/users/:id', (req, res) => {
    const id = req.params.id
    db.remove(id)
    .then(user => {
        if(user.id === null){
            res.status(404).json({message: "The user with the specified ID does not exist."});
        }else
        res.status(200).json({message: "user has been deleted"},user);
    })
    .catch(error => {
        console.log("error on DELETE", error);
        res.status(500).json({message: "The user could not be removed"})
    })
})

server.put('/users/:id', (req, res) => {    
    const userData = req.body;
    const id = req.params.id
    const name = req.params.name
    const bio =req.params.bio
    const account = db.findById((userId) => userId.id === id);

    db.update(id, userData)
    .then(user => {
        if(!account){
            res.status(404).json({message: "The user with the specified ID does not exist."})
        } else if(user.name || user.bio == "") {
            res.status(400).json({message: "Please provide name and bio for the user."})
        }else {
            res.status(200).json(userData)
        }
    })
    .catch(error => {
        console.log("Error updating user", error);
        res.status(500).json({message: "The user information could not be modified."})

    })
})


const port = 4000;
server.listen(port, () => {
    console.log(`\n ** API running on port ${port} **\n`)
});