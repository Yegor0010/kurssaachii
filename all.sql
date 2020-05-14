SELECT p.id, p.rRoomTypeID, p.RoomStateId, p.Number, rs.state, rt.Description, rt.PersonsAmount,rt.PricePerNight FROM Rooms p
LEFT JOIN Bookings s ON s.RoomId = p.id
left join RoomState rs ON rs.Id = p.RoomStateId
left join RoomTypes rt ON rt.Id = p.rRoomTypeID
WHERE s.RoomId IS NULL and p.rRoomTypeID=4

insert into Guests(FullName, PhoneNumber, MailAddress)
values ('FullName', 'PhoneNumber', 'MailAddress');
insert into Booking(RoomTypeId, RoomId, bGuestId, personsCount, bokkedBy, dateTo, dateFrom, bookedDate)
values ('RoomTypeId', 'RoomId', 'bGuestId', 2, 123, 'dateTo','dateFrom','bookedDate');