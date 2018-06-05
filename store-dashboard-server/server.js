const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const http = require('http')
const socketIO = require('socket.io')
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest
const xml2js = require('xml2js')
const parser = new xml2js.Parser();

let _sessionId;

// our localhost port
const port = 4001

const app = express()

// our server instance
const server = http.createServer(app)

const io = socketIO(server)


app.use(express.static(path.join(__dirname, 'build')))

app.use(bodyParser.urlencoded());
app.use(bodyParser.json())

let approvedRequests = []

app.get('/api/approval-required', (req, res) => {
  approvedRequests.push({ touchpointId: '001', approvalRequestId: '43626', isApproved: false})
  io.emit('io-approval-required', 
    {
      touchpointId: '001',
      approve: 'Void Transaction',
      balanceDue: 10.90,
      cashier: 'cashier1'
    }
  )
  res.send({ response: "I am alive" }).status(200)
})

app.post('/api/login', (req, res) => {
  var promise = new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest()
    xhr.open('POST', 'http://localhost/StoreWebServices/IdmLogin.rti', false)
    xhr.onreadystatechange = function() {
      var xmlDoc = this.responseText
      var sessionId
      parser.parseString(xmlDoc, function (err, result) {
        sessionId = result['IDMResponse']['Worker'][0]['SessionId']
      })
      
      if (sessionId != null) {
        // TODO: remove global _sessionId after saving the sessionId in the client and sending it at the header request
        _sessionId = sessionId[0]
        resolve(sessionId[0])
        // _sessionId = sessionId[0]
      }
    }
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    // TODO: should we send token in login request?
    xhr.setRequestHeader('token', _sessionId)

    var request = `<?xml version="1.0" encoding="utf-8"?> \
    <IDMRequest xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" \
                xmlns=\"http://www.nrf-arts.org/IXRetail/namespace/\" MajorVersion=\"1\" MinorVersion=\"0\" FixVersion=\"0\"> \
      <ARTSHeader><MessageID>1234</MessageID> \
        <BusinessUnit>5015</BusinessUnit> \
        <WorkstationID>001</WorkstationID> \
      </ARTSHeader> \
      <Worker Version=\"1.0\"><WorkerID>1</WorkerID> \
        <SecurityIdentifier TypeCode=\"UserName\">${req.body.username}</SecurityIdentifier> \
        <SecurityIdentifier TypeCode=\"Password\">${req.body.password}</SecurityIdentifier> \
      </Worker> \
    </IDMRequest>`

    xhr.send(request)
  })

  promise.then(sessionId => {
    res.send(JSON.stringify(sessionId))
  })
})

app.get('/api/touchpoints', (req, res) => {
  var promise = new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest()
    xhr.open('POST', 'http://localhost/StoreWebServices/TouchPointStatus.rti', false)
    xhr.onreadystatechange = function() {
      var xmlDoc = this.responseText
      var touchpoints
      parser.parseString(xmlDoc, function (err, result) {
        touchpoints = result['TouchPointStatusResponse']['TouchPointStatusData']
      })
      console.log('touchpoints: ' + touchpoints)
      resolve(touchpoints)
    }
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    // xhr.setRequestHeader('token', req.header.SessionId)
    xhr.setRequestHeader('token', _sessionId)

    var request = '<?xml version="1.0" encoding="utf-8"?> \
    <TouchPointStatusRequest xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns="http://retalix.com/R10/services"> \
      <Header> \
        <MessageId>123</MessageId> \
      </Header> \
      <StoreId>5015</StoreId> \
    </TouchPointStatusRequest>'
  
    xhr.send(request)
  })
  promise.then(touchpoints => {
    res.send(JSON.stringify(touchpoints))
  })
})

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', './../../store-dashboard/src/index.js'))
})

// This creates our socket using the instance of the server

// This is what the socket.io syntax is like, we will work this later
io.on('connection', socket => {
  console.log('User connected: ' + socket.id)
  
  socket.on('disconnect', () => {
    console.log('user disconnected: ' + socket.id)
  })

  socket.on('io-approved', () => {
    console.log('------- approved -------')
    console.log(approvedRequests[0])
  })
})

server.listen(port, () => console.log(`Listening on port ${port}`))
