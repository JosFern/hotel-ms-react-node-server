"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var http = require("http");
var url = require("url");
var db = require("./db_hotelnode.js");
http.createServer(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var link, headers, _a, result, addData_1, updateData_1, deleteData_1, _b, result, data_1, _c, params, user, result, data_2, data_3, data_4, data_5, data_6, err_1;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                link = url.parse(req.url, true);
                headers = {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': '*',
                    'Access-Control-Max-Age': 2592000,
                    'Content-Type': 'application/json'
                };
                _d.label = 1;
            case 1:
                _d.trys.push([1, 23, , 24]);
                if (!(link.pathname === '/rooms')) return [3 /*break*/, 9];
                _a = req.method;
                switch (_a) {
                    case 'GET': return [3 /*break*/, 2];
                    case 'POST': return [3 /*break*/, 4];
                    case 'OPTIONS': return [3 /*break*/, 5];
                    case 'PUT': return [3 /*break*/, 6];
                    case 'DELETE': return [3 /*break*/, 7];
                }
                return [3 /*break*/, 8];
            case 2: return [4 /*yield*/, db.getRooms()];
            case 3:
                result = _d.sent();
                res.writeHead(200, headers);
                res.end(JSON.stringify(result));
                return [3 /*break*/, 8];
            case 4:
                addData_1 = '';
                req.on('data', function (bufferData) {
                    addData_1 += bufferData;
                });
                req.on('end', function () { return __awaiter(void 0, void 0, void 0, function () {
                    var values, newRooms, i, number;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                values = JSON.parse(addData_1);
                                res.writeHead(200, headers);
                                newRooms = [];
                                for (i = 0; i < values.length; i++) {
                                    newRooms.push([values[i].room]);
                                }
                                return [4 /*yield*/, db.postRoom(newRooms)];
                            case 1:
                                number = _a.sent();
                                number === -1 ? res.writeHead(400, headers) : res.writeHead(200, headers);
                                res.write(JSON.stringify(number));
                                res.end();
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [3 /*break*/, 8];
            case 5:
                res.writeHead(200, headers);
                res.end();
                return [3 /*break*/, 8];
            case 6:
                updateData_1 = '';
                req.on('data', function (bufferData) {
                    updateData_1 += bufferData;
                });
                req.on('end', function () { return __awaiter(void 0, void 0, void 0, function () {
                    var values, editedRoom, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                values = JSON.parse(updateData_1);
                                editedRoom = {
                                    id: values.id,
                                    number: values.number
                                };
                                return [4 /*yield*/, db.putRoom(editedRoom)];
                            case 1:
                                result = _a.sent();
                                result === -1 ? res.writeHead(400, headers) : res.writeHead(200, headers);
                                res.write(JSON.stringify(result));
                                res.end();
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [3 /*break*/, 8];
            case 7:
                deleteData_1 = '';
                req.on('data', function (bufferData) {
                    deleteData_1 += bufferData;
                });
                req.on('end', function () { return __awaiter(void 0, void 0, void 0, function () {
                    var values, joinIds, i, result_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                values = JSON.parse(deleteData_1);
                                res.writeHead(200, {
                                    'Access-Control-Allow-Origin': '*',
                                    'Access-Control-Allow-Methods': '*',
                                    'Access-Control-Max-Age': 2592000,
                                    'Access-Control-Allow-Headers': '*',
                                    'Access-Control-Request-Headers': '*',
                                    'Content-Type': 'application/json'
                                });
                                joinIds = [];
                                for (i = 0; i < values.length; i++) {
                                    joinIds.push(values[i].room_id);
                                }
                                if (!(joinIds.length > 0)) return [3 /*break*/, 2];
                                return [4 /*yield*/, db.deleteRoom(joinIds.join())];
                            case 1:
                                result_1 = _a.sent();
                                res.write(JSON.stringify(result_1));
                                _a.label = 2;
                            case 2:
                                res.end();
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [3 /*break*/, 8];
            case 8: return [3 /*break*/, 22];
            case 9:
                if (!(link.pathname === '/users')) return [3 /*break*/, 15];
                _b = req.method;
                switch (_b) {
                    case 'GET': return [3 /*break*/, 10];
                    case 'OPTIONS': return [3 /*break*/, 12];
                    case 'PUT': return [3 /*break*/, 13];
                }
                return [3 /*break*/, 14];
            case 10: return [4 /*yield*/, db.getUsers()];
            case 11:
                result = _d.sent();
                res.writeHead(200, headers);
                res.end(JSON.stringify(result));
                return [3 /*break*/, 14];
            case 12:
                res.writeHead(200, headers);
                res.end();
                return [3 /*break*/, 14];
            case 13:
                data_1 = '';
                req.on('data', function (bufferData) {
                    data_1 += bufferData;
                });
                req.on('end', function () { return __awaiter(void 0, void 0, void 0, function () {
                    var values, user, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                values = JSON.parse(data_1);
                                user = {
                                    id: values.id,
                                    name: values.name,
                                    email: values.email,
                                    password: values.password
                                };
                                return [4 /*yield*/, db.putUser(user)];
                            case 1:
                                result = _a.sent();
                                result === -1 ? res.writeHead(400, headers) : res.writeHead(200, headers);
                                res.write(JSON.stringify(result));
                                res.end();
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [3 /*break*/, 14];
            case 14: return [3 /*break*/, 22];
            case 15:
                if (!(link.pathname === '/account')) return [3 /*break*/, 21];
                _c = req.method;
                switch (_c) {
                    case 'GET': return [3 /*break*/, 16];
                    case 'OPTIONS': return [3 /*break*/, 18];
                    case 'PUT': return [3 /*break*/, 19];
                }
                return [3 /*break*/, 20];
            case 16:
                res.writeHead(200, headers);
                params = new URLSearchParams(link.search);
                user = {
                    id: params.get('id')
                };
                return [4 /*yield*/, db.getUser(user)];
            case 17:
                result = _d.sent();
                res.write(JSON.stringify(result));
                res.end();
                return [3 /*break*/, 20];
            case 18:
                res.writeHead(200, headers);
                res.end();
                return [3 /*break*/, 20];
            case 19:
                data_2 = '';
                req.on('data', function (bufferData) {
                    data_2 += bufferData;
                });
                req.on('end', function () { return __awaiter(void 0, void 0, void 0, function () {
                    var values, accountUpdate, result_2, accountUpdate, result_3;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                values = JSON.parse(data_2);
                                if (!(values.changeType === 'password')) return [3 /*break*/, 2];
                                accountUpdate = {
                                    id: values.id,
                                    oldPass: values.oldPass,
                                    newPass: values.newPass
                                };
                                return [4 /*yield*/, db.putPass(accountUpdate)];
                            case 1:
                                result_2 = _a.sent();
                                result_2 === -1 ? res.writeHead(400, headers) : res.writeHead(200, headers);
                                res.write(JSON.stringify(result_2));
                                return [3 /*break*/, 4];
                            case 2:
                                accountUpdate = {
                                    id: values.id,
                                    name: values.name,
                                    email: values.email
                                };
                                return [4 /*yield*/, db.putAccount(accountUpdate)];
                            case 3:
                                result_3 = _a.sent();
                                result_3 === -1 ? res.writeHead(400, headers) : res.writeHead(200, headers);
                                res.write(JSON.stringify(result_3));
                                _a.label = 4;
                            case 4:
                                res.end();
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [3 /*break*/, 20];
            case 20: return [3 /*break*/, 22];
            case 21:
                if (link.pathname === '/registrations') {
                    switch (req.method) {
                        case 'POST':
                            data_3 = '';
                            req.on('data', function (bufferData) {
                                data_3 += bufferData;
                            });
                            req.on('end', function () { return __awaiter(void 0, void 0, void 0, function () {
                                var values, registered, user;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            values = JSON.parse(data_3);
                                            registered = {
                                                email: values.email,
                                                password: values.password,
                                                name: values.name,
                                                role: values.role
                                            };
                                            return [4 /*yield*/, db.postUser(registered)];
                                        case 1:
                                            user = _a.sent();
                                            user === -1 ? res.writeHead(400, headers) : res.writeHead(200, headers);
                                            res.write(JSON.stringify(user));
                                            res.end();
                                            return [2 /*return*/];
                                    }
                                });
                            }); });
                            break;
                    }
                }
                //-------------------------------------LOGIN-----------------------------------
                else if (link.pathname === '/login') {
                    switch (req.method) {
                        case 'POST':
                            data_4 = '';
                            req.on('data', function (bufferData) {
                                data_4 += bufferData;
                            });
                            req.on('end', function () { return __awaiter(void 0, void 0, void 0, function () {
                                var values, loginUser, login;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            values = JSON.parse(data_4);
                                            loginUser = {
                                                email: values.email,
                                                password: values.password
                                            };
                                            return [4 /*yield*/, db.loginUser(loginUser)];
                                        case 1:
                                            login = _a.sent();
                                            if (login === 'Email is not exist!') {
                                                res.writeHead(400, headers);
                                            }
                                            else if (login === 'Password is invalid!') {
                                                res.writeHead(400, headers);
                                            }
                                            else {
                                                res.writeHead(200, headers);
                                            }
                                            res.write(JSON.stringify(login));
                                            res.end();
                                            return [2 /*return*/];
                                    }
                                });
                            }); });
                            break;
                    }
                }
                //-------------------------------------CHECK IN-----------------------------------
                else if (link.pathname === '/check-in') {
                    switch (req.method) {
                        case 'POST': //checkin user
                            data_5 = '';
                            req.on('data', function (bufferData) {
                                data_5 += bufferData;
                            });
                            req.on('end', function () { return __awaiter(void 0, void 0, void 0, function () {
                                var values, roomCheckIn, result;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            values = JSON.parse(data_5);
                                            roomCheckIn = {
                                                room_id: values.room_id,
                                                user_id: values.user_id,
                                                day_stays: values.day_stays,
                                                checkin: values.checkin
                                            };
                                            return [4 /*yield*/, db.putCheckin(roomCheckIn)];
                                        case 1:
                                            result = _a.sent();
                                            if (result === 0) {
                                                res.writeHead(400, headers);
                                            }
                                            else if (result === -1) {
                                                res.writeHead(400, headers);
                                            }
                                            else {
                                                res.writeHead(200, headers);
                                            }
                                            res.write(JSON.stringify(result));
                                            res.end();
                                            return [2 /*return*/];
                                    }
                                });
                            }); });
                            break;
                    }
                }
                //-------------------------------------CHECK OUT-----------------------------------
                else if (link.pathname === '/check-out') {
                    switch (req.method) {
                        case 'OPTIONS':
                            res.writeHead(200, headers);
                            res.end();
                            break;
                        case 'PUT': //checkout user
                            data_6 = '';
                            req.on('data', function (bufferData) {
                                data_6 += bufferData;
                            });
                            req.on('end', function () { return __awaiter(void 0, void 0, void 0, function () {
                                var values, roomCheckOut, result;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            values = JSON.parse(data_6);
                                            res.writeHead(200, headers);
                                            roomCheckOut = {
                                                room_id: values.room_id
                                            };
                                            return [4 /*yield*/, db.putCheckOut(roomCheckOut)];
                                        case 1:
                                            result = _a.sent();
                                            res.write(JSON.stringify(result));
                                            res.end();
                                            return [2 /*return*/];
                                    }
                                });
                            }); });
                            break;
                    }
                }
                _d.label = 22;
            case 22: return [3 /*break*/, 24];
            case 23:
                err_1 = _d.sent();
                console.log(err_1);
                return [3 /*break*/, 24];
            case 24: return [2 /*return*/];
        }
    });
}); }).listen(8080);
