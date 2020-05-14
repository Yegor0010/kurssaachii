var db = require('../core/db.js');
var httpMsg = require("../core/httpMessages");
var util = require("util");

exports.staffPositions = function(req, res){
    db.executeSql("select * from StaffPositions", function(data, err){
        if(err){
            httpMsg.show500(req, res, err);
        }
        else{
            // httpMsg.sendJson(req,resp,data);
            res.status(200).json(data);
        }
    });
};
exports.login = function(req, res, reqBody){
    try{
        console.log("exports.login -> reqBody", reqBody)
        if (reqBody) {
            var sql = `select * from StaffMembers where position_id=${reqBody.position_id} and staff_member_id=${reqBody.staff_member_id}`;
            
            db.executeSql(sql, function(data, err){
                if(err){
                    res.status(200).json({error: err});
                }
                else {
                    // httpMsg.sendJson(req,resp,data);
                    res.status(200).json(data);
                }
            });
            console.log('object2')
            
        }
        else{
            throw new Error("Input not valid!")
        }
    }
    catch(ex){
        console.log("exports.login -> ex", ex)
    }
};

exports.getList = function(req, resp){
    db.executeSql("select * from Worker", function(data, err){
        if(err){
            httpMsg.show500(req, resp, err);
        }
        else{
            httpMsg.sendJson(req,resp,data);
        }
    });
};

exports.getResList = function(req, resp){
    db.executeSql("", function(data, err){
        if(err){
            httpMsg.show500(req, resp, err);
        }
        else{
            httpMsg.sendJson(req,resp,data);
        }

    });
};

exports.getClientList = function(req, resp){
    db.executeSql("select * from Clients", function(data, err){
        if(err){
            httpMsg.show500(req, resp, err);
        }
        else{
            httpMsg.sendJson(req,resp,data);
        }
        

    });
};

exports.getConcProcList = function(req, resp){
    db.executeSql("select * from ProcedureType", function(data, err){
        if(err){
            httpMsg.show500(req, resp, err);
        }
        else{
            httpMsg.sendJson(req,resp,data);
        }
        

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
                
        
            });
        }
        else{
            throw new Error("Input not valid!")
        }
    }
    catch(ex){

    }
};

exports.addClient = function(req, resp, reqBody){
    try{
        if(!reqBody) throw new Error("Input not valid!");
        var data = JSON.parse(reqBody);
        console.log(data);
        if(data){
            var sql = "insert into Clients (PIB, Email, ClientAddress, PhoneNumber, Discount) values";
            sql+= util.format("('%s', '%s', '%s', %d, %d )", data.PIB, data.Email, data.ClientAddress, data.PhoneNumber, data.Discount);
            console.log(sql);
            
            db.executeSql(sql, function(data, err){
                if(err){
                    httpMsg.show500(req, resp, err);
                }
                else{
                    httpMsg.send200(req,resp);
                }
                
        
            });
        }
        else{
            throw new Error("Input not valid!")
        }
    }
    catch(ex){

    }
};

exports.addProcs = function(req, resp, reqBody){
    try{
        if(!reqBody) throw new Error("Input not valid!");
        var data = JSON.parse(reqBody);
        console.log(data);
        if(data){
            var sql = "insert into Procs (ReservationID, WorkerID, ConcreteProcID) values";
            sql+= util.format("(%d, %d, %d)", data.ReservationID, data.WorkerID, data.ConcreteProcID);
            console.log(sql);
            
            db.executeSql(sql, function(data, err){
                if(err){
                    httpMsg.show500(req, resp, err);
                }
                else{
                    httpMsg.send200(req,resp);
                }
                
        
            });
        }
        else{
            throw new Error("Input not valid!")
        }
    }
    catch(ex){

    }
};

exports.addReservation = function(req, resp, reqBody){
    try{
        if(!reqBody) throw new Error("Input not valid!");
        var data = JSON.parse(reqBody);
        console.log(data);
        if(data){
            var sql = "insert into Reservation (ID, ClientID, AgreementDate, AgreementTime, Price, StatusID, SalonID) values ";
            sql+= util.format("(%d, %d, '%s', '%s', %d, %d, %d )", data.ID, data.ClientID, data.AgreementDate, data.AgreementTime, data.Price, data.StatusID, data.SalonID);
            console.log(sql);
            
            db.executeSql(sql, function(data, err){
                if(err){
                    httpMsg.show500(req, resp, err);
                }
                else{
                    httpMsg.send200(req,resp);
                }
                
        
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
                
        
            });
        }
        else{
            throw new Error("Input not valid!")
        }
    }
    catch(ex){

    }
};

exports.updateClients = function(req, resp, reqBody){
    try{
        if(!reqBody) throw new Error("Input not valid!");
        var data = JSON.parse(reqBody);
        console.log(data.ID);
        if(data){
            if(!data.ID) throw new Error("Empty number")
            var sql = "update Clients set";
            var isDataProvided= false;
            if(data.PIB){
                sql+= " PIB = '" + data.PIB +"',";
                isDataProvided = true;
            }
            if(data.Email){
                sql+= " Email = " + data.Email +",";
                isDataProvided = true;
            }
            if(data.ClientAddress){
                sql+= " ClientAddress = " + data.ClientAddress +",";
                isDataProvided = true;
            }
            if(data.PhoneNumber){
                sql+= " PhoneNumber = '" + data.PhoneNumber +"',";
                isDataProvided = true;
            }
            if(data.Discount){
                sql+= " Discount = '" + data.Discount +"',";
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
                
        
            });
        }
        else{
            throw new Error("Input not valid!")
        }
    }
    catch(ex){

    }
};

exports.updateProcs = function(req, resp, reqBody){
    try{
        if(!reqBody) throw new Error("Input not valid!");
        var data = JSON.parse(reqBody);
        console.log(data.ReservationID);
        if(data){
            if(!data.ReservationID) throw new Error("Empty number")
            var sql = "update Procs set";
            var isDataProvided= false;
            if(data.ReservationID){
                sql+= " ReservationID = '" + data.ReservationID +"',";
                isDataProvided = true;
            }
            if(data.WorkerID){
                sql+= " WorkerID = " + data.WorkerID +",";
                isDataProvided = true;
            }
            if(data.ConcreteProcID){
                sql+= " ConcreteProcID = " + data.ConcreteProcID +",";
                isDataProvided = true;
            }
            sql = sql.slice(0, -1);

            sql += " where ReservationID = " + data.ReservationID;
            
            console.log(sql);
            
            db.executeSql(sql, function(data, err){
                if(err){
                    httpMsg.show500(req, resp, err);
                }
                else{
                    httpMsg.send200(req,resp);
                }
                
        
            });
        }
        else{
            throw new Error("Input not valid!")
        }
    }
    catch(ex){

    }
};

exports.updateReservations = function(req, resp, reqBody){
    try{
        if(!reqBody) throw new Error("Input not valid!");
        var data = JSON.parse(reqBody);
        console.log(data.ID);
        if(data){
            if(!data.ID) throw new Error("Empty number")
            var sql = "update Reservation set";
            var isDataProvided= false;
            if(data.ClientID){
                sql+= " ClientID = '" + data.ClientID +"',";
                isDataProvided = true;
            }
            if(data.AgreementDate){
                sql+= " AgreementDate = " + data.AgreementDate +",";
                isDataProvided = true;
            }
            if(data.AgreementTime){
                sql+= " AgreementTime = " + data.AgreementTime +",";
                isDataProvided = true;
            }
            if(data.Price){
                sql+= " Price = '" + data.Price +"',";
                isDataProvided = true;
            }
            if(data.StatusID){
                sql+= " StatusID = '" + data.StatusID +"',";
                isDataProvided = true;
            }
            if(data.SalonID){
                sql+= " SalonID = '" + data.SalonID +"',";
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
                
        
            });
        }
        else{
            throw new Error("Input not valid!")
        }
    }
    catch(ex){

    }
};

exports.deleteClients = function(req, resp, reqBody){
    try{
        if(!reqBody) throw new Error("Input not valid!");
        var data = JSON.parse(reqBody);
        console.log(data);
        
        if(data){
            
            if(!data.ID) throw new Error("Empty number")
            var sql = "delete from Clients";            

            sql += " where ID = " + data.ID;
            
            console.log(sql);
            
            db.executeSql(sql, function(data, err){
                if(err){
                    httpMsg.show500(req, resp, err);
                }
                else{
                    httpMsg.send200(req,resp);
                }
                
        
            });
        }
        else{
            throw new Error("Input not valid!")
        }
    }
    catch(ex){

    }
};

exports.deleteReservations = function(req, resp, reqBody){
    try{
        if(!reqBody) throw new Error("Input not valid!");
        var data = JSON.parse(reqBody);
        console.log(data);
        
        if(data){
            
            if(!data.ID) throw new Error("Empty number")
            var sql = "delete from Reservation";            

            sql += " where ID = " + data.ID;
            
            console.log(sql);
            
            db.executeSql(sql, function(data, err){
                if(err){
                    httpMsg.show500(req, resp, err);
                }
                else{
                    httpMsg.send200(req,resp);
                }
                
        
            });
        }
        else{
            throw new Error("Input not valid!")
        }
    }
    catch(ex){

    }
};

exports.deleteProcs = function(req, resp, reqBody){
    try{
        if(!reqBody) throw new Error("Input not valid!");
        var data = JSON.parse(reqBody);
        console.log(data);
        
        if(data){
            
            if(!data.ID) throw new Error("Empty number")
            var sql = "delete from Procs";            

            sql += " where ReservationID = " + data.ID;
            
            console.log(sql);
            
            db.executeSql(sql, function(data, err){
                if(err){
                    httpMsg.show500(req, resp, err);
                }
                else{
                    httpMsg.send200(req,resp);
                }
                
        
            });
        }
        else{
            throw new Error("Input not valid!")
        }
    }
    catch(ex){

    }
};