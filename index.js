require('./models/db');
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var fileRoutes = require('./routes/file.routes');
var userRoutes = require('./routes/users.routes');
var userComponentRoutes = require('./routes/user-component.routes')
var articleRoutes = require('./routes/articles.routes')

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors());

app.use('/files', fileRoutes);
app.use('/users', userRoutes);
app.use('/userComponent',userComponentRoutes);
app.use('/articles',articleRoutes)

app.listen(5000, (err, done) => {
    if (!err) console.log('started your server');
    if (err) console.log('something went wrong :' + err);
})
