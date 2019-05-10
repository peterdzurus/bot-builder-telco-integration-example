var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var messages = require('./messages/types.js');
var _ = require('lodash');

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());

var Airtable = require('airtable');
var base = new Airtable({ apiKey: 'keycjf3mEdHF1NPzx' }).base('appOpMipDmynu9Vwq');

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

app.get('/order/status', (req, res, next) => {
  if (_.isEmpty(req.query)) {
    res.json(
      messages.plainText(
        `No order number was provided, therefore I am not able to find it in the database. :(`
      )
    );
  }

  console.log(`Params received: ${req.query.order}`)
  base('Orders')
    .select({
      view: 'Grid view'
    })
    .firstPage(function(err, records) {
      if (err) {
        console.error(err);
        return;
      }

      if (
        !records.some(function(record) {
          if (record.get('id') === req.query.order) {
            res.json(messages.plainText(`Order #${req.query.order} = ${record.get('status')}`));
            console.log(`Order found: ${record.get('id')}`)
            return true;
          }
        })
      ) {
        res.json(messages.plainText('Order not found.'));
      }
    });
});

app.post('/order/change-status', (req, res, next) => {
  console.log(req.body);
  res.json({});
});
