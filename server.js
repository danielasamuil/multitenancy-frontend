const express = require("express");
const history = require("connect-history-api-fallback");
const app = express();
const staticFileMiddleware = express.static(__dirname + "/dist");
app.use(staticFileMiddleware);
app.use(history({ disableDotRule: true }));
app.use(staticFileMiddleware);
const port = process.env.PORT || 5000;
app.listen(port);
