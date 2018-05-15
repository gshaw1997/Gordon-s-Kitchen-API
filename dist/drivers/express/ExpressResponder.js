"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ExpressResponder = /** @class */ (function () {
    function ExpressResponder(res) {
        this.res = res;
    }
    ExpressResponder.prototype.sendOperationSuccess = function () {
        this.res.sendStatus(200);
    };
    ExpressResponder.prototype.sendOperationError = function (error, status) {
        if (error === void 0) { error = 'Server error encounter.'; }
        if (status === void 0) { status = 400; }
        this.res.status(status).send(error);
    };
    ExpressResponder.prototype.sendObject = function (object) {
        this.res.status(200).send(object);
    };
    return ExpressResponder;
}());
exports.ExpressResponder = ExpressResponder;
