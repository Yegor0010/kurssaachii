exports.show500 = function(req,resp,err){
    
    resp.writeHead(200,{"Content-Type": "application/json"});
    resp.write(JSON.stringify({data: "Error occupied:" + err}));
    resp.end(); 
}

exports.sendJson = function(req,resp, data){
    resp.writeHead(200,{"Content-Type": "application/json"});
    resp.write(JSON.stringify(data.recordset));
    resp.end();
}

exports.show405 = function(req,resp){
    resp.writeHead(405,{"Content-Type": "application/json"});
    resp.write(JSON.stringify({data: "Error occupied, metod not supported"}));
    resp.end();
}

exports.show404 = function(req,resp){
    resp.writeHead(405,{"Content-Type": "application/json"});
    resp.write(JSON.stringify({data: "Not found"}));
    resp.end();
}

exports.show413 = function(req,resp){
    resp.writeHead(413,{"Content-Type": "application/json"});
    resp.write(JSON.stringify({data: "Request too large"}));
    resp.end();
}

exports.show200 = function(req,resp){
    resp.writeHead(413,{"Content-Type": "application/json"});
    resp.write(JSON.stringify({data: "Success"}));
    resp.end();
}

exports.send200 = function(req,resp){
    resp.writeHead(200,{"Content-Type": "application/json"});
    resp.end();
}