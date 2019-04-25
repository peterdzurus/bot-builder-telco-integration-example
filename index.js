var express = require('express');
var app = express();

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

app.get('/url', (req, res, next) => {
  res.json(['Tony', 'Lisa', 'Michael', 'Ginger', 'Food']);
});

app.get('/render-test', (req, res, next) => {
  res.json({
    render: [
      {
        type: 'text',
        text: 'First integration mock text'
      }
    ]
  });
});

app.get('/airtable', (req, res, next) => {
  var Airtable = require('airtable');
  var base = new Airtable({ apiKey: 'keycjf3mEdHF1NPzx' }).base('appOpMipDmynu9Vwq');
  var user;
  
  base('CRM').find('recMmImJkgRtm5sQk', function(err, record) {
    if (err) {
      console.error(err);
      return;
    }

    res.json({
      render: [
        {
          type: 'text',
          text: 'name = ' + record.fields.Name,
        }
      ]
    });
  });
  
});
