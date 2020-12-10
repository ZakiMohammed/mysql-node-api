const express = require('express')
const app = express()
const port = 5000

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/api/posts', require('./api/posts'));

app.listen(port, () => {
    console.log(`Server running on ${port}`)
});