var http = require('http'), //This module provides the HTTP server functionalities
    path = require('path'), //The path module provides utilities for working with file and directory paths
    express = require('express'), //This module allows this app to respond to HTTP Requests, defines the routing and renders back the required content
    fs = require('fs'), //This module allows to work witht the file system: read and write files back
    xmlParse = require('xslt-processor').xmlParse, //This module allows us to work with XML files
    xsltProcess = require('xslt-processor').xsltProcess, //The same module allows us to utilise XSL Transformations
    xml2js = require('xml2js'),
    Ajv = require('ajv').default,
    ajv = new Ajv({allErrors: true}),
    validator = require('xsd-schema-validator'); //This module does XML to JSON conversion and also allows us to get from JSON back to XML

var router = express(); //We set our routing to be handled by Express
var server = http.createServer(router); //This is where our server gets created

router.use(express.static(__dirname)); //We define the views folder as the one where all static content will be served
router.use(express.urlencoded({extended: true})); //We allow the data sent from the client to be coming in as part of the URL in GET and POST requests
router.use(express.json()); //We include support for JSON that is coming from the client

// Function to read in XML file and convert it to JSON
function xmlFileToJs(filename, cb) {
  var filepath = path.normalize(path.join(__dirname, filename));
  fs.readFile(filepath, 'utf8', function(err, xmlStr) {
    if (err) throw (err);
    xml2js.parseString(xmlStr, {}, cb);
  });
}

//Function to convert JSON to XML and save it
function jsToXmlFile(filename, obj, cb) {
  var filepath = path.normalize(path.join(__dirname, filename));
  var builder = new xml2js.Builder();
  var xml = builder.buildObject(obj);
  fs.unlinkSync(filepath);
  fs.writeFile(filepath, xml, cb);
}

router.get('/', function(req, res) {

    res.sendFile(__dirname+'/views/index.html');

});

router.get('/get/html', function(req, res) {

    res.writeHead(200, {'Content-Type': 'text/html'}); //We are responding to the client that the content served back is HTML and the it exists (code 200)

    var xml = fs.readFileSync('xml/spa.xml', 'utf8'); //We are reading in the XML file
    var xsl = fs.readFileSync('xml/spa.xsl', 'utf8'); //We are reading in the XSL file

    var doc = xmlParse(xml); //Parsing our XML file
    var stylesheet = xmlParse(xsl); //Parsing our XSL file

    var result = xsltProcess(doc, stylesheet); //This does our XSL Transformation

    res.end(result.toString()); //Send the result back to the user, but convert to type string first

});

router.post('/post/json/addService', function (req, res) {

    function appendJSON(obj) {
        obj.add_price = parseFloat(obj.add_price)
        console.log(obj)
        var schema = fs.readFileSync(__dirname + "/jsons-schemas/addItem.schema.json", "utf-8")
        schema = JSON.parse(schema)
        var validate = ajv.compile(schema)
        if(validate(obj)){
            xmlFileToJs('xml/spa.xml', function (err, result) {
                if (err) throw (err);
                
                result.spa.services[0].entree.push({'item': obj.add_item, 'price': obj.add_price});

                console.log(JSON.stringify(result, null, "  "));

                jsToXmlFile('xml/spa.xml', result, function(err){
                    if (err) console.log(err);
                });
            });
            res.write('valid input')
        }
        else{
            res.write('invalid input')
        }
        res.end()
    };

    appendJSON(req.body);
    

});

router.post('/post/json/rmService', function(req,res){
    function appendJSON(obj){
        xmlFileToJs('xml/spa.xml', function (err, result) {
            error = false
            console.log(obj)
            var schema = fs.readFileSync(__dirname + "/jsons-schemas/rmItem.schema.json", "utf-8")
            schema = JSON.parse(schema)
            var validate = ajv.compile(schema)
            if(validate(obj)){
                if (err) throw (err);
                var item = obj.rm_item
                var confirmation = false
                var i = 0;
                while(confirmation == false){
                    try{
                        if(item == result.spa.services[0].entree[i].item){ 
                            result.spa.services[0].entree.splice(i,1)
                            confirmation = true
                        }
                    }
                    catch(e){
                        confirmation = true
                        error = true
                    }
                    i++
                }
                // console.log(JSON.stringify(result, null, "  "));
                jsToXmlFile('xml/spa.xml', result, function(err){
                    if (err) throw(err);
                });
                
            }
            else error = true

            if(error) res.write("invalid input!")
            else res.write("valid input!")

            res.end()
        })
    }
    appendJSON(req.body)
    
})

router.post('/post/json/editService')

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function () {
    var addr = server.address();
    console.log("Server listnening at", addr.address + ":" + addr.port);
});