const express = require('express');
const http = require('http');
const cors = require('cors');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/index');
// ------------------------------------------ Port -------------------------------------------------------------
const PORT = process.env.PORT || 8080
// ------------------------------------------ Middleware -----------------------------------------------------
const { Server } = require('socket.io')
const app = express();
const server = http.createServer(app);

app.use(cors());
// app.use(cors("http://localhost:3000"));
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});
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

const profileRoutes = require('./routes/profileRoutes')
app.use('/api/profile', profileRoutes)

const productionHouse = require('./routes/productionHouseRoutes')
app.use('/api/production',productionHouse)

// -----------------Socket io ----------------------------
io.on("connection", (socket) => {
    console.log(`connected ${socket.id}`);
    
    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`User with id :${socket.id} join room: ${data}`)
    });
    
    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data);
        console.log(data, "data");
    });
    
    socket.on("disconnect", () => {
        console.log('User Disconnected', socket.id)
    })
});

// ------------------------------------------ Server ------------------------------------------------------------


app.listen(PORT, () => {
    console.log(`server is running port is ${PORT}`);
})