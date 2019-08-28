const express = require('express');
const path = require('path');
let app = express();
const port = process.env.NODE_PORT ? process.env.NODE_PORT : 3000;

//setup the proxy
require('./src/setupProxy')(app);
app.use('/', express.static(path.join(__dirname, 'build')));

app.listen(port, () => console.log(`mws-frontend is running on port ${port}`));
