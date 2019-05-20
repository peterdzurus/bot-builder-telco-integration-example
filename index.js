var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var messageType = require('./messages/types.js');
var _ = require('lodash');

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());

var Airtable = require('airtable');
var base = new Airtable({ apiKey: 'keycjf3mEdHF1NPzx' }).base('appOpMipDmynu9Vwq');

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

app.get('/order/:id/status', (req, res) => {
  if (_.isEmpty(req.params)) {
    res.json(
      messageType.plainText(
        `No order number was provided, therefore I am not able to find it in the database. :(`
      )
    );
    return;
  }

  var id = req.params.id;
  console.log(`Params received: ${id}`);
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
          if (record.get('id') === id) {
            res.json(messageType.plainText(`Order #${id} = ${record.get('status')}`));
            console.log(`Order found: ${record.get('id')}`);
            return true;
          }
        })
      ) {
        res.json(messageType.plainText('Order not found.'));
      }
    });
});

app.get('/user/:id/orders', (req, res) => {
  if (_.isEmpty(req.params)) {
    res.json(
      messageType.plainText(
        `No user id was provided, therefore I am not able to find it in the database. :(`
      )
    );
    return;
  }

  var id = req.params.id;
  var cards = [];
  console.log(`Params received: ${id}`);
  base('Orders')
    .select({
      view: 'Grid view',
      filterByFormula: `{customer_id} = ${id}`
    })
    .firstPage(function(err, records) {
      if (err) {
        console.error(err);
        return;
      }

      if (_.isEmpty(records)) {
        res.json(messageType.plainText(`You have no orders.`));
        return;
      } else {
        res.json(
          messageType.gallery(
            records.map(record => {
              return messageType.card(
                record.get('status'),
                record.get('value'),
                'http://www.drifting-media.com/assets/0311_img_folder/why-shop-online.jpg'
              );
            })
          )
        );
      }
    });
});

app.post('/user/:id', (req, res) => {
  if (_.isEmpty(req.params)) {
    res.json(
      messageType.plainText(
        `No user id was provided, therefore I am not able to find it in the database. :(`
      )
    );
    return;
  }

  var id = req.params.id;
  var recordId = '';
  console.log(`Params received: ${id}`);

  base('Customers')
    .select({
      view: 'Grid view',
      filterByFormula: `{id} = ${id}`
    })
    .firstPage(function(err, records) {
      if (err) {
        console.error(err);
        return;
      }

      if (_.isEmpty(records)) {
        res.json(messageType.plainText(`There is no user found with id: ${id}`));
        return;
      }

      recordId = records[0].id;
      console.log(`Updating record: ${recordId}`);
      console.log(`Changes: ${JSON.stringify(req.body.data)}`);
      
      base('Customers').update(
        recordId,
        {
          ...req.body.data
        },
        function(err, record) {
          if (err) {
            console.error(err);
            return;
          }

          console.log(record.get('email'));
          res.json(
            messageType.plainText(
              `Changes were successfully saved.\n Changes: ${JSON.stringify(req.body.data)}`
            )
          );
        }
      );
    });
});
