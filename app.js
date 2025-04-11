const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 4000;

// Middle ware

app.use(bodyParser.json());

//Simple in-Memory database

let items = [

    {id : 1, name : 'Item-1'},
    {id : 2, name : 'Item-2'},
    {id : 3, name : 'Item-3'}
];


// Routes will go here
//1. Create (POST) - Add a new item
app.post('/items',(req, res)=>{
    const newItem = {
        id : items.length + 1,
        name : req.body.name
    };
    items.push(newItem);
    res.status(201).json(newItem);
});

// 2. Read (GET) - Get all items or a specific item
app.get('/items',(req, res) =>{
    res.json(items);
});

//// Get a specific item by ID
 app.get('/items/:id',(req, res)=>{
    const item = items.find(i => i.id === parseInt(req.params.id));
    if(!item) return req.status(404).json({message : 'Item not found'});
    res.json(item);
 });

 // 3. Update (PUT) - Update an existing item
 app.put('/items/:id',(req, res)=>{
    const item = items.find(i=> i.id === parseInt(req.params.id));
    if (!item) return res.status(404).json({ message: 'Item not found' });
    
    item.name = req.body.name;
    res.json(item);
 });

 // 4. Delete (DELETE) - Remove an item
 app.delete('/items/:id', (req, res) => {
    const itemIndex = items.findIndex(i => i.id === parseInt(req.params.id));
    if (itemIndex === -1) return res.status(404).json({ message: 'Item not found' });
    
    const deletedItem = items.splice(itemIndex, 1);
    res.json(deletedItem[0]);
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

app.listen(port, ()=>{
    console.log('Server is running on htt://localhost:'+port);
}

);