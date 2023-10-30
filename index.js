const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const routerApi = require('./routers');
const { appConfig } = require('./config')

const app = express();

const port = appConfig.port;
const host = appConfig.host;

const OperationService = require("./services/service.operations");
const service = new OperationService();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use('/public', express.static(`${__dirname}/storage/imgs`))

app.get('/', (req, res) => {
    res.send('This is api notes!')
})

app.get('/test', async (req, res) => {
    const rta = await service.findByAvailablePartialMaterialId("653b17aa3903a7fc827d1cf2");
    console.log("🚀 ~ file: index.js:26 ~ app.get ~ rta:", rta)
    res.json(rta);
})

routerApi(app);


app.listen(port,() => {
    console.log(`http://${host}:${port}`);
})