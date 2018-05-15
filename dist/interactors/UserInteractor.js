"use strict";
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
var UserInteractor = /** @class */ (function () {
    function UserInteractor() {
    }
    /**
     * Fetches all Users
     *
     * @static
     * @param {DataStore} dataStore
     * @param {string} id
     * @returns {Promise<User>}
     * @memberof UserInteractor
     */
    UserInteractor.fetchUsers = function (dataStore, username) {
        return __awaiter(this, void 0, void 0, function () {
            var users, users_1, users_1_1, user, e_1, e_2, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, dataStore.fetchUsers(username)];
                    case 1:
                        users = _b.sent();
                        try {
                            for (users_1 = __values(users), users_1_1 = users_1.next(); !users_1_1.done; users_1_1 = users_1.next()) {
                                user = users_1_1.value;
                                delete user.password;
                            }
                        }
                        catch (e_2_1) { e_2 = { error: e_2_1 }; }
                        finally {
                            try {
                                if (users_1_1 && !users_1_1.done && (_a = users_1.return)) _a.call(users_1);
                            }
                            finally { if (e_2) throw e_2.error; }
                        }
                        return [2 /*return*/, users];
                    case 2:
                        e_1 = _b.sent();
                        return [2 /*return*/, Promise.reject("Problem fetching users. Error " + e_1)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Fetches User by ID
     *
     * @static
     * @param {DataStore} dataStore
     * @param {string} id
     * @returns {Promise<User>}
     * @memberof UserInteractor
     */
    UserInteractor.fetchUser = function (dataStore, id) {
        return __awaiter(this, void 0, void 0, function () {
            var user, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, dataStore.fetchUser(id)];
                    case 1:
                        user = _a.sent();
                        delete user.password;
                        return [2 /*return*/, user];
                    case 2:
                        e_3 = _a.sent();
                        return [2 /*return*/, Promise.reject("Problem fetching user. Error " + e_3)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Fetches User's Friends
     *
     * @static
     * @param {DataStore} dataStore
     * @param {string} id
     * @returns {Promise<User[]>}
     * @memberof UserInteractor
     */
    UserInteractor.fetchFriends = function (dataStore, id) {
        return __awaiter(this, void 0, void 0, function () {
            var friends, friends_1, friends_1_1, user, e_4, e_5, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, dataStore.fecthFriends(id)];
                    case 1:
                        friends = _b.sent();
                        try {
                            for (friends_1 = __values(friends), friends_1_1 = friends_1.next(); !friends_1_1.done; friends_1_1 = friends_1.next()) {
                                user = friends_1_1.value;
                                delete user.password;
                            }
                        }
                        catch (e_5_1) { e_5 = { error: e_5_1 }; }
                        finally {
                            try {
                                if (friends_1_1 && !friends_1_1.done && (_a = friends_1.return)) _a.call(friends_1);
                            }
                            finally { if (e_5) throw e_5.error; }
                        }
                        return [2 /*return*/, friends];
                    case 2:
                        e_4 = _b.sent();
                        return [2 /*return*/, Promise.reject("Problem fetching friends. Error " + e_4)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Add User's Friend
     *
     * @static
     * @param {DataStore} dataStore
     * @param {string} id
     * @returns {Promise<User[]>}
     * @memberof UserInteractor
     */
    UserInteractor.addFriend = function (dataStore, id, playerID) {
        return __awaiter(this, void 0, void 0, function () {
            var friends, friends_2, friends_2_1, user, e_6, e_7, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, dataStore.addFriend(id, playerID)];
                    case 1:
                        friends = _b.sent();
                        try {
                            for (friends_2 = __values(friends), friends_2_1 = friends_2.next(); !friends_2_1.done; friends_2_1 = friends_2.next()) {
                                user = friends_2_1.value;
                                delete user.password;
                            }
                        }
                        catch (e_7_1) { e_7 = { error: e_7_1 }; }
                        finally {
                            try {
                                if (friends_2_1 && !friends_2_1.done && (_a = friends_2.return)) _a.call(friends_2);
                            }
                            finally { if (e_7) throw e_7.error; }
                        }
                        return [2 /*return*/, friends];
                    case 2:
                        e_6 = _b.sent();
                        return [2 /*return*/, Promise.reject("Problem adding friend. Error " + e_6)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Removes User's Friend
     *
     * @static
     * @param {DataStore} dataStore
     * @param {string} id
     * @returns {Promise<User[]>}
     * @memberof UserInteractor
     */
    UserInteractor.removeFriend = function (dataStore, id, playerID) {
        return __awaiter(this, void 0, void 0, function () {
            var friends, friends_3, friends_3_1, user, e_8, e_9, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, dataStore.removeFriend(id, playerID)];
                    case 1:
                        friends = _b.sent();
                        try {
                            for (friends_3 = __values(friends), friends_3_1 = friends_3.next(); !friends_3_1.done; friends_3_1 = friends_3.next()) {
                                user = friends_3_1.value;
                                delete user.password;
                            }
                        }
                        catch (e_9_1) { e_9 = { error: e_9_1 }; }
                        finally {
                            try {
                                if (friends_3_1 && !friends_3_1.done && (_a = friends_3.return)) _a.call(friends_3);
                            }
                            finally { if (e_9) throw e_9.error; }
                        }
                        return [2 /*return*/, friends];
                    case 2:
                        e_8 = _b.sent();
                        return [2 /*return*/, Promise.reject("Problem removing friend. Error " + e_8)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Inserts completion
     *
     * @static
     * @param {DataStore} dataStore
     * @param {string} userID
     * @param {string} dishID
     * @param {number} score
     * @returns {Promise<User>}
     * @memberof UserInteractor
     */
    UserInteractor.insertCompletion = function (dataStore, userID, dishID, score) {
        return __awaiter(this, void 0, void 0, function () {
            var user, e_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, dataStore.addCompletion(userID, dishID, score)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, dataStore.fetchUser(userID)];
                    case 2:
                        user = _a.sent();
                        delete user.password;
                        return [2 /*return*/, user];
                    case 3:
                        e_10 = _a.sent();
                        return [2 /*return*/, Promise.reject("Problem inserting completion. Error: " + e_10)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return UserInteractor;
}());
exports.UserInteractor = UserInteractor;
