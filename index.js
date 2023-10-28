const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const routerApi = require('./routers');
const { appConfig } = require('./config')

const app = express();

const port = appConfig.port;
const host = appConfig.host;

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use('/public', express.static(`${__dirname}/storage/imgs`))

app.get('/', (req, res) => {
    res.send('This is api notes!')
})

routerApi(app);


app.listen(port,() => {
    console.log(`http://${host}:${port}`);
})