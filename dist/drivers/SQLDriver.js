"use strict";
/*
* Driver for MySQL
*/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = require("dotenv");
dotenv.config();
var mysql = require("mysql2");
var User_1 = require("../models/User");
exports.TABLES = {
    ACCOUNT_HISTORY: 'account_history',
    COMPLETED: 'completed',
    CREDITS: 'credits',
    DISHES: 'dishes',
    FRIENDS: 'friends',
    IMAGES: 'images',
    OPTIONS: 'options',
    PLAYER_LEVEL: 'player_level',
    PROMPTS: 'prompts',
    REACTIONS: 'reactions',
    SCORES: 'scores',
    STEPS: 'steps',
    USERS: 'users',
    USER_ROLES: 'user_roles',
    XP_REWARDS: 'xp_reward',
};
var SQLDriver = /** @class */ (function () {
    function SQLDriver() {
        var config = {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            multipleStatements: true,
            ssl: true,
        };
        this.connect(config);
    }
    /**
     * Establishes connection to MySQL Server
     *
     * @param {MySQLConfig} config
     * @returns {Promise<void>}
     * @memberof SQLDriver
     */
    SQLDriver.prototype.connect = function (config) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = this;
                        return [4 /*yield*/, mysql.createConnection(config)];
                    case 1:
                        _a.db = _b.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _b.sent();
                        return [2 /*return*/, Promise.reject(e_1)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Ends connection to MySQLServer
     *
     * @returns {Promise<void>}
     * @memberof SQLDriver
     */
    SQLDriver.prototype.disconnect = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.db.end()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        e_2 = _a.sent();
                        return [2 /*return*/, Promise.reject(e_2)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Inserts new User, Account History, and adds User to User Roles
     *
     * @param {string} username
     * @param {string} password
     * @returns {Promise<User>}
     * @memberof SQLDriver
     */
    SQLDriver.prototype.addUser = function (username, password) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var createdDate_1, id, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        createdDate_1 = Date.now().toString();
                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                _this.db.query("INSERT INTO " + exports.TABLES.USERS + " (username, password, total_xp) VALUES ('" + username + "', '" + password + "', " + User_1.START_XP + ");\n        INSERT INTO " + exports.TABLES.ACCOUNT_HISTORY + " (user_id, created_on, last_signed_on) VALUES (LAST_INSERT_ID(), '" + createdDate_1 + "', '" + createdDate_1 + "');\n        INSERT INTO " + exports.TABLES.USER_ROLES + " (user_id, role) VALUES (LAST_INSERT_ID(), '" + User_1.UserRoles.Player + "');", function (e, results, fields) {
                                    if (e) {
                                        reject(e);
                                    }
                                    resolve(results);
                                });
                            })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.findUser(username)];
                    case 2:
                        id = _a.sent();
                        return [4 /*yield*/, this.fetchUser(id)];
                    case 3: return [2 /*return*/, _a.sent()];
                    case 4:
                        e_3 = _a.sent();
                        return [2 /*return*/, Promise.reject(e_3)];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Fetches ID of User
     *
     * @param {string} username
     * @returns {Promise<string>}
     * @memberof SQLDriver
     */
    SQLDriver.prototype.findUser = function (username) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var row, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                _this.db.query("SELECT " + exports.TABLES.USERS + ".id FROM " + exports.TABLES.USERS + " WHERE username='" + username + "'", function (e, results, fields) {
                                    if (e) {
                                        reject(e);
                                    }
                                    if (results) {
                                        resolve(results[0]);
                                    }
                                    else {
                                        reject('No result from query');
                                    }
                                });
                            })];
                    case 1:
                        row = _a.sent();
                        if (row) {
                            return [2 /*return*/, row.id];
                        }
                        return [2 /*return*/, row];
                    case 2:
                        e_4 = _a.sent();
                        return [2 /*return*/, Promise.reject(e_4)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Fetches all Users
     *
     * @param {string} username
     * @returns {Promise<User[]>}
     * @memberof SQLDriver
     */
    SQLDriver.prototype.fetchUsers = function (username) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var query_1, rows, users, rows_1, rows_1_1, row, user, e_5_1, e_6, e_5, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 10, , 11]);
                        query_1 = "SELECT " + exports.TABLES.USERS + ".id, " + exports.TABLES.USERS + ".username, " + exports.TABLES.USERS + ".password, " + exports.TABLES.USERS + ".total_xp, " + exports.TABLES.USER_ROLES + ".role FROM " + exports.TABLES.USERS + " INNER JOIN " + exports.TABLES.USER_ROLES + " ON " + exports.TABLES.USERS + ".id=" + exports.TABLES.USER_ROLES + ".user_id";
                        if (username) {
                            query_1 += " AND " + exports.TABLES.USERS + ".username LIKE '%" + username + "%'";
                        }
                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                _this.db.query(query_1, function (e, results, fields) {
                                    if (e) {
                                        reject(e);
                                    }
                                    if (results) {
                                        resolve(results);
                                    }
                                    else {
                                        reject('No result from query');
                                    }
                                });
                            })];
                    case 1:
                        rows = _b.sent();
                        users = [];
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 7, 8, 9]);
                        rows_1 = __values(rows), rows_1_1 = rows_1.next();
                        _b.label = 3;
                    case 3:
                        if (!!rows_1_1.done) return [3 /*break*/, 6];
                        row = rows_1_1.value;
                        return [4 /*yield*/, this.generateUser(row)];
                    case 4:
                        user = _b.sent();
                        users.push(user);
                        _b.label = 5;
                    case 5:
                        rows_1_1 = rows_1.next();
                        return [3 /*break*/, 3];
                    case 6: return [3 /*break*/, 9];
                    case 7:
                        e_5_1 = _b.sent();
                        e_5 = { error: e_5_1 };
                        return [3 /*break*/, 9];
                    case 8:
                        try {
                            if (rows_1_1 && !rows_1_1.done && (_a = rows_1.return)) _a.call(rows_1);
                        }
                        finally { if (e_5) throw e_5.error; }
                        return [7 /*endfinally*/];
                    case 9: return [2 /*return*/, users];
                    case 10:
                        e_6 = _b.sent();
                        return [2 /*return*/, Promise.reject(e_6)];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Fetches User
     *
     * @param {string} id
     * @returns {Promise<User>}
     * @memberof SQLDriver
     */
    SQLDriver.prototype.fetchUser = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var row, user, e_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                _this.db.query("SELECT " + exports.TABLES.USERS + ".id, " + exports.TABLES.USERS + ".username, " + exports.TABLES.USERS + ".password, " + exports.TABLES.USERS + ".total_xp, " + exports.TABLES.USER_ROLES + ".role FROM " + exports.TABLES.USERS + " INNER JOIN " + exports.TABLES.USER_ROLES + " ON " + exports.TABLES.USERS + ".id=" + exports.TABLES.USER_ROLES + ".user_id AND " + exports.TABLES.USERS + ".id=" + id, function (e, results, fields) {
                                    if (e) {
                                        reject(e);
                                    }
                                    if (results) {
                                        resolve(results[0]);
                                    }
                                    else {
                                        reject('No result from query');
                                    }
                                });
                            })];
                    case 1:
                        row = _a.sent();
                        return [4 /*yield*/, this.generateUser(row)];
                    case 2:
                        user = _a.sent();
                        return [2 /*return*/, user];
                    case 3:
                        e_7 = _a.sent();
                        return [2 /*return*/, Promise.reject(e_7)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Fetches User's Account History
     *
     * @private
     * @param {string} userid
     * @returns {Promise<AccountHistory>}
     * @memberof SQLDriver
     */
    SQLDriver.prototype.fetchAccountHistory = function (userid) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var row, history_1, e_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                _this.db.query("SELECT " + exports.TABLES.ACCOUNT_HISTORY + ".created_on, " + exports.TABLES.ACCOUNT_HISTORY + ".last_signed_on FROM " + exports.TABLES.ACCOUNT_HISTORY + " WHERE " + exports.TABLES.ACCOUNT_HISTORY + ".user_id=" + userid, function (e, results, fields) {
                                    if (e) {
                                        reject(e);
                                    }
                                    if (results) {
                                        resolve(results[0]);
                                    }
                                    else {
                                        reject('No result from query');
                                    }
                                });
                            })];
                    case 1:
                        row = _a.sent();
                        history_1 = {
                            createdOn: row.created_on,
                            lastSignedOn: row.last_signed_on,
                        };
                        return [2 /*return*/, history_1];
                    case 2:
                        e_8 = _a.sent();
                        return [2 /*return*/, Promise.reject(e_8)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Updates last sign on time
     *
     * @param {string} id
     * @returns {Promise<void>}
     * @memberof SQLDriver
     */
    SQLDriver.prototype.updateLastSignOn = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var signOnTime_1, e_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        signOnTime_1 = Date.now().toString();
                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                _this.db.query("UPDATE " + exports.TABLES.ACCOUNT_HISTORY + " SET " + exports.TABLES.ACCOUNT_HISTORY + ".last_signed_on=" + signOnTime_1 + " WHERE " + exports.TABLES.ACCOUNT_HISTORY + ".user_id=" + id, function (e, results, fields) {
                                    if (e) {
                                        reject(e);
                                    }
                                    if (results) {
                                        resolve(results);
                                    }
                                    else {
                                        reject('No result from query');
                                    }
                                });
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        e_9 = _a.sent();
                        return [2 /*return*/, Promise.reject(e_9)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Fetches User's Completion history
     *
     * @private
     * @param {string} userid
     * @returns {Promise<Completed[]>}
     * @memberof SQLDriver
     */
    SQLDriver.prototype.fetchCompleted = function (userid) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var rows, completed, rows_2, rows_2_1, row, completion, _a, e_10_1, e_11, e_10, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 10, , 11]);
                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                _this.db.query("SELECT " + exports.TABLES.COMPLETED + ".dish_id, " + exports.TABLES.COMPLETED + ".score_id FROM " + exports.TABLES.COMPLETED + " WHERE " + exports.TABLES.COMPLETED + ".user_id=" + userid, function (e, results, fields) {
                                    if (e) {
                                        reject(e);
                                    }
                                    if (results) {
                                        resolve(results);
                                    }
                                    else {
                                        reject('No result from query');
                                    }
                                });
                            })];
                    case 1:
                        rows = _c.sent();
                        completed = [];
                        _c.label = 2;
                    case 2:
                        _c.trys.push([2, 7, 8, 9]);
                        rows_2 = __values(rows), rows_2_1 = rows_2.next();
                        _c.label = 3;
                    case 3:
                        if (!!rows_2_1.done) return [3 /*break*/, 6];
                        row = rows_2_1.value;
                        _a = {
                            dishID: row.dish_id
                        };
                        return [4 /*yield*/, this.fetchScore(row.score_id)];
                    case 4:
                        completion = (_a.score = _c.sent(),
                            _a);
                        completed.push(completion);
                        _c.label = 5;
                    case 5:
                        rows_2_1 = rows_2.next();
                        return [3 /*break*/, 3];
                    case 6: return [3 /*break*/, 9];
                    case 7:
                        e_10_1 = _c.sent();
                        e_10 = { error: e_10_1 };
                        return [3 /*break*/, 9];
                    case 8:
                        try {
                            if (rows_2_1 && !rows_2_1.done && (_b = rows_2.return)) _b.call(rows_2);
                        }
                        finally { if (e_10) throw e_10.error; }
                        return [7 /*endfinally*/];
                    case 9: return [2 /*return*/, completed];
                    case 10:
                        e_11 = _c.sent();
                        return [2 /*return*/, Promise.reject(e_11)];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Fetches Score related to Completion
     *
     * @private
     * @param {string} scoreID
     * @returns {Promise<number>}
     * @memberof SQLDriver
     */
    SQLDriver.prototype.fetchScore = function (scoreID) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var row, score, e_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                _this.db.query("SELECT " + exports.TABLES.SCORES + ".score FROM " + exports.TABLES.SCORES + " WHERE " + exports.TABLES.SCORES + ".id=" + scoreID, function (e, results, fields) {
                                    if (e) {
                                        reject(e);
                                    }
                                    if (results) {
                                        resolve(results[0]);
                                    }
                                    else {
                                        reject('No result from query');
                                    }
                                });
                            })];
                    case 1:
                        row = _a.sent();
                        score = +row.score;
                        return [2 /*return*/, score];
                    case 2:
                        e_12 = _a.sent();
                        return [2 /*return*/, Promise.reject(e_12)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Fetchs Player Level by XP
     *
     * @private
     * @param {number} xp
     * @returns {Promise<PlayerLevel>}
     * @memberof SQLDriver
     */
    SQLDriver.prototype.fetchPlayerLevel = function (xp) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var row_1, row2, level, e_13;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                _this.db.query("SELECT " + exports.TABLES.PLAYER_LEVEL + ".level_num, " + exports.TABLES.PLAYER_LEVEL + ".level_name, " + exports.TABLES.PLAYER_LEVEL + ".description FROM " + exports.TABLES.PLAYER_LEVEL + " WHERE " + exports.TABLES.PLAYER_LEVEL + ".xp <= " + xp + " ORDER BY " + exports.TABLES.PLAYER_LEVEL + ".xp DESC", function (e, results, fields) {
                                    if (e) {
                                        reject(e);
                                    }
                                    if (results) {
                                        resolve(results[0]);
                                    }
                                    else {
                                        reject('No result from query');
                                    }
                                });
                            })];
                    case 1:
                        row_1 = _a.sent();
                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                _this.db.query("SELECT " + exports.TABLES.PLAYER_LEVEL + ".xp, " + exports.TABLES.PLAYER_LEVEL + ".level_num, " + exports.TABLES.PLAYER_LEVEL + ".level_name, " + exports.TABLES.PLAYER_LEVEL + ".description FROM " + exports.TABLES.PLAYER_LEVEL + " WHERE " + exports.TABLES.PLAYER_LEVEL + ".level_num = " + +row_1.level_num + " + 1", function (e, results, fields) {
                                    if (e) {
                                        reject(e);
                                    }
                                    if (results) {
                                        resolve(results[0]);
                                    }
                                    else {
                                        reject('No result from query');
                                    }
                                });
                            })];
                    case 2:
                        row2 = _a.sent();
                        level = {
                            name: row_1.level_name,
                            number: +row_1.level_num,
                            description: row_1.description,
                            nextLevel: row2
                                ? {
                                    name: row2.level_name,
                                    number: +row2.level_num,
                                    description: row2.description,
                                    xpNeeded: +row2.xp,
                                }
                                : undefined,
                        };
                        return [2 /*return*/, level];
                    case 3:
                        e_13 = _a.sent();
                        return [2 /*return*/, Promise.reject(e_13)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Fetches User's Friends
     *
     * @param {string} userID
     * @returns {Promise<User[]>}
     * @memberof SQLDriver
     */
    SQLDriver.prototype.fecthFriends = function (userID) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var rows, friends, rows_3, rows_3_1, row, friend, e_14_1, e_15, e_14, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 10, , 11]);
                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                _this.db.query("SELECT " + exports.TABLES.FRIENDS + ".player_id FROM " + exports.TABLES.FRIENDS + " WHERE " + exports.TABLES.FRIENDS + ".user_id=" + userID, function (e, results, fields) {
                                    if (e) {
                                        reject(e);
                                    }
                                    if (results) {
                                        resolve(results);
                                    }
                                    else {
                                        reject('No result from query');
                                    }
                                });
                            })];
                    case 1:
                        rows = _b.sent();
                        friends = [];
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 7, 8, 9]);
                        rows_3 = __values(rows), rows_3_1 = rows_3.next();
                        _b.label = 3;
                    case 3:
                        if (!!rows_3_1.done) return [3 /*break*/, 6];
                        row = rows_3_1.value;
                        return [4 /*yield*/, this.fetchUser(row.player_id)];
                    case 4:
                        friend = _b.sent();
                        friends.push(friend);
                        _b.label = 5;
                    case 5:
                        rows_3_1 = rows_3.next();
                        return [3 /*break*/, 3];
                    case 6: return [3 /*break*/, 9];
                    case 7:
                        e_14_1 = _b.sent();
                        e_14 = { error: e_14_1 };
                        return [3 /*break*/, 9];
                    case 8:
                        try {
                            if (rows_3_1 && !rows_3_1.done && (_a = rows_3.return)) _a.call(rows_3);
                        }
                        finally { if (e_14) throw e_14.error; }
                        return [7 /*endfinally*/];
                    case 9: return [2 /*return*/, friends];
                    case 10:
                        e_15 = _b.sent();
                        return [2 /*return*/, Promise.reject(e_15)];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Adds Friend to user
     *
     * @param {string} userID
     * @param {string} playerID
     * @returns {Promise<User[]>}
     * @memberof SQLDriver
     */
    SQLDriver.prototype.addFriend = function (userID, playerID) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var friends, e_16;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                _this.db.query("INSERT INTO " + exports.TABLES.FRIENDS + " (user_id, player_id) VALUES (" + userID + ", " + playerID + ")", function (e, results, fields) {
                                    if (e) {
                                        reject(e);
                                    }
                                    if (results) {
                                        resolve(results);
                                    }
                                    else {
                                        reject('No result from query');
                                    }
                                });
                            })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.fecthFriends(userID)];
                    case 2:
                        friends = _a.sent();
                        return [2 /*return*/, friends];
                    case 3:
                        e_16 = _a.sent();
                        return [2 /*return*/, Promise.reject(e_16)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Removes Friend from User
     *
     * @param {string} userID
     * @param {string} playerID
     * @returns {Promise<User[]>}
     * @memberof SQLDriver
     */
    SQLDriver.prototype.removeFriend = function (userID, playerID) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var friends, e_17;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                _this.db.query("DELETE FROM " + exports.TABLES.FRIENDS + " WHERE " + exports.TABLES.FRIENDS + ".user_id=" + userID + " AND " + exports.TABLES.FRIENDS + ".player_id=" + playerID, function (e, results, fields) {
                                    if (e) {
                                        reject(e);
                                    }
                                    if (results) {
                                        resolve(results);
                                    }
                                    else {
                                        reject('No result from query');
                                    }
                                });
                            })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.fecthFriends(userID)];
                    case 2:
                        friends = _a.sent();
                        return [2 /*return*/, friends];
                    case 3:
                        e_17 = _a.sent();
                        return [2 /*return*/, Promise.reject(e_17)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Fetches all Dishes
     *
     * @returns {Promise<Dish[]>}
     * @memberof SQLDriver
     */
    SQLDriver.prototype.fetchDishes = function (difficulty) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var query_2, rows, dishes, rows_4, rows_4_1, row, dish, e_18_1, e_19, e_18, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 10, , 11]);
                        query_2 = "SELECT * FROM " + exports.TABLES.DISHES;
                        if (difficulty) {
                            query_2 += " WHERE " + exports.TABLES.DISHES + ".difficulty='" + difficulty + "'";
                        }
                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                _this.db.query(query_2, function (e, results, fields) {
                                    if (e) {
                                        reject(e);
                                    }
                                    if (results) {
                                        resolve(results);
                                    }
                                    else {
                                        reject('No result from query');
                                    }
                                });
                            })];
                    case 1:
                        rows = _b.sent();
                        dishes = [];
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 7, 8, 9]);
                        rows_4 = __values(rows), rows_4_1 = rows_4.next();
                        _b.label = 3;
                    case 3:
                        if (!!rows_4_1.done) return [3 /*break*/, 6];
                        row = rows_4_1.value;
                        return [4 /*yield*/, this.generateDish(row)];
                    case 4:
                        dish = _b.sent();
                        dishes.push(dish);
                        _b.label = 5;
                    case 5:
                        rows_4_1 = rows_4.next();
                        return [3 /*break*/, 3];
                    case 6: return [3 /*break*/, 9];
                    case 7:
                        e_18_1 = _b.sent();
                        e_18 = { error: e_18_1 };
                        return [3 /*break*/, 9];
                    case 8:
                        try {
                            if (rows_4_1 && !rows_4_1.done && (_a = rows_4.return)) _a.call(rows_4);
                        }
                        finally { if (e_18) throw e_18.error; }
                        return [7 /*endfinally*/];
                    case 9: return [2 /*return*/, dishes];
                    case 10:
                        e_19 = _b.sent();
                        return [2 /*return*/, Promise.reject(e_19)];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Fetches Dish by ID
     *
     * @param {string} id
     * @returns {Promise<Dish>}
     * @memberof SQLDriver
     */
    SQLDriver.prototype.fetchDish = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var rows, dish, e_20;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                _this.db.query("SELECT " + exports.TABLES.DISHES + ".id, " + exports.TABLES.DISHES + ".name, " + exports.TABLES.DISHES + ".difficulty, " + exports.TABLES.DISHES + ".unlocked_at FROM " + exports.TABLES.DISHES + " WHERE " + exports.TABLES.DISHES + ".id =" + id, function (e, results, fields) {
                                    if (e) {
                                        reject(e);
                                    }
                                    if (results) {
                                        resolve(results);
                                    }
                                    else {
                                        reject('No result from query');
                                    }
                                });
                            })];
                    case 1:
                        rows = _a.sent();
                        dish = this.generateDish(rows, true);
                        return [2 /*return*/, dish];
                    case 2:
                        e_20 = _a.sent();
                        return [2 /*return*/, Promise.reject(e_20)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Fetches Steps associated with Dish
     *
     * @private
     * @param {string} dishID
     * @returns {Promise<RecipeStep[]>}
     * @memberof SQLDriver
     */
    SQLDriver.prototype.fetchRecipeSteps = function (dishID) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var rows, steps_1, aggregateSteps, rows_5, rows_5_1, row, index, step, option, e_21_1, e_22, e_21, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 10, , 11]);
                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                _this.db.query("SELECT " + exports.TABLES.STEPS + ".execution_order, " + exports.TABLES.STEPS + ".is_correct, " + exports.TABLES.STEPS + ".option_id FROM " + exports.TABLES.STEPS + " WHERE " + exports.TABLES.STEPS + ".dish_id=" + dishID, function (e, results, fields) {
                                    if (e) {
                                        reject(e);
                                    }
                                    if (results) {
                                        resolve(results);
                                    }
                                    else {
                                        reject('No result from query');
                                    }
                                });
                            })];
                    case 1:
                        rows = _b.sent();
                        steps_1 = [];
                        aggregateSteps = new Map();
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 7, 8, 9]);
                        rows_5 = __values(rows), rows_5_1 = rows_5.next();
                        _b.label = 3;
                    case 3:
                        if (!!rows_5_1.done) return [3 /*break*/, 6];
                        row = rows_5_1.value;
                        index = +row.execution_order;
                        step = aggregateSteps.get(index);
                        if (!step) {
                            step = {
                                order: row.execution_order,
                                options: [],
                                correctOptions: [],
                            };
                        }
                        if (row.is_correct) {
                            step.correctOptions.push(row.option_id);
                        }
                        return [4 /*yield*/, this.fetchRecipeOption(row.option_id)];
                    case 4:
                        option = _b.sent();
                        step.options.push(option);
                        aggregateSteps.set(index, step);
                        _b.label = 5;
                    case 5:
                        rows_5_1 = rows_5.next();
                        return [3 /*break*/, 3];
                    case 6: return [3 /*break*/, 9];
                    case 7:
                        e_21_1 = _b.sent();
                        e_21 = { error: e_21_1 };
                        return [3 /*break*/, 9];
                    case 8:
                        try {
                            if (rows_5_1 && !rows_5_1.done && (_a = rows_5.return)) _a.call(rows_5);
                        }
                        finally { if (e_21) throw e_21.error; }
                        return [7 /*endfinally*/];
                    case 9:
                        aggregateSteps.forEach(function (step) {
                            steps_1.push(step);
                        });
                        return [2 /*return*/, steps_1];
                    case 10:
                        e_22 = _b.sent();
                        return [2 /*return*/, Promise.reject(e_22)];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Fetches Options associated with Step
     *
     * @private
     * @param {string} optionID
     * @returns {Promise<RecipeOption>}
     * @memberof SQLDriver
     */
    SQLDriver.prototype.fetchRecipeOption = function (optionID) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var row, option, e_23;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                _this.db.query("SELECT " + exports.TABLES.OPTIONS + ".id," + exports.TABLES.OPTIONS + ".type, " + exports.TABLES.OPTIONS + ".description, " + exports.TABLES.IMAGES + ".url AS image FROM " + exports.TABLES.OPTIONS + " LEFT JOIN " + exports.TABLES.IMAGES + " ON " + exports.TABLES.OPTIONS + ".image_id=" + exports.TABLES.IMAGES + ".id WHERE " + exports.TABLES.OPTIONS + ".id=" + optionID, function (e, results, fields) {
                                    if (e) {
                                        reject(e);
                                    }
                                    if (results) {
                                        resolve(results[0]);
                                    }
                                    else {
                                        reject('No result from query');
                                    }
                                });
                            })];
                    case 1:
                        row = _a.sent();
                        option = {
                            id: row.id,
                            type: row.type,
                            description: row.description,
                            image: row.image,
                        };
                        return [2 /*return*/, option];
                    case 2:
                        e_23 = _a.sent();
                        return [2 /*return*/, Promise.reject(e_23)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Fetches Reactions associated with Dish
     *
     * @private
     * @param {string} dishID
     * @returns {Promise<Reactions>}
     * @memberof SQLDriver
     */
    SQLDriver.prototype.fetchReactions = function (dishID) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var rows, reactions, rows_6, rows_6_1, row, reaction, e_24, e_25, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                _this.db.query("SELECT " + exports.TABLES.REACTIONS + ".text, " + exports.TABLES.REACTIONS + ".positive FROM " + exports.TABLES.REACTIONS + " WHERE " + exports.TABLES.REACTIONS + ".dish_id=" + dishID, function (e, results, fields) {
                                    if (e) {
                                        reject(e);
                                    }
                                    if (results) {
                                        resolve(results);
                                    }
                                    else {
                                        reject('No result from query');
                                    }
                                });
                            })];
                    case 1:
                        rows = _b.sent();
                        reactions = {
                            positive: [],
                            negative: [],
                        };
                        try {
                            for (rows_6 = __values(rows), rows_6_1 = rows_6.next(); !rows_6_1.done; rows_6_1 = rows_6.next()) {
                                row = rows_6_1.value;
                                reaction = {
                                    text: row.text,
                                };
                                row.positive
                                    ? reactions.positive.push(reaction)
                                    : reactions.negative.push(reaction);
                            }
                        }
                        catch (e_25_1) { e_25 = { error: e_25_1 }; }
                        finally {
                            try {
                                if (rows_6_1 && !rows_6_1.done && (_a = rows_6.return)) _a.call(rows_6);
                            }
                            finally { if (e_25) throw e_25.error; }
                        }
                        return [2 /*return*/, reactions];
                    case 2:
                        e_24 = _b.sent();
                        return [2 /*return*/, Promise.reject(e_24)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Fetches Prompts associated with Dish
     *
     * @private
     * @param {string} dishID
     * @returns {Promise<Prompts>}
     * @memberof SQLDriver
     */
    SQLDriver.prototype.fetchPrompts = function (dishID) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var query_3, rows, prompts, rows_7, rows_7_1, row, prompt_1, e_26, e_27, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        query_3 = "SELECT " + exports.TABLES.PROMPTS + ".order_num, " + exports.TABLES.PROMPTS + ".type, " + exports.TABLES.PROMPTS + ".text, " + exports.TABLES.IMAGES + ".url as image FROM " + exports.TABLES.PROMPTS + " LEFT JOIN " + exports.TABLES.IMAGES + " ON " + exports.TABLES.PROMPTS + ".image_id=" + exports.TABLES.IMAGES + ".id WHERE " + exports.TABLES.PROMPTS + ".dish_id=" + dishID;
                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                _this.db.query(query_3, function (e, results, fields) {
                                    if (e) {
                                        reject(e);
                                    }
                                    if (results) {
                                        resolve(results);
                                    }
                                    else {
                                        reject('No result from query');
                                    }
                                });
                            })];
                    case 1:
                        rows = _b.sent();
                        prompts = {
                            intro: [],
                            failure: [],
                            success: [],
                        };
                        try {
                            for (rows_7 = __values(rows), rows_7_1 = rows_7.next(); !rows_7_1.done; rows_7_1 = rows_7.next()) {
                                row = rows_7_1.value;
                                prompt_1 = {
                                    order: row.order_num,
                                    text: row.text,
                                    image: row.image,
                                };
                                prompts[row.type].push(prompt_1);
                            }
                        }
                        catch (e_27_1) { e_27 = { error: e_27_1 }; }
                        finally {
                            try {
                                if (rows_7_1 && !rows_7_1.done && (_a = rows_7.return)) _a.call(rows_7);
                            }
                            finally { if (e_27) throw e_27.error; }
                        }
                        return [2 /*return*/, prompts];
                    case 2:
                        e_26 = _b.sent();
                        return [2 /*return*/, Promise.reject(e_26)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Fetches reward associated with Dish
     *
     * @private
     * @param {string} dishID
     * @returns {Promise<XPReward[]>}
     * @memberof SQLDriver
     */
    SQLDriver.prototype.fetchRewards = function (dishID) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var rows, rewards, rows_8, rows_8_1, row, reward, e_28, e_29, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                _this.db.query("SELECT " + exports.TABLES.XP_REWARDS + ".penalties, " + exports.TABLES.XP_REWARDS + ".reward FROM " + exports.TABLES.XP_REWARDS + " WHERE " + exports.TABLES.XP_REWARDS + ".dish_id=" + dishID, function (e, results, fields) {
                                    if (e) {
                                        reject(e);
                                    }
                                    if (results) {
                                        resolve(results);
                                    }
                                    else {
                                        reject('No result from query');
                                    }
                                });
                            })];
                    case 1:
                        rows = _b.sent();
                        rewards = [];
                        try {
                            for (rows_8 = __values(rows), rows_8_1 = rows_8.next(); !rows_8_1.done; rows_8_1 = rows_8.next()) {
                                row = rows_8_1.value;
                                reward = {
                                    penalties: row.penalties,
                                    reward: row.reward,
                                };
                                rewards.push(reward);
                            }
                        }
                        catch (e_29_1) { e_29 = { error: e_29_1 }; }
                        finally {
                            try {
                                if (rows_8_1 && !rows_8_1.done && (_a = rows_8.return)) _a.call(rows_8);
                            }
                            finally { if (e_29) throw e_29.error; }
                        }
                        return [2 /*return*/, rewards];
                    case 2:
                        e_28 = _b.sent();
                        return [2 /*return*/, Promise.reject(e_28)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Inserts new Completion
     *
     * @param {string} userID
     * @param {string} dishID
     * @param {number} score
     * @returns {Promise<void>}
     * @memberof SQLDriver
     */
    SQLDriver.prototype.addCompletion = function (userID, dishID, score) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var e_30;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                _this.db.query("INSERT INTO " + exports.TABLES.SCORES + " (score) VALUES (" + score + ");\n        INSERT INTO " + exports.TABLES.COMPLETED + " (user_id, dish_id, score_id) VALUES (" + userID + ", " + dishID + ", LAST_INSERT_ID()); \n        UPDATE " + exports.TABLES.USERS + " SET " + exports.TABLES.USERS + ".total_xp=" + exports.TABLES.USERS + ".total_xp + " + score + " WHERE " + exports.TABLES.USERS + ".id=" + userID + ";", function (e, results, fields) {
                                    if (e) {
                                        reject(e);
                                    }
                                    if (results) {
                                        resolve(results);
                                    }
                                    else {
                                        reject('No result from query');
                                    }
                                });
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        e_30 = _a.sent();
                        return [2 /*return*/, Promise.reject(e_30)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Generates User object
     *
     * @private
     * @param {*} row
     * @returns {Promise<User>}
     * @memberof SQLDriver
     */
    SQLDriver.prototype.generateUser = function (row) {
        return __awaiter(this, void 0, void 0, function () {
            var userRow, user, _a, e_31;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        userRow = row;
                        _a = {
                            id: row.id,
                            username: row.username,
                            password: row.password,
                            totalXp: row.total_xp
                        };
                        return [4 /*yield*/, this.fetchPlayerLevel(+row.total_xp)];
                    case 1:
                        _a.level = _b.sent();
                        return [4 /*yield*/, this.fetchAccountHistory(row.id)];
                    case 2:
                        _a.accountHistory = _b.sent();
                        return [4 /*yield*/, this.fetchCompleted(row.id)];
                    case 3:
                        user = (_a.completed = _b.sent(),
                            _a.role = row.role,
                            _a);
                        return [2 /*return*/, user];
                    case 4:
                        e_31 = _b.sent();
                        return [2 /*return*/, Promise.reject(e_31)];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Generates Dish Object
     *
     * @private
     * @param {*} rows
     * @param {boolean} [full]
     * @returns {Promise<Dish>}
     * @memberof SQLDriver
     */
    SQLDriver.prototype.generateDish = function (rows, full) {
        return __awaiter(this, void 0, void 0, function () {
            var dishRow, dish, _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        dishRow = rows;
                        if (rows.length) {
                            dishRow = rows[0];
                        }
                        dish = {
                            id: dishRow.id,
                            name: dishRow.name,
                            difficulty: dishRow.difficulty,
                            unlockedAt: dishRow.unlocked_at,
                            steps: [],
                            rewards: [],
                            reactions: null,
                            prompts: null,
                        };
                        if (!full) return [3 /*break*/, 5];
                        _a = dish;
                        return [4 /*yield*/, this.fetchRecipeSteps(dish.id)];
                    case 1:
                        _a.steps = _e.sent();
                        _b = dish;
                        return [4 /*yield*/, this.fetchRewards(dish.id)];
                    case 2:
                        _b.rewards = _e.sent();
                        _c = dish;
                        return [4 /*yield*/, this.fetchReactions(dish.id)];
                    case 3:
                        _c.reactions = _e.sent();
                        _d = dish;
                        return [4 /*yield*/, this.fetchPrompts(dish.id)];
                    case 4:
                        _d.prompts = _e.sent();
                        _e.label = 5;
                    case 5: return [2 /*return*/, dish];
                }
            });
        });
    };
    return SQLDriver;
}());
exports.SQLDriver = SQLDriver;
