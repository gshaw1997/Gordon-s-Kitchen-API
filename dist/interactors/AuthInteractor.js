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
Object.defineProperty(exports, "__esModule", { value: true });
var bcrypt = require("bcrypt");
var SALT_ROUNDS = 10;
var AuthInteractor = /** @class */ (function () {
    function AuthInteractor() {
    }
    /**
     * Inserts new Users
     *
     * @static
     * @param {DataStore} dataStore
     * @param {string} username
     * @param {string} password
     * @returns
     * @memberof AuthInteractor
     */
    AuthInteractor.register = function (dataStore, username, password) {
        return __awaiter(this, void 0, void 0, function () {
            var exists, user, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, dataStore.findUser(username)];
                    case 1:
                        exists = _a.sent();
                        if (exists) {
                            return [2 /*return*/, Promise.reject('Username is already in use')];
                        }
                        return [4 /*yield*/, bcrypt.hash(password, SALT_ROUNDS)];
                    case 2:
                        password = _a.sent();
                        return [4 /*yield*/, dataStore.addUser(username, password)];
                    case 3:
                        user = _a.sent();
                        delete user.password;
                        return [2 /*return*/, user];
                    case 4:
                        e_1 = _a.sent();
                        return [2 /*return*/, Promise.reject("Problem registering. Error: " + e_1)];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Loads User record with username and password
     *
     * @static
     * @param {DataStore} dataStore
     * @param {string} username
     * @param {string} password
     * @returns {Promise<User>}
     * @memberof AuthInteractor
     */
    AuthInteractor.login = function (dataStore, username, password) {
        return __awaiter(this, void 0, void 0, function () {
            var id, e_2, user, passwordMatch, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 8, , 9]);
                        id = void 0;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, dataStore.findUser(username)];
                    case 2:
                        id = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_2 = _a.sent();
                        return [2 /*return*/, Promise.reject('Invalid username')];
                    case 4:
                        if (!id) {
                            return [2 /*return*/, Promise.reject('Invalid username')];
                        }
                        return [4 /*yield*/, dataStore.fetchUser(id)];
                    case 5:
                        user = _a.sent();
                        return [4 /*yield*/, bcrypt.compare(password, user.password)];
                    case 6:
                        passwordMatch = _a.sent();
                        if (!passwordMatch) {
                            return [2 /*return*/, Promise.reject('Password is incorrect')];
                        }
                        return [4 /*yield*/, dataStore.updateLastSignOn(user.id)];
                    case 7:
                        _a.sent();
                        delete user.password;
                        return [2 /*return*/, user];
                    case 8:
                        e_3 = _a.sent();
                        return [2 /*return*/, Promise.reject("Problem logining in. Error: " + e_3)];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    return AuthInteractor;
}());
exports.AuthInteractor = AuthInteractor;
