require('dotenv').config();
const express = require('express');
const cors = require("cors");
const app = express();
const PORT = process.env.PORT;
const host = "127.0.0.1";
// Swagger UI
 const swaggerUI = require("swagger-ui-express");
const swaggerDocument = require("./swagger/swagger.json");
const swaggerOptions = {swaggerOptions: { validatorUrl: null}};

// Swagger
const expressSwagger = require('express-swagger-generator')(app); 
const options = require('./swagger/swagger.config.js'); 
expressSwagger(options); 

const route_user = require("./routes/users.route.js");
const route_post = require("./routes/post.route.js");
const route_comment = require("./routes/comment.route.js");
const route_repost = require("./routes/repost.route.js");

app.use(cors());
app.use(express.json());
app.use('/users', route_user);
app.use('/posts', route_post);
app.use('/comment', route_comment);
app.use('/repost', route_repost)

app.use("/api-docs-ui", swaggerUI.serve, swaggerUI.setup(swaggerDocument, swaggerOptions));
app.use("/api-docs", expressSwagger);
app.get("*", function(req, res) {
    res.status(404).json({ message: "Esta rota não esta definida!" });
});
app.set("port", PORT)
app.listen(process.env.PORT, () => {
    console.log(`App listening at http://${host}:${PORT}/`)
    console.log(`Swagger UI: \n API documentation listening at http://${host}:${PORT}/api-docs-ui`)
    console.log(`Swagger Generator: \n API documentation listening at http://${host}:${PORT}/api-docs`)
})