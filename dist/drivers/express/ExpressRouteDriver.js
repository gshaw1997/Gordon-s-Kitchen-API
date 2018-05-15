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
var drivers_1 = require("../drivers");
var express_1 = require("express");
var UserInteractor_1 = require("../../interactors/UserInteractor");
var AuthInteractor_1 = require("../../interactors/AuthInteractor");
var DishInteractor_1 = require("../../interactors/DishInteractor");
// This refers to the package.json that is generated in the dist. See /gulpfile.js for reference.
// tslint:disable-next-line:no-require-imports
var version = require('../../package.json').version;
var ExpressRouteDriver = /** @class */ (function () {
    function ExpressRouteDriver(dataStore) {
        this.dataStore = dataStore;
    }
    ExpressRouteDriver.buildRouter = function (dataStore) {
        var e = new ExpressRouteDriver(dataStore);
        var router = express_1.Router();
        e.setRoutes(router);
        return router;
    };
    ExpressRouteDriver.prototype.getResponder = function (response) {
        return new drivers_1.ExpressResponder(response);
    };
    ExpressRouteDriver.prototype.setRoutes = function (router) {
        var _this = this;
        router.get('/', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                res.json({
                    version: version,
                    message: "Welcome to the Gordon's Kitchen API v" + version,
                });
                return [2 /*return*/];
            });
        }); });
        // USER ROUTES
        router.post('/users', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var responder, username, password, user, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        responder = this.getResponder(res);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        username = req.body.username;
                        password = req.body.password;
                        return [4 /*yield*/, AuthInteractor_1.AuthInteractor.register(this.dataStore, username, password)];
                    case 2:
                        user = _a.sent();
                        responder.sendObject(user);
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        responder.sendOperationError(e_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        router.post('/users/login', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var responder, username, password, user, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        responder = this.getResponder(res);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        username = req.body.username;
                        password = req.body.password;
                        return [4 /*yield*/, AuthInteractor_1.AuthInteractor.login(this.dataStore, username, password)];
                    case 2:
                        user = _a.sent();
                        responder.sendObject(user);
                        return [3 /*break*/, 4];
                    case 3:
                        e_2 = _a.sent();
                        responder.sendOperationError(e_2);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        router.post('/users/:id/completed', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var responder, userID, dishID, score, user, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        responder = this.getResponder(res);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        userID = req.params.id;
                        dishID = req.body.dishID;
                        score = +req.body.score;
                        return [4 /*yield*/, UserInteractor_1.UserInteractor.insertCompletion(this.dataStore, userID, dishID, score)];
                    case 2:
                        user = _a.sent();
                        responder.sendObject(user);
                        return [3 /*break*/, 4];
                    case 3:
                        e_3 = _a.sent();
                        responder.sendOperationError(e_3);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        router.get('/users', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var responder, username, users, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        responder = this.getResponder(res);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        username = req.query.username;
                        return [4 /*yield*/, UserInteractor_1.UserInteractor.fetchUsers(this.dataStore, username)];
                    case 2:
                        users = _a.sent();
                        responder.sendObject(users);
                        return [3 /*break*/, 4];
                    case 3:
                        e_4 = _a.sent();
                        responder.sendOperationError(e_4);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        router.get('/users/:id', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var responder, id, user, e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        responder = this.getResponder(res);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        id = req.params.id;
                        return [4 /*yield*/, UserInteractor_1.UserInteractor.fetchUser(this.dataStore, id)];
                    case 2:
                        user = _a.sent();
                        responder.sendObject(user);
                        return [3 /*break*/, 4];
                    case 3:
                        e_5 = _a.sent();
                        responder.sendOperationError(e_5);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        router
            .route('/users/:id/friends')
            .get(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var responder, id, friends, e_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        responder = this.getResponder(res);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        id = req.params.id;
                        return [4 /*yield*/, UserInteractor_1.UserInteractor.fetchFriends(this.dataStore, id)];
                    case 2:
                        friends = _a.sent();
                        responder.sendObject(friends);
                        return [3 /*break*/, 4];
                    case 3:
                        e_6 = _a.sent();
                        responder.sendOperationError(e_6);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); })
            .post(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var responder, userID, playerID, friends, e_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        responder = this.getResponder(res);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        userID = req.params.id;
                        playerID = req.body.playerID;
                        return [4 /*yield*/, UserInteractor_1.UserInteractor.addFriend(this.dataStore, userID, playerID)];
                    case 2:
                        friends = _a.sent();
                        responder.sendObject(friends);
                        return [3 /*break*/, 4];
                    case 3:
                        e_7 = _a.sent();
                        responder.sendOperationError(e_7);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        router.delete('/users/:id/friends/:playerID', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var responder, userID, playerID, friends, e_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        responder = this.getResponder(res);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        userID = req.params.id;
                        playerID = req.params.playerID;
                        return [4 /*yield*/, UserInteractor_1.UserInteractor.removeFriend(this.dataStore, userID, playerID)];
                    case 2:
                        friends = _a.sent();
                        responder.sendObject(friends);
                        return [3 /*break*/, 4];
                    case 3:
                        e_8 = _a.sent();
                        responder.sendOperationError(e_8);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        // DISH ROUTES
        router.get('/dishes', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var responder, dishes, e_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        responder = this.getResponder(res);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, DishInteractor_1.DishInteractor.fetchDishes(this.dataStore)];
                    case 2:
                        dishes = _a.sent();
                        responder.sendObject(dishes);
                        return [3 /*break*/, 4];
                    case 3:
                        e_9 = _a.sent();
                        responder.sendOperationError(e_9);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        router.get('/dishes/difficulty/:difficulty', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var responder, difficulty, dishes, e_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        responder = this.getResponder(res);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        difficulty = req.params.difficulty;
                        return [4 /*yield*/, DishInteractor_1.DishInteractor.fetchDishes(this.dataStore, difficulty)];
                    case 2:
                        dishes = _a.sent();
                        responder.sendObject(dishes);
                        return [3 /*break*/, 4];
                    case 3:
                        e_10 = _a.sent();
                        responder.sendOperationError(e_10);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        router.get('/dishes/:id', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var responder, id, dish, e_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        responder = this.getResponder(res);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        id = req.params.id;
                        return [4 /*yield*/, DishInteractor_1.DishInteractor.fetchDish(this.dataStore, id)];
                    case 2:
                        dish = _a.sent();
                        responder.sendObject(dish);
                        return [3 /*break*/, 4];
                    case 3:
                        e_11 = _a.sent();
                        responder.sendOperationError(e_11);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    return ExpressRouteDriver;
}());
exports.ExpressRouteDriver = ExpressRouteDriver;
