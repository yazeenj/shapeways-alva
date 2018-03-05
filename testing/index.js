const http = require('http');
const fs = require('fs');
const url = require('url');
const shapeways = require('shapewaysnode-2018');

//Const & Variabels
const server_port = 1337;

//appOptions
/*
  Start by registering & creating your application at https://developers.shapeways.com/
*/
var appOptions = {
  client_id: "", //App client_id
  client_secret: "" //App client_secret
};

//Router @function
function onRequest(req, res){

  //Index-page
  if(req.url == "/"){
    res.writeHead(200, {'Content-Type': 'text/html'});

    //Read html-file
    fs.readFile('./index.html',null,function(err, data){
      if(err){
        res.writeHead(404);
        res.write('Page Not Found!');
      }else {
        res.write(data);
      }
      res.end();
    });
  }
  else if (req.url == "/authorize"){
    shapeways.authorize( appOptions, resp =>{
      res.writeHead(200, {"Content-Type": "application/json"});
      res.end(JSON.stringify(resp));
    });
  }
  else if (req.url == "/getmodels") {
    shapeways.getModels(function(err,resp){
      if(err){
        console.log("Fel hittat");
      }
      res.writeHead(200, {"Content-Type": "application/json"});
      res.end(JSON.stringify(resp));
    });

  }
  else if (req.url == "/getprinters") {
    shapeways.getPrinters(function(err,resp){
      if(err){
        res.writeHead(200, {"Content-Type": "application/json"});
        res.end(JSON.stringify(err));
      }
      res.writeHead(200, {"Content-Type": "application/json"});
      res.end(JSON.stringify(resp));
    });

  }
  else if (req.url == "/getmodelinfo") {
    //Replace 123456 modelId with your own modelId
    shapeways.getModelInfo(123456,function(err,resp){
      if(err){
        res.writeHead(200, {"Content-Type": "application/json"});
        res.end(JSON.stringify(err));
      }
      res.writeHead(200, {"Content-Type": "application/json"});
      res.end(JSON.stringify(resp));
    });

  }
  else if (req.url == "/addmodel"){
    fs.readFile("../3d_models/test_model.stl",function(err,data){
      if(err){
        console.log(err);
      }

     var params  = {file:data,
                    fileName:"uploadedModelTest.stl",
                    hasRightsToModel: 1,
                    acceptTermsAndConditions: 1,
                    isPublic: 1,
                    isForSale: 1
                };
        shapeways.addModel(params,function(err,resp){
          if(err){
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end(JSON.stringify(err));
          }
          res.writeHead(200, {"Content-Type": "application/json"});
          res.end(JSON.stringify(resp));
        });
      });
  }
  else if(req.url == "/addtocart"){

    var params = {
      modelId: 123456,
      materialId: 4,
      quantity: 1
    };

    shapeways.addToCart(params,function(err,resp){
      if(err){
        res.writeHead(200, {"Content-Type": "application/json"});
        res.end(JSON.stringify(err));
      }
      res.writeHead(200, {"Content-Type": "application/json"});
      res.end(JSON.stringify(resp));
    });

  }
  else if(req.url == "/deletemodel"){

    shapeways.deleteModel(123456, function(err,resp){
      if(err){
        res.writeHead(200, {"Content-Type": "application/json"});
        res.end(JSON.stringify(err));
      }
      res.writeHead(200, {"Content-Type": "application/json"});
      res.end(JSON.stringify(resp));
    });

  }
  else if(req.url == "/getcart"){

    shapeways.getCart( function(err,resp){
      if(err){
        res.writeHead(200, {"Content-Type": "application/json"});
        res.end(JSON.stringify(err));
      }
      res.writeHead(200, {"Content-Type": "application/json"});
      res.end(JSON.stringify(resp));
    });

  }
  else if(req.url == "/updatemodelinfo"){

    var params  = {
      description: "TestModel for API calls",
    };

    shapeways.updateModelInfo(123456, params, function(err,resp){
      if(err){
        res.writeHead(200, {"Content-Type": "application/json"});
        res.end(JSON.stringify(err));
      }
      res.writeHead(200, {"Content-Type": "application/json"});
      res.end(JSON.stringify(resp));
    });

  }
  else if(req.url == "/getmodelfile"){
    shapeways.getModelFile(123456,0,function(err,resp){
      if(err){
        res.writeHead(200, {"Content-Type": "application/json"});
        res.end(JSON.stringify(err));
      }
      res.writeHead(200, {"Content-Type": "application/json"});
      res.end(JSON.stringify(resp));
    });
  }
  else if(req.url == "/getorders"){
    shapeways.getOrders(function(err,resp){
      if(err){
        res.writeHead(200, {"Content-Type": "application/json"});
        res.end(JSON.stringify(err));
      }
      res.writeHead(200, {"Content-Type": "application/json"});
      res.end(JSON.stringify(resp));
    });
  }
  else if(req.url == "/getcategories"){
    shapeways.getCategories(function(err,resp){
      if(err){
        res.writeHead(200, {"Content-Type": "application/json"});
        res.end(JSON.stringify(err));
      }
      res.writeHead(200, {"Content-Type": "application/json"});
      res.end(JSON.stringify(resp));
    });
  }
  else if(req.url == "/getmaterials"){
    shapeways.getMaterials(function(err,resp){
      if(err){
        res.writeHead(200, {"Content-Type": "application/json"});
        res.end(JSON.stringify(err));
      }
      res.writeHead(200, {"Content-Type": "application/json"});
      res.end(JSON.stringify(resp));
    });
  }
  else if (req.url == "/addmodelphoto"){

      fs.readFile("../3d_models/test.jpg",function(err,data){
        if(err){
          cosole.log(err);
        }

       var params  = {file:data,
                      title: "phototest"
                  };

        shapeways.addModelPhoto(123456,params,function(err,resp){
          if(err){
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end(JSON.stringify(err));
          }
          res.writeHead(200, {"Content-Type": "application/json"});
          res.end(JSON.stringify(resp));
        });

      });
    }
  else {
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.end("Invaild request or this path deos not exist in the server.");
  }


}
//Create server & set the port
http.createServer(onRequest).listen(server_port);
console.log("Server is runing at http://localhost:" + server_port);
