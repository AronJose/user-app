const express = require('express');
const cors = require('cors');
const path = require('path');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/index');


// ------------------------------------------ Port -------------------------------------------------------------

const PORT = process.env.PORT || 8080
// ------------------------------------------ Middleware -----------------------------------------------------
const app = express();
app.use(cors("http://localhost:3000"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// ------------------------------------------routes -----------------------------------------------------------

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


const roleRouter = require('./routes/rolesRoutes.js')
app.use('/api/roles', roleRouter)

const userRoutes = require('./routes/userRoutes')
app.use('/api/users', userRoutes)


// ------------------------------------------ Server ------------------------------------------------------------

app.listen(PORT, () => {
    console.log(`server is running port is ${PORT}`);
})