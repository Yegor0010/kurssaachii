var db = require('../core/db.js');
var httpMsg = require("../core/httpMessages");
var util = require("util");

exports.staffPositions = function(req, res){
    db.executeSql("select * from StaffPositions", function(data, err){
        if(err){
            httpMsg.show500(req, res, err);
        }
        else{
            res.status(200).json(data);
        }
    });
};
exports.login = function(req, res, reqBody){
    try{
        if (reqBody) {
            var sql = `select * from StaffMembers where position_id=${reqBody.position_id} and staff_member_id=${reqBody.staff_member_id}`;
            
            db.executeSql(sql, function(data, err){
                if(err){
                    res.status(200).json({error: err});
                }
                else {
                    res.status(200).json(data);
                }
            });
            
        }
        else{
            res.status(200).json({error: 'invalid body'});
        }
    }
    catch(ex){
        res.status(200).json(ex);
        console.log("exports.login -> ex", ex)
    }
};

exports.getRoomsTypes = function(req, res){
    try{
        db.executeSql(`select * from RoomTypes`, function(data, err){
            if(err){
                res.status(200).json(err);
            }
            else{
                res.status(200).json(data.recordset);
            }
        });
    } catch(ex){
        res.status(200).json(ex);
        console.log("exports.login -> ex", ex)
    }
}

exports.getAvailableRooms = function(req, res){
    try{
        if (req.body) {
            db.executeSql(`SELECT p.id, p.rRoomTypeID,
            p.RoomStateId, p.Number, rs.state, rt.Description, rt.PersonsAmount,rt.PricePerNight FROM Rooms p
            LEFT JOIN Bookings s ON s.RoomId = p.id
            left join RoomState rs ON rs.Id = p.RoomStateId
            left join RoomTypes rt ON rt.Id = p.rRoomTypeID
            WHERE s.RoomId IS NULL and p.rRoomTypeID=${req.body.RoomType}`, function(data, err){
                if(err){
                    res.status(200).json(err);
                }
                else{
                    res.status(200).json(data.recordset);
                }
            });
        }
    } catch(ex){
        res.status(200).json(ex);
        console.log("exports.login -> ex", ex)
    }
};

exports.getAllRooms = function(req, res){
    try{
        if (req.body) {
            db.executeSql(`SELECT p.id, p.rRoomTypeID,
            p.RoomStateId, rs.state,rs.Id as stateId, p.Description, rt.PersonsAmount, rt.PricePerNight FROM Rooms p
            LEFT JOIN Bookings s ON s.RoomId = p.id
            left join RoomState rs ON rs.Id = p.RoomStateId
            left join RoomTypes rt ON rt.Id = p.rRoomTypeID`, function(data, err){
                if(err){
                    res.status(200).json(err);
                }
                else{
                    res.status(200).json(data.recordset);
                }
            });
        }
    } catch(ex){
        res.status(200).json(ex);
        console.log("exports.login -> ex", ex)
    }
};

exports.getRoomsStates = function(req, res){
    try{
        db.executeSql(`SELECT * from RoomState`, function(data, err){
            if(err){
                res.status(200).json(err);
            }
            else{
                res.status(200).json(data.recordset);
            }
        });
    } catch(ex){
        res.status(200).json(ex);
        console.log("exports.login -> ex", ex)
    }
};

exports.updateRoom = function(req, res){
    try{
        if (req.body) {
            console.log(`UPDATE Rooms SET Description=${req.body.Description}, RoomStateId=${req.body.RoomStateId} where id=${req.body.id}`);
            db.executeSql(`UPDATE Rooms SET Description='${req.body.Description}', RoomStateId=${req.body.RoomStateId} where id=${req.body.id}`, function(data, err){
                if(err){
                    res.status(200).json(err);
                }
                else{
                    res.status(200).json(data);
                }
            });
        }
    } catch(ex){
        res.status(200).json(ex);
        console.log("exports.login -> ex", ex)
    }
};

exports.postGuest = function(req, res) {
    try{
        if (req.body) {
            db.executeSql(`insert into Guests(FullName, PhoneNumber, MailAddress)
            values ('${req.body.FullName}', '${req.body.PhoneNumber}', '${req.body.MailAddress}');
            `, function(data, err){
                if(err){
                    res.status(200).json(err);
                }
                else {

                    res.status(200).json(data.recordset);
                }
            });
        }
    } catch(ex){
        res.status(200).json(ex);
        console.log("exports.login -> ex", ex)
    }
};

exports.formBooking = function(data) {
    try{
        if (req.body) {
            db.executeSql(`insert into Guests(FullName, PhoneNumber, MailAddress)
            values ('${req.body.FullName}', '${req.body.PhoneNumber}', '${req.body.MailAddress}')`, function(data, err){
                if(err){
                    res.status(200).json(err);
                }
                else {
                    res.status(200).json(data.recordset);
                }
            });
        }
    } catch(ex){
        res.status(200).json(ex);
        console.log("exports.login -> ex", ex)
    }
}

exports.getAllBookings = function(req, res) {
    try{
        console.log("exports.getAllBookings -> select * from Bookings", `select * from Bookings`)
        db.executeSql(`select * from Bookings`, function(data, err){
            if(err){
                res.status(200).json(err);
            }
            else {

                res.status(200).json(data.recordset);
            }
        });
    } catch(ex){
        res.status(200).json(ex);
        console.log("exports.login -> ex", ex)
    }
};

