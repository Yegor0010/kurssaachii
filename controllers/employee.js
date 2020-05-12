var db = require('../core/db.js');
var httpMsg = require("../core/httpMessages");
var util = require("util");
let name =  "Kiril Bubka"
exports.getList = function(req, resp){
    db.executeSql("select * from Worker", function(data, err){
        if(err){
            httpMsg.show500(req, resp, err);
        }
        else{
            httpMsg.sendJson(req,resp,data);
        }
        resp.end();

    });
};

exports.getResList = function(req, resp){
    db.executeSql("select * from Reservation", function(data, err){
        if(err){
            httpMsg.show500(req, resp, err);
        }
        else{
            httpMsg.sendJson(req,resp,data);
        }
        resp.end();

    });
};

exports.get = function(req, resp, empno){
    db.executeSql("select * from Worker where ID =" + empno, function(data, err){
        if(err){
            httpMsg.show500(req, resp, err);
        }
        else{
            httpMsg.sendJson(req,resp,data);
        }
        resp.end();

    });
};

exports.add = function(req, resp, reqBody){
    try{
        if(!reqBody) throw new Error("Input not valid!");
        var data = JSON.parse(reqBody);
        console.log(data);
        if(data){
            var sql = "insert into Worker (WorkerName, PhoneNumber, CityID, Adress, Login, Password, SalonID) values";
            sql+= util.format("('%s', %d, %d, '%s', '%s', '%s', %d )", data.WorkerName, data.PhoneNumber, data.CityID, data.Adress, data.Login, data.Password, data.SalonID);
            console.log(sql);
            
            db.executeSql(sql, function(data, err){
                if(err){
                    httpMsg.show500(req, resp, err);
                }
                else{
                    httpMsg.send200(req,resp);
                }
                resp.end();
        
            });
        }
        else{
            throw new Error("Input not valid!")
        }
    }
    catch(ex){

    }
};

exports.update = function(req, resp, reqBody){
    try{
        if(!reqBody) throw new Error("Input not valid!");
        var data = JSON.parse(reqBody);
        console.log(data.ID);
        if(data){
            if(!data.ID) throw new Error("Empty number")
            var sql = "update Worker set";
            var isDataProvided= false;
            if(data.WorkerName){
                sql+= " WorkerName = '" + data.WorkerName +"',";
                isDataProvided = true;
            }
            if(data.PhoneNumber){
                sql+= " PhoneNumber = " + data.PhoneNumber +",";
                isDataProvided = true;
            }
            if(data.CityID){
                sql+= " CityID = " + data.CityID +",";
                isDataProvided = true;
            }
            if(data.Adress){
                sql+= " Adress = '" + data.Adress +"',";
                isDataProvided = true;
            }
            if(data.Login){
                sql+= " Login = '" + data.Login +"',";
                isDataProvided = true;
            }
            if(data.Password){
                sql+= " Password = '" + data.Password +"',";
                isDataProvided = true;
            }
            if(data.SalonID){
                sql+= " SalonID = " + data.SalonID +",";
                isDataProvided = true;
            }
            
            sql = sql.slice(0, -1);

            sql += " where ID = " + data.ID;
            
            console.log(sql);
            
            db.executeSql(sql, function(data, err){
                if(err){
                    httpMsg.show500(req, resp, err);
                }
                else{
                    httpMsg.send200(req,resp);
                }
                resp.end();
        
            });
        }
        else{
            throw new Error("Input not valid!")
        }
    }
    catch(ex){

    }
};

exports.delete = function(req, resp, reqBody){
    try{
        if(!reqBody) throw new Error("Input not valid!");
        var data = JSON.parse(reqBody);
        console.log(data);
        
        if(data){
            
            if(!data.ID) throw new Error("Empty number")
            var sql = "delete from Worker";            

            sql += " where ID = " + data.ID;
            
            console.log(sql);
            
            db.executeSql(sql, function(data, err){
                if(err){
                    httpMsg.show500(req, resp, err);
                }
                else{
                    httpMsg.send200(req,resp);
                }
                resp.end();
        
            });
        }
        else{
            throw new Error("Input not valid!")
        }
    }
    catch(ex){

    }
};