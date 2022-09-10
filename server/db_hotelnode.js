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
exports.putCheckOut = exports.putCheckin = exports.postUser = exports.loginUser = exports.putPass = exports.putAccount = exports.putUser = exports.getUser = exports.getUsers = exports.deleteRoom = exports.putRoom = exports.postRoom = exports.getRooms = void 0;
var mysql = require("mysql");
var util = require("util");
var conn = mysql.createConnection({
    host: 'localhost',
    user: 'user',
    password: 'Password!',
    database: 'hotel_system'
});
conn.connect();
var query = util.promisify(conn.query).bind(conn);
//---------------------------------------------ROOMS---------------------------------------
var getRooms = function () { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, query("SELECT room.id AS roomId, room.* , user.id, user.name, user.email, user.role FROM hotel_system.room LEFT JOIN hotel_system.user ON room.user_id = user.id")];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
exports.getRooms = getRooms;
var postRoom = function (values) { return __awaiter(void 0, void 0, void 0, function () {
    var isExist, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, query("SELECT * FROM room WHERE number IN ('".concat(values.join("\',\'"), "')"))];
            case 1:
                isExist = _a.sent();
                if (isExist.length > 0)
                    return [2 /*return*/, -1];
                return [4 /*yield*/, query("INSERT INTO room(number) VALUES ?", [values])];
            case 2:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
exports.postRoom = postRoom;
var putRoom = function (value) { return __awaiter(void 0, void 0, void 0, function () {
    var isExist, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, query("SELECT * FROM room WHERE number = '".concat(value.number, "'"))];
            case 1:
                isExist = _a.sent();
                if (isExist.length > 0)
                    return [2 /*return*/, -1];
                return [4 /*yield*/, query("UPDATE room SET number = '".concat(value.number, "' WHERE id = '").concat(value.id, "'"))];
            case 2:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
exports.putRoom = putRoom;
var deleteRoom = function (values) { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, query("DELETE FROM room WHERE id IN (".concat(values, ")"))];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
exports.deleteRoom = deleteRoom;
//-----------------------------------USERS-------------------------------------------
var getUsers = function () { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, query("SELECT * FROM user")];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
exports.getUsers = getUsers;
var getUser = function (user) { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, query("SELECT * FROM user WHERE id = '".concat(user.id, "'"))];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
exports.getUser = getUser;
var putUser = function (user) { return __awaiter(void 0, void 0, void 0, function () {
    var checkEmail, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, query("SELECT  * FROM user WHERE email = '".concat(user.email, "'"))];
            case 1:
                checkEmail = _a.sent();
                if (checkEmail.length > 0)
                    return [2 /*return*/, -1];
                return [4 /*yield*/, query("UPDATE user SET name = '".concat(user.name, "', email = '").concat(user.email, "', password = '").concat(user.password, "' WHERE id = '").concat(user.id, "'"))];
            case 2:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
exports.putUser = putUser;
//--------------------------------------------ACCOUNT---------------------------------------
var putAccount = function (user) { return __awaiter(void 0, void 0, void 0, function () {
    var checkEmail, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, query("SELECT  * FROM user WHERE email = '".concat(user.email, "'"))];
            case 1:
                checkEmail = _a.sent();
                if (checkEmail.length > 0)
                    return [2 /*return*/, -1];
                return [4 /*yield*/, query("UPDATE user SET name = '".concat(user.name, "', email = '").concat(user.email, "' WHERE id = '").concat(user.id, "'"))];
            case 2:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
exports.putAccount = putAccount;
var putPass = function (user) { return __awaiter(void 0, void 0, void 0, function () {
    var getInfo, resp, value, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, query("SELECT  * FROM user WHERE id = '".concat(user.id, "'"))];
            case 1:
                getInfo = _a.sent();
                resp = JSON.stringify(getInfo);
                value = JSON.parse(resp);
                if (value[0].password !== user.oldPass)
                    return [2 /*return*/, -1];
                return [4 /*yield*/, query("UPDATE user SET password = '".concat(user.newPass, "' WHERE id = '").concat(user.id, "'"))];
            case 2:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
exports.putPass = putPass;
//--------------------------------------------LOGIN---------------------------------------
var loginUser = function (values) { return __awaiter(void 0, void 0, void 0, function () {
    var user, isExist, value;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, query("SELECT * FROM user WHERE email = '".concat(values.email, "'"))];
            case 1:
                user = _a.sent();
                isExist = JSON.stringify(user);
                value = JSON.parse(isExist);
                if (user.length === 0)
                    return [2 /*return*/, 'Email is not exist!'];
                if (value[0].password !== values.password)
                    return [2 /*return*/, 'Password is invalid!'];
                return [2 /*return*/, user];
        }
    });
}); };
exports.loginUser = loginUser;
//-------------------------------------------------REGISTRATION----------------------------
var postUser = function (values) { return __awaiter(void 0, void 0, void 0, function () {
    var user, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, query("SELECT * FROM user WHERE email = '".concat(values.email, "'"))];
            case 1:
                user = _a.sent();
                if (user.length > 0)
                    return [2 /*return*/, -1];
                return [4 /*yield*/, query("INSERT INTO user(name, email, password, role) VALUES ('".concat(values.name, "','").concat(values.email, "','").concat(values.password, "', '").concat(values.role, "')"))];
            case 2:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
exports.postUser = postUser;
//-------------------------------------------------CHECKIN--------------------------------
var putCheckin = function (values) { return __awaiter(void 0, void 0, void 0, function () {
    var searchRoomId, isExist, value, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, query("SELECT * FROM room WHERE id = ".concat(values.room_id))];
            case 1:
                searchRoomId = _a.sent();
                isExist = JSON.stringify(searchRoomId);
                value = JSON.parse(isExist);
                if (searchRoomId.length === 0)
                    return [2 /*return*/, 0]; //room doesnt exist
                if (value[0].user_id !== null)
                    return [2 /*return*/, -1]; //room occupied
                return [4 /*yield*/, query("UPDATE room SET user_id = '".concat(values.user_id, "', day_stays = '").concat(values.day_stays, "', checkin = '").concat(values.checkin, "' WHERE id = '").concat(values.room_id, "'"))];
            case 2:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
exports.putCheckin = putCheckin;
//-------------------------------------------------CHECKOUT----------------------------
var putCheckOut = function (values) { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, query("UPDATE room SET user_id = NULL, day_stays = NULL, checkin = NULL WHERE id = '".concat(values.room_id, "'"))];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
exports.putCheckOut = putCheckOut;
