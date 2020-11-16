const { Server } = require('http');
const finalhandler = require('finalhandler');

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
  'Access-Control-Allow-Headers': 'x-test,Content-Type,Accept,Access-Control-Allow-Headers'
};

const s = Server((req, res) => {
  console.log('url: ' + req.url);
  console.log('\nmethod: ' + req.method + '\n');
  if(req.url === '/result4/') {
    let jobj = {
      message: "id319887435",
      'x-result': req.headers['x-test']
    };
	
    let buffer = '';
    req.on('data', d => (buffer += d));
    req.on('end', () => {
      jobj['x-body'] = buffer;
      let strj =  jobj.stringify();
      console.log('strj = ' + strj + '\n');
      res.writeHead(200, { 'Contente-Type': 'application/json; charset=utf-8', ...CORS });
      res.end(strj);
    });
  } else {
    return finalhandler(req, res);
  }
});

s.listen(4321);
console.log('port = ' + process.env.PORT + '\n')
console.log('adr ' + s.address() + '\n');
console.log('prt ' + s.address().port + '\n');
