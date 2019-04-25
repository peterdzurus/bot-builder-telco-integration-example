var express = require("express");
var app = express();

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'));
});

app.get("/url", (req, res, next) => {
  res.json(["Tony","Lisa","Michael","Ginger","Food"]);
});
