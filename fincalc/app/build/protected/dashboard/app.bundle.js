webpackJsonp([1],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _stringify = __webpack_require__(87);

var _stringify2 = _interopRequireDefault(_stringify);

var _assign = __webpack_require__(28);

var _assign2 = _interopRequireDefault(_assign);

var _regenerator = __webpack_require__(7);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

var _typeof2 = __webpack_require__(46);

var _typeof3 = _interopRequireDefault(_typeof2);

var _promise = __webpack_require__(6);

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = _promise2.default))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function __export(m) {
    for (var p in m) {
        if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(120));
var AuthAPI = __webpack_require__(210);
var UserAPI = __webpack_require__(211);
var constants_1 = __webpack_require__(120);
var storage_1 = __webpack_require__(62);
var ENABLE_API_LOGGING = true;
var __now = function () {
    if ((typeof performance === "undefined" ? "undefined" : (0, _typeof3.default)(performance)) === "object" && typeof performance.now === "function") {
        return function () {
            return performance.now();
        };
    } else {
        return function () {
            return Date.now();
        };
    }
}();
exports.CONTENT_TYPE_AUTO = {};

var APIResponse = function () {
    function APIResponse(status, _data, _error) {
        (0, _classCallCheck3.default)(this, APIResponse);

        this.status = status;
        this._data = _data;
        this._error = _error;
        this.success = _error === undefined;
    }

    (0, _createClass3.default)(APIResponse, [{
        key: "data",
        get: function get() {
            return this._data;
        }
    }, {
        key: "errors",
        get: function get() {
            return this._error;
        }
    }]);
    return APIResponse;
}();

exports.APIResponse = APIResponse;
function toQueryString(queryObject) {
    var ret = '';
    if (queryObject) {
        var first = true;
        for (var key in queryObject) {
            if (queryObject[key] === undefined) continue;
            if ((0, _typeof3.default)(queryObject[key]) === "object") continue;
            if (first) first = false;else ret += '&';
            ret += encodeURIComponent(key) + '=' + encodeURIComponent(queryObject[key]);
        }
    }
    return ret;
}
function addQueryToURL(url, queryObject) {
    var queryStart = url.indexOf('?');
    var hashStart = url.indexOf('#');
    if (hashStart < 0) hashStart = url.length;
    if (queryStart < 0) queryStart = hashStart;
    var endpoint = url.substr(0, queryStart);
    var query = url.substr(queryStart, hashStart - queryStart);
    var hash = url.substr(hashStart);
    var addon = toQueryString(queryObject);
    if (addon) {
        if (query[0] != '?') query = '?' + query;
        if (query.length > 1 && !query.endsWith('&')) query += '&' + addon;else query += addon;
    }
    return endpoint + query + hash;
}
function toFormData(obj) {
    var fdata = new FormData();
    for (var k in obj) {
        fdata.set(k, obj[k]);
    }
    return fdata;
}
exports.toFormData = toFormData;

var API = function () {
    function API() {
        (0, _classCallCheck3.default)(this, API);

        this.AuthAPI = AuthAPI;
        this.UserAPI = UserAPI;
        this.state = undefined;
        this.init();
    }

    (0, _createClass3.default)(API, [{
        key: "hasLoggedInBefore",
        value: function hasLoggedInBefore() {
            if (this.state && this.state.lastLoginResponse && this.state.lastLoginResponseTime) {
                return true;
            }
            return false;
        }
    }, {
        key: "isLoggedIn",
        value: function isLoggedIn() {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/_regenerator2.default.mark(function _callee() {
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                if (!(this.state && this.state.lastLoginResponse && this.state.lastLoginResponseTime)) {
                                    _context.next = 9;
                                    break;
                                }

                                if (!this.requiresRefresh()) {
                                    _context.next = 8;
                                    break;
                                }

                                _context.next = 4;
                                return this.refresh();

                            case 4:
                                if (!_context.sent) {
                                    _context.next = 6;
                                    break;
                                }

                                return _context.abrupt("return", true);

                            case 6:
                                _context.next = 9;
                                break;

                            case 8:
                                return _context.abrupt("return", true);

                            case 9:
                                return _context.abrupt("return", false);

                            case 10:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));
        }
    }, {
        key: "me",
        value: function me() {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.next = 2;
                                return this._requestWithAuth({
                                    endpoint: "/user/me",
                                    method: "GET"
                                });

                            case 2:
                                return _context2.abrupt("return", _context2.sent);

                            case 3:
                            case "end":
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));
        }
    }, {
        key: "getFacebookConnectURL",
        value: function getFacebookConnectURL() {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
                return _regenerator2.default.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _context3.next = 2;
                                return this._requestWithAuth({
                                    endpoint: "/facebook/connect-url",
                                    method: "GET"
                                });

                            case 2:
                                return _context3.abrupt("return", _context3.sent);

                            case 3:
                            case "end":
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));
        }
    }, {
        key: "getSchema",
        value: function getSchema() {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
                return _regenerator2.default.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                _context4.next = 2;
                                return this._requestWithAuth({
                                    endpoint: "/_schema/calc",
                                    method: "GET"
                                });

                            case 2:
                                return _context4.abrupt("return", _context4.sent);

                            case 3:
                            case "end":
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));
        }
    }, {
        key: "getFacebookInfo",
        value: function getFacebookInfo() {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/_regenerator2.default.mark(function _callee5() {
                return _regenerator2.default.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                _context5.next = 2;
                                return this._requestWithAuth({
                                    endpoint: "/facebook/user",
                                    method: "GET"
                                });

                            case 2:
                                return _context5.abrupt("return", _context5.sent);

                            case 3:
                            case "end":
                                return _context5.stop();
                        }
                    }
                }, _callee5, this);
            }));
        }
    }, {
        key: "disconnectFacebook",
        value: function disconnectFacebook() {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/_regenerator2.default.mark(function _callee6() {
                return _regenerator2.default.wrap(function _callee6$(_context6) {
                    while (1) {
                        switch (_context6.prev = _context6.next) {
                            case 0:
                                _context6.next = 2;
                                return this._requestWithAuth({
                                    endpoint: "/facebook/disconnect",
                                    method: "POST"
                                });

                            case 2:
                                return _context6.abrupt("return", _context6.sent);

                            case 3:
                            case "end":
                                return _context6.stop();
                        }
                    }
                }, _callee6, this);
            }));
        }
    }, {
        key: "createCalculator",
        value: function createCalculator(calculator) {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/_regenerator2.default.mark(function _callee7() {
                return _regenerator2.default.wrap(function _callee7$(_context7) {
                    while (1) {
                        switch (_context7.prev = _context7.next) {
                            case 0:
                                _context7.next = 2;
                                return this._requestWithAuth({
                                    endpoint: "/calc/",
                                    method: "PUT",
                                    body: calculator
                                });

                            case 2:
                                return _context7.abrupt("return", _context7.sent);

                            case 3:
                            case "end":
                                return _context7.stop();
                        }
                    }
                }, _callee7, this);
            }));
        }
    }, {
        key: "updateCalculator",
        value: function updateCalculator(calculator) {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/_regenerator2.default.mark(function _callee8() {
                return _regenerator2.default.wrap(function _callee8$(_context8) {
                    while (1) {
                        switch (_context8.prev = _context8.next) {
                            case 0:
                                console.assert(!!calculator.uuid, "Cannot update a calculator without a UUID.");
                                _context8.next = 3;
                                return this._requestWithAuth({
                                    endpoint: "/calc/" + calculator.uuid,
                                    method: "POST",
                                    body: calculator
                                });

                            case 3:
                                return _context8.abrupt("return", _context8.sent);

                            case 4:
                            case "end":
                                return _context8.stop();
                        }
                    }
                }, _callee8, this);
            }));
        }
    }, {
        key: "deleteCalculator",
        value: function deleteCalculator(uuidOrCalc) {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/_regenerator2.default.mark(function _callee9() {
                var uuid;
                return _regenerator2.default.wrap(function _callee9$(_context9) {
                    while (1) {
                        switch (_context9.prev = _context9.next) {
                            case 0:
                                uuid = typeof uuidOrCalc == "string" ? uuidOrCalc : uuidOrCalc.uuid;

                                console.assert(!!uuid, "Cannot delete a calculator without a UUID.");
                                _context9.next = 4;
                                return this._requestWithAuth({
                                    endpoint: "/calc/" + uuid,
                                    method: "DELETE"
                                });

                            case 4:
                                return _context9.abrupt("return", _context9.sent);

                            case 5:
                            case "end":
                                return _context9.stop();
                        }
                    }
                }, _callee9, this);
            }));
        }
    }, {
        key: "getCalculator",
        value: function getCalculator(uuid, fields) {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/_regenerator2.default.mark(function _callee10() {
                var _fields;

                return _regenerator2.default.wrap(function _callee10$(_context10) {
                    while (1) {
                        switch (_context10.prev = _context10.next) {
                            case 0:
                                _fields = fields ? fields.join(",") : "";
                                _context10.next = 3;
                                return this._requestWithAuth({
                                    endpoint: "/calc/" + uuid + (_fields ? "?fields=" + _fields : ""),
                                    method: "GET"
                                });

                            case 3:
                                return _context10.abrupt("return", _context10.sent);

                            case 4:
                            case "end":
                                return _context10.stop();
                        }
                    }
                }, _callee10, this);
            }));
        }
    }, {
        key: "getDailyEvents",
        value: function getDailyEvents(eventTypes, startDate, endDate, calculator) {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/_regenerator2.default.mark(function _callee11() {
                var queryObject;
                return _regenerator2.default.wrap(function _callee11$(_context11) {
                    while (1) {
                        switch (_context11.prev = _context11.next) {
                            case 0:
                                queryObject = { eventtypes: eventTypes.join(","), startdate: startDate.toISOString(), enddate: endDate.toISOString(), calculator: calculator };
                                _context11.next = 3;
                                return this._requestWithAuth({
                                    endpoint: addQueryToURL("/event/daily", queryObject),
                                    method: "GET"
                                });

                            case 3:
                                return _context11.abrupt("return", _context11.sent);

                            case 4:
                            case "end":
                                return _context11.stop();
                        }
                    }
                }, _callee11, this);
            }));
        }
    }, {
        key: "listLeads",
        value: function listLeads(offset, count, fields, orderBy, orderDir) {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/_regenerator2.default.mark(function _callee12() {
                var _fields;

                return _regenerator2.default.wrap(function _callee12$(_context12) {
                    while (1) {
                        switch (_context12.prev = _context12.next) {
                            case 0:
                                _fields = fields ? fields.join(",") : undefined;
                                _context12.next = 3;
                                return this._requestWithAuth({
                                    endpoint: addQueryToURL("/lead/list", { offset: offset, count: count, fields: _fields, order_by: orderBy, order_dir: orderDir }),
                                    method: "GET"
                                });

                            case 3:
                                return _context12.abrupt("return", _context12.sent);

                            case 4:
                            case "end":
                                return _context12.stop();
                        }
                    }
                }, _callee12, this);
            }));
        }
    }, {
        key: "listCalculators",
        value: function listCalculators(fields, orderBy, orderDir) {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/_regenerator2.default.mark(function _callee13() {
                var _fields;

                return _regenerator2.default.wrap(function _callee13$(_context13) {
                    while (1) {
                        switch (_context13.prev = _context13.next) {
                            case 0:
                                _fields = fields ? fields.join(",") : "";
                                _context13.next = 3;
                                return this._requestWithAuth({
                                    endpoint: addQueryToURL("/calc/list", { fields: _fields, order_by: orderBy, order_dir: orderDir }),
                                    method: "GET"
                                });

                            case 3:
                                return _context13.abrupt("return", _context13.sent);

                            case 4:
                            case "end":
                                return _context13.stop();
                        }
                    }
                }, _callee13, this);
            }));
        }
    }, {
        key: "signup",
        value: function signup(signupRequest) {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/_regenerator2.default.mark(function _callee14() {
                var response;
                return _regenerator2.default.wrap(function _callee14$(_context14) {
                    while (1) {
                        switch (_context14.prev = _context14.next) {
                            case 0:
                                _context14.next = 2;
                                return this._request({
                                    endpoint: "/auth/signup",
                                    method: "POST",
                                    body: signupRequest
                                });

                            case 2:
                                response = _context14.sent;
                                return _context14.abrupt("return", response);

                            case 4:
                            case "end":
                                return _context14.stop();
                        }
                    }
                }, _callee14, this);
            }));
        }
    }, {
        key: "login",
        value: function login(email, password) {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/_regenerator2.default.mark(function _callee15() {
                var response;
                return _regenerator2.default.wrap(function _callee15$(_context15) {
                    while (1) {
                        switch (_context15.prev = _context15.next) {
                            case 0:
                                _context15.next = 2;
                                return this._request({
                                    endpoint: "/auth/login",
                                    method: "POST",
                                    body: { email: email, password: password }
                                });

                            case 2:
                                response = _context15.sent;

                                if (response.success) {
                                    this.state.lastLoginResponse = response.data;
                                    this.state.lastLoginResponseTime = Date.now();
                                    this.saveState();
                                } else {
                                    this.state.lastLoginResponse = undefined;
                                    this.state.lastLoginResponseTime = undefined;
                                }
                                return _context15.abrupt("return", response);

                            case 5:
                            case "end":
                                return _context15.stop();
                        }
                    }
                }, _callee15, this);
            }));
        }
    }, {
        key: "logout",
        value: function logout() {
            this.state.lastLoginResponse = undefined;
            this.state.lastLoginResponseTime = undefined;
            this.saveState();
        }
    }, {
        key: "init",
        value: function init() {
            this.loadState();
            if (this.state === undefined) {
                this.state = {
                    lastLoginResponse: undefined,
                    lastLoginResponseTime: undefined
                };
            }
        }
    }, {
        key: "loadState",
        value: function loadState() {
            this.state = storage_1.default.get("api-state");
        }
    }, {
        key: "saveState",
        value: function saveState() {
            if (this.state) {
                storage_1.default.set("api-state", this.state);
            }
        }
    }, {
        key: "requiresRefresh",
        value: function requiresRefresh() {
            var now = Date.now();
            var tokenExpiresAt = this.state.lastLoginResponseTime + this.state.lastLoginResponse.expiresIn * 1000;
            return now > tokenExpiresAt;
        }
    }, {
        key: "refresh",
        value: function refresh() {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/_regenerator2.default.mark(function _callee16() {
                var response;
                return _regenerator2.default.wrap(function _callee16$(_context16) {
                    while (1) {
                        switch (_context16.prev = _context16.next) {
                            case 0:
                                _context16.next = 2;
                                return this._request({
                                    endpoint: "/auth/refresh",
                                    method: "POST",
                                    headers: {
                                        "Authorization": "Bearer " + this.state.lastLoginResponse.token
                                    },
                                    body: {
                                        "refresh": this.state.lastLoginResponse.refresh
                                    }
                                });

                            case 2:
                                response = _context16.sent;

                                if (!response.success) {
                                    _context16.next = 10;
                                    break;
                                }

                                this.state.lastLoginResponse = response.data;
                                this.state.lastLoginResponseTime = Date.now();
                                this.saveState();
                                return _context16.abrupt("return", true);

                            case 10:
                                this.state.lastLoginResponse = undefined;
                                this.state.lastLoginResponseTime = undefined;
                                console.error("Refresh failed: ", response.errors);
                                return _context16.abrupt("return", false);

                            case 14:
                            case "end":
                                return _context16.stop();
                        }
                    }
                }, _callee16, this);
            }));
        }
    }, {
        key: "getWithAuth",
        value: function getWithAuth(endpoint, queryobject) {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/_regenerator2.default.mark(function _callee17() {
                var fullEndpoint;
                return _regenerator2.default.wrap(function _callee17$(_context17) {
                    while (1) {
                        switch (_context17.prev = _context17.next) {
                            case 0:
                                fullEndpoint = queryobject ? addQueryToURL(endpoint, queryobject) : endpoint;
                                _context17.next = 3;
                                return this._requestWithAuth({
                                    method: "GET",
                                    endpoint: fullEndpoint
                                });

                            case 3:
                                return _context17.abrupt("return", _context17.sent);

                            case 4:
                            case "end":
                                return _context17.stop();
                        }
                    }
                }, _callee17, this);
            }));
        }
    }, {
        key: "postWithAuth",
        value: function postWithAuth(endpoint, queryobject, data) {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/_regenerator2.default.mark(function _callee18() {
                var fullEndpoint, headers;
                return _regenerator2.default.wrap(function _callee18$(_context18) {
                    while (1) {
                        switch (_context18.prev = _context18.next) {
                            case 0:
                                fullEndpoint = queryobject ? addQueryToURL(endpoint, queryobject) : endpoint;
                                headers = undefined;

                                if (data instanceof FormData) {
                                    headers = {
                                        "Content-Type": exports.CONTENT_TYPE_AUTO
                                    };
                                }
                                _context18.next = 5;
                                return this._requestWithAuth({
                                    method: "POST",
                                    endpoint: fullEndpoint,
                                    body: data,
                                    headers: headers
                                });

                            case 5:
                                return _context18.abrupt("return", _context18.sent);

                            case 6:
                            case "end":
                                return _context18.stop();
                        }
                    }
                }, _callee18, this);
            }));
        }
    }, {
        key: "_requestWithAuth",
        value: function _requestWithAuth(request) {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/_regenerator2.default.mark(function _callee19() {
                var refreshed, headerMerge;
                return _regenerator2.default.wrap(function _callee19$(_context19) {
                    while (1) {
                        switch (_context19.prev = _context19.next) {
                            case 0:
                                if (!this.requiresRefresh()) {
                                    _context19.next = 6;
                                    break;
                                }

                                _context19.next = 3;
                                return this.refresh();

                            case 3:
                                refreshed = _context19.sent;

                                if (refreshed) {
                                    _context19.next = 6;
                                    break;
                                }

                                throw new Error("Refresh failed.");

                            case 6:
                                headerMerge = {
                                    "Authorization": "Bearer " + this.state.lastLoginResponse.token
                                };

                                request.headers = request.headers ? (0, _assign2.default)(request.headers, headerMerge) : headerMerge;
                                _context19.next = 10;
                                return this._request(request);

                            case 10:
                                return _context19.abrupt("return", _context19.sent);

                            case 11:
                            case "end":
                                return _context19.stop();
                        }
                    }
                }, _callee19, this);
            }));
        }
    }, {
        key: "_request",
        value: function _request(request) {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/_regenerator2.default.mark(function _callee21() {
                var _this = this;

                var _sep, url, statuscode, startTime, response, status, data;

                return _regenerator2.default.wrap(function _callee21$(_context21) {
                    while (1) {
                        switch (_context21.prev = _context21.next) {
                            case 0:
                                _sep = request.endpoint.startsWith("/") ? "" : "";
                                url = constants_1.API_ROOT + _sep + request.endpoint;

                                if (!request.headers) {
                                    request.headers = {
                                        "Content-Type": "application/json"
                                    };
                                    if (request.body) {
                                        request.body = (0, _stringify2.default)(request.body);
                                    }
                                } else if (!request.headers["Content-Type"]) {
                                    request.headers["Content-Type"] = "application/json";
                                    if (request.body) {
                                        request.body = (0, _stringify2.default)(request.body);
                                    }
                                } else if (request.headers["Content-Type"] === exports.CONTENT_TYPE_AUTO) {
                                    delete request.headers["Content-Type"];
                                }
                                statuscode = 200;
                                _context21.prev = 4;
                                startTime = ENABLE_API_LOGGING ? __now() : 0;
                                _context21.next = 8;
                                return fetch(url, {
                                    method: request.method || "GET",
                                    headers: request.headers,
                                    body: request.body
                                }).then(function (response) {
                                    return __awaiter(_this, void 0, void 0, /*#__PURE__*/_regenerator2.default.mark(function _callee20() {
                                        var status, resp, serverResponseGenTime, duration, xresponsestr;
                                        return _regenerator2.default.wrap(function _callee20$(_context20) {
                                            while (1) {
                                                switch (_context20.prev = _context20.next) {
                                                    case 0:
                                                        status = response.status;

                                                        statuscode = parseInt(status) || 0;
                                                        _context20.next = 4;
                                                        return response.json();

                                                    case 4:
                                                        resp = _context20.sent;

                                                        resp["__status"] = status;
                                                        if (ENABLE_API_LOGGING) {
                                                            serverResponseGenTime = response.headers.get("X-Response-Time");
                                                            duration = __now() - startTime;
                                                            xresponsestr = serverResponseGenTime ? " (" + serverResponseGenTime + ")" : "";

                                                            console.log("[" + (request.method || "GET") + "] " + request.endpoint + " (" + (duration | 0) + "ms)" + xresponsestr);
                                                        }
                                                        return _context20.abrupt("return", resp);

                                                    case 8:
                                                    case "end":
                                                        return _context20.stop();
                                                }
                                            }
                                        }, _callee20, this);
                                    }));
                                });

                            case 8:
                                response = _context21.sent;
                                status = response["__status"] || 0;

                                if (!response["errors"]) {
                                    _context21.next = 14;
                                    break;
                                }

                                return _context21.abrupt("return", new APIResponse(status, undefined, response["errors"]));

                            case 14:
                                data = response["data"];

                                if (typeof data === "undefined") {
                                    data = true;
                                }
                                return _context21.abrupt("return", new APIResponse(status, data, undefined));

                            case 17:
                                _context21.next = 25;
                                break;

                            case 19:
                                _context21.prev = 19;
                                _context21.t0 = _context21["catch"](4);

                                if (!(statuscode === 413)) {
                                    _context21.next = 23;
                                    break;
                                }

                                return _context21.abrupt("return", new APIResponse(0, undefined, ["File too large. (max 2MB)"]));

                            case 23:
                                console.error("Error occurred while trying to reach fincalc API: ", _context21.t0);
                                return _context21.abrupt("return", new APIResponse(0, undefined, ["Error reaching the FinCalc API."]));

                            case 25:
                            case "end":
                                return _context21.stop();
                        }
                    }
                }, _callee21, this, [[4, 19]]);
            }));
        }
    }]);
    return API;
}();

exports.API = API;
exports.default = new API();

/***/ }),
/* 9 */,
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _regenerator = __webpack_require__(7);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _parseFloat = __webpack_require__(215);

var _parseFloat2 = _interopRequireDefault(_parseFloat);

var _typeof2 = __webpack_require__(46);

var _typeof3 = _interopRequireDefault(_typeof2);

var _getIterator2 = __webpack_require__(18);

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

var _promise = __webpack_require__(6);

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = _promise2.default))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
var m = __webpack_require__(3);
var emit_1 = __webpack_require__(221);
function cond(_if) {
    if (_if) {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
        }

        return m.apply(args);
    } else {
        return null;
    }
}
exports.cond = cond;

var Binding = function () {
    function Binding(data) {
        (0, _classCallCheck3.default)(this, Binding);

        this.data = data;
        this.__cached = {};
    }

    (0, _createClass3.default)(Binding, [{
        key: "get",
        value: function get() {
            return this.data;
        }
    }, {
        key: "value",
        value: function value(prop) {
            if (prop.indexOf(".") >= 0) {
                var o = this.data;
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = (0, _getIterator3.default)(prop.split(".")), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var f = _step.value;

                        var v = o[f];
                        if (typeof v !== "undefined" && (v || (typeof v === "undefined" ? "undefined" : (0, _typeof3.default)(v)) !== "object")) {
                            o = v;
                        } else {
                            break;
                        }
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }

                return o;
            } else {
                return this.data[prop];
            }
        }
    }, {
        key: "setter",
        value: function setter(prop, attr) {
            var _this = this;

            var key = attr ? prop + "::" + attr : prop + "::";
            if (this.__cached[key]) {
                return this.__cached[key];
            } else {
                if (prop.indexOf(".") >= 0) {
                    throw new Error(". is not handled for bind at the moment.");
                } else {
                    var fn = function fn(v) {
                        _this.data[prop] = v;
                        if (_this.emitter) _this.emitter.emit("change", _this, prop);
                    };
                    var _binding = attr ? m.withAttr(attr, fn) : fn;
                    this.__cached[key] = _binding;
                    return _binding;
                }
            }
        }
    }, {
        key: "setterNumber",
        value: function setterNumber(prop, attr) {
            var _this2 = this;

            var key = attr ? prop + "::" + attr : prop + "::";
            if (this.__cached[key]) {
                return this.__cached[key];
            } else {
                if (prop.indexOf(".") >= 0) {
                    throw new Error(". is not handled for bind at the moment.");
                } else {
                    var fn = function fn(v) {
                        _this2.data[prop] = (0, _parseFloat2.default)(v);
                        if (_this2.emitter) _this2.emitter.emit("change", _this2, prop);
                    };
                    var _binding2 = attr ? m.withAttr(attr, fn) : fn;
                    this.__cached[key] = _binding2;
                    return _binding2;
                }
            }
        }
    }, {
        key: "forceChange",
        value: function forceChange() {
            var prop = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ".";

            if (this.emitter) {
                this.emitter.emit("change", this, prop);
            }
        }
    }, {
        key: "on",
        value: function on(event, listener) {
            if (!this.emitter) this.emitter = new emit_1.default();
            this.emitter.addListener(event, listener);
        }
    }]);
    return Binding;
}();

exports.Binding = Binding;
function binding(o) {
    return new Binding(o);
}
exports.binding = binding;
function gredraw(beforefn) {
    if (beforefn) {
        return requestAnimationFrame(function () {
            beforefn();
            m.redraw();
        });
    } else {
        return requestAnimationFrame(m.redraw);
    }
}
exports.gredraw = gredraw;
function isPromise(a) {
    if (a) {
        return a instanceof _promise2.default || typeof a["then"] === "function" && typeof a["catch"] === "function";
    } else {
        return false;
    }
}

var RouteWrapper = function () {
    function RouteWrapper(original) {
        (0, _classCallCheck3.default)(this, RouteWrapper);

        this.guards = [];
        this.routeService = {
            prefix: "#!"
        };
        this.wrapped = original;
        var routeService = this.routeService;
        var _linkfn = function _linkfn(options, vnode) {
            vnode.dom.setAttribute("href", routeService.prefix + vnode.attrs.href);
            vnode.dom.onclick = function (e) {
                if (e.ctrlKey || e.metaKey || e.shiftKey || e.which === 2) return;
                e.preventDefault();
                e.redraw = false;
                var href = this.getAttribute("href");
                if (href.indexOf(routeService.prefix) === 0) href = href.slice(routeService.prefix.length);
                exports.route.set(href, undefined, options);
            };
        };
        this.link = function (args) {
            if (args.tag == null) return _linkfn.bind(_linkfn, args);
            return _linkfn({}, args);
        };
    }

    (0, _createClass3.default)(RouteWrapper, [{
        key: "createLinkFn",
        value: function createLinkFn(guard) {
            var _self = this;
            var routeService = this.routeService;
            var _linkfn = function _linkfn(options, vnode) {
                vnode.dom.setAttribute("href", routeService.prefix + vnode.attrs.href);
                vnode.dom.onclick = function (e) {
                    if (e.ctrlKey || e.metaKey || e.shiftKey || e.which === 2) return;
                    e.preventDefault();
                    e.redraw = false;
                    var href = this.getAttribute("href");
                    if (href.indexOf(routeService.prefix) === 0) href = href.slice(routeService.prefix.length);
                    _self.runEventRouteGuard(guard, e, href, undefined, options).then(function (guardResult) {
                        if (typeof guardResult !== "boolean") guardResult = true;
                        if (guardResult) exports.route.set(href, undefined, options);
                    });
                };
            };
            return function (args) {
                if (args.tag == null) return _linkfn.bind(_linkfn, args);
                return _linkfn({}, args);
            };
        }
    }, {
        key: "runEventRouteGuard",
        value: function runEventRouteGuard(guard, e, route, data, options) {
            var guardResultRaw = guard(e, route, data, options);
            if (isPromise(guardResultRaw)) return guardResultRaw;
            return _promise2.default.resolve(guardResultRaw);
        }
    }, {
        key: "get",
        value: function get() {
            return this.wrapped.get();
        }
    }, {
        key: "prefix",
        value: function prefix(urlFragment) {
            this.routeService.prefix = urlFragment;
            return this.wrapped.prefix(urlFragment);
        }
    }, {
        key: "param",
        value: function param(name) {
            if (typeof name === "undefined") return this.wrapped.param();else return this.wrapped.param(name);
        }
    }, {
        key: "withGuard",
        value: function withGuard(guard, route, data, options) {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/_regenerator2.default.mark(function _callee() {
                var result;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                this.addGuard(guard);
                                _context.next = 3;
                                return this.set(route, data, options);

                            case 3:
                                result = _context.sent;

                                this.removeGuard(guard);
                                return _context.abrupt("return", result);

                            case 6:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));
        }
    }, {
        key: "set",
        value: function set(route, data, options) {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
                var cancelRouting, idx, guard, guardResultRaw, guardResult;
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                if (this.emitter) this.emitter.emit("beforeRoute", route, data, options);
                                cancelRouting = false;
                                idx = this.guards.length - 1;

                            case 3:
                                if (!(idx >= 0)) {
                                    _context2.next = 19;
                                    break;
                                }

                                guard = this.guards[idx];
                                guardResultRaw = guard(route, data, options);
                                guardResult = void 0;

                                if (!isPromise(guardResultRaw)) {
                                    _context2.next = 13;
                                    break;
                                }

                                _context2.next = 10;
                                return guardResultRaw;

                            case 10:
                                guardResult = _context2.sent;
                                _context2.next = 14;
                                break;

                            case 13:
                                guardResult = guardResultRaw;

                            case 14:
                                if (typeof guardResult !== "boolean") guardResult = true;
                                if (!guardResult) {
                                    cancelRouting = true;
                                }

                            case 16:
                                idx--;
                                _context2.next = 3;
                                break;

                            case 19:
                                if (!cancelRouting) {
                                    _context2.next = 22;
                                    break;
                                }

                                if (this.emitter) this.emitter.emit("cancelRoute", route, data, options);
                                return _context2.abrupt("return", false);

                            case 22:
                                this.wrapped.set(route, data, options);
                                if (this.emitter) this.emitter.emit("route", route, data, options);
                                return _context2.abrupt("return", true);

                            case 25:
                            case "end":
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));
        }
    }, {
        key: "on",
        value: function on(event, listener) {
            if (!this.emitter) this.emitter = new emit_1.default();
            this.emitter.addListener(event, listener);
        }
    }, {
        key: "removeListener",
        value: function removeListener(event, listener) {
            if (this.emitter) {
                this.emitter.removeListener(event, listener);
            }
        }
    }, {
        key: "addGuard",
        value: function addGuard(guard) {
            if (this.guards.indexOf(guard) < 0) {
                this.guards.push(guard);
            }
        }
    }, {
        key: "removeGuard",
        value: function removeGuard(guard) {
            var index = this.guards.indexOf(guard);
            if (index >= 0) {
                this.guards.splice(index, 1);
            }
        }
    }]);
    return RouteWrapper;
}();

exports.RouteWrapper = RouteWrapper;
exports.route = undefined;
function shimRoute(m) {
    if (!exports.route) {
        exports.route = new RouteWrapper(m.route);
    }
    m["route"] = exports.route;
}
exports.shimRoute = shimRoute;

/***/ }),
/* 11 */,
/* 12 */,
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
function isSVGImage(o) {
    return o && "id" in o && "viewBox" in o && ("content" in o || "url" in o);
}
exports.isSVGImage = isSVGImage;
function _icon(a) {
    if (a && a["default"]) return a["default"];else return a;
}
exports.Feather = {
    Activity: _icon(__webpack_require__(241)),
    Users: _icon(__webpack_require__(242)),
    User: _icon(__webpack_require__(243)),
    Percent: _icon(__webpack_require__(244)),
    BarChart2: _icon(__webpack_require__(245)),
    TrendingDown: _icon(__webpack_require__(246)),
    TrendingUp: _icon(__webpack_require__(247)),
    Settings: _icon(__webpack_require__(248)),
    Phone: _icon(__webpack_require__(249)),
    Circle: _icon(__webpack_require__(250)),
    Mail: _icon(__webpack_require__(251)),
    Menu: _icon(__webpack_require__(252)),
    LogIn: _icon(__webpack_require__(253)),
    LogOut: _icon(__webpack_require__(254)),
    ShoppingCart: _icon(__webpack_require__(255)),
    Lock: _icon(__webpack_require__(256)),
    ChevronsLeft: _icon(__webpack_require__(257)),
    ChevronsRight: _icon(__webpack_require__(258)),
    ChevronLeft: _icon(__webpack_require__(259)),
    ChevronRight: _icon(__webpack_require__(260)),
    ChevronUp: _icon(__webpack_require__(261)),
    ChevronDown: _icon(__webpack_require__(262)),
    UserPlus: _icon(__webpack_require__(263)),
    PlusSquare: _icon(__webpack_require__(264)),
    MinusSquare: _icon(__webpack_require__(265)),
    Edit3: _icon(__webpack_require__(266)),
    Trash2: _icon(__webpack_require__(267)),
    Share: _icon(__webpack_require__(268)),
    Eye: _icon(__webpack_require__(269)),
    Calendar: _icon(__webpack_require__(270)),
    Minus: _icon(__webpack_require__(271)),
    CheckCircle: _icon(__webpack_require__(272)),
    X: _icon(__webpack_require__(273)),
    Download: _icon(__webpack_require__(274))
};

/***/ }),
/* 14 */,
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _assign = __webpack_require__(28);

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", { value: true });
var m = __webpack_require__(3);
var svg_icons_1 = __webpack_require__(13);

var Icon = function () {
    function Icon() {
        (0, _classCallCheck3.default)(this, Icon);
    }

    (0, _createClass3.default)(Icon, [{
        key: "view",
        value: function view(vnode) {
            var attrClone = (0, _assign2.default)({}, vnode.attrs);
            attrClone["icon"] = undefined;
            if (svg_icons_1.isSVGImage(vnode.attrs.icon)) {
                var svgHTML = "<svg viewBox=\"" + vnode.attrs.icon.viewBox + "\">" + ("<use xlink:href=\"" + vnode.attrs.icon.url + "\" />") + "</svg>";
                return m("span.icon", attrClone, m.trust(svgHTML));
            } else {
                return m("span.icon", attrClone, m.trust("<!-- no icon -->"));
            }
        }
    }]);
    return Icon;
}();

exports.default = Icon;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _regenerator = __webpack_require__(7);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

var _promise = __webpack_require__(6);

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = _promise2.default))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
var m = __webpack_require__(3);
var ModalSize;
(function (ModalSize) {
    ModalSize[ModalSize["Normal"] = 0] = "Normal";
    ModalSize[ModalSize["Small"] = 1] = "Small";
    ModalSize[ModalSize["Large"] = 2] = "Large";
})(ModalSize = exports.ModalSize || (exports.ModalSize = {}));

var ModalQueue = function () {
    function ModalQueue() {
        (0, _classCallCheck3.default)(this, ModalQueue);

        this.queue = [];
    }

    (0, _createClass3.default)(ModalQueue, [{
        key: "setListener",
        value: function setListener(listener) {
            this.newModalListener = listener;
        }
    }, {
        key: "push",
        value: function push(options) {
            var _this = this;

            return new _promise2.default(function (resolve, reject) {
                _this.queue.push({
                    resolve: resolve,
                    reject: reject,
                    render: options.render,
                    init: options.init,
                    uninit: options.uninit,
                    size: options.size || ModalSize.Normal
                });
                if (_this.newModalListener) _this.newModalListener();
            });
        }
    }, {
        key: "next",
        value: function next() {
            return this.queue.shift();
        }
    }]);
    return ModalQueue;
}();

exports.ModalQueue = ModalQueue;
exports.defaultModalQueue = new ModalQueue();
function alertModal(title, message, options) {
    return __awaiter(this, void 0, void 0, /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var hideCloseButton;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        hideCloseButton = !!options && !!options.hideCloseButton;
                        _context.next = 3;
                        return exports.defaultModalQueue.push({
                            render: function render(close) {
                                return m(".modal-container", [m(".modal-header", [m("button.btn.btn-clear.float-right", { onclick: close }), m(".modal-title.h5", title)]), m(".modal-body", m(".content", [typeof message === "function" ? message() : message])), hideCloseButton ? null : m(".modal-footer.flex-row.flex-jc-end", m("button.btn.btn-primary", {
                                    onclick: close
                                }, "Close"))]);
                            },
                            size: ModalSize.Small
                        });

                    case 3:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));
}
exports.alertModal = alertModal;
function confirmModal(title, message, labels) {
    return __awaiter(this, void 0, void 0, /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
        var _yes, _no, state;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _yes = labels && labels.yes || "Yes";
                        _no = labels && labels.no || "No";
                        _context2.next = 4;
                        return exports.defaultModalQueue.push({
                            init: function init() {
                                return { yes: false };
                            },
                            render: function render(close, state) {
                                return m(".modal-container", [m(".modal-header", [m("button.btn.btn-clear.float-right", { onclick: close }), m(".modal-title.h5", title)]), m(".modal-body", m(".content", [message])), m(".modal-footer.flex-row.flex-jc-end", [m("button.btn", {
                                    style: "margin-right: 8px",
                                    onclick: function onclick() {
                                        state.yes = false;close();
                                    }
                                }, _no), m("button.btn.btn-primary", {
                                    onclick: function onclick() {
                                        state.yes = true;close();
                                    }
                                }, _yes)])]);
                            },
                            size: ModalSize.Small
                        });

                    case 4:
                        state = _context2.sent;

                        console.log("STATE: ", state);
                        return _context2.abrupt("return", state.yes);

                    case 7:
                    case "end":
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));
}
exports.confirmModal = confirmModal;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

var _typeof2 = __webpack_require__(46);

var _typeof3 = _interopRequireDefault(_typeof2);

var _stringify = __webpack_require__(87);

var _stringify2 = _interopRequireDefault(_stringify);

var _slicedToArray2 = __webpack_require__(47);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _promise = __webpack_require__(6);

var _promise2 = _interopRequireDefault(_promise);

var _getIterator2 = __webpack_require__(18);

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", { value: true });
var api_calculator_1 = __webpack_require__(127);
var __GEN_ID_COUNTER = 0;
var MAX_BEFORE_1 = 1 - Number.MIN_VALUE;
function genId() {
    return "_elemid_-" + __GEN_ID_COUNTER++;
}
exports.genId = genId;
function bindClassFunctions(self) {
    for (var _len = arguments.length, _functions = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        _functions[_key - 1] = arguments[_key];
    }

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = (0, _getIterator3.default)(_functions), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var fn = _step.value;

            var name = fn.name;
            if (name && name.length > 0) {
                self[name] = fn.bind(self);
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
}
exports.bindClassFunctions = bindClassFunctions;
function delayms(ms) {
    return new _promise2.default(function (resolve, reject) {
        setTimeout(resolve, ms);
    });
}
exports.delayms = delayms;
function preventDefaultHandler(evt) {
    evt.preventDefault();
    return false;
}
exports.preventDefaultHandler = preventDefaultHandler;
function rgbaArrayToColorString(rgba) {
    var _rgba = (0, _slicedToArray3.default)(rgba, 3),
        r = _rgba[0],
        g = _rgba[1],
        b = _rgba[2];

    var a = typeof rgba[3] === "number" ? rgba[3] : 1.0;
    if (a >= MAX_BEFORE_1) {
        var _r = r.toString(16);
        var _g = g.toString(16);
        var _b = b.toString(16);
        var out = "#";
        if (_r.length < 2) out += "0";
        out += _r;
        if (_g.length < 2) out += "0";
        out += _g;
        if (_b.length < 2) out += "0";
        out += _b;
        return out;
    } else {
        return "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
    }
}
exports.rgbaArrayToColorString = rgbaArrayToColorString;
function deepCopy(o) {
    return JSON.parse((0, _stringify2.default)(o));
}
exports.deepCopy = deepCopy;
function calculatorTypeToText(type) {
    switch (type) {
        case api_calculator_1.CalculatorType.Mortgage:
            return "Mortgage";
        case api_calculator_1.CalculatorType.AutoLoan:
            return "Auto Loan";
        case api_calculator_1.CalculatorType.HomeEquityLoan:
            return "Home Equity Loan";
        case api_calculator_1.CalculatorType.CDLoan:
            return "CD Loan";
        case api_calculator_1.CalculatorType.MoneyMarketLoan:
            return "Money Market Loan";
        case api_calculator_1.CalculatorType.BoatRVLoan:
            return "Boat/RV Loan";
        case api_calculator_1.CalculatorType.PersonalLoan:
            return "Personal Loan";
        default:
            return "Unknown";
    }
}
exports.calculatorTypeToText = calculatorTypeToText;
function getUserLocale() {
    var language = undefined;
    if (window.navigator.languages && window.navigator.languages.length > 0) {
        language = window.navigator.languages[0];
    } else {
        if (typeof window.navigator["userLanguage"] === "string") {
            language = window.navigator["userLanguage"];
        } else if (typeof window.navigator.language === "string") {
            language = window.navigator.language;
        }
    }
    return language || "en-US";
}
exports.getUserLocale = getUserLocale;
var DATE_FORMATTER = new Intl.DateTimeFormat(getUserLocale(), {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric"
});
var TIME_FORMATTER = new Intl.DateTimeFormat(getUserLocale(), {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
});
function formatDate(d) {
    var date = (typeof d === "undefined" ? "undefined" : (0, _typeof3.default)(d)) !== "object" ? new Date(d) : d;
    return DATE_FORMATTER.format(date);
}
exports.formatDate = formatDate;
function formatDateTime(d) {
    var date = (typeof d === "undefined" ? "undefined" : (0, _typeof3.default)(d)) !== "object" ? new Date(d) : d;
    return TIME_FORMATTER.format(date);
}
exports.formatDateTime = formatDateTime;
function randIn(from, to) {
    var diff = to - from;
    return from + Math.round(Math.random() * diff);
}
exports.randIn = randIn;
function formatTerm(term) {
    if (term >= 12) {
        if (term === 12) return "1 Year";
        return (term / 12).toFixed(1).replace(/\.?0+$/, "") + " Years";
    } else {
        if (term === 1) return "1 Month";
        return term + " Months";
    }
}
exports.formatTerm = formatTerm;

var Averager = function () {
    function Averager(maxPoints) {
        (0, _classCallCheck3.default)(this, Averager);

        this.maxPoints = maxPoints;
        this.points = [];
    }

    (0, _createClass3.default)(Averager, [{
        key: "add",
        value: function add(n) {
            this.points.push(n);
            if (this.points.length > this.maxPoints) {
                this.points.shift();
            }
            if (this.points.length > 0) {
                var sum = this.points.reduce(function (acc, cur) {
                    return acc + cur;
                }, 0);
                var max = undefined;
                var min = undefined;
                this.points.forEach(function (cur) {
                    if (typeof max !== "number" || cur > max) max = cur;
                    if (typeof min !== "number" || cur < min) min = cur;
                });
                this.max = max || 0;
                this.min = min || 0;
                this.average = sum / this.points.length;
            } else {
                this.average = 0;
            }
        }
    }]);
    return Averager;
}();

exports.Averager = Averager;

/***/ }),
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", { value: true });
var api_1 = __webpack_require__(8);
var utilities_1 = __webpack_require__(17);
var app_settings_1 = __webpack_require__(279);
var isprod = "production" === "production";

var Application = function () {
    function Application() {
        (0, _classCallCheck3.default)(this, Application);
    }

    (0, _createClass3.default)(Application, null, [{
        key: "setProfilingEnabled",
        value: function setProfilingEnabled(en) {
            if (!en && Application.isProfilingEnabled) {
                Application.isProfilingEnabled = false;
                if (Application.isInProfile) {
                    console.log("Forced profiling to end.");
                    console.timeEnd("Render App");
                    Application.isInProfile = false;
                }
                if (Application.profilingElement) {
                    Application.profilingElement.textContent = "";
                }
            } else {
                Application.isProfilingEnabled = en;
            }
        }
    }, {
        key: "showSidebar",
        value: function showSidebar() {
            Application.sidebarOpen = true;
        }
    }, {
        key: "hideSidebar",
        value: function hideSidebar() {
            Application.sidebarOpen = false;
        }
    }, {
        key: "logout",
        value: function logout() {
            api_1.default.logout();
            this.isLoggedIn = false;
        }
    }, {
        key: "isMobileScreen",
        get: function get() {
            return window.innerWidth <= 600;
        }
    }, {
        key: "isDesktopScreen",
        get: function get() {
            return window.innerWidth > 600;
        }
    }]);
    return Application;
}();

Application.settings = new app_settings_1.default();
Application.sidebarOpen = false;
Application.isLoggedIn = false;
Application.showProfilingControl = !isprod;
Application.isProfilingEnabled = !isprod;
Application.isInProfile = false;
Application.profilingElement = null;
Application.profilingStartTime = 0;
Application.renderingTimeAverager = new utilities_1.Averager(60);
exports.default = Application;
if (Application.isMobileScreen) {
    Application.setProfilingEnabled(false);
}

/***/ }),
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _promise = __webpack_require__(6);

var _promise2 = _interopRequireDefault(_promise);

var _typeof2 = __webpack_require__(46);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", { value: true });
var timers_1 = __webpack_require__(121);
function deepEqualityCheck(a, b) {
    var skipfn = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    if ((typeof a === "undefined" ? "undefined" : (0, _typeof3.default)(a)) !== (typeof b === "undefined" ? "undefined" : (0, _typeof3.default)(b))) {
        return false;
    } else if ((typeof a === "undefined" ? "undefined" : (0, _typeof3.default)(a)) === "object") {
        var _stack = [a, b];
        while (_stack.length > 0) {
            var objectA = _stack.pop();
            var objectB = _stack.pop();
            for (var keyA in objectA) {
                var valueA = objectA[keyA];
                var valueB = objectB[keyA];
                if ((typeof valueA === "undefined" ? "undefined" : (0, _typeof3.default)(valueA)) !== (typeof valueB === "undefined" ? "undefined" : (0, _typeof3.default)(valueB))) {
                    return false;
                } else if (typeof valueA === "function" && skipfn) {
                    continue;
                } else if ((typeof valueA === "undefined" ? "undefined" : (0, _typeof3.default)(valueA)) === "object") {
                    _stack.push(valueA);
                    _stack.push(valueB);
                } else if (valueA !== valueB) {
                    return false;
                }
            }
        }
        return true;
    } else {
        return a === b;
    }
}
exports.deepEqualityCheck = deepEqualityCheck;
function getCalculatorOnPage() {
    var calcInfoEncoded = window["fcalcinfoEncoded"];
    if (typeof calcInfoEncoded === "string") {
        var calcInfo = JSON.parse(atob(calcInfoEncoded));
        return calcInfo;
    }
    throw new Error("No calculator found for this page.");
}
exports.getCalculatorOnPage = getCalculatorOnPage;
function delay(ms) {
    return new _promise2.default(function (resolve) {
        return timers_1.setTimeout(resolve, ms);
    });
}
exports.delay = delay;
exports.EasingFunctions = {
    linear: function linear(t) {
        return t;
    },
    easeInQuad: function easeInQuad(t) {
        return t * t;
    },
    easeOutQuad: function easeOutQuad(t) {
        return t * (2 - t);
    },
    easeInOutQuad: function easeInOutQuad(t) {
        return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    },
    easeInCubic: function easeInCubic(t) {
        return t * t * t;
    },
    easeOutCubic: function easeOutCubic(t) {
        return --t * t * t + 1;
    },
    easeInOutCubic: function easeInOutCubic(t) {
        return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    },
    easeInQuart: function easeInQuart(t) {
        return t * t * t * t;
    },
    easeOutQuart: function easeOutQuart(t) {
        return 1 - --t * t * t * t;
    },
    easeInOutQuart: function easeInOutQuart(t) {
        return t < .5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
    },
    easeInQuint: function easeInQuint(t) {
        return t * t * t * t * t;
    },
    easeOutQuint: function easeOutQuint(t) {
        return 1 + --t * t * t * t * t;
    },
    easeInOutQuint: function easeInOutQuint(t) {
        return t < .5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
    }
};
function __easeValue_impl(callback, start, end, startTime, ms, frameDelay, easeFn, onEnd, cancel) {
    if (cancel && cancel.cancel) {
        return;
    }
    var now = Date.now();
    var elapsed = now - startTime;
    if (elapsed >= ms) {
        callback(end);
        onEnd();
        return;
    }
    var valPercentage = easeFn(ms == 0 ? 0 : elapsed / ms);
    callback(start + (end - start) * valPercentage);
    if (frameDelay <= 0) {
        requestAnimationFrame(function () {
            return __easeValue_impl(callback, start, end, startTime, ms, frameDelay, easeFn, onEnd);
        });
    } else {
        timers_1.setTimeout(function () {
            return __easeValue_impl(callback, start, end, startTime, ms, frameDelay, easeFn, onEnd);
        }, frameDelay);
    }
}
function easeValue(callback, start, end, ms) {
    var frameDelay = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
    var easeFn = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : exports.EasingFunctions.linear;
    var cancel = arguments[6];

    return new _promise2.default(function (resolve) {
        __easeValue_impl(callback, start, end, Date.now(), ms, frameDelay, easeFn, resolve, cancel);
    });
}
exports.easeValue = easeValue;
window["EasingFunctions"] = exports.EasingFunctions;
window["easeValue"] = easeValue;
function hashCode(str) {
    var h = 0;
    var len = str.length;
    for (var idx = 0; idx < len; idx++) {
        var ch = str.charCodeAt(idx);
        h = 31 * h + ch;
    }
    return h;
}
exports.hashCode = hashCode;
function getElementCoordinates(elem) {
    var box = elem.getBoundingClientRect();
    var body = document.body;
    var docEl = document.documentElement;
    var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
    var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;
    var clientTop = docEl.clientTop || body.clientTop || 0;
    var clientLeft = docEl.clientLeft || body.clientLeft || 0;
    var top = box.top + scrollTop - clientTop;
    var left = box.left + scrollLeft - clientLeft;
    return { top: Math.round(top), left: Math.round(left) };
}
exports.getElementCoordinates = getElementCoordinates;
var idCounter = 0;
function genId() {
    return "gid-" + idCounter++;
}
exports.genId = genId;

/***/ }),
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", { value: true });
var m = __webpack_require__(3);

var FormCheckbox = function () {
    function FormCheckbox() {
        (0, _classCallCheck3.default)(this, FormCheckbox);

        this.onChange = this.onChange.bind(this);
    }

    (0, _createClass3.default)(FormCheckbox, [{
        key: "onChange",
        value: function onChange(event) {
            if (this.onChangeListener) {
                var target = event.target;
                this.onChangeListener(target.checked);
            }
        }
    }, {
        key: "oninit",
        value: function oninit(vnode) {
            this.onChangeListener = vnode.attrs.onchange;
        }
    }, {
        key: "onupdate",
        value: function onupdate(vnode) {
            this.onChangeListener = vnode.attrs.onchange;
        }
    }, {
        key: "view",
        value: function view(vnode) {
            return m("label.form-checkbox", [m("input", {
                checked: vnode.attrs.checked,
                onchange: this.onChange,
                type: "checkbox"
            }), m("i.form-icon"), vnode.children]);
        }
    }]);
    return FormCheckbox;
}();

exports.default = FormCheckbox;

/***/ }),
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _stringify = __webpack_require__(87);

var _stringify2 = _interopRequireDefault(_stringify);

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", { value: true });

var _MStorage = function () {
    function _MStorage(prefix) {
        (0, _classCallCheck3.default)(this, _MStorage);

        this.prefix = prefix;
        this.TTL_SECOND = 1000;
        this.TTL_MINUTE = 1000 * 60;
        this.TTL_HOUR = 1000 * 60 * 60;
        this.TTL_DAY = 1000 * 60 * 60 * 24;
        this.TTL_WEEK = 1000 * 60 * 60 * 24 * 7;
    }

    (0, _createClass3.default)(_MStorage, [{
        key: "getAll",
        value: function getAll() {
            var includeMetadata = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            var pref = this.prefix + ":";
            var output = {};
            for (var key in localStorage) {
                if (key.startsWith(pref)) {
                    if (!includeMetadata) {
                        if (key.endsWith("::~ttl")) {
                            continue;
                        }
                    }
                    var realKey = key.substr(pref.length);
                    var value = localStorage[key];
                    output[realKey] = JSON.parse(value);
                }
            }
            return output;
        }
    }, {
        key: "set",
        value: function set(key, value) {
            var json = (0, _stringify2.default)(value);
            localStorage.setItem(this.prefix + ":" + key, json);
        }
    }, {
        key: "get",
        value: function get(key) {
            var json = localStorage.getItem(this.prefix + ":" + key);
            if (json) {
                try {
                    return JSON.parse(json);
                } catch (e) {
                    console.error("Error while parsing JSON for item \"" + this.prefix + ":" + key + "\"", e);
                    localStorage.removeItem(this.prefix + ":" + key);
                }
            }
            return undefined;
        }
    }, {
        key: "ttlSet",
        value: function ttlSet(key, ttl, value) {
            var ttlObj = { storedTime: Date.now(), expiresIn: ttl };
            this.set(key, value);
            this.set(key + "::~ttl", ttlObj);
        }
    }, {
        key: "ttlGet",
        value: function ttlGet(key) {
            var ttlObj = this.get(key + "::~ttl");
            if (ttlObj) {
                var now = Date.now();
                if (now > ttlObj.storedTime + ttlObj.expiresIn) {
                    this.ttlRemove(key);
                    return undefined;
                }
            }
            return this.get(key);
        }
    }, {
        key: "ttlGetWithTTL",
        value: function ttlGetWithTTL(key) {
            var ttlObj = this.get(key + "::~ttl");
            if (ttlObj) {
                var now = Date.now();
                if (now > ttlObj.storedTime + ttlObj.expiresIn) {
                    this.ttlRemove(key);
                    return [undefined, ttlObj];
                }
            }
            return [this.get(key), ttlObj];
        }
    }, {
        key: "ttlRemove",
        value: function ttlRemove(key) {
            this.remove(key + "::~ttl");
            this.remove(key);
        }
    }, {
        key: "getRaw",
        value: function getRaw(key) {
            var json = localStorage.getItem(this.prefix + ":" + key);
            if (json) return json;else return undefined;
        }
    }, {
        key: "remove",
        value: function remove(key) {
            localStorage.removeItem(this.prefix + ":" + key);
        }
    }, {
        key: "all",
        get: function get() {
            return this.getAll(false);
        }
    }]);
    return _MStorage;
}();

exports._MStorage = _MStorage;
exports.default = new _MStorage("fincalc");

/***/ }),
/* 63 */,
/* 64 */,
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _getIterator2 = __webpack_require__(18);

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", { value: true });
var date_fns_1 = __webpack_require__(50);
var fillArray = function () {
    if (typeof Array.prototype.fill === "function") {
        return function (arr, fillWith) {
            return arr.fill(fillWith);
        };
    } else {
        return function (arr, fillWith) {
            var len = arr.length;
            for (var idx = 0; idx < len; idx++) {
                arr[idx] = fillWith;
            }
        };
    }
}();
function createEventsReport(eventCounts) {
    var startDay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    var endDay = arguments[2];

    if (eventCounts.length < 1) {
        return {
            labels: [],
            visits: [], engagements: [], conversions: [],
            visitsSum: 0, engagementsSum: 0, conversionsSum: 0
        };
    }
    var firstEventCreateDate = eventCounts[0].created_at;
    var endDayL = endDay || date_fns_1.getDaysInMonth(firstEventCreateDate);
    var report = {
        labels: new Array(endDayL - startDay + 1),
        visits: new Array(endDayL - startDay + 1),
        engagements: new Array(endDayL - startDay + 1),
        conversions: new Array(endDayL - startDay + 1),
        visitsSum: 0,
        engagementsSum: 0,
        conversionsSum: 0
    };
    fillArray(report.visits, 0);
    fillArray(report.engagements, 0);
    fillArray(report.conversions, 0);
    for (var d = startDay; d <= endDayL; d++) {
        report.labels[d - startDay] = date_fns_1.setDate(firstEventCreateDate, d).toLocaleDateString();
    }
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = (0, _getIterator3.default)(eventCounts), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var eventCount = _step.value;

            if (eventCount.event_type === "visit") {
                report.visits[eventCount.created_at.getDate() - startDay] += eventCount.event_count;
                report.visitsSum++;
            } else if (eventCount.event_type === "engagement") {
                report.engagements[eventCount.created_at.getDate() - startDay] += eventCount.event_count;
                report.engagementsSum++;
            } else if (eventCount.event_type === "conversion") {
                report.conversions[eventCount.created_at.getDate() - startDay] += eventCount.event_count;
                report.conversionsSum++;
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    return report;
}
exports.createEventsReport = createEventsReport;
function toFixedEventCount(eventCount) {
    return {
        event_type: eventCount.event_type,
        event_count: parseInt(eventCount.event_count),
        created_at: new Date(eventCount.created_at)
    };
}
exports.toFixedEventCount = toFixedEventCount;
function sumToDay(currentDay, current, previous) {
    var maxIdxCurrent = Math.min(currentDay, current.length);
    var maxIdxPrev = Math.min(currentDay, previous.length);
    var currentSum = 0;
    var previousSum = 0;
    var _max = Math.max(maxIdxCurrent, maxIdxPrev);
    for (var idx = 0; idx < _max; idx++) {
        if (idx < maxIdxCurrent) currentSum += current[idx];
        if (idx < maxIdxPrev) previousSum += previous[idx];
    }
    return [currentSum, previousSum];
}
exports.sumToDay = sumToDay;

/***/ }),
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", { value: true });
var m = __webpack_require__(3);
var Breadcrumbs_1 = __webpack_require__(102);

var Header = function () {
    function Header() {
        (0, _classCallCheck3.default)(this, Header);
    }

    (0, _createClass3.default)(Header, [{
        key: "view",
        value: function view(vnode) {
            var breadcrumbs = vnode.attrs.crumbs ? m(Breadcrumbs_1.default, {
                style: "margin: 16px;"
            }, vnode.attrs.crumbs.map(function (c) {
                if (typeof c === "string") {
                    return c;
                } else {
                    if (c.href) {
                        return m("a", { href: c.href, oncreate: m.route.link }, c.title);
                    } else {
                        return c.title;
                    }
                }
            })) : null;
            var hasActions = !!vnode.attrs.actions;
            var header = m("h3.line-height-1", {
                style: hasActions ? "" : "margin: 16px;"
            }, [m("span", { style: "display: block;" }, [vnode.attrs.title, vnode.attrs.loading ? m("span.loading", { style: "margin-left: 16px;" }) : null]), vnode.attrs.subtitle ? m("small.small-smaller.muted-color", vnode.attrs.subtitle) : null]);
            if (hasActions) {
                return m("div", [breadcrumbs, m(".flex-row.flex-wrap", {
                    style: "margin: 16px;"
                }, [header, m("div", { style: "flex: 1;" }), m("div", {}, vnode.attrs.actions)])]);
            } else {
                return m("div", [breadcrumbs, header]);
            }
        }
    }]);
    return Header;
}();

exports.Header = Header;
exports.default = Header;

/***/ }),
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _regenerator = __webpack_require__(7);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = __webpack_require__(6);

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = _promise2.default))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
var storage_1 = __webpack_require__(62);
var api_1 = __webpack_require__(8);
var modal_1 = __webpack_require__(16);
exports.loadedSchemas = undefined;
function getStoredSchemas() {
    var storedSchemas = storage_1.default.ttlGet("cached-calc-schema");
    if (storedSchemas) {
        exports.loadedSchemas = storedSchemas;
    }
    return storedSchemas;
}
exports.getStoredSchemas = getStoredSchemas;
function loadSchemas() {
    return __awaiter(this, void 0, void 0, /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var response;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;
                        _context.next = 3;
                        return api_1.default.getSchema();

                    case 3:
                        response = _context.sent;

                        if (!response.success) {
                            _context.next = 10;
                            break;
                        }

                        exports.loadedSchemas = response.data;
                        storage_1.default.ttlSet("cached-calc-schema", storage_1.default.TTL_HOUR, response.data);
                        return _context.abrupt("return", response.data);

                    case 10:
                        console.error("Error retrieving calculator schemas: ", response.errors);
                        modal_1.alertModal("Error", "There was an error retrieving the different types of calculators.");

                    case 12:
                        _context.next = 18;
                        break;

                    case 14:
                        _context.prev = 14;
                        _context.t0 = _context["catch"](0);

                        console.error("Error retrieving calculator schemas: ", _context.t0);
                        modal_1.alertModal("Error", "There was an error retrieving the different types of calculators.");

                    case 18:
                        return _context.abrupt("return", undefined);

                    case 19:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this, [[0, 14]]);
    }));
}
exports.loadSchemas = loadSchemas;
function getSchemaByNameAsync(name) {
    return __awaiter(this, void 0, void 0, /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        if (exports.loadedSchemas) {
                            _context2.next = 7;
                            break;
                        }

                        getStoredSchemas();

                        if (exports.loadedSchemas) {
                            _context2.next = 7;
                            break;
                        }

                        _context2.next = 5;
                        return loadSchemas();

                    case 5:
                        if (exports.loadedSchemas) {
                            _context2.next = 7;
                            break;
                        }

                        return _context2.abrupt("return", undefined);

                    case 7:
                        return _context2.abrupt("return", exports.loadedSchemas[name]);

                    case 8:
                    case "end":
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));
}
exports.getSchemaByNameAsync = getSchemaByNameAsync;
function getSchemaByName(name) {
    if (exports.loadedSchemas) {
        return exports.loadedSchemas[name];
    } else {
        return undefined;
    }
}
exports.getSchemaByName = getSchemaByName;

/***/ }),
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", { value: true });
var m = __webpack_require__(3);
var ChartWidget_1 = __webpack_require__(130);

var ReportsGraph = function () {
    function ReportsGraph() {
        (0, _classCallCheck3.default)(this, ReportsGraph);

        this.loading = false;
        this.labels = [];
        this.visitsDataSet = null;
        this.engagementsDataSet = null;
        this.conversionsDataSet = null;
        this.dataVersion = 0;
        this._currentData = null;
    }

    (0, _createClass3.default)(ReportsGraph, [{
        key: "formatData",
        value: function formatData() {
            if (this._currentData) {
                this.labels = this._currentData.labels;
                this.visitsDataSet = {
                    label: "Visits",
                    data: this._currentData.visits,
                    backgroundColor: "#f03e3e",
                    fill: "origin"
                };
                this.engagementsDataSet = {
                    label: "Engagements",
                    data: this._currentData.engagements,
                    backgroundColor: "#37b24d",
                    fill: "origin"
                };
                this.conversionsDataSet = {
                    label: "Conversions",
                    data: this._currentData.conversions,
                    backgroundColor: "#1c7cd6",
                    fill: "origin"
                };
            } else {
                this.labels = [];
                this.visitsDataSet = null;
                this.engagementsDataSet = null;
                this.conversionsDataSet = null;
            }
        }
    }, {
        key: "oninit",
        value: function oninit(vnode) {
            if (vnode.attrs.data !== this._currentData) {
                this._currentData = vnode.attrs.data || null;
                this.formatData();
                this.dataVersion++;
            }
        }
    }, {
        key: "onbeforeupdate",
        value: function onbeforeupdate(vnode) {
            if (vnode.attrs.data !== this._currentData) {
                this._currentData = vnode.attrs.data || null;
                this.formatData();
                this.dataVersion++;
            }
        }
    }, {
        key: "view",
        value: function view(vnode) {
            var dataSets = [];
            if (this.conversionsDataSet) dataSets.push(this.conversionsDataSet);
            if (this.engagementsDataSet) dataSets.push(this.engagementsDataSet);
            if (this.visitsDataSet) dataSets.push(this.visitsDataSet);
            return m(ChartWidget_1.ChartWidget, {
                labels: this.labels,
                datasets: dataSets,
                dataVersion: this.dataVersion,
                type: "line",
                domAttrs: {}
            });
        }
    }]);
    return ReportsGraph;
}();

exports.ReportsGraph = ReportsGraph;
exports.default = ReportsGraph;

/***/ }),
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", { value: true });
var m = __webpack_require__(3);
function childToBreadcrumb(child) {
    return m("li.breadcrumb-item", child);
}

var Breadcrumbs = function () {
    function Breadcrumbs() {
        (0, _classCallCheck3.default)(this, Breadcrumbs);
    }

    (0, _createClass3.default)(Breadcrumbs, [{
        key: "view",
        value: function view(vnode) {
            var _children = null;
            if (vnode.children) {
                if (Array.isArray(vnode.children)) {
                    _children = vnode.children.map(childToBreadcrumb);
                } else {
                    _children = childToBreadcrumb(vnode.children);
                }
            }
            return m("ul.breadcrumb", vnode.attrs, _children);
        }
    }]);
    return Breadcrumbs;
}();

exports.default = Breadcrumbs;

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray2 = __webpack_require__(47);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", { value: true });
var m = __webpack_require__(3);
var flatpickr = __webpack_require__(478);
var Icon_1 = __webpack_require__(15);
var svg_icons_1 = __webpack_require__(13);

var DateRangePicker = function () {
    function DateRangePicker() {
        (0, _classCallCheck3.default)(this, DateRangePicker);

        this.startDate = new Date();
        this.endDate = new Date();
        this.onDateChange = undefined;
    }

    (0, _createClass3.default)(DateRangePicker, [{
        key: "oninit",
        value: function oninit(vnode) {
            this.onDateChange = vnode.attrs.onChange;
        }
    }, {
        key: "getInputElement",
        value: function getInputElement(vnode) {
            if (vnode.attrs.icon) {
                return vnode.dom.firstChild;
            } else {
                return vnode.dom;
            }
        }
    }, {
        key: "oncreate",
        value: function oncreate(vnode) {
            var _this = this;

            if (this.picker) {
                this.picker.destroy();
            }
            var inputElem = this.getInputElement(vnode);
            this.picker = flatpickr(inputElem, {
                mode: "range",
                onChange: function onChange(_ref) {
                    var _ref2 = (0, _slicedToArray3.default)(_ref, 2),
                        startDate = _ref2[0],
                        endDate = _ref2[1];

                    if (startDate && endDate) {
                        if (_this.onDateChange) {
                            _this.onDateChange(startDate, endDate);
                        }
                    }
                }
            });
            this.picker.setDate([this.startDate, this.endDate]);
        }
    }, {
        key: "onremove",
        value: function onremove(vnode) {
            if (this.picker) {
                this.picker.destroy();
                this.picker = null;
            }
        }
    }, {
        key: "onbeforeupdate",
        value: function onbeforeupdate(vnode) {
            if (!this.dateeq(vnode.attrs.startDate, this.startDate) || !this.dateeq(vnode.attrs.endDate, this.endDate)) {
                this.startDate = vnode.attrs.startDate || new Date();
                this.endDate = vnode.attrs.endDate || new Date();
                if (this.picker) {
                    this.picker.setDate([this.startDate, this.endDate]);
                }
            }
            this.onDateChange = vnode.attrs.onChange;
        }
    }, {
        key: "dateeq",
        value: function dateeq(a, b) {
            if (!!a && !!b) {
                if (a.getTime() !== b.getTime()) {
                    return false;
                }
                return true;
            } else {
                return false;
            }
        }
    }, {
        key: "view",
        value: function view(vnode) {
            if (vnode.attrs.icon) {
                return m(".has-icon-left.has-icon-right", [m("input.form-input", vnode.attrs.domattrs || {}, []), m(Icon_1.default, { icon: svg_icons_1.Feather.Calendar, class: "form-icon icon-left" }), m(Icon_1.default, { icon: svg_icons_1.Feather.ChevronDown, class: "form-icon icon-right" })]);
            } else {
                return m(".has-icon-right", [m("input.form-input", vnode.attrs.domattrs || {}, []), m(Icon_1.default, { icon: svg_icons_1.Feather.ChevronDown, class: "form-icon icon-right" })]);
            }
        }
    }]);
    return DateRangePicker;
}();

exports.DateRangePicker = DateRangePicker;
exports.default = DateRangePicker;

/***/ }),
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
exports.API_ORIGIN = window.location.origin;
exports.API_ROOT = exports.API_ORIGIN + "/api";

/***/ }),
/* 121 */,
/* 122 */,
/* 123 */,
/* 124 */,
/* 125 */,
/* 126 */,
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function __export(m) {
    for (var p in m) {
        if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(128));

/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function __export(m) {
    for (var p in m) {
        if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(278));

/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var Stream = __webpack_require__(282);
var CurrentUser = {
    id: "",
    first_name: "",
    last_name: "",
    profile_img: null,
    active: false
};
exports.CurrentUserStream = Stream(CurrentUser);

/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _assign = __webpack_require__(28);

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", { value: true });
var Chart = __webpack_require__(293);
var m = __webpack_require__(3);

var ChartWidget = function () {
    function ChartWidget() {
        (0, _classCallCheck3.default)(this, ChartWidget);
    }

    (0, _createClass3.default)(ChartWidget, [{
        key: "oncreate",
        value: function oncreate(vnode) {
            var canvasElement = vnode.dom.getElementsByTagName("canvas")[0];
            this.chart = new Chart(canvasElement, {
                type: vnode.attrs.type,
                data: {
                    labels: vnode.attrs.labels,
                    datasets: vnode.attrs.datasets
                }
            });
        }
    }, {
        key: "onbeforeremove",
        value: function onbeforeremove(vnode) {
            this.chart.destroy();
            this.chart = undefined;
        }
    }, {
        key: "onbeforeupdate",
        value: function onbeforeupdate(vnode, oldVnode) {
            if (vnode.attrs.dataVersion !== oldVnode.attrs.dataVersion) {
                this.chart.data.labels = vnode.attrs.labels;
                this.chart.data.datasets = vnode.attrs.datasets;
                this.chart.update();
            }
        }
    }, {
        key: "view",
        value: function view(vnode) {
            return m("div", {
                style: "position: relative;"
            }, m("canvas", (0, _assign2.default)({}, vnode.attrs.domAttrs)));
        }
    }]);
    return ChartWidget;
}();

exports.ChartWidget = ChartWidget;
exports.default = ChartWidget;

/***/ }),
/* 131 */,
/* 132 */,
/* 133 */,
/* 134 */,
/* 135 */,
/* 136 */,
/* 137 */,
/* 138 */,
/* 139 */,
/* 140 */,
/* 141 */,
/* 142 */,
/* 143 */,
/* 144 */,
/* 145 */,
/* 146 */,
/* 147 */,
/* 148 */,
/* 149 */,
/* 150 */,
/* 151 */,
/* 152 */,
/* 153 */,
/* 154 */,
/* 155 */,
/* 156 */,
/* 157 */,
/* 158 */,
/* 159 */,
/* 160 */,
/* 161 */,
/* 162 */,
/* 163 */,
/* 164 */,
/* 165 */,
/* 166 */,
/* 167 */,
/* 168 */,
/* 169 */,
/* 170 */,
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray2 = __webpack_require__(47);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", { value: true });
var parseColor = __webpack_require__(170);
function loadStylesheet(sheetId, source) {
    var found = document.querySelector("head > style[data-sheetId=\"" + sheetId + "\"]");
    if (found) {
        found.innerHTML = source;
        console.log("Found and replaced stylesheet.");
    } else {
        var headElement = document.getElementsByTagName("head")[0];
        var styleElement = document.createElement("style");
        styleElement.setAttribute("data-sheetId", sheetId);
        styleElement.innerHTML = source;
        headElement.appendChild(styleElement);
        console.log("Added new stylesheet.");
    }
}
exports.loadStylesheet = loadStylesheet;
function unloadStylesheet(sheetId) {
    var found = document.querySelector("head > style[data-sheetId=\"" + sheetId + "\"]");
    if (found) {
        var parent = found.parentNode;
        if (parent) {
            parent.removeChild(found);
        }
    }
}
exports.unloadStylesheet = unloadStylesheet;
function loadCalculatorStyle(calculator) {
    var colors = calculator.colors.reduce(function (acc, prop) {
        var parsed = parseColor(prop.color);
        var color = colorstring(parsed);
        acc[prop.property] = color;
        acc[prop.property + "_rgba"] = parsed || [0, 0, 0, 0];
        return acc;
    }, {});
    var primaryColor = colors["primaryColor"];
    var backgroundColor = colors["bgColor"];
    var textColor = colors["textColor"];
    var primaryColorRGB = colors["primaryColor_rgba"];
    var primaryColorDark = colorstring(darken(primaryColorRGB, 3));
    var primaryColorLight = colorstring(lighten(primaryColorRGB, 3));
    var secondaryColor = colorstring(lighten(primaryColorRGB, 37.5));
    var shadowColor = "rgba(" + primaryColorRGB[0] + ", " + primaryColorRGB[1] + ", " + primaryColorRGB[2] + ", 0.2)";
    console.log("values: ", {
        primaryColor: primaryColor,
        primaryColorDark: primaryColorDark,
        primaryColorLight: primaryColorLight,
        secondaryColor: secondaryColor,
        primaryColorRGB: primaryColorRGB,
        shadowColor: shadowColor
    });
    loadStylesheet("fcalc-calc-style", "\n.fcalc.fcalc-calc-style {\n    background-color: " + backgroundColor + ";\n    color: " + textColor + ";\n}\n\n.fcalc-calc-style.btn.btn-primary {\n    background-color: " + primaryColor + ";\n    border-color: " + primaryColor + ";\n}\n\n.fcalc-calc-style.label.label-primary {\n    background-color: " + primaryColor + ";\n}\n\n.fcalc-calc-style .noUi-handle {\n    border-color: " + primaryColor + ";\n}\n\n.fcalc-calc-style .noUi-connect {\n    background-color: " + primaryColor + ";\n}\n\n/* Control Shadow */\n.fcalc-calc-style.btn:focus {\n    box-shadow: 0 0 0 .1rem " + shadowColor + ";\n}\n.fcalc-calc-style.form-input:focus {\n    border-color: " + primaryColor + ";\n    box-shadow: 0 0 0 .1rem " + shadowColor + ";\n}\n.fcalc-calc-style.form-select:focus {\n    border-color: " + primaryColor + ";\n    box-shadow: 0 0 0 .1rem " + shadowColor + ";\n}\n\n.fcalc-calc-style.btn:hover {\n    background: " + secondaryColor + ";\n    border-color: " + primaryColorDark + ";\n}\n\n.fcalc-calc-style.btn.btn-primary:hover {\n    background-color: " + primaryColorLight + ";\n    border-color: " + primaryColor + ";\n}\n    ");
}
exports.loadCalculatorStyle = loadCalculatorStyle;
function unloadCalculatorStyle(calculator) {
    unloadStylesheet("fcalc-calc-style");
}
exports.unloadCalculatorStyle = unloadCalculatorStyle;
function colorstring(rgba) {
    if (rgba === null) {
        return "rgb(0, 0, 0)";
    } else {
        if (rgba[3] >= 1 - Number.MIN_VALUE || typeof rgba[2] !== "number") {
            return "rgb(" + rgba[0] + ", " + rgba[1] + ", " + rgba[2] + ")";
        } else {
            return "rgba(" + rgba[0] + ", " + rgba[1] + ", " + rgba[2] + ", " + rgba[3] + ")";
        }
    }
}
function lighten(rgba, l) {
    var hsl = rgba2hsla(rgba);
    hsl[2] = Math.min(100, hsl[2] + l);
    return hsla2rgba(hsl);
}
function darken(rgba, l) {
    var hsl = rgba2hsla(rgba);
    hsl[2] = Math.max(0, hsl[2] - l);
    return hsla2rgba(hsl);
}
function rgba2hsla(rgba) {
    var _rgba = (0, _slicedToArray3.default)(rgba, 4),
        r = _rgba[0],
        g = _rgba[1],
        b = _rgba[2],
        a = _rgba[3];

    var rp = r / 255;
    var gp = g / 255;
    var bp = b / 255;
    var cmax = Math.max(Math.max(rp, gp), bp);
    var cmin = Math.min(Math.min(rp, gp), bp);
    var delta = cmax - cmin;
    var l = (cmax + cmin) / 2;
    var s = 0;
    var h = 0;
    if (delta > Number.MIN_VALUE) {
        s = delta / (1 - Math.abs(2 * l - 1));
        if (cmax === rp) {
            h = 60 * ((gp - bp) / delta % 6);
        } else if (cmax === gp) {
            h = 60 * ((bp - rp) / delta + 2);
        } else if (cmax === bp) {
            h = 60 * ((rp - gp) / delta + 4);
        }
    }
    return [h, s * 100, l * 100, a];
}
function hsla2rgba(hsla) {
    var _hsla = (0, _slicedToArray3.default)(hsla, 4),
        h = _hsla[0],
        s = _hsla[1],
        l = _hsla[2],
        a = _hsla[3];

    h = Math.min(Math.max(h, 0), 360 - Number.MIN_VALUE);
    s = Math.min(Math.max(s, 0), 100) / 100;
    l = Math.min(Math.max(l, 0), 100) / 100;
    var c = (1 - Math.abs(2 * l - 1)) * s;
    var x = c * (1 - Math.abs(h / 60 % 2 - 1));
    var m = l - c / 2;
    var _r = void 0,
        _g = void 0,
        _b = void 0;
    if (h < 60) {
        _r = c;
        _g = x;
        _b = 0;
    } else if (h < 120) {
        _r = x;
        _g = c;
        _b = 0;
    } else if (h < 180) {
        _r = 0;
        _g = c;
        _b = x;
    } else if (h < 240) {
        _r = 0;
        _g = x;
        _b = c;
    } else if (h < 300) {
        _r = x;
        _g = 0;
        _b = c;
    } else {
        _r = c;
        _g = 0;
        _b = x;
    }
    return [Math.round((_r + m) * 255), Math.round((_g + m) * 255), Math.round((_b + m) * 255), a];
}
function generateColorsParse(color, count) {
    return generateColors(parseColor(color) || [0, 0, 0, 1], count).map(function (col) {
        return colorstring(col);
    });
}
function generateColors(rgba, count) {
    var stepSize = 360 / count;

    var _rgba2hsla = rgba2hsla(rgba),
        _rgba2hsla2 = (0, _slicedToArray3.default)(_rgba2hsla, 4),
        h = _rgba2hsla2[0],
        s = _rgba2hsla2[1],
        l = _rgba2hsla2[2],
        a = _rgba2hsla2[3];

    var colors = [];
    for (var i = 0; i < count; i++) {
        console.log([(h + stepSize * i) % 360, s, l, a]);
        colors.push(hsla2rgba([(h + stepSize * i) % 360, s, l, a]));
    }
    return colors;
}

/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", { value: true });
var m = __webpack_require__(3);
var noUISlider = __webpack_require__(466);
var ulitiies_1 = __webpack_require__(34);

var Slider = function () {
    function Slider() {
        (0, _classCallCheck3.default)(this, Slider);

        this._dragging = false;
    }

    (0, _createClass3.default)(Slider, [{
        key: "updateHandlers",
        value: function updateHandlers(vnode) {
            if (vnode.attrs.onChange !== this.onChangeHandler) {
                this.onChangeHandler = vnode.attrs.onChange;
            }
            if (vnode.attrs.onUpdate !== this.onUpdateHandler) {
                this.onUpdateHandler = vnode.attrs.onUpdate;
            }
        }
    }, {
        key: "updateSliderOptions",
        value: function updateSliderOptions(vnode) {
            var nslider = this.getNoUISlider();
            nslider.updateOptions(this.getSliderOptionsFromVnode(vnode));
            var values = nslider.get();
            if (Array.isArray(values)) values = values.map(function (x) {
                return parseFloat(x);
            });else values = parseFloat(values);
            if (this.onChangeHandler || this.onUpdateHandler) {
                if (this.onChangeHandler) this.onChangeHandler(values);
                if (this.onUpdateHandler) this.onUpdateHandler(values);
                m.redraw();
            }
        }
    }, {
        key: "oninit",
        value: function oninit(vnode) {
            this.updateHandlers(vnode);
        }
    }, {
        key: "onbeforeupdate",
        value: function onbeforeupdate(vnode, old) {
            if (!ulitiies_1.deepEqualityCheck(vnode.attrs.options, old.attrs.options, true)) {
                this.updateSliderOptions(vnode);
            }
            if (!ulitiies_1.deepEqualityCheck(vnode.attrs.value, old.attrs.value, true)) {
                var nslider = this.getNoUISlider();
                nslider.set(vnode.attrs.value);
            }
            this.updateHandlers(vnode);
        }
    }, {
        key: "getNoUISlider",
        value: function getNoUISlider() {
            var nslider = this.slider["noUiSlider"];
            console.assert(!!nslider, "No NoUISlider found on element");
            return nslider;
        }
    }, {
        key: "attachEvents",
        value: function attachEvents(dom) {
            var _this = this;

            var nslider = this.getNoUISlider();
            nslider.on("start", function () {
                _this._dragging = true;
                _this.slider.setAttribute("data-fcalcDragging", "true");
            });
            nslider.on("end", function (values) {
                _this._dragging = false;
                _this.slider.removeAttribute("data-fcalcDragging");
                var handle = dom.querySelector('[data-handle="0"]');
                handle.setAttribute('aria-valuenow', values[0]);
            });
            nslider.on("update", function () {
                var values = nslider.get();
                if (Array.isArray(values)) values = values.map(function (x) {
                    return parseFloat(x);
                });else values = parseFloat(values);
                if (_this.onUpdateHandler) {
                    _this.onUpdateHandler(values);
                    m.redraw();
                }
            });
            nslider.on("change", function () {
                var values = nslider.get();
                if (Array.isArray(values)) values = values.map(function (x) {
                    return parseFloat(x);
                });else values = parseFloat(values);
                if (_this.onChangeHandler) {
                    _this.onChangeHandler(values);
                    m.redraw();
                }
            });
        }
    }, {
        key: "getSliderOptionsFromVnode",
        value: function getSliderOptionsFromVnode(vnode) {
            var tooltipsOption = void 0;
            if (!!vnode.attrs.options.tooltips) {
                if (!!vnode.attrs.options.tooltipsFormat) {
                    tooltipsOption = vnode.attrs.options.tooltipsFormat;
                } else {
                    tooltipsOption = true;
                }
            } else {
                tooltipsOption = false;
            }
            var min = vnode.attrs.options.range ? vnode.attrs.options.range.min || 0 : 0;
            var max = vnode.attrs.options.range ? vnode.attrs.options.range.max || 0 : 0;
            if (max <= min) {
                max = min + 1;
            }
            return {
                start: vnode.attrs.value,
                animate: true,
                step: vnode.attrs.options.step,
                range: { min: min, max: max },
                pips: vnode.attrs.options.pips,
                tooltips: tooltipsOption,
                connect: [true, false]
            };
        }
    }, {
        key: "oncreate",
        value: function oncreate(vnode) {
            this.slider = vnode.dom;
            noUISlider.create(this.slider, this.getSliderOptionsFromVnode(vnode));
            this.attachEvents(vnode.dom);
        }
    }, {
        key: "onremove",
        value: function onremove(vnode) {
            var nslider = this.getNoUISlider();
            if (nslider) {
                nslider.destroy();
            }
            this.slider = undefined;
        }
    }, {
        key: "view",
        value: function view(vnode) {
            return m(".fcalc-slider-comp.fcalc-calc-style", {
                class: vnode.attrs.options.tooltips === Slider.Tooltips.WhileDragging ? "fcalc-slider-tooltip-drag" : "",
                "data-fcalcDragging": this._dragging
            });
        }
    }]);
    return Slider;
}();

exports.Slider = Slider;
(function (Slider) {
    var Tooltips = void 0;
    (function (Tooltips) {
        Tooltips[Tooltips["Off"] = 0] = "Off";
        Tooltips[Tooltips["On"] = 2] = "On";
        Tooltips[Tooltips["WhileDragging"] = 3] = "WhileDragging";
    })(Tooltips = Slider.Tooltips || (Slider.Tooltips = {}));
})(Slider = exports.Slider || (exports.Slider = {}));
exports.default = Slider;

/***/ }),
/* 173 */,
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _assign = __webpack_require__(28);

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", { value: true });
var m = __webpack_require__(3);
var svg_icons_1 = __webpack_require__(13);
var Icon_1 = __webpack_require__(15);

var Table = function () {
    function Table() {
        (0, _classCallCheck3.default)(this, Table);

        this.isDisabled = false;
        this.onReorderHandler = undefined;
        this.onClickReorder = this.onClickReorder.bind(this);
    }

    (0, _createClass3.default)(Table, [{
        key: "processAttrs",
        value: function processAttrs(attrs) {
            this.isDisabled = !!attrs.disabled;
            if (this.onReorderHandler !== attrs.onReorder) {
                this.onReorderHandler = attrs.onReorder;
            }
        }
    }, {
        key: "oninit",
        value: function oninit(vnode) {
            this.processAttrs(vnode.attrs);
        }
    }, {
        key: "onbeforeupdate",
        value: function onbeforeupdate(vnode) {
            this.processAttrs(vnode.attrs);
        }
    }, {
        key: "onClickReorder",
        value: function onClickReorder(event) {
            event.preventDefault();
            event.stopPropagation();
            if (this.isDisabled) {
                return;
            }
            var target = event.currentTarget;
            var property = target.getAttribute("data-prop");
            var dir = target.getAttribute("data-dir");
            if (property && (dir === "desc" || dir === "asc")) {
                if (this.onReorderHandler) {
                    this.onReorderHandler({ property: property, dir: dir });
                }
            }
        }
    }, {
        key: "renderHeader",
        value: function renderHeader(headers, order) {
            var _this = this;

            if (!order) {
                if (headers.length > 0) {
                    order = { property: headers[0].property || "", dir: "desc" };
                } else {
                    order = { property: "", dir: "desc" };
                }
            }
            var tableHeaders = headers.map(function (header) {
                var _prop = header.property;
                var _dir = void 0;
                if (header.order && header.property) {
                    var headerItemContent = null;
                    if (header.property === order.property) {
                        _dir = order.dir === "desc" ? "asc" : "desc";
                        var icon = order.dir === "desc" ? svg_icons_1.Feather.ChevronDown : svg_icons_1.Feather.ChevronUp;
                        headerItemContent = [header.label + " ", m(Icon_1.default, { icon: icon })];
                    } else {
                        _dir = header.defaultDir || "asc";
                        headerItemContent = header.label;
                    }
                    return m("th", m("a", {
                        onclick: _this.onClickReorder,
                        "data-prop": _prop,
                        "data-dir": _dir,
                        style: "color: inherit",
                        href: "#",
                        disabled: _this.isDisabled
                    }, headerItemContent));
                } else {
                    return m("th", header);
                }
            });
            return m("thead", m("tr", tableHeaders));
        }
    }, {
        key: "renderContent",
        value: function renderContent(headers, items, minRows) {
            var rowsRendered = 0;
            var rows = items.map(function (item) {
                var columns = headers.map(function (header) {
                    var val = header.property ? item[header.property] : null;
                    if (header.extract) return m("td", header.extract(val, item));else return m("td", val);
                });
                rowsRendered++;
                return m("tr", columns);
            });
            if (rowsRendered < minRows) {
                this.renderEmptyRows(minRows - rowsRendered, headers.length, rows);
            }
            return m("tbody", rows);
        }
    }, {
        key: "renderEmptyRows",
        value: function renderEmptyRows(count, columns) {
            var out = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

            for (var i = 0; i < count; i++) {
                var cols = [];
                for (var _i = 0; _i < columns; _i++) {
                    cols.push(m("td", m.trust("&nbsp;")));
                }
                out.push(m("tr", cols));
            }
            return out;
        }
    }, {
        key: "getClassList",
        value: function getClassList(attrs) {
            var classList = "table";
            if (attrs.striped) classList += " table-striped";
            if (attrs.hover) classList += " table-hover";
            if (attrs.pointer) classList += " table-pointer";
            return classList;
        }
    }, {
        key: "view",
        value: function view(vnode) {
            var hasItems = vnode.attrs.items && vnode.attrs.items.length > 0;
            var content = hasItems ? this.renderContent(vnode.attrs.headers, vnode.attrs.items, vnode.attrs.minRows || 0) : vnode.attrs.renderEmpty ? vnode.attrs.renderEmpty() : m("tbody", this.renderEmptyRows(vnode.attrs.minRows || 0, vnode.attrs.headers.length));
            var header = this.renderHeader(vnode.attrs.headers, vnode.attrs.ordering);
            return m("table", (0, _assign2.default)({ class: this.getClassList(vnode.attrs) }, vnode.attrs.domAttrs), [header, content]);
        }
    }]);
    return Table;
}();

exports.Table = Table;
exports.default = Table;

/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _isFinite = __webpack_require__(173);

var _isFinite2 = _interopRequireDefault(_isFinite);

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", { value: true });
var m = __webpack_require__(3);
var mx = __webpack_require__(10);

var Pagination = function () {
    function Pagination() {
        var _this = this;

        (0, _classCallCheck3.default)(this, Pagination);

        this.onPageClickHandler = null;
        this.onClickLifeCycle = mx.route.createLinkFn(function (event) {
            _this.onClickLink(event);
            return true;
        });
        this.noNavigation = false;
        this.onClickLink = this.onClickLink.bind(this);
    }

    (0, _createClass3.default)(Pagination, [{
        key: "onClickLink",
        value: function onClickLink(event) {
            if (this.noNavigation) {
                event.preventDefault();
            }
            if (this.onPageClickHandler) {
                var currentTarget = event.currentTarget;
                var dataPage = currentTarget.getAttribute("data-page");
                if (dataPage) {
                    var pageNumber = parseInt(dataPage);
                    if ((0, _isFinite2.default)(pageNumber)) {
                        this.onPageClickHandler(pageNumber, event);
                    }
                }
            }
        }
    }, {
        key: "oninit",
        value: function oninit(vnode) {
            if (vnode.attrs.noNavigation) {
                this.onClickLifeCycle = function () {
                    return function () {
                        return undefined;
                    };
                };
                this.noNavigation = true;
            }
            this.onPageClickHandler = vnode.attrs.onPageClick || null;
        }
    }, {
        key: "onupdate",
        value: function onupdate(vnode) {
            this.onPageClickHandler = vnode.attrs.onPageClick || null;
        }
    }, {
        key: "view",
        value: function view(vnode) {
            var attrs = vnode.attrs;
            var pageItems = [];
            var curRoute = m.route.get();
            var createLink = attrs.createLink || function (page) {
                return curRoute;
            };
            if (attrs.prevAndNextButtons) {
                pageItems.push(m("li.page-item", {
                    class: attrs.currentPage <= 1 ? "disabled" : ""
                }, m("a", {
                    onclick: this.onClickLink,
                    href: createLink(attrs.currentPage - 1),
                    oncreate: this.onClickLifeCycle,
                    "data-page": attrs.currentPage <= 1 ? "" : "" + (attrs.currentPage - 1)
                }, "Prev")));
            }
            var pageStart = void 0;
            if (attrs.pageCount >= attrs.pagesDisplayed) {
                pageStart = Math.min(attrs.currentPage, attrs.pageCount - attrs.pagesDisplayed + 1);
            } else {
                pageStart = attrs.currentPage;
            }
            var showJumpToEnd = pageStart + attrs.pagesDisplayed < attrs.pageCount;
            var pageEnd = showJumpToEnd ? attrs.currentPage + attrs.pagesDisplayed - 2 : Math.min(attrs.currentPage + attrs.pagesDisplayed + 1, attrs.pageCount);
            for (var pageIdx = pageStart; pageIdx <= pageEnd; pageIdx++) {
                pageItems.push(m("li.page-item", {
                    class: pageIdx === attrs.currentPage ? "disabled" : ""
                }, m("a", {
                    onclick: this.onClickLink,
                    href: createLink(pageIdx),
                    oncreate: this.onClickLifeCycle,
                    "data-page": "" + pageIdx
                }, pageIdx)));
            }
            if (showJumpToEnd) {
                pageItems.push(m("li.page-item", m("span", "...")));
                pageItems.push(m("li.page-item", m("a", {
                    onclick: this.onClickLink,
                    href: createLink(attrs.pageCount),
                    oncreate: this.onClickLifeCycle,
                    "data-page": "" + attrs.pageCount
                }, "" + attrs.pageCount)));
            }
            if (attrs.prevAndNextButtons) {
                pageItems.push(m("li.page-item", {
                    class: attrs.currentPage >= attrs.pageCount ? "disabled" : ""
                }, m("a", {
                    onclick: this.onClickLink,
                    href: createLink(attrs.currentPage + 1),
                    oncreate: this.onClickLifeCycle,
                    "data-page": attrs.currentPage >= attrs.pageCount ? "" : "" + (attrs.currentPage + 1)
                }, "Next")));
            }
            return m("ul.pagination", pageItems);
        }
    }]);
    return Pagination;
}();

exports.Pagination = Pagination;
exports.default = Pagination;

/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _assign = __webpack_require__(28);

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(106);
__webpack_require__(106);
__webpack_require__(79);
__webpack_require__(214);
var m = __webpack_require__(3);
var mx = __webpack_require__(10);
var App_1 = __webpack_require__(239);
var Placeholder_1 = __webpack_require__(287);
var Application_1 = __webpack_require__(30);
var About_1 = __webpack_require__(288);
var Login_1 = __webpack_require__(289);
var Signup_1 = __webpack_require__(290);
var OverviewScreen_1 = __webpack_require__(291);
var CalculatorScreen_1 = __webpack_require__(445);
var SettingsScreen_1 = __webpack_require__(480);
var LeadScreens = __webpack_require__(491);
var storage_1 = __webpack_require__(62);
var api_1 = __webpack_require__(8);
var ReportsScreen_1 = __webpack_require__(497);
window.mstorage = storage_1.default;
window.API = api_1.default;
if (Application_1.default.isDesktopScreen) {
    Application_1.default.sidebarOpen = true;
}
function _render(attrs, screenFn) {
    return {
        render: function render() {
            return m(App_1.default, (0, _assign2.default)({}, attrs, { screenFn: screenFn }));
        }
    };
}
function _renderAuth(screenFn) {
    return {
        render: function render() {
            if (!m.route.get().startsWith("/login")) {
                if (!Application_1.default.isLoggedIn) {
                    return m(App_1.default, { sidebar: false, screenFn: function screenFn() {
                            return m(Login_1.default, { rerouteTo: m.route.get() });
                        }
                    });
                }
            }
            return m(App_1.default, { sidebar: true, toolbar: true, screenFn: screenFn });
        }
    };
}
function _renderDefault(screenFn) {
    return _render({ sidebar: true, toolbar: true }, screenFn);
}
function _redirect(to) {
    return {
        oninit: function oninit() {
            m.route.set(to);
        },
        view: function view() {
            return null;
        }
    };
}
var appElement = document.getElementById("app-container");
m.route(appElement, "/", {
    "/": _redirect("/login"),
    "/login": _render({ sidebar: false }, function () {
        return m(Login_1.default);
    }),
    "/signup": _render({ sidebar: false }, function () {
        return m(Signup_1.default);
    }),
    "/overview": _renderAuth(function () {
        return m(OverviewScreen_1.default);
    }),
    "/leads": _renderAuth(function () {
        return m(LeadScreens.LeadsListScreen);
    }),
    "/lofficer": _renderAuth(function () {
        return m(Placeholder_1.default, { content: "Loan Officer" });
    }),
    "/calculators": _renderAuth(function () {
        return m(CalculatorScreen_1.default, { screenType: CalculatorScreen_1.CalculatorScreenType.List });
    }),
    "/calculators/list": _renderAuth(function () {
        return m(CalculatorScreen_1.default, { screenType: CalculatorScreen_1.CalculatorScreenType.List });
    }),
    "/calculators/editor": _renderAuth(function () {
        return m(CalculatorScreen_1.default, { screenType: CalculatorScreen_1.CalculatorScreenType.Editor });
    }),
    "/calculators/view": _renderAuth(function () {
        return m(CalculatorScreen_1.default, { screenType: CalculatorScreen_1.CalculatorScreenType.View });
    }),
    "/reports": _renderAuth(function () {
        return m(ReportsScreen_1.default);
    }),
    "/billing": _renderAuth(function () {
        return m(Placeholder_1.default, { content: "Billing" });
    }),
    "/settings": _renderAuth(function () {
        return m(SettingsScreen_1.default);
    }),
    "/contact": _renderAuth(function () {
        return m(Placeholder_1.default, { content: "Contact" });
    }),
    "/about": _renderAuth(function () {
        return m(About_1.default);
    }),
    "/logout": {
        render: function render() {
            Application_1.default.logout();
            m.route.set("/login");
            return null;
        }
    }
});
mx.shimRoute(m);

/***/ }),
/* 177 */,
/* 178 */,
/* 179 */,
/* 180 */,
/* 181 */,
/* 182 */,
/* 183 */,
/* 184 */,
/* 185 */,
/* 186 */,
/* 187 */,
/* 188 */,
/* 189 */,
/* 190 */,
/* 191 */,
/* 192 */,
/* 193 */,
/* 194 */,
/* 195 */,
/* 196 */,
/* 197 */,
/* 198 */,
/* 199 */,
/* 200 */,
/* 201 */,
/* 202 */,
/* 203 */,
/* 204 */,
/* 205 */,
/* 206 */,
/* 207 */,
/* 208 */,
/* 209 */,
/* 210 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });

/***/ }),
/* 211 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });

/***/ }),
/* 212 */,
/* 213 */,
/* 214 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 215 */,
/* 216 */,
/* 217 */,
/* 218 */,
/* 219 */,
/* 220 */,
/* 221 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _getIterator2 = __webpack_require__(18);

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _map = __webpack_require__(124);

var _map2 = _interopRequireDefault(_map);

var _freeze = __webpack_require__(236);

var _freeze2 = _interopRequireDefault(_freeze);

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", { value: true });

var EPEventEmitter = function () {
    function EPEventEmitter() {
        (0, _classCallCheck3.default)(this, EPEventEmitter);

        this.frozenObject = (0, _freeze2.default)({});
        this.listenerList = new _map2.default();
    }

    (0, _createClass3.default)(EPEventEmitter, [{
        key: "addListener",
        value: function addListener(event, listener) {
            var list = this.listenerList.get(event);
            if (!list) {
                list = [];
                this.listenerList.set(event, list);
            }
            list.push(listener);
        }
    }, {
        key: "removeListener",
        value: function removeListener(event, listener) {
            var list = this.listenerList.get(event);
            if (list) {
                var idx = list.indexOf(listener);
                if (idx >= 0) {
                    list.splice(idx, 1);
                }
            }
        }
    }, {
        key: "emit",
        value: function emit(event) {
            var list = this.listenerList.get(event);
            if (list) {
                for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                    args[_key - 1] = arguments[_key];
                }

                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = (0, _getIterator3.default)(list), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var handler = _step.value;

                        handler.apply(this.frozenObject, args);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
            }
        }
    }]);
    return EPEventEmitter;
}();

exports.default = EPEventEmitter;

/***/ }),
/* 222 */,
/* 223 */,
/* 224 */,
/* 225 */,
/* 226 */,
/* 227 */,
/* 228 */,
/* 229 */,
/* 230 */,
/* 231 */,
/* 232 */,
/* 233 */,
/* 234 */,
/* 235 */,
/* 236 */,
/* 237 */,
/* 238 */,
/* 239 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", { value: true });
var m = __webpack_require__(3);
var Sidebar_1 = __webpack_require__(240);
var Toolbar_1 = __webpack_require__(280);
var Modal_1 = __webpack_require__(284);
var modal_1 = __webpack_require__(16);
var Application_1 = __webpack_require__(30);
var StatsWidget_1 = __webpack_require__(285);

var App = function () {
    function App() {
        (0, _classCallCheck3.default)(this, App);
    }

    (0, _createClass3.default)(App, [{
        key: "initStats",
        value: function initStats() {
            if (!this.stats) {
                this.stats = new StatsWidget_1.Stats();
                this.stats.showPanel(StatsWidget_1.StatsMode.MS);
            }
        }
    }, {
        key: "oninit",
        value: function oninit() {
            if (Application_1.default.isProfilingEnabled) {
                this.initStats();
            }
        }
    }, {
        key: "onbeforeupdate",
        value: function onbeforeupdate(vnode) {
            if (Application_1.default.isProfilingEnabled) {
                this.initStats();
                console.time("Render App");
                this.stats.begin();
                Application_1.default.profilingStartTime = performance.now();
                Application_1.default.isInProfile = true;
            }
        }
    }, {
        key: "onupdate",
        value: function onupdate(vnode) {
            if (Application_1.default.isInProfile) {
                var renderTime = performance.now() - Application_1.default.profilingStartTime;
                console.timeEnd("Render App");
                Application_1.default.isInProfile = false;
                Application_1.default.renderingTimeAverager.add(renderTime);
                this.stats.end();
            }
        }
    }, {
        key: "view",
        value: function view(vnode) {
            var _screen = vnode.attrs.screenFn ? vnode.attrs.screenFn() : null;
            return m("div#app", {
                class: vnode.attrs.sidebar && Application_1.default.sidebarOpen ? "has-sidebar" : ""
            }, [Application_1.default.isProfilingEnabled ? m(StatsWidget_1.default, { stats: this.stats }) : null, vnode.attrs.sidebar ? m(Sidebar_1.default) : null, vnode.attrs.sidebar ? m(".sidebar-shadow", {
                onclick: Application_1.default.hideSidebar
            }) : null, m(".main-content", [vnode.attrs.toolbar ? m(Toolbar_1.default) : null, _screen]), m(Modal_1.default, { queue: modal_1.defaultModalQueue })]);
        }
    }]);
    return App;
}();

exports.default = App;

/***/ }),
/* 240 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", { value: true });
var m = __webpack_require__(3);
var Icon_1 = __webpack_require__(15);
var svg_icons_1 = __webpack_require__(13);
var Application_1 = __webpack_require__(30);
var SIDEBAR_LOGO_IMG = "/static/img/home/logo-white.png";

var SidebarListAttrs = function SidebarListAttrs() {
    (0, _classCallCheck3.default)(this, SidebarListAttrs);
};

exports.SidebarListAttrs = SidebarListAttrs;
function isItemGroup(a) {
    return a && "items" in a && "name" in a;
}
var sidebarLink = function sidebarLink(vnode) {
    var _prefix = "#!";
    vnode.dom.setAttribute("href", _prefix + vnode.attrs.href);
    vnode.dom.onclick = function (e) {
        if (e.ctrlKey || e.metaKey || e.shiftKey || e.which === 2) return;
        e.preventDefault();
        e["redraw"] = false;
        var href = this.getAttribute("href");
        if (href.indexOf(_prefix) === 0) href = href.slice(_prefix.length);
        m.route.set(href, undefined, undefined);
        if (Application_1.default.isMobileScreen) {
            Application_1.default.hideSidebar();
        }
    };
};
function sidebarItemToNode(item) {
    return m("li.sidebar-list-item", {
        class: item.active ? "active" : ""
    }, m("a", {
        href: item.url,
        oncreate: sidebarLink
    }, [m(Icon_1.default, { icon: item.icon }), item.title]));
}
function _item(title, url, icon) {
    var currentRoute = m.route.get() || "";
    var active = currentRoute.startsWith(url);
    return { title: title, url: url, icon: icon, active: active };
}

var SidebarList = function () {
    function SidebarList() {
        (0, _classCallCheck3.default)(this, SidebarList);
    }

    (0, _createClass3.default)(SidebarList, [{
        key: "view",
        value: function view(vnode) {
            var itemComponents = vnode.attrs.items ? vnode.attrs.items.map(function (item) {
                if (isItemGroup(item)) {
                    var mapped = item.items.map(sidebarItemToNode);
                    mapped.splice(0, 0, m("li.sidebar-list-item-header", item.name));
                    return mapped;
                } else {
                    return sidebarItemToNode(item);
                }
            }) : null;
            return m("ul.sidebar-list", itemComponents);
        }
    }]);
    return SidebarList;
}();

exports.SidebarList = SidebarList;

var Sidebar = function () {
    function Sidebar() {
        (0, _classCallCheck3.default)(this, Sidebar);
    }

    (0, _createClass3.default)(Sidebar, [{
        key: "view",
        value: function view(vnode) {
            var _class = "";
            if (Application_1.default.sidebarOpen) _class += "visible";else _class += " hidden";
            return m(".sidebar", {
                class: _class
            }, [m("button.btn-icon.hidden-mobile.sidebar-hide-btn", {
                onclick: Application_1.default.hideSidebar
            }, [m(Icon_1.default, { icon: svg_icons_1.Feather.ChevronLeft })]), m("img.sidebar-logo", { src: SIDEBAR_LOGO_IMG }), m(SidebarList, {
                items: [{
                    name: "Dashboard",
                    items: [_item("Overview", "/overview", svg_icons_1.Feather.Activity), _item("Leads", "/leads", svg_icons_1.Feather.Users), _item("Calculators", "/calculators", svg_icons_1.Feather.Percent), _item("Reports", "/reports", svg_icons_1.Feather.BarChart2)]
                }, {
                    name: "Account",
                    items: [_item("Settings", "/settings", svg_icons_1.Feather.Settings)]
                }, {
                    name: "Other",
                    items: [_item("About", "/about", svg_icons_1.Feather.Circle), _item("Log Out", "/logout", svg_icons_1.Feather.LogOut)]
                }]
            })]);
        }
    }]);
    return Sidebar;
}();

exports.default = Sidebar;

/***/ }),
/* 241 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "activity-usage",
      viewBox: "0 0 24 24",
      url: __webpack_require__.p + "feather-sprite.svg#activity-usage",
      toString: function () {
        return this.url;
      }
    });

/***/ }),
/* 242 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "users-usage",
      viewBox: "0 0 24 24",
      url: __webpack_require__.p + "feather-sprite.svg#users-usage",
      toString: function () {
        return this.url;
      }
    });

/***/ }),
/* 243 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "user-usage",
      viewBox: "0 0 24 24",
      url: __webpack_require__.p + "feather-sprite.svg#user-usage",
      toString: function () {
        return this.url;
      }
    });

/***/ }),
/* 244 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "percent-usage",
      viewBox: "0 0 24 24",
      url: __webpack_require__.p + "feather-sprite.svg#percent-usage",
      toString: function () {
        return this.url;
      }
    });

/***/ }),
/* 245 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "bar-chart-2-usage",
      viewBox: "0 0 24 24",
      url: __webpack_require__.p + "feather-sprite.svg#bar-chart-2-usage",
      toString: function () {
        return this.url;
      }
    });

/***/ }),
/* 246 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "trending-down-usage",
      viewBox: "0 0 24 24",
      url: __webpack_require__.p + "feather-sprite.svg#trending-down-usage",
      toString: function () {
        return this.url;
      }
    });

/***/ }),
/* 247 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "trending-up-usage",
      viewBox: "0 0 24 24",
      url: __webpack_require__.p + "feather-sprite.svg#trending-up-usage",
      toString: function () {
        return this.url;
      }
    });

/***/ }),
/* 248 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "settings-usage",
      viewBox: "0 0 24 24",
      url: __webpack_require__.p + "feather-sprite.svg#settings-usage",
      toString: function () {
        return this.url;
      }
    });

/***/ }),
/* 249 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "phone-usage",
      viewBox: "0 0 24 24",
      url: __webpack_require__.p + "feather-sprite.svg#phone-usage",
      toString: function () {
        return this.url;
      }
    });

/***/ }),
/* 250 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "circle-usage",
      viewBox: "0 0 24 24",
      url: __webpack_require__.p + "feather-sprite.svg#circle-usage",
      toString: function () {
        return this.url;
      }
    });

/***/ }),
/* 251 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "mail-usage",
      viewBox: "0 0 24 24",
      url: __webpack_require__.p + "feather-sprite.svg#mail-usage",
      toString: function () {
        return this.url;
      }
    });

/***/ }),
/* 252 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "menu-usage",
      viewBox: "0 0 24 24",
      url: __webpack_require__.p + "feather-sprite.svg#menu-usage",
      toString: function () {
        return this.url;
      }
    });

/***/ }),
/* 253 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "log-in-usage",
      viewBox: "0 0 24 24",
      url: __webpack_require__.p + "feather-sprite.svg#log-in-usage",
      toString: function () {
        return this.url;
      }
    });

/***/ }),
/* 254 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "log-out-usage",
      viewBox: "0 0 24 24",
      url: __webpack_require__.p + "feather-sprite.svg#log-out-usage",
      toString: function () {
        return this.url;
      }
    });

/***/ }),
/* 255 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "shopping-cart-usage",
      viewBox: "0 0 24 24",
      url: __webpack_require__.p + "feather-sprite.svg#shopping-cart-usage",
      toString: function () {
        return this.url;
      }
    });

/***/ }),
/* 256 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "lock-usage",
      viewBox: "0 0 24 24",
      url: __webpack_require__.p + "feather-sprite.svg#lock-usage",
      toString: function () {
        return this.url;
      }
    });

/***/ }),
/* 257 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "chevrons-left-usage",
      viewBox: "0 0 24 24",
      url: __webpack_require__.p + "feather-sprite.svg#chevrons-left-usage",
      toString: function () {
        return this.url;
      }
    });

/***/ }),
/* 258 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "chevrons-right-usage",
      viewBox: "0 0 24 24",
      url: __webpack_require__.p + "feather-sprite.svg#chevrons-right-usage",
      toString: function () {
        return this.url;
      }
    });

/***/ }),
/* 259 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "chevron-left-usage",
      viewBox: "0 0 24 24",
      url: __webpack_require__.p + "feather-sprite.svg#chevron-left-usage",
      toString: function () {
        return this.url;
      }
    });

/***/ }),
/* 260 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "chevron-right-usage",
      viewBox: "0 0 24 24",
      url: __webpack_require__.p + "feather-sprite.svg#chevron-right-usage",
      toString: function () {
        return this.url;
      }
    });

/***/ }),
/* 261 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "chevron-up-usage",
      viewBox: "0 0 24 24",
      url: __webpack_require__.p + "feather-sprite.svg#chevron-up-usage",
      toString: function () {
        return this.url;
      }
    });

/***/ }),
/* 262 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "chevron-down-usage",
      viewBox: "0 0 24 24",
      url: __webpack_require__.p + "feather-sprite.svg#chevron-down-usage",
      toString: function () {
        return this.url;
      }
    });

/***/ }),
/* 263 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "user-plus-usage",
      viewBox: "0 0 24 24",
      url: __webpack_require__.p + "feather-sprite.svg#user-plus-usage",
      toString: function () {
        return this.url;
      }
    });

/***/ }),
/* 264 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "plus-square-usage",
      viewBox: "0 0 24 24",
      url: __webpack_require__.p + "feather-sprite.svg#plus-square-usage",
      toString: function () {
        return this.url;
      }
    });

/***/ }),
/* 265 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "minus-square-usage",
      viewBox: "0 0 24 24",
      url: __webpack_require__.p + "feather-sprite.svg#minus-square-usage",
      toString: function () {
        return this.url;
      }
    });

/***/ }),
/* 266 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "edit-3-usage",
      viewBox: "0 0 24 24",
      url: __webpack_require__.p + "feather-sprite.svg#edit-3-usage",
      toString: function () {
        return this.url;
      }
    });

/***/ }),
/* 267 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "trash-2-usage",
      viewBox: "0 0 24 24",
      url: __webpack_require__.p + "feather-sprite.svg#trash-2-usage",
      toString: function () {
        return this.url;
      }
    });

/***/ }),
/* 268 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "share-usage",
      viewBox: "0 0 24 24",
      url: __webpack_require__.p + "feather-sprite.svg#share-usage",
      toString: function () {
        return this.url;
      }
    });

/***/ }),
/* 269 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "eye-usage",
      viewBox: "0 0 24 24",
      url: __webpack_require__.p + "feather-sprite.svg#eye-usage",
      toString: function () {
        return this.url;
      }
    });

/***/ }),
/* 270 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "calendar-usage",
      viewBox: "0 0 24 24",
      url: __webpack_require__.p + "feather-sprite.svg#calendar-usage",
      toString: function () {
        return this.url;
      }
    });

/***/ }),
/* 271 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "minus-usage",
      viewBox: "0 0 24 24",
      url: __webpack_require__.p + "feather-sprite.svg#minus-usage",
      toString: function () {
        return this.url;
      }
    });

/***/ }),
/* 272 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "check-circle-usage",
      viewBox: "0 0 24 24",
      url: __webpack_require__.p + "feather-sprite.svg#check-circle-usage",
      toString: function () {
        return this.url;
      }
    });

/***/ }),
/* 273 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "x-usage",
      viewBox: "0 0 24 24",
      url: __webpack_require__.p + "feather-sprite.svg#x-usage",
      toString: function () {
        return this.url;
      }
    });

/***/ }),
/* 274 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "download-usage",
      viewBox: "0 0 24 24",
      url: __webpack_require__.p + "feather-sprite.svg#download-usage",
      toString: function () {
        return this.url;
      }
    });

/***/ }),
/* 275 */,
/* 276 */,
/* 277 */,
/* 278 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var CalculatorFieldType;
(function (CalculatorFieldType) {
    CalculatorFieldType["Money"] = "money";
    CalculatorFieldType["Percentage"] = "percentage";
    CalculatorFieldType["Term"] = "term";
})(CalculatorFieldType = exports.CalculatorFieldType || (exports.CalculatorFieldType = {}));
var TermUnits;
(function (TermUnits) {
    TermUnits["Month"] = "month";
    TermUnits["Year"] = "year";
})(TermUnits = exports.TermUnits || (exports.TermUnits = {}));
var CalculatorType;
(function (CalculatorType) {
    CalculatorType["Mortgage"] = "mortgage";
    CalculatorType["AutoLoan"] = "auto-loan";
    CalculatorType["HomeEquityLoan"] = "home-equity-loan";
    CalculatorType["CDLoan"] = "cd-loan";
    CalculatorType["MoneyMarketLoan"] = "money-market-loan";
    CalculatorType["BoatRVLoan"] = "boat-rv-loan";
    CalculatorType["PersonalLoan"] = "personal-loan";
})(CalculatorType = exports.CalculatorType || (exports.CalculatorType = {}));

/***/ }),
/* 279 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", { value: true });
var storage_1 = __webpack_require__(62);

var AppSettings = function () {
    function AppSettings() {
        (0, _classCallCheck3.default)(this, AppSettings);

        this._cache = {};
    }

    (0, _createClass3.default)(AppSettings, [{
        key: "setter",
        value: function setter(key) {
            var _this = this;

            return function (val) {
                return _this.set(key, val);
            };
        }
    }, {
        key: "getter",
        value: function getter(key, defaultValue) {
            var _this2 = this;

            return function () {
                return _this2.get(key, defaultValue);
            };
        }
    }, {
        key: "get",
        value: function get(key, defaultValue) {
            if (this._cache.hasOwnProperty(key)) {
                var value = this._cache[key];
                if (value === undefined) return defaultValue;
                return value;
            } else {
                var _value = storage_1.default.get("settings:" + key);
                if (_value !== undefined) {
                    this._cache[key] = _value;
                    return _value;
                } else {
                    this._cache[key] = defaultValue;
                    return defaultValue;
                }
            }
        }
    }, {
        key: "set",
        value: function set(key, value) {
            if (this._cache[key] === value) return;
            this._cache[key] = value;
            storage_1.default.set(key, value);
        }
    }]);
    return AppSettings;
}();

exports.default = AppSettings;

/***/ }),
/* 280 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", { value: true });
var m = __webpack_require__(3);
var Application_1 = __webpack_require__(30);
var Icon_1 = __webpack_require__(15);
var svg_icons_1 = __webpack_require__(13);
var ToolbarProfile_1 = __webpack_require__(281);
var FormCheckBox_1 = __webpack_require__(48);

var Toolbar = function () {
    function Toolbar() {
        (0, _classCallCheck3.default)(this, Toolbar);
    }

    (0, _createClass3.default)(Toolbar, [{
        key: "oncreate",
        value: function oncreate(vnode) {
            Application_1.default.profilingElement = vnode.dom.querySelector("#render-profiling-text");
        }
    }, {
        key: "onremove",
        value: function onremove() {
            Application_1.default.profilingElement = null;
        }
    }, {
        key: "view",
        value: function view(vnode) {
            return m(".toolbar-container", [m(".toolbar", [m("button.btn-icon.hidden-desktop", {
                onclick: Application_1.default.showSidebar
            }, [m(Icon_1.default, { icon: svg_icons_1.Feather.Menu })]), !Application_1.default.sidebarOpen ? m("button.btn-icon.hidden-mobile", {
                onclick: Application_1.default.showSidebar
            }, [m(Icon_1.default, { icon: svg_icons_1.Feather.ChevronRight })]) : null, Application_1.default.showProfilingControl ? m(FormCheckBox_1.default, {
                checked: Application_1.default.isProfilingEnabled,
                onchange: function onchange(c) {
                    return Application_1.default.setProfilingEnabled(c);
                }
            }, "Render Profiling") : null, Application_1.default.showProfilingControl ? m("span#render-profiling-text", "") : null, m(".toolbar-flex"), m(ToolbarProfile_1.default)])]);
        }
    }]);
    return Toolbar;
}();

exports.default = Toolbar;

/***/ }),
/* 281 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _regenerator = __webpack_require__(7);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _assign = __webpack_require__(28);

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

var _promise = __webpack_require__(6);

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = _promise2.default))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
var api_1 = __webpack_require__(8);
var m = __webpack_require__(3);
var CurrentUser_1 = __webpack_require__(129);
;

var ToolbarProfile = function () {
    function ToolbarProfile() {
        (0, _classCallCheck3.default)(this, ToolbarProfile);

        this.userInitial = CurrentUser_1.CurrentUserStream.map(function (info) {
            var initial = "";
            if (info.first_name) initial += info.first_name.charAt(0).toUpperCase();
            if (info.last_name) initial += info.last_name.charAt(0).toUpperCase();
            if (initial.length < 1) initial = "--";
            return initial;
        });
        this.fullName = CurrentUser_1.CurrentUserStream.map(function (info) {
            var fullName = "";
            if (info.first_name) fullName += info.first_name;
            if (info.last_name) fullName += " " + info.last_name;
            fullName = fullName.trim();
            if (fullName.length < 1) return "---";
            return fullName;
        });
        this.profileImg = CurrentUser_1.CurrentUserStream.map(function (info) {
            if (info.profile_img) {
                var img = info.profile_img.trim();
                if (!img.startsWith("/")) return "/" + img;
                return img;
            } else {
                return null;
            }
        });
    }

    (0, _createClass3.default)(ToolbarProfile, [{
        key: "loadUser",
        value: function loadUser() {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/_regenerator2.default.mark(function _callee() {
                var userInfo;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return api_1.default.me();

                            case 2:
                                userInfo = _context.sent;

                                if (userInfo.success) {
                                    CurrentUser_1.CurrentUserStream((0, _assign2.default)(CurrentUser_1.CurrentUserStream(), {
                                        first_name: userInfo.data.first_name,
                                        last_name: userInfo.data.last_name,
                                        profile_img: userInfo.data.profile_img,
                                        active: true
                                    }));
                                    m.redraw();
                                } else {
                                    console.error("API Error: ", userInfo.errors);
                                }

                            case 4:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));
        }
    }, {
        key: "oninit",
        value: function oninit() {
            this.loadUser();
        }
    }, {
        key: "renderAvatar",
        value: function renderAvatar() {
            var img = this.profileImg();
            if (img) {
                return m("figure.avatar", {
                    style: "background: none;"
                }, [m("img", { src: img })]);
            } else {
                return m("figure.avatar", {
                    "data-initial": this.userInitial()
                }, [m("i.avatar-presence.online")]);
            }
        }
    }, {
        key: "view",
        value: function view() {
            if (CurrentUser_1.CurrentUserStream().active) {
                return m(".toolbar-user-info", [m("a.toolbar-user-info-open", {
                    href: "/settings",
                    oncreate: m.route.link,
                    onupdate: m.route.link,
                    tabIndex: "-1"
                }, [this.renderAvatar(), m("span", { style: "margin-left: 16px;" }, this.fullName())])]);
            } else {
                return null;
            }
        }
    }]);
    return ToolbarProfile;
}();

exports.default = ToolbarProfile;

/***/ }),
/* 282 */,
/* 283 */,
/* 284 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", { value: true });
var modal_1 = __webpack_require__(16);
var m = __webpack_require__(3);
var MODAL_HIDE_DELAY = 0;

var Modal = function () {
    function Modal() {
        (0, _classCallCheck3.default)(this, Modal);

        this.hidden = true;
        this.modalHideDelayTimeout = undefined;
        this.closeModal = this.closeModal.bind(this);
        this.onNewModal = this.onNewModal.bind(this);
    }

    (0, _createClass3.default)(Modal, [{
        key: "closeModal",
        value: function closeModal() {
            var _this = this;

            this.hidden = true;
            if (this.currentItem) {
                if (this.currentItem.uninit) {
                    this.currentItem.uninit(this.currentItem.state);
                }
                this.currentItem.resolve(this.currentItem.state);
            }
            m.redraw();
            this.modalHideDelayTimeout = setTimeout(function () {
                _this.currentItem = undefined;
                _this.modalHideDelayTimeout = undefined;
                _this.processNextModal();
            }, MODAL_HIDE_DELAY);
        }
    }, {
        key: "processNextModal",
        value: function processNextModal() {
            if (!this.currentItem && this.queue) {
                this.currentItem = this.queue.next();
                if (this.currentItem) {
                    if (this.currentItem.init) {
                        this.currentItem.state = this.currentItem.init();
                    }
                    this.hidden = false;
                    m.redraw();
                }
            }
        }
    }, {
        key: "onNewModal",
        value: function onNewModal() {
            if (!this.currentItem) {
                this.processNextModal();
            }
        }
    }, {
        key: "oninit",
        value: function oninit(vnode) {
            if (vnode.attrs.queue) {
                this.queue = vnode.attrs.queue;
                this.queue.setListener(this.onNewModal);
            }
        }
    }, {
        key: "onupdate",
        value: function onupdate(vnode) {
            if (vnode.attrs.queue) {
                this.queue = vnode.attrs.queue;
                this.queue.setListener(this.onNewModal);
            }
        }
    }, {
        key: "onbeforeremove",
        value: function onbeforeremove() {
            if (this.modalHideDelayTimeout) {
                clearTimeout(this.modalHideDelayTimeout);
                this.modalHideDelayTimeout = undefined;
            }
        }
    }, {
        key: "view",
        value: function view(vnode) {
            var item = this.currentItem;
            var _classes = "";
            if (item) {
                if (!this.hidden) _classes += "active ";
                if (item.size === modal_1.ModalSize.Large) _classes += "modal-lg ";else if (item.size === modal_1.ModalSize.Small) _classes += "modal-sm ";
            }
            return m(".modal", {
                class: _classes
            }, [m(".modal-overlay"), item ? item.render(this.closeModal, item.state) : null]);
        }
    }]);
    return Modal;
}();

exports.default = Modal;

/***/ }),
/* 285 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", { value: true });
var m = __webpack_require__(3);
exports.Stats = __webpack_require__(286);

var StatsWidget = function () {
    function StatsWidget() {
        (0, _classCallCheck3.default)(this, StatsWidget);

        this.stats = null;
    }

    (0, _createClass3.default)(StatsWidget, [{
        key: "oncreate",
        value: function oncreate(vnode) {
            this.stats = vnode.attrs.stats;
            if (this.stats) {
                vnode.dom.appendChild(this.stats.dom);
            }
        }
    }, {
        key: "onremove",
        value: function onremove(vnode) {
            if (this.stats) {
                vnode.dom.removeChild(this.stats.dom);
            }
        }
    }, {
        key: "update",
        value: function update(vnode) {
            if (this.stats) {
                if (this.stats !== vnode.attrs.stats) {
                    vnode.dom.removeChild(this.stats.dom);
                    this.stats = vnode.attrs.stats;
                    vnode.dom.appendChild(this.stats.dom);
                }
            } else {
                this.stats = vnode.attrs.stats;
                vnode.dom.appendChild(this.stats.dom);
            }
        }
    }, {
        key: "view",
        value: function view(vnode) {
            return m("div");
        }
    }]);
    return StatsWidget;
}();

exports.StatsWidget = StatsWidget;
var StatsMode;
(function (StatsMode) {
    StatsMode[StatsMode["FPS"] = 0] = "FPS";
    StatsMode[StatsMode["MS"] = 1] = "MS";
    StatsMode[StatsMode["MB"] = 2] = "MB";
})(StatsMode = exports.StatsMode || (exports.StatsMode = {}));
exports.default = StatsWidget;

/***/ }),
/* 286 */
/***/ (function(module, exports, __webpack_require__) {

(function (global, factory) {
     true ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define(factory) :
            (global.Stats = factory());
}(this, (function () {
    'use strict';

    /**
     * @author mrdoob / http://mrdoob.com/
     */

    var Stats = function () {

        var mode = 0;

        var container = document.createElement('div');
        container.style.cssText = 'position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000';
        container.addEventListener('click', function (event) {

            event.preventDefault();
            showPanel(++mode % container.children.length);

        }, false);

        //

        function addPanel(panel) {

            container.appendChild(panel.dom);
            return panel;

        }

        function showPanel(id) {

            for (var i = 0; i < container.children.length; i++) {

                container.children[i].style.display = i === id ? 'block' : 'none';

            }

            mode = id;

        }

        //

        var beginTime = (performance || Date).now(), prevTime = beginTime, frames = 0;

        var fpsPanel = addPanel(new Stats.Panel('FPS', '#0ff', '#002'));
        var msPanel = addPanel(new Stats.Panel('MS', '#0f0', '#020'));

        if (self.performance && self.performance.memory) {

            var memPanel = addPanel(new Stats.Panel('MB', '#f08', '#201'));

        }

        showPanel(0);

        return {

            REVISION: 16,

            dom: container,

            addPanel: addPanel,
            showPanel: showPanel,

            begin: function () {

                beginTime = (performance || Date).now();

            },

            end: function () {

                frames++;

                var time = (performance || Date).now();

                msPanel.update(time - beginTime, 200);

                if (time > prevTime + 1000) {

                    fpsPanel.update((frames * 1000) / (time - prevTime), 100);

                    prevTime = time;
                    frames = 0;

                    if (memPanel) {

                        var memory = performance.memory;
                        memPanel.update(memory.usedJSHeapSize / 1048576, memory.jsHeapSizeLimit / 1048576);

                    }

                }

                return time;

            },

            update: function () {

                beginTime = this.end();

            },

            // Backwards Compatibility

            domElement: container,
            setMode: showPanel

        };

    };

    Stats.Panel = function (name, fg, bg) {

        var min = Infinity, max = 0, round = Math.round;
        var PR = round(window.devicePixelRatio || 1);

        var WIDTH = 80 * PR, HEIGHT = 48 * PR,
            TEXT_X = 3 * PR, TEXT_Y = 2 * PR,
            GRAPH_X = 3 * PR, GRAPH_Y = 15 * PR,
            GRAPH_WIDTH = 74 * PR, GRAPH_HEIGHT = 30 * PR;

        var canvas = document.createElement('canvas');
        canvas.width = WIDTH;
        canvas.height = HEIGHT;
        canvas.style.cssText = 'width:80px;height:48px';

        var context = canvas.getContext('2d');
        context.font = 'bold ' + (9 * PR) + 'px Helvetica,Arial,sans-serif';
        context.textBaseline = 'top';

        context.fillStyle = bg;
        context.fillRect(0, 0, WIDTH, HEIGHT);

        context.fillStyle = fg;
        context.fillText(name, TEXT_X, TEXT_Y);
        context.fillRect(GRAPH_X, GRAPH_Y, GRAPH_WIDTH, GRAPH_HEIGHT);

        context.fillStyle = bg;
        context.globalAlpha = 0.9;
        context.fillRect(GRAPH_X, GRAPH_Y, GRAPH_WIDTH, GRAPH_HEIGHT);

        return {

            dom: canvas,

            update: function (value, maxValue) {

                min = Math.min(min, value);
                max = Math.max(max, value);

                context.fillStyle = bg;
                context.globalAlpha = 1;
                context.fillRect(0, 0, WIDTH, GRAPH_Y);
                context.fillStyle = fg;
                context.fillText(round(value) + ' ' + name + ' (' + round(min) + '-' + round(max) + ')', TEXT_X, TEXT_Y);

                context.drawImage(canvas, GRAPH_X + PR, GRAPH_Y, GRAPH_WIDTH - PR, GRAPH_HEIGHT, GRAPH_X, GRAPH_Y, GRAPH_WIDTH - PR, GRAPH_HEIGHT);

                context.fillRect(GRAPH_X + GRAPH_WIDTH - PR, GRAPH_Y, PR, GRAPH_HEIGHT);

                context.fillStyle = bg;
                context.globalAlpha = 0.9;
                context.fillRect(GRAPH_X + GRAPH_WIDTH - PR, GRAPH_Y, PR, round((1 - (value / maxValue)) * GRAPH_HEIGHT));

            }

        };

    };

    return Stats;

})));

/***/ }),
/* 287 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", { value: true });
var m = __webpack_require__(3);

var Placeholder = function () {
    function Placeholder() {
        (0, _classCallCheck3.default)(this, Placeholder);
    }

    (0, _createClass3.default)(Placeholder, [{
        key: "view",
        value: function view(vnode) {
            var _text = "Oops! How did you get here?";
            var toastType = [".toast-error", ".toast-warning"][Math.round(Math.random() * 1)];
            return m("div.toast" + toastType, { style: "padding:16px; border-radius: 0" }, _text);
        }
    }]);
    return Placeholder;
}();

exports.default = Placeholder;

/***/ }),
/* 288 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", { value: true });
var m = __webpack_require__(3);

var AboutScreen = function () {
    function AboutScreen() {
        (0, _classCallCheck3.default)(this, AboutScreen);
    }

    (0, _createClass3.default)(AboutScreen, [{
        key: "view",
        value: function view() {
            return m("div", {
                style: "padding: 16px;"
            }, [m.trust(AboutText)]);
        }
    }]);
    return AboutScreen;
}();

exports.default = AboutScreen;
var AboutText = "\n<h2>About FinCalc</h2>\n\n<p>We drive loans through mobile, online, and social channels</p>\n\n<p>\n    We help financial institutions transform their mobile banking apps, \n    websites, and Facebook page from expenses into revenue generators.\n</p>\n\n<h5>Attract/Generate More Real-Time Borrowers</h5>\n<p>through mobile, online, Facebook, and email channels.</p>\n\n<h5>We Make Loans Easy</h5>\n<p>by sending you daily leads across your financial products.</p>\n\n<h5>Understand Your Sales Funnel</h5>\n<p>\n    FinCalc can help you track your sales efforts, your purchases, \n    and conversion rates while highlighting bottlenecks in your funnel. \n    We also identify the number of people in each stage of your loan process, \n    from their initial visit to a completely application.\n</p>\n\n<h5>Easy Experience</h5>\n<p>\n    FinCalc uses a one link-based process that helps customers easily\n    apply for a loan. This process makes it feel like your shoppers never\n    left your mobile app, website, or Facebook page.\n</p>\n";

/***/ }),
/* 289 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _getIterator2 = __webpack_require__(18);

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _regenerator = __webpack_require__(7);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

var _promise = __webpack_require__(6);

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = _promise2.default))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
var m = __webpack_require__(3);
var Icon_1 = __webpack_require__(15);
var svg_icons_1 = __webpack_require__(13);
var utilities_1 = __webpack_require__(17);
var Application_1 = __webpack_require__(30);
var api_1 = __webpack_require__(8);

var LoginScreen = function () {
    function LoginScreen() {
        (0, _classCallCheck3.default)(this, LoginScreen);

        this.loggingIn = false;
        this.checkingStatus = false;
        this.errors = {};
        this.rerouteTo = "/overview";
        this.signupSuccessful = false;
        utilities_1.bindClassFunctions(this, this.loginSubmit, this.login, this.checkStatus);
    }

    (0, _createClass3.default)(LoginScreen, [{
        key: "oninit",
        value: function oninit(vnode) {
            Application_1.default.isLoggedIn = false;
            var rerouteTo = vnode.attrs.rerouteTo || m.route.param("rerouteTo");
            if (rerouteTo) {
                this.rerouteTo = rerouteTo;
            }
            this.signupSuccessful = !!m.route.param("signupSuccessful");
            if (api_1.default.hasLoggedInBefore()) {
                this.checkingStatus = true;
                this.checkStatus();
            } else {
                this.checkingStatus = false;
            }
        }
    }, {
        key: "loginSuccessful",
        value: function loginSuccessful() {
            Application_1.default.isLoggedIn = true;
            m.route.set(this.rerouteTo, undefined, {
                replace: true
            });
        }
    }, {
        key: "checkStatus",
        value: function checkStatus() {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/_regenerator2.default.mark(function _callee() {
                var begin, isLoggedIn, elapsed;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                this.checkingStatus = true;
                                m.redraw();
                                begin = Date.now();
                                _context.next = 5;
                                return api_1.default.isLoggedIn();

                            case 5:
                                isLoggedIn = _context.sent;
                                elapsed = Date.now() - begin;

                                if (!(elapsed < 500)) {
                                    _context.next = 10;
                                    break;
                                }

                                _context.next = 10;
                                return utilities_1.delayms(500 - elapsed);

                            case 10:
                                if (isLoggedIn) {
                                    this.loginSuccessful();
                                } else {
                                    this.checkingStatus = false;
                                    m.redraw();
                                }

                            case 11:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));
        }
    }, {
        key: "login",
        value: function login(email, password) {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
                var response, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, err, prop, message;

                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                this.loggingIn = true;
                                _context2.next = 3;
                                return api_1.default.login(email, password);

                            case 3:
                                response = _context2.sent;

                                if (!response.success) {
                                    _context2.next = 10;
                                    break;
                                }

                                this.errors = {};
                                this.loginSuccessful();
                                return _context2.abrupt("return");

                            case 10:
                                if (!response.errors) {
                                    _context2.next = 33;
                                    break;
                                }

                                this.errors = {};
                                _iteratorNormalCompletion = true;
                                _didIteratorError = false;
                                _iteratorError = undefined;
                                _context2.prev = 15;
                                for (_iterator = (0, _getIterator3.default)(response.errors); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                    err = _step.value;
                                    prop = void 0, message = void 0;

                                    if (typeof err === "string") {
                                        prop = "global";
                                        message = err;
                                    } else {
                                        prop = err.property;
                                        message = err.message;
                                    }
                                    if (!this.errors[prop]) this.errors[prop] = message;
                                }
                                _context2.next = 23;
                                break;

                            case 19:
                                _context2.prev = 19;
                                _context2.t0 = _context2["catch"](15);
                                _didIteratorError = true;
                                _iteratorError = _context2.t0;

                            case 23:
                                _context2.prev = 23;
                                _context2.prev = 24;

                                if (!_iteratorNormalCompletion && _iterator.return) {
                                    _iterator.return();
                                }

                            case 26:
                                _context2.prev = 26;

                                if (!_didIteratorError) {
                                    _context2.next = 29;
                                    break;
                                }

                                throw _iteratorError;

                            case 29:
                                return _context2.finish(26);

                            case 30:
                                return _context2.finish(23);

                            case 31:
                                _context2.next = 34;
                                break;

                            case 33:
                                this.errors = {
                                    "global": "Unknown error occurred while logging in."
                                };

                            case 34:
                                this.loggingIn = false;
                                m.redraw();

                            case 36:
                            case "end":
                                return _context2.stop();
                        }
                    }
                }, _callee2, this, [[15, 19, 23, 31], [24,, 26, 30]]);
            }));
        }
    }, {
        key: "loginSubmit",
        value: function loginSubmit(event) {
            event.preventDefault();
            this.errors = {};
            this.loggingIn = true;
            var form = event.target;
            var elements = form.elements;
            var emailInput = elements["email"];
            var passwordInput = elements["password"];
            var email = emailInput ? emailInput.value : "";
            var password = passwordInput ? passwordInput.value : "";
            this.login(email, password);
            return false;
        }
    }, {
        key: "view",
        value: function view(vnode) {
            var loginInnerContent = void 0;
            if (this.checkingStatus) {
                loginInnerContent = m(".login-content-inner", [m("h2.muted-color", { "style": "font-weight: 300;" }, "Logging In to your Dashboard."), m(".flex-row", [m(".loading-c.loading-lg", { style: "margin-right: 16px;" }), m("h2", { style: "font-weight: 300; margin-bottom: 0;" }, "One Moment...")])]);
            } else {
                var loginForm = m("form", {
                    onsubmit: this.loginSubmit,
                    style: "margin-top: 16px; margin-bottom: 16px;"
                }, [m(".form-group", {
                    class: !!this.errors["email"] ? "has-error" : ""
                }, [m(".has-icon-left", [m("input.form-input", {
                    name: "email",
                    type: "email",
                    placeholder: "Email",
                    maxlength: 256,
                    disabled: this.loggingIn
                }), m(Icon_1.default, { icon: svg_icons_1.Feather.Mail, class: "form-icon icon-left" })]), !!this.errors["email"] ? m("p.form-input-hint", this.errors["email"]) : null]), m(".form-group", {
                    class: !!this.errors["password"] ? "has-error" : ""
                }, [m(".has-icon-left", [m("input.form-input", {
                    name: "password",
                    type: "password",
                    placeholder: "Password",
                    maxlength: 512,
                    disabled: this.loggingIn
                }), m(Icon_1.default, { icon: svg_icons_1.Feather.Lock, class: "form-icon icon-left" })]), !!this.errors["password"] ? m("p.form-input-hint", this.errors["password"]) : null]), m(".form-group.form-buttons", [m("button.btn.btn-primary", {
                    class: this.loggingIn ? "loading" : "",
                    type: "submit",
                    disabled: this.loggingIn
                }, [m(Icon_1.default, { icon: svg_icons_1.Feather.LogIn }), " Login"])])]);
                var signupSuccessfulToast = null;
                if (this.signupSuccessful) {
                    signupSuccessfulToast = m("div.toast.toast-success", "Thank you for signing up for FinCalc. Check your inbox for a confirmation email to verify your account.");
                }
                loginInnerContent = m(".login-content-inner", [m("h2.muted-color", { "style": "font-weight: 300;" }, "Login to your Dashboard."), signupSuccessfulToast, !!this.errors["global"] ? m("div.toast.toast-error", this.errors["global"]) : null, loginForm, m(".muted-color", {
                    style: "margin-top: 16px;"
                }, [m("span", "Don't have an account? "), m("a", { href: "/signup", oncreate: m.route.link }, "Signup"), m("span", ".")])]);
            }
            var loginContent = m(".login-content", [m("h1", { "style": "font-weight: 200;" }, [m("span", "Fin"), m("span.primary-color", "Calc")]), loginInnerContent]);
            return m(".login-screen", loginContent);
        }
    }]);
    return LoginScreen;
}();

exports.default = LoginScreen;

/***/ }),
/* 290 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _regenerator = __webpack_require__(7);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getIterator2 = __webpack_require__(18);

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

var _promise = __webpack_require__(6);

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = _promise2.default))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
var m = __webpack_require__(3);
var Icon_1 = __webpack_require__(15);
var svg_icons_1 = __webpack_require__(13);
var utilities_1 = __webpack_require__(17);
var Application_1 = __webpack_require__(30);
var api_1 = __webpack_require__(8);

var SignupScreen = function () {
    function SignupScreen() {
        (0, _classCallCheck3.default)(this, SignupScreen);

        this.signingUp = false;
        this.errors = {};
        utilities_1.bindClassFunctions(this, this.signup, this.signupSubmit);
    }

    (0, _createClass3.default)(SignupScreen, [{
        key: "oninit",
        value: function oninit(vnode) {
            Application_1.default.isLoggedIn = false;
        }
    }, {
        key: "signupSuccessful",
        value: function signupSuccessful() {
            Application_1.default.isLoggedIn = false;
            m.route.set("/login?signupSuccessful=true");
        }
    }, {
        key: "signup",
        value: function signup(request) {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/_regenerator2.default.mark(function _callee() {
                var response, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, err, prop, message;

                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                this.signingUp = true;
                                _context.next = 3;
                                return api_1.default.signup(request);

                            case 3:
                                response = _context.sent;

                                if (!response.success) {
                                    _context.next = 10;
                                    break;
                                }

                                this.errors = {};
                                this.signupSuccessful();
                                return _context.abrupt("return");

                            case 10:
                                if (!response.errors) {
                                    _context.next = 33;
                                    break;
                                }

                                this.errors = {};
                                _iteratorNormalCompletion = true;
                                _didIteratorError = false;
                                _iteratorError = undefined;
                                _context.prev = 15;
                                for (_iterator = (0, _getIterator3.default)(response.errors); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                    err = _step.value;
                                    prop = void 0, message = void 0;

                                    if (typeof err === "string") {
                                        prop = "global";
                                        message = err;
                                    } else {
                                        prop = err.property;
                                        message = err.message;
                                    }
                                    if (!this.errors[prop]) this.errors[prop] = message;
                                }
                                _context.next = 23;
                                break;

                            case 19:
                                _context.prev = 19;
                                _context.t0 = _context["catch"](15);
                                _didIteratorError = true;
                                _iteratorError = _context.t0;

                            case 23:
                                _context.prev = 23;
                                _context.prev = 24;

                                if (!_iteratorNormalCompletion && _iterator.return) {
                                    _iterator.return();
                                }

                            case 26:
                                _context.prev = 26;

                                if (!_didIteratorError) {
                                    _context.next = 29;
                                    break;
                                }

                                throw _iteratorError;

                            case 29:
                                return _context.finish(26);

                            case 30:
                                return _context.finish(23);

                            case 31:
                                _context.next = 34;
                                break;

                            case 33:
                                this.errors = {
                                    "global": "Unknown error occurred while signing up."
                                };

                            case 34:
                                this.signingUp = false;
                                m.redraw();

                            case 36:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[15, 19, 23, 31], [24,, 26, 30]]);
            }));
        }
    }, {
        key: "signupSubmit",
        value: function signupSubmit(event) {
            event.preventDefault();
            this.errors = {};
            this.signingUp = true;
            var form = event.target;
            var elements = form.elements;
            var _getString = function _getString(name) {
                var elem = elements[name];
                var v = elem ? elem.value : "";
                return v;
            };
            var email = _getString("email");
            var password = _getString("password");
            var password2 = _getString("password2");
            if (password !== password2) {
                this.errors = {
                    "password2": "re-entered password does not match first password."
                };
                this.signingUp = false;
                return false;
            }
            var first_name = _getString("firstName");
            var last_name = _getString("lastName");
            var org_name = _getString("orgName");
            this.signup({
                email: email,
                password: password,
                first_name: first_name,
                last_name: last_name,
                org_name: org_name
            });
            return false;
        }
    }, {
        key: "view",
        value: function view(vnode) {
            var _this = this;

            var signupInnerContent = void 0;
            var _field = function _field(icon, props) {
                var name = props["name"];
                var placeholder = props["placeholder"];
                var field = m(".form-group", {
                    class: !!_this.errors[name] ? "has-error" : ""
                }, [m("label.form-label", placeholder), m(".has-icon-left", [m("input.form-input", props), m(Icon_1.default, { icon: icon, class: "form-icon icon-left" })]), !!_this.errors[name] ? m("p.form-input-hint", _this.errors[name]) : null]);
                return field;
            };
            var emailField = _field(svg_icons_1.Feather.Mail, {
                name: "email",
                type: "email",
                placeholder: "Email",
                maxlength: 256,
                disabled: this.signingUp
            });
            var passwordField = _field(svg_icons_1.Feather.Lock, {
                name: "password",
                type: "password",
                placeholder: "Password",
                maxlength: 256,
                disabled: this.signingUp
            });
            var reenterPasswordfield = _field(svg_icons_1.Feather.Lock, {
                name: "password2",
                type: "password",
                placeholder: "Re-Enter Password",
                maxlength: 256,
                disabled: this.signingUp
            });
            var firstNameField = _field(svg_icons_1.Feather.Lock, {
                name: "firstName",
                type: "text",
                placeholder: "First Name",
                maxlength: 256,
                disabled: this.signingUp
            });
            var lastNameField = _field(svg_icons_1.Feather.Lock, {
                name: "lastName",
                type: "text",
                placeholder: "Last Name",
                maxlength: 256,
                disabled: this.signingUp
            });
            var orgNameField = _field(svg_icons_1.Feather.Lock, {
                name: "orgName",
                type: "text",
                placeholder: "Organization Name",
                maxlength: 256,
                disabled: this.signingUp
            });
            var signupForm = m("form", {
                onsubmit: this.signupSubmit,
                style: "margin-top: 16px;"
            }, [emailField, passwordField, reenterPasswordfield, firstNameField, lastNameField, orgNameField, m(".form-group.form-buttons", [m("button.btn.btn-primary", {
                class: this.signingUp ? "loading" : "",
                type: "submit",
                disabled: this.signingUp
            }, [m(Icon_1.default, { icon: svg_icons_1.Feather.UserPlus }), " Signup"])])]);
            signupInnerContent = m(".login-content-inner", [m("h2.muted-color", { "style": "font-weight: 300;" }, "Signup to use the FinCalc Dashboard."), !!this.errors["global"] ? m("div.toast.toast-error", this.errors["global"]) : null, signupForm, m(".muted-color", {
                style: "margin-top: 16px; padding-bottom: 16px;"
            }, [m("span", "Already have an account? "), m("a", { href: "/login", oncreate: m.route.link }, "Login"), m("span", ".")])]);
            var signupContent = m(".login-content", [m("h1", { "style": "font-weight: 200;" }, [m("span", "Fin"), m("span.primary-color", "Calc")]), signupInnerContent]);
            return m(".login-screen", signupContent);
        }
    }]);
    return SignupScreen;
}();

exports.default = SignupScreen;

/***/ }),
/* 291 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray2 = __webpack_require__(47);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _regenerator = __webpack_require__(7);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

var _promise = __webpack_require__(6);

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = _promise2.default))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
var m = __webpack_require__(3);
var mx = __webpack_require__(10);
var utilities_1 = __webpack_require__(17);
var OverviewStatsTile_1 = __webpack_require__(292);
var ReportsGraph_1 = __webpack_require__(91);
var OverviewUtil = __webpack_require__(342);
var Reports_1 = __webpack_require__(65);
var AutoLeadsTable_1 = __webpack_require__(444);
var PERIOD_VALUES_ZERO = { visits: 0, conversions: 0, engagements: 0 };

var OverviewScreen = function () {
    function OverviewScreen() {
        (0, _classCallCheck3.default)(this, OverviewScreen);

        this.loadingEventsData = false;
        this.eventData = null;
        this.previousValues = PERIOD_VALUES_ZERO;
        this.currentValues = PERIOD_VALUES_ZERO;
        this.currentMonthText = new Date().toLocaleDateString(utilities_1.getUserLocale(), { month: "long" });
    }

    (0, _createClass3.default)(OverviewScreen, [{
        key: "loadEventData",
        value: function loadEventData() {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/_regenerator2.default.mark(function _callee() {
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                this.loadingEventsData = true;
                                this.eventData = null;
                                _context.next = 4;
                                return OverviewUtil.getOverviewEvents();

                            case 4:
                                this.eventData = _context.sent;

                                this.calculatorPeriodValues();
                                this.loadingEventsData = false;
                                mx.gredraw();

                            case 8:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));
        }
    }, {
        key: "calculatorPeriodValues",
        value: function calculatorPeriodValues() {
            if (this.eventData) {
                console.log("d: ", this.eventData);
                var current = this.eventData.current;
                var previous = this.eventData.previous;
                var currentDay = new Date().getDate();

                var _Reports_1$sumToDay = Reports_1.sumToDay(currentDay, current.visits, previous.visits),
                    _Reports_1$sumToDay2 = (0, _slicedToArray3.default)(_Reports_1$sumToDay, 2),
                    currentVisits = _Reports_1$sumToDay2[0],
                    prevVisits = _Reports_1$sumToDay2[1];

                var _Reports_1$sumToDay3 = Reports_1.sumToDay(currentDay, current.engagements, previous.engagements),
                    _Reports_1$sumToDay4 = (0, _slicedToArray3.default)(_Reports_1$sumToDay3, 2),
                    currentEngage = _Reports_1$sumToDay4[0],
                    prevEngage = _Reports_1$sumToDay4[1];

                var _Reports_1$sumToDay5 = Reports_1.sumToDay(currentDay, current.conversions, previous.conversions),
                    _Reports_1$sumToDay6 = (0, _slicedToArray3.default)(_Reports_1$sumToDay5, 2),
                    currentConv = _Reports_1$sumToDay6[0],
                    prevConv = _Reports_1$sumToDay6[1];

                this.currentValues = {
                    visits: currentVisits,
                    engagements: currentEngage,
                    conversions: currentConv
                };
                this.previousValues = {
                    visits: prevVisits,
                    engagements: prevEngage,
                    conversions: prevConv
                };
            } else {
                this.previousValues = PERIOD_VALUES_ZERO;
                this.currentValues = PERIOD_VALUES_ZERO;
            }
        }
    }, {
        key: "oninit",
        value: function oninit() {
            this.loadEventData();
        }
    }, {
        key: "_renderHeader",
        value: function _renderHeader() {
            var smalltext = m("small.small-smaller.muted-color", this.currentMonthText);
            return m("h3.line-height-1", {
                style: "margin: 16px;"
            }, [m("span", { style: "display: block;" }, "Overview"), smalltext]);
        }
    }, {
        key: "_renderStatsRow",
        value: function _renderStatsRow() {
            var statsColumns = [];
            statsColumns.push(m(OverviewStatsTile_1.OverviewStatsTile, {
                name: "Visits",
                description: "Calculator visitors",
                currentPeriod: this.currentValues.visits,
                lastPeriod: this.previousValues.visits
            }));
            statsColumns.push(m(OverviewStatsTile_1.OverviewStatsTile, {
                name: "Engagements",
                description: "Loan estimates calculated",
                currentPeriod: this.currentValues.engagements,
                lastPeriod: this.previousValues.engagements
            }));
            statsColumns.push(m(OverviewStatsTile_1.OverviewStatsTile, {
                name: "Conversions",
                description: "Applications filled",
                currentPeriod: this.currentValues.conversions,
                lastPeriod: this.previousValues.conversions
            }));
            return m(".overview-stats-row", statsColumns);
        }
    }, {
        key: "_renderGraph",
        value: function _renderGraph() {
            return m("div", {
                style: "position: relative; max-width: 800px; margin: 0 auto;"
            }, m(ReportsGraph_1.ReportsGraph, { data: !!this.eventData ? this.eventData.current : null }));
        }
    }, {
        key: "_renderLeadsTable",
        value: function _renderLeadsTable() {
            return m(AutoLeadsTable_1.AutoLeadsTable, {});
        }
    }, {
        key: "view",
        value: function view(vnode) {
            return m("div", [this._renderHeader(), this._renderStatsRow(), this._renderGraph(), this._renderLeadsTable()]);
        }
    }]);
    return OverviewScreen;
}();

exports.OverviewScreen = OverviewScreen;
exports.default = OverviewScreen;

/***/ }),
/* 292 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", { value: true });
var m = __webpack_require__(3);
var svg_icons_1 = __webpack_require__(13);
var Icon_1 = __webpack_require__(15);

var OverviewStatsTile = function () {
    function OverviewStatsTile() {
        (0, _classCallCheck3.default)(this, OverviewStatsTile);
    }

    (0, _createClass3.default)(OverviewStatsTile, [{
        key: "view",
        value: function view(vnode) {
            var diffIcon = void 0;
            var diffType = void 0;
            var diffText = void 0;
            if (vnode.attrs.currentPeriod > vnode.attrs.lastPeriod) {
                diffIcon = svg_icons_1.Feather.TrendingUp;
                diffType = "diff-up";
                var diff = vnode.attrs.currentPeriod - vnode.attrs.lastPeriod;
                diffText = diff.toFixed().replace(/\.0*$/, "");
            } else if (vnode.attrs.currentPeriod < vnode.attrs.lastPeriod) {
                diffIcon = svg_icons_1.Feather.TrendingDown;
                diffType = "diff-down";
                var _diff = vnode.attrs.lastPeriod - vnode.attrs.currentPeriod;
                diffText = _diff.toFixed().replace(/\.0*$/, "");
            } else {
                diffIcon = svg_icons_1.Feather.Minus;
                diffType = "diff-same";
                diffText = "no chnage";
            }
            return m(".overview-stats-panel", [m(".overview-stats-title", vnode.attrs.name), m(".overview-stats-meta", vnode.attrs.description), m(".overview-stats-value", vnode.attrs.currentPeriod), m(".overview-stats-diff", {
                class: diffType
            }, [m(Icon_1.default, { icon: diffIcon }), " " + diffText])]);
        }
    }]);
    return OverviewStatsTile;
}();

exports.OverviewStatsTile = OverviewStatsTile;
exports.default = OverviewStatsTile;

/***/ }),
/* 293 */,
/* 294 */,
/* 295 */,
/* 296 */,
/* 297 */,
/* 298 */,
/* 299 */,
/* 300 */,
/* 301 */,
/* 302 */,
/* 303 */,
/* 304 */,
/* 305 */,
/* 306 */,
/* 307 */,
/* 308 */,
/* 309 */,
/* 310 */,
/* 311 */,
/* 312 */,
/* 313 */,
/* 314 */,
/* 315 */,
/* 316 */,
/* 317 */,
/* 318 */,
/* 319 */,
/* 320 */,
/* 321 */,
/* 322 */,
/* 323 */,
/* 324 */,
/* 325 */,
/* 326 */,
/* 327 */,
/* 328 */,
/* 329 */,
/* 330 */,
/* 331 */,
/* 332 */,
/* 333 */,
/* 334 */,
/* 335 */,
/* 336 */,
/* 337 */,
/* 338 */,
/* 339 */,
/* 340 */,
/* 341 */,
/* 342 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _regenerator = __webpack_require__(7);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getIterator2 = __webpack_require__(18);

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _promise = __webpack_require__(6);

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = _promise2.default))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
var Reports_1 = __webpack_require__(65);
var date_fns_1 = __webpack_require__(50);
var api_1 = __webpack_require__(8);
function getOverviewEvents() {
    return __awaiter(this, void 0, void 0, /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var today, startFrom, endAt, searchStart, searchEndAt, response, m0, m1, fixedEvents, previousMonthCounts, currentMonthCounts, startFromMonth, endAtMonth, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, eventCount, cmonth;

        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        today = new Date();
                        startFrom = date_fns_1.startOfMonth(date_fns_1.subMonths(today, 1));
                        endAt = date_fns_1.endOfMonth(today);
                        searchStart = date_fns_1.subDays(startFrom, 1);
                        searchEndAt = date_fns_1.addDays(endAt, 1);
                        _context.next = 7;
                        return api_1.default.getDailyEvents(["visit,engagement,conversion"], searchStart, searchEndAt);

                    case 7:
                        response = _context.sent;

                        if (!response.success) {
                            _context.next = 38;
                            break;
                        }

                        m0 = startFrom.getMonth();
                        m1 = endAt.getMonth();
                        fixedEvents = response.data.events.map(Reports_1.toFixedEventCount).filter(function (e) {
                            return (m0 === e.created_at.getMonth() || m1 === e.created_at.getMonth()) && (date_fns_1.isBefore(e.created_at, endAt) || date_fns_1.isEqual(e.created_at, endAt)) && (date_fns_1.isAfter(e.created_at, startFrom) || date_fns_1.isEqual(e.created_at, startFrom));
                        });
                        previousMonthCounts = [];
                        currentMonthCounts = [];
                        startFromMonth = startFrom.getMonth();
                        endAtMonth = endAt.getMonth();
                        _iteratorNormalCompletion = true;
                        _didIteratorError = false;
                        _iteratorError = undefined;
                        _context.prev = 19;

                        for (_iterator = (0, _getIterator3.default)(fixedEvents); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            eventCount = _step.value;
                            cmonth = eventCount.created_at.getMonth();

                            if (cmonth === startFromMonth) previousMonthCounts.push(eventCount);else if (cmonth === endAtMonth) currentMonthCounts.push(eventCount);
                        }
                        _context.next = 27;
                        break;

                    case 23:
                        _context.prev = 23;
                        _context.t0 = _context["catch"](19);
                        _didIteratorError = true;
                        _iteratorError = _context.t0;

                    case 27:
                        _context.prev = 27;
                        _context.prev = 28;

                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }

                    case 30:
                        _context.prev = 30;

                        if (!_didIteratorError) {
                            _context.next = 33;
                            break;
                        }

                        throw _iteratorError;

                    case 33:
                        return _context.finish(30);

                    case 34:
                        return _context.finish(27);

                    case 35:
                        return _context.abrupt("return", {
                            previous: Reports_1.createEventsReport(previousMonthCounts),
                            current: Reports_1.createEventsReport(currentMonthCounts)
                        });

                    case 38:
                        console.error("Error occurred while getting events: ", response.errors);
                        throw new Error("Error ocurred while getting events.");

                    case 40:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this, [[19, 23, 27, 35], [28,, 30, 34]]);
    }));
}
exports.getOverviewEvents = getOverviewEvents;

/***/ }),
/* 343 */,
/* 344 */,
/* 345 */,
/* 346 */,
/* 347 */,
/* 348 */,
/* 349 */,
/* 350 */,
/* 351 */,
/* 352 */,
/* 353 */,
/* 354 */,
/* 355 */,
/* 356 */,
/* 357 */,
/* 358 */,
/* 359 */,
/* 360 */,
/* 361 */,
/* 362 */,
/* 363 */,
/* 364 */,
/* 365 */,
/* 366 */,
/* 367 */,
/* 368 */,
/* 369 */,
/* 370 */,
/* 371 */,
/* 372 */,
/* 373 */,
/* 374 */,
/* 375 */,
/* 376 */,
/* 377 */,
/* 378 */,
/* 379 */,
/* 380 */,
/* 381 */,
/* 382 */,
/* 383 */,
/* 384 */,
/* 385 */,
/* 386 */,
/* 387 */,
/* 388 */,
/* 389 */,
/* 390 */,
/* 391 */,
/* 392 */,
/* 393 */,
/* 394 */,
/* 395 */,
/* 396 */,
/* 397 */,
/* 398 */,
/* 399 */,
/* 400 */,
/* 401 */,
/* 402 */,
/* 403 */,
/* 404 */,
/* 405 */,
/* 406 */,
/* 407 */,
/* 408 */,
/* 409 */,
/* 410 */,
/* 411 */,
/* 412 */,
/* 413 */,
/* 414 */,
/* 415 */,
/* 416 */,
/* 417 */,
/* 418 */,
/* 419 */,
/* 420 */,
/* 421 */,
/* 422 */,
/* 423 */,
/* 424 */,
/* 425 */,
/* 426 */,
/* 427 */,
/* 428 */,
/* 429 */,
/* 430 */,
/* 431 */,
/* 432 */,
/* 433 */,
/* 434 */,
/* 435 */,
/* 436 */,
/* 437 */,
/* 438 */,
/* 439 */,
/* 440 */,
/* 441 */,
/* 442 */,
/* 443 */,
/* 444 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", { value: true });
var m = __webpack_require__(3);
var utilities_1 = __webpack_require__(17);
var LIST_HEADERS = [{ label: "Generated On", property: "created_at", order: true, extract: function extract(v) {
        return utilities_1.formatDate(v);
    }, defaultDir: "desc" }, { label: "Name", property: "name", order: true }, { label: "Product", property: "calc_type", order: true, extract: function extract(v) {
        return utilities_1.calculatorTypeToText(v);
    } }];
var LEADS_FIELDS = ["id", "created_at", "name", "calc_type"];

var AutoLeadsTable = function () {
    function AutoLeadsTable() {
        (0, _classCallCheck3.default)(this, AutoLeadsTable);

        this.loading = false;
        this.calculatorUUID = undefined;
        this.leadsPerPage = 0;
    }

    (0, _createClass3.default)(AutoLeadsTable, [{
        key: "view",
        value: function view(vnode) {
            return m("div");
        }
    }]);
    return AutoLeadsTable;
}();

exports.AutoLeadsTable = AutoLeadsTable;
exports.default = AutoLeadsTable;

/***/ }),
/* 445 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", { value: true });
var m = __webpack_require__(3);
var CalculatorListScreen_1 = __webpack_require__(446);
var CalculatorEditorScreen_1 = __webpack_require__(450);
var CalculatorViewerScreen_1 = __webpack_require__(474);
var CalculatorScreenType;
(function (CalculatorScreenType) {
    CalculatorScreenType[CalculatorScreenType["List"] = 0] = "List";
    CalculatorScreenType[CalculatorScreenType["Editor"] = 1] = "Editor";
    CalculatorScreenType[CalculatorScreenType["View"] = 2] = "View";
})(CalculatorScreenType = exports.CalculatorScreenType || (exports.CalculatorScreenType = {}));

var CalculatorScreen = function () {
    function CalculatorScreen() {
        (0, _classCallCheck3.default)(this, CalculatorScreen);
    }

    (0, _createClass3.default)(CalculatorScreen, [{
        key: "view",
        value: function view(vnode) {
            switch (vnode.attrs.screenType) {
                case CalculatorScreenType.Editor:
                    {
                        return m(CalculatorEditorScreen_1.default);
                    }
                case CalculatorScreenType.List:
                    {
                        return m(CalculatorListScreen_1.default);
                    }
                case CalculatorScreenType.View:
                    {
                        return m(CalculatorViewerScreen_1.CalculatorViewerScreen);
                    }
                default:
                    {
                        alert("Bad calculator screen.");
                        throw new Error("Bad calculator screen.");
                    }
            }
        }
    }]);
    return CalculatorScreen;
}();

exports.default = CalculatorScreen;

/***/ }),
/* 446 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _keys = __webpack_require__(169);

var _keys2 = _interopRequireDefault(_keys);

var _getIterator2 = __webpack_require__(18);

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", { value: true });
var Breadcrumbs_1 = __webpack_require__(102);
var Icon_1 = __webpack_require__(15);
var svg_icons_1 = __webpack_require__(13);
var modal_1 = __webpack_require__(16);
var FinCalc = __webpack_require__(79);
var m = __webpack_require__(3);
var CalculatorList_1 = __webpack_require__(449);

var CalculatorListScreen = function () {
    function CalculatorListScreen() {
        (0, _classCallCheck3.default)(this, CalculatorListScreen);

        this.openCreateCalculatorDialog = this.openCreateCalculatorDialog.bind(this);
    }

    (0, _createClass3.default)(CalculatorListScreen, [{
        key: "openCreateCalculatorDialog",
        value: function openCreateCalculatorDialog() {
            modal_1.defaultModalQueue.push(createCalculatorModal);
        }
    }, {
        key: "_renderBreadcrumbs",
        value: function _renderBreadcrumbs() {
            return m(Breadcrumbs_1.default, {
                style: "margin: 16px;"
            }, [m("a", { href: "/calculators", oncreate: m.route.link }, "Calculators")]);
        }
    }, {
        key: "_renderHeader",
        value: function _renderHeader() {
            var title = m("h3", "Calculators");
            var _createCalculatorButton = m("button.btn", {
                onclick: this.openCreateCalculatorDialog
            }, [m(Icon_1.default, { icon: svg_icons_1.Feather.PlusSquare }), " Create Calculator"]);
            var buttons = m("div", _createCalculatorButton);
            return m(".flex-row", {
                style: "margin: 16px;"
            }, [title, m(".flex-1"), buttons]);
        }
    }, {
        key: "view",
        value: function view(vnode) {
            return m("div", [this._renderHeader(), m(CalculatorList_1.default, { createCalculatorFn: this.openCreateCalculatorDialog })]);
        }
    }]);
    return CalculatorListScreen;
}();

var createCalculatorModal = {
    size: modal_1.ModalSize.Small,
    init: function init() {
        var state = { loading: true, schemas: null, hasError: false };
        var storedSchemas = FinCalc.getStoredSchemas();
        if (storedSchemas) {
            state.loading = false;
            state.schemas = storedSchemas;
        } else {
            FinCalc.loadSchemas().then(function (schemas) {
                if (schemas) {
                    state.schemas = schemas;
                    state.loading = false;
                } else {
                    state.hasError = true;
                }
                m.redraw();
            });
        }
        return state;
    },
    render: function render(closeModal, state) {
        if (state.hasError) {
            closeModal();
        }
        var content = void 0;
        if (state.loading) {
            content = m("div", [m(".center-text", "Retrieving calculator types..."), m(".loading")]);
        } else {
            console.assert(!!state.schemas, "Tried to populate calcualtor types menu without schema.");
            var items = [m("li.menu-meta-title", "Select a calculator type.")];

            var _loop = function _loop(k) {
                var schema = state.schemas[k];
                var link = m("a", {
                    href: "/calculators/editor?create=1&type=" + schema.calc_type,
                    onclick: function onclick(event) {
                        event.preventDefault();
                        closeModal();
                        m.route.set("/calculators/editor?create=1&type=" + schema.calc_type);
                        return false;
                    }
                }, schema.calculatorTypeName);
                items.push(m("li.menu-item", link));
            };

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = (0, _getIterator3.default)((0, _keys2.default)(state.schemas)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var k = _step.value;

                    _loop(k);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            content = m("ul.menu.menu-wide", items);
        }
        return m(".modal-container", [m(".modal-header", [m("button.btn.btn-clear.float-right", { onclick: closeModal }), m(".modal-title.h5", "New Calculator")]), m(".modal-body", m(".content", content)), m(".modal-footer.flex-row.flex-jc-end", m("button.btn.btn-primary", {
            onclick: closeModal
        }, "Cancel"))]);
    }
};
exports.default = CalculatorListScreen;

/***/ }),
/* 447 */,
/* 448 */,
/* 449 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _regenerator = __webpack_require__(7);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

var _promise = __webpack_require__(6);

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = _promise2.default))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
var m = __webpack_require__(3);
var mx = __webpack_require__(10);
var api_1 = __webpack_require__(8);
var modal_1 = __webpack_require__(16);
var utilities_1 = __webpack_require__(17);
var Icon_1 = __webpack_require__(15);
var svg_icons_1 = __webpack_require__(13);

var CalculatorList = function () {
    function CalculatorList() {
        (0, _classCallCheck3.default)(this, CalculatorList);

        this.loading = false;
    }

    (0, _createClass3.default)(CalculatorList, [{
        key: "getCalculators",
        value: function getCalculators() {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/_regenerator2.default.mark(function _callee() {
                var response;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.prev = 0;
                                _context.next = 3;
                                return api_1.default.listCalculators(["uuid", "name", "updated_at", "calc_type"]);

                            case 3:
                                response = _context.sent;

                                if (!response.success) {
                                    _context.next = 9;
                                    break;
                                }

                                this.loading = false;
                                return _context.abrupt("return", response.data.calculators);

                            case 9:
                                modal_1.alertModal("Error", "There was an error while getting a list of your calculators.");

                            case 10:
                                mx.gredraw();
                                _context.next = 17;
                                break;

                            case 13:
                                _context.prev = 13;
                                _context.t0 = _context["catch"](0);

                                console.error("Error while getting list of calculators: ", _context.t0);
                                modal_1.alertModal("Error", "There was an error while getting a list of your calculators.");

                            case 17:
                                return _context.abrupt("return", []);

                            case 18:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[0, 13]]);
            }));
        }
    }, {
        key: "oninit",
        value: function oninit() {
            var _this = this;

            this.loading = true;
            this.getCalculators().then(function (calculators) {
                _this.loading = false;
                _this.calculators = calculators;
                mx.gredraw();
            });
        }
    }, {
        key: "findLocalCalcByUUID",
        value: function findLocalCalcByUUID(uuid) {
            if (this.calculators) {
                return this.calculators.findIndex(function (value) {
                    return value.uuid === uuid;
                });
            } else {
                return -1;
            }
        }
    }, {
        key: "createCalcEditFn",
        value: function createCalcEditFn(uuid) {
            var _this2 = this;

            return function (event) {
                return __awaiter(_this2, void 0, void 0, /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
                    return _regenerator2.default.wrap(function _callee2$(_context2) {
                        while (1) {
                            switch (_context2.prev = _context2.next) {
                                case 0:
                                    event.stopPropagation();
                                    event.preventDefault();
                                    m.route.set("/calculators/editor?uuid=" + uuid);

                                case 3:
                                case "end":
                                    return _context2.stop();
                            }
                        }
                    }, _callee2, this);
                }));
            };
        }
    }, {
        key: "createCalcViewFn",
        value: function createCalcViewFn(uuid) {
            var _this3 = this;

            return function (event) {
                return __awaiter(_this3, void 0, void 0, /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
                    return _regenerator2.default.wrap(function _callee3$(_context3) {
                        while (1) {
                            switch (_context3.prev = _context3.next) {
                                case 0:
                                    event.stopPropagation();
                                    event.preventDefault();
                                    m.route.set("/calculators/view?uuid=" + uuid);

                                case 3:
                                case "end":
                                    return _context3.stop();
                            }
                        }
                    }, _callee3, this);
                }));
            };
        }
    }, {
        key: "createCalcDeleteFn",
        value: function createCalcDeleteFn(uuid) {
            var _this4 = this;

            return function (event) {
                return __awaiter(_this4, void 0, void 0, /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
                    var calcIndex, calculator, confirmDelete, response;
                    return _regenerator2.default.wrap(function _callee4$(_context4) {
                        while (1) {
                            switch (_context4.prev = _context4.next) {
                                case 0:
                                    event.stopPropagation();
                                    event.preventDefault();
                                    calcIndex = this.findLocalCalcByUUID(uuid);

                                    if (!(calcIndex >= 0)) {
                                        _context4.next = 21;
                                        break;
                                    }

                                    calculator = this.calculators[calcIndex];
                                    _context4.next = 7;
                                    return modal_1.confirmModal("Delete Calculator", "Are you sure you would like to delete the calculator '" + calculator.name + "'?");

                                case 7:
                                    confirmDelete = _context4.sent;

                                    if (confirmDelete) {
                                        _context4.next = 10;
                                        break;
                                    }

                                    return _context4.abrupt("return");

                                case 10:
                                    _context4.prev = 10;
                                    _context4.next = 13;
                                    return api_1.default.deleteCalculator(calculator);

                                case 13:
                                    response = _context4.sent;

                                    if (response.success && response.data) {
                                        this.calculators.splice(this.findLocalCalcByUUID(uuid), 1);
                                        modal_1.alertModal("Deleted Calculator", "The calculator '" + calculator.name + "' was successfully deleted.");
                                    } else {
                                        console.error("There was an error while trying to delete the calculator: ", response.errors);
                                        modal_1.alertModal("Error!", "There was an error while trying to delete the calculator.");
                                    }
                                    _context4.next = 21;
                                    break;

                                case 17:
                                    _context4.prev = 17;
                                    _context4.t0 = _context4["catch"](10);

                                    console.error("There was an error while trying to delete the calculator: ", _context4.t0);
                                    modal_1.alertModal("Error!", "There was an error while trying to delete the calculator.");

                                case 21:
                                case "end":
                                    return _context4.stop();
                            }
                        }
                    }, _callee4, this, [[10, 17]]);
                }));
            };
        }
    }, {
        key: "view",
        value: function view(vnode) {
            var _this5 = this;

            if (this.loading) {
                return m("div.center-text", [m(".loading.loading-lg"), m("div", "Loading Calculators...")]);
            } else {
                if (this.calculators && this.calculators.length > 0) {
                    var tableHeader = m("thead", m("tr", [m("th", "Name"), m("th", "Type"), m("th", "Last Updated"), m("th", "")]));
                    var rows = this.calculators ? this.calculators.map(function (calculator) {
                        var calcEditFn = _this5.createCalcEditFn(calculator.uuid);
                        return m("tr", {
                            onclick: _this5.createCalcViewFn(calculator.uuid)
                        }, [m("td", calculator.name), m("td", m("span.label", utilities_1.calculatorTypeToText(calculator.calc_type))), m("td", utilities_1.formatDateTime(calculator.updated_at)), m("td", m("div.flex-row", [m("button.btn-icon.btn-icon-hover", {
                            style: "margin-right: 8px;",
                            onclick: calcEditFn
                        }, [m(Icon_1.default, { icon: svg_icons_1.Feather.Edit3 })]), m("button.btn-icon.btn-icon-hover-error", {
                            onclick: _this5.createCalcDeleteFn(calculator.uuid)
                        }, [m(Icon_1.default, { icon: svg_icons_1.Feather.Trash2 })])]))]);
                    }) : [];
                    var tableBody = m("tbody", rows);
                    var table = m("table.table.table-striped.table-hover.table-pointer", [tableHeader, tableBody]);
                    return table;
                } else {
                    return m(".empty", [m(".empty-icon.h1", m(Icon_1.default, { icon: svg_icons_1.Feather.Percent })), m("p.empty-title.h5", "You have no calculators"), m("p.empty-subtitle", "Click the button to create one."), m(".empty-action", m("button.btn.btn-primary", {
                        onclick: vnode.attrs.createCalculatorFn
                    }, [m(Icon_1.default, { icon: svg_icons_1.Feather.PlusSquare }), " Create Calculator"]))]);
                }
            }
        }
    }]);
    return CalculatorList;
}();

exports.default = CalculatorList;

/***/ }),
/* 450 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _regenerator = __webpack_require__(7);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

var _promise = __webpack_require__(6);

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = _promise2.default))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
var m = __webpack_require__(3);
var mx = __webpack_require__(10);
var Breadcrumbs_1 = __webpack_require__(102);
var CalculatorEditor_1 = __webpack_require__(451);
var api_1 = __webpack_require__(8);
var utilities_1 = __webpack_require__(17);
var fincalc_1 = __webpack_require__(79);
var modal_1 = __webpack_require__(16);
__webpack_require__(462);
var CalculatorScreen_1 = __webpack_require__(463);

var CalculatorEditorScreen = function () {
    function CalculatorEditorScreen() {
        (0, _classCallCheck3.default)(this, CalculatorEditorScreen);

        this.unsavedChanges = false;
        this.organization = {};
        this.routeGuard = this.routeGuard.bind(this);
    }

    (0, _createClass3.default)(CalculatorEditorScreen, [{
        key: "routeGuard",
        value: function routeGuard() {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/_regenerator2.default.mark(function _callee() {
                var confirmed;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                if (!this.unsavedChanges) {
                                    _context.next = 7;
                                    break;
                                }

                                _context.next = 3;
                                return modal_1.confirmModal("Unsaved Changes", "You have unsaved changes, are you sure you would like to navigate away from this page?");

                            case 3:
                                confirmed = _context.sent;
                                return _context.abrupt("return", confirmed);

                            case 7:
                                return _context.abrupt("return", true);

                            case 8:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));
        }
    }, {
        key: "oncreate",
        value: function oncreate() {
            var _this = this;

            mx.route.addGuard(this.routeGuard);
            api_1.default.getWithAuth("/user/meandorg").then(function (response) {
                if (response.success) {
                    var org = response.data.org;

                    _this.organization = org;
                } else {}
            });
        }
    }, {
        key: "onremove",
        value: function onremove() {
            mx.route.removeGuard(this.routeGuard);
        }
    }, {
        key: "setCalculator",
        value: function setCalculator(calculator) {
            var _this2 = this;

            this.calculator = mx.binding(calculator);
            this.calculator.on("change", function (calculator, prop) {
                _this2.unsavedChanges = true;
            });
        }
    }, {
        key: "oninit",
        value: function oninit() {
            var _this3 = this;

            if (m.route.param("create")) {
                var type = m.route.param("type");
                var schema = fincalc_1.getSchemaByName(type);
                if (schema) {
                    this.setCalculator(utilities_1.deepCopy(schema));
                } else {
                    fincalc_1.getSchemaByNameAsync(type).then(function (schema) {
                        if (!schema) {
                            modal_1.alertModal("Error!", "Bad calculator type.").then(function () {
                                m.route.set("/calculators");
                            });
                        } else {
                            _this3.setCalculator(utilities_1.deepCopy(schema));
                            mx.gredraw();
                        }
                    });
                }
            } else if (m.route.param("uuid")) {
                api_1.default.getCalculator(m.route.param("uuid")).then(function (response) {
                    if (response.success) {
                        _this3.setCalculator(response.data);
                        mx.gredraw();
                    } else {
                        console.error("Error while getting calculator (%s): ", m.route.param("uuid"), response.errors);
                        modal_1.alertModal("Error!", "Calculator not found.").then(function () {
                            m.route.set("/calculators");
                        });
                    }
                });
            } else {
                m.route.set("/calculators");
            }
        }
    }, {
        key: "_renderEditor",
        value: function _renderEditor() {
            var _this4 = this;

            return m(".layout-block", m(CalculatorEditor_1.default, {
                calculator: this.calculator,
                onSave: function onSave() {
                    return _this4.unsavedChanges = false;
                }
            }));
        }
    }, {
        key: "_renderPreview",
        value: function _renderPreview() {
            return m(".layout-block", m(CalculatorScreen_1.default, {
                previewMode: true,
                calculator: this.calculator.get(),
                forceColumnMode: true,
                forceBrandingImg: this.organization.branding_img
            }));
        }
    }, {
        key: "_renderBreadcrumbs",
        value: function _renderBreadcrumbs() {
            return m(Breadcrumbs_1.default, {
                style: "margin: 16px;"
            }, [m("a", { href: "/calculators", oncreate: m.route.link }, "Calculators"), "Create Calculator"]);
        }
    }, {
        key: "_renderHeader",
        value: function _renderHeader() {
            var smalltext = void 0;
            if (this.isEditing) {
                var name = this.calculator.get().name;
                smalltext = m("small.small-smaller.muted-color", name);
            } else {
                smalltext = m("small.small-smaller.muted-color", "New Calculator");
            }
            return m("h3.line-height-1", {
                style: "margin: 16px;"
            }, [m("span", { style: "display: block;" }, "Calculator Editor"), smalltext]);
        }
    }, {
        key: "view",
        value: function view(vnode) {
            var content = void 0;
            if (this.calculator) {
                content = m(".double-layout", [this._renderEditor(), this._renderPreview()]);
            } else {
                content = m(".loading.loading-lg");
            }
            return m("div", [this._renderBreadcrumbs(), this._renderHeader(), content]);
        }
    }, {
        key: "isEditing",
        get: function get() {
            if (this.calculator) {
                var calc = this.calculator.get();
                return calc && calc.uuid;
            } else {
                return false;
            }
        }
    }]);
    return CalculatorEditorScreen;
}();

exports.default = CalculatorEditorScreen;

/***/ }),
/* 451 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _toConsumableArray2 = __webpack_require__(452);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _getIterator2 = __webpack_require__(18);

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _regenerator = __webpack_require__(7);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

var _promise = __webpack_require__(6);

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = _promise2.default))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
var FormGroup_1 = __webpack_require__(457);
var MoneyFieldEditor_1 = __webpack_require__(458);
var PercentageFieldEditor_1 = __webpack_require__(459);
var ColorInput_1 = __webpack_require__(460);
var m = __webpack_require__(3);
var mx = __webpack_require__(10);
var modal_1 = __webpack_require__(16);
var svg_icons_1 = __webpack_require__(13);
var Icon_1 = __webpack_require__(15);
var index_1 = __webpack_require__(8);
var TermFieldEditor_1 = __webpack_require__(461);
var FormCheckBox_1 = __webpack_require__(48);
var style_loader_1 = __webpack_require__(171);

var CalculatorEditor = function () {
    function CalculatorEditor() {
        (0, _classCallCheck3.default)(this, CalculatorEditor);

        this.onSaveHandler = null;
        this.mailchimpLists = null;
        this.forceCalculatorChange = this.forceCalculatorChange.bind(this);
        this.forceCalculatorFieldsChanged = this.forceCalculatorFieldsChanged.bind(this);
        this.saveCalculator = this.saveCalculator.bind(this);
        this.returnToCalculators = this.returnToCalculators.bind(this);
    }

    (0, _createClass3.default)(CalculatorEditor, [{
        key: "loadMailchimpLists",
        value: function loadMailchimpLists() {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/_regenerator2.default.mark(function _callee() {
                var response;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return index_1.default.getWithAuth("/mailchimp/lists");

                            case 2:
                                response = _context.sent;

                                if (response.success) {
                                    this.mailchimpLists = response.data && response.data.lists || null;
                                } else {
                                    this.mailchimpLists = null;
                                }
                                mx.gredraw();

                            case 5:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));
        }
    }, {
        key: "showCalculatorSavedDialog",
        value: function showCalculatorSavedDialog(title, message) {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.next = 2;
                                return modal_1.defaultModalQueue.push({
                                    render: function render(close) {
                                        return m(".modal-container", [m(".modal-header", [m("button.btn.btn-clear.float-right", { onclick: close }), m(".modal-title.h5", title)]), m(".modal-body", m(".content", [message])), m(".modal-footer.flex-row.flex-jc-end", [m("button.btn.btn-link", {
                                            onclick: function onclick() {
                                                close();
                                                m.route.set("/calculators");
                                            }
                                        }, "Back to Calculators"), m("button.btn.btn-primary", {
                                            onclick: close
                                        }, "Close")])]);
                                    },
                                    size: modal_1.ModalSize.Small
                                });

                            case 2:
                            case "end":
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));
        }
    }, {
        key: "saveCalculator",
        value: function saveCalculator() {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
                var response, name, _response, _name;

                return _regenerator2.default.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                if (!this.isEditing) {
                                    _context3.next = 7;
                                    break;
                                }

                                _context3.next = 3;
                                return index_1.default.updateCalculator(this.calculator.get());

                            case 3:
                                response = _context3.sent;

                                if (response.success) {
                                    if (response.data) {
                                        name = this.calculator.get().name;

                                        if (this.onSaveHandler) this.onSaveHandler();
                                        this.showCalculatorSavedDialog("Calculator Saved", "Saved calculator '" + name + "'.");
                                    } else {
                                        modal_1.alertModal("Error!", "An error occurred while saving your calculator.");
                                    }
                                } else {
                                    console.error("An error occurred while saving this calculator(%s): ", this.calculator.get().uuid, response.errors);
                                    modal_1.alertModal("Error!", "An error occurred while saving your calculator.");
                                }
                                _context3.next = 11;
                                break;

                            case 7:
                                _context3.next = 9;
                                return index_1.default.createCalculator(this.calculator.get());

                            case 9:
                                _response = _context3.sent;

                                if (_response.success) {
                                    _name = this.calculator.get().name;

                                    this.calculator.get().uuid = _response.data.uuid;
                                    if (this.onSaveHandler) this.onSaveHandler();
                                    this.showCalculatorSavedDialog("Calculator Created", "Created new calculator '" + _name + "'.");
                                } else {
                                    console.error("An error occurred while saving the current calculator: ", _response.errors);
                                    modal_1.alertModal("Error!", "An error occurred while creating your calculator.");
                                }

                            case 11:
                            case "end":
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));
        }
    }, {
        key: "forceCalculatorChange",
        value: function forceCalculatorChange() {
            var prop = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ".";

            this.calculator.forceChange(prop);
        }
    }, {
        key: "forceCalculatorFieldsChanged",
        value: function forceCalculatorFieldsChanged() {
            this.calculator.forceChange("fields");
        }
    }, {
        key: "returnToCalculators",
        value: function returnToCalculators() {
            m.route.set("/calculators");
        }
    }, {
        key: "oninit",
        value: function oninit(vnode) {
            this.onSaveHandler = vnode.attrs.onSave || null;
            if (this.calculator !== vnode.attrs.calculator) {
                this.calculator = vnode.attrs.calculator;
            }
            this.loadMailchimpLists();
        }
    }, {
        key: "onbeforeupdate",
        value: function onbeforeupdate(vnode) {
            this.onSaveHandler = vnode.attrs.onSave || null;
            this.calculator = vnode.attrs.calculator;
        }
    }, {
        key: "_renderFields",
        value: function _renderFields(calculator) {
            if (!calculator.fields) {
                throw new Error("Rendering fields of calculator without any fields.");
            }
            var renderedFields = [];
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = (0, _getIterator3.default)(calculator.fields), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var field = _step.value;

                    if (field.type === "money") {
                        renderedFields.push(m(MoneyFieldEditor_1.default, {
                            onchange: this.forceCalculatorFieldsChanged,
                            field: field
                        }));
                    } else if (field.type === "percentage") {
                        renderedFields.push(m(PercentageFieldEditor_1.default, {
                            onchange: this.forceCalculatorFieldsChanged,
                            field: field
                        }));
                    } else if (field.type === "term") {
                        renderedFields.push(m(TermFieldEditor_1.TermFieldEditor, {
                            onchange: this.forceCalculatorFieldsChanged,
                            field: field
                        }));
                    } else {
                        console.warn("Unhandled field type: " + field.type);
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return renderedFields;
        }
    }, {
        key: "_renderColors",
        value: function _renderColors(calculator) {
            var _this = this;

            if (!calculator.colors) {
                throw new Error("Rendering colors of calculator without any colors.");
            }
            var renderedColors = [];

            var _loop = function _loop(idx) {
                var color = calculator.colors[idx];
                renderedColors.push(m(FormGroup_1.default, { label: color.displayName }, [m(ColorInput_1.default, {
                    onchange: function onchange(c) {
                        color.color = c;
                        _this.forceCalculatorChange();
                        style_loader_1.loadCalculatorStyle(_this.calculator.get());
                    },
                    color: color.color
                })]));
            };

            for (var idx = 0; idx < calculator.colors.length; idx++) {
                _loop(idx);
            }
            return renderedColors;
        }
    }, {
        key: "_renderEditor",
        value: function _renderEditor(calculator) {
            return m("div", {
                style: "padding: 16px;"
            }, [m(FormGroup_1.default, { label: "Calculator Name" }, [m("input.form-input", {
                onchange: this.calculator.setter("name", "value"),
                value: calculator.name,
                placeholder: "Calculator Name"
            })])].concat((0, _toConsumableArray3.default)(this._renderColors(calculator)), [m("label.form-label", "Calculator Fields")], (0, _toConsumableArray3.default)(this._renderFields(calculator)), [this._renderScraperSettings(), this._renderMailchimpListPicker(), m(".form-group.form-buttons", [m("button.btn.btn-link", {
                type: "button",
                onclick: this.returnToCalculators
            }, ["Return To Calculators"]), m("button.btn.btn-primary", {
                type: "button",
                onclick: this.saveCalculator
            }, [m(Icon_1.default, { icon: svg_icons_1.Feather.Edit3 }), this.isEditing ? " Save" : " Create"])])]));
        }
    }, {
        key: "_renderMailchimpListPicker",
        value: function _renderMailchimpListPicker() {
            if (this.mailchimpLists) {
                var options = [m("option", { disabled: true }, "Mailchimp List")];
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = (0, _getIterator3.default)(this.mailchimpLists), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var list = _step2.value;

                        options.push(m("option", {
                            value: list.id,
                            selected: this.calculator.get().mailchimp_list === list.id
                        }, list.name));
                    }
                } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                        }
                    } finally {
                        if (_didIteratorError2) {
                            throw _iteratorError2;
                        }
                    }
                }

                var select = m(FormGroup_1.default, { label: "Mailchimp List" }, [m("select.form-select", {
                    onchange: this.calculator.setter("mailchimp_list", "value"),
                    placeholder: "Mailchimp List"
                }, options)]);
                return select;
            } else {
                return null;
            }
        }
    }, {
        key: "_renderScraperSettings",
        value: function _renderScraperSettings() {
            return m(".field-editor", [m(".field-title", { style: "margin-bottom: 1.6rem;" }, ["Scraper ", m("small", "(Fetch Rates From Your Page)")]), m(".form-group", m(FormCheckBox_1.default, {
                onchange: function onchange() {},
                checked: false
            }, "Enable Rates Scraper")), m(FormGroup_1.default, { label: "Rates Table Page URL" }, [m("input.form-input", {
                onchange: function onchange() {},
                placeholder: "Rates Table URL"
            })])]);
        }
    }, {
        key: "_renderLoading",
        value: function _renderLoading() {
            return m(".layout-block", {
                style: "padding: 16px;"
            }, [m(".loading.loading-lg")]);
        }
    }, {
        key: "view",
        value: function view(vnode) {
            if (this.calculator) {
                return this._renderEditor(this.calculator.get());
            } else {
                return this._renderLoading();
            }
        }
    }, {
        key: "isEditing",
        get: function get() {
            if (this.calculator) {
                var calc = this.calculator.get();
                return calc && calc.uuid;
            } else {
                return false;
            }
        }
    }]);
    return CalculatorEditor;
}();

exports.default = CalculatorEditor;

/***/ }),
/* 452 */,
/* 453 */,
/* 454 */,
/* 455 */,
/* 456 */,
/* 457 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", { value: true });
var m = __webpack_require__(3);

var FormGroup = function () {
    function FormGroup() {
        (0, _classCallCheck3.default)(this, FormGroup);
    }

    (0, _createClass3.default)(FormGroup, [{
        key: "view",
        value: function view(vnode) {
            return m(".form-group", [vnode.attrs.label ? m("label.form-label", vnode.attrs.label) : null, vnode.children]);
        }
    }]);
    return FormGroup;
}();

exports.default = FormGroup;

/***/ }),
/* 458 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", { value: true });
var FormCheckBox_1 = __webpack_require__(48);
var m = __webpack_require__(3);
var mx = __webpack_require__(10);

var MoneyFieldEditor = function () {
    function MoneyFieldEditor() {
        (0, _classCallCheck3.default)(this, MoneyFieldEditor);

        this.onChange = undefined;
    }

    (0, _createClass3.default)(MoneyFieldEditor, [{
        key: "setField",
        value: function setField(field) {
            var _this = this;

            this.field = mx.binding(field);
            this.field.on("change", function (field) {
                if (_this.onChange) _this.onChange(field);
            });
        }
    }, {
        key: "oninit",
        value: function oninit(vnode) {
            this.onChange = vnode.attrs.onchange;
            this.setField(vnode.attrs.field);
        }
    }, {
        key: "onbeforeupdate",
        value: function onbeforeupdate(vnode) {
            this.onChange = vnode.attrs.onchange;
            if (!this.field || this.field.get() !== vnode.attrs.field) {
                this.setField(vnode.attrs.field);
            }
        }
    }, {
        key: "view",
        value: function view(vnode) {
            var field = this.field.get();
            console.assert(!!field, "No field supplied to money field editor.");
            var tooltipComponent = field.description && field.description.length ? m("span.field-help.tooltip", {
                "data-tooltip": field.description
            }, "?") : null;
            var editorTitle = m(".field-title", [field.name + " ($)", tooltipComponent]);
            var _labelInput = m(".form-group", [m("label.form-label", "Label"), m("input.form-input", {
                onchange: this.field.setter("label", "value"),
                value: field.label,
                placeholder: "Label"
            })]);
            var _defaultValueInput = m(".form-group", [m("label.form-label", "Default Value"), m("input.form-input", {
                onchange: this.field.setterNumber("value", "value"),
                value: field.value,
                placeholder: "Default Value"
            })]);
            var _optionsInputs = [m("label.form-label", "Options"), m(".form-group", m(FormCheckBox_1.default, {
                onchange: this.field.setter("useSlider"),
                checked: field.useSlider
            }, "Show Slider"))];
            var _rangeInputs = [m("label.form-label", "Range"), m(".flex-row.flex-center-cross", [m("div.padding-right-h", { style: "width: 50%;" }, m("input.form-input", {
                onchange: this.field.setterNumber("minValue", "value"),
                value: field.minValue,
                placeholder: "Min"
            })), m("span", "—"), m("div.padding-left-h", { style: "width: 50%;" }, m("input.form-input", {
                onchange: this.field.setterNumber("maxValue", "value"),
                value: field.maxValue,
                placeholder: "Max"
            }))])];
            var labelOptionsCol = m(".fe-layout-block.flex-column", [_labelInput, _optionsInputs]);
            var valueRangeCol = m(".fe-layout-block.flex-column", [_defaultValueInput, _rangeInputs]);
            var editorColumns = m(".field-editor-double", [labelOptionsCol, valueRangeCol]);
            return m(".field-editor", [editorTitle, editorColumns]);
        }
    }]);
    return MoneyFieldEditor;
}();

exports.default = MoneyFieldEditor;

/***/ }),
/* 459 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", { value: true });
var FormCheckBox_1 = __webpack_require__(48);
var m = __webpack_require__(3);
var mx = __webpack_require__(10);

var PercentageFieldEditor = function () {
    function PercentageFieldEditor() {
        (0, _classCallCheck3.default)(this, PercentageFieldEditor);

        this.onChange = undefined;
    }

    (0, _createClass3.default)(PercentageFieldEditor, [{
        key: "setField",
        value: function setField(field) {
            var _this = this;

            this.field = mx.binding(field);
            this.field.on("change", function (field) {
                if (_this.onChange) _this.onChange(field);
            });
        }
    }, {
        key: "oninit",
        value: function oninit(vnode) {
            this.onChange = vnode.attrs.onchange;
            this.setField(vnode.attrs.field);
        }
    }, {
        key: "onbeforeupdate",
        value: function onbeforeupdate(vnode) {
            this.onChange = vnode.attrs.onchange;
            if (!this.field || this.field.get() !== vnode.attrs.field) {
                this.setField(vnode.attrs.field);
            }
        }
    }, {
        key: "view",
        value: function view(vnode) {
            var field = this.field.get();
            console.assert(!!field, "No field supplied to percent field editor.");
            var tooltipComponent = field.description && field.description.length ? m("span.field-help.tooltip", {
                "data-tooltip": field.description
            }, "?") : null;
            var editorTitle = m(".field-title", [field.name + " (%)", tooltipComponent]);
            var _labelInput = m(".form-group", [m("label.form-label", "Label"), m("input.form-input", {
                onchange: this.field.setter("label", "value"),
                value: field.label,
                placeholder: "Label"
            })]);
            var _defaultValueInput = m(".form-group", [m("label.form-label", "Default Value"), m("input.form-input", {
                onchange: this.field.setterNumber("value", "value"),
                value: field.value,
                placeholder: "Default Value"
            })]);
            var _optionsInputs = [m("label.form-label", "Options"), m(".form-group", m(FormCheckBox_1.default, {
                onchange: this.field.setter("useSlider"),
                checked: field.useSlider
            }, "Show Slider"))];
            var _rangeInputs = [m("label.form-label", "Range"), m(".flex-row.flex-center-cross", [m("div.padding-right-h", { style: "width: 50%;" }, m("input.form-input", {
                onchange: this.field.setterNumber("minValue", "value"),
                value: field.minValue,
                placeholder: "Min"
            })), m("span", "—"), m("div.padding-left-h", { style: "width: 50%;" }, m("input.form-input", {
                onchange: this.field.setterNumber("maxValue", "value"),
                value: field.maxValue,
                placeholder: "Max"
            }))])];
            var labelOptionsCol = m(".fe-layout-block.flex-column", [_labelInput, _optionsInputs]);
            var valueRangeCol = m(".fe-layout-block.flex-column", [_defaultValueInput, _rangeInputs]);
            var editorColumns = m(".field-editor-double", [labelOptionsCol, valueRangeCol]);
            return m(".field-editor", [editorTitle, editorColumns]);
        }
    }]);
    return PercentageFieldEditor;
}();

exports.default = PercentageFieldEditor;

/***/ }),
/* 460 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", { value: true });
var parseColor = __webpack_require__(170);
var m = __webpack_require__(3);
var utilities_1 = __webpack_require__(17);

var ColorInput = function () {
    function ColorInput() {
        (0, _classCallCheck3.default)(this, ColorInput);

        this.onColorChange = undefined;
        this.onChange = this.onChange.bind(this);
    }

    (0, _createClass3.default)(ColorInput, [{
        key: "onChange",
        value: function onChange(event) {
            var target = event.target;
            if (this.onColorChange) {
                this.onColorChange(target.value);
            }
        }
    }, {
        key: "onupdate",
        value: function onupdate(vnode) {
            this.onColorChange = vnode.attrs.onchange;
        }
    }, {
        key: "view",
        value: function view(vnode) {
            var cssColor = void 0;
            var _color = vnode.attrs.color;
            if (_color) {
                var parsed = parseColor(_color);
                cssColor = parsed ? utilities_1.rgbaArrayToColorString(parsed) : "#000000";
            } else {
                cssColor = "#000000";
            }
            return m(".has-icon-left", [m("input.form-input", {
                value: vnode.attrs.color,
                onchange: this.onChange,
                placeholder: "Color"
            }), m("span.form-icon.icon-right.color-input-icon", {
                style: "background-color: " + cssColor + "; border-radius: 1.6rem;"
            })]);
        }
    }]);
    return ColorInput;
}();

exports.default = ColorInput;

/***/ }),
/* 461 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _getIterator2 = __webpack_require__(18);

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _slicedToArray2 = __webpack_require__(47);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _map = __webpack_require__(124);

var _map2 = _interopRequireDefault(_map);

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", { value: true });
var m = __webpack_require__(3);
var mx = __webpack_require__(10);
var api_calculator_1 = __webpack_require__(127);
var Icon_1 = __webpack_require__(15);
var svg_icons_1 = __webpack_require__(13);
var utilities_1 = __webpack_require__(17);
var FormCheckBox_1 = __webpack_require__(48);

var TermFieldEditor = function () {
    function TermFieldEditor() {
        (0, _classCallCheck3.default)(this, TermFieldEditor);

        this._termKeys = new _map2.default();
        this.onChange = undefined;
    }

    (0, _createClass3.default)(TermFieldEditor, [{
        key: "setField",
        value: function setField(field) {
            var _this = this;

            this.field = mx.binding(field);
            this.field.on("change", function (field) {
                if (_this.onChange) _this.onChange(field);
            });
        }
    }, {
        key: "emitChange",
        value: function emitChange() {
            if (this.field && this.field.get()) {
                if (this.onChange) this.onChange(this.field.get());
            }
        }
    }, {
        key: "oninit",
        value: function oninit(vnode) {
            this.onChange = vnode.attrs.onchange;
            this.setField(vnode.attrs.field);
        }
    }, {
        key: "onbeforeupdate",
        value: function onbeforeupdate(vnode) {
            this.onChange = vnode.attrs.onchange;
            if (!this.field || this.field.get() !== vnode.attrs.field) {
                this.setField(vnode.attrs.field);
            }
        }
    }, {
        key: "removeTerm",
        value: function removeTerm(term) {
            var field = this.field.get();
            var termIndex = field.terms ? field.terms.indexOf(term) : -1;
            if (termIndex >= 0) {
                field.terms.splice(termIndex, 1);
            }
            this._termKeys.delete(term);
        }
    }, {
        key: "_renderOptions",
        value: function _renderOptions() {
            var field = this.field.get();
            var options = [];
            options.push(m(".form-group", [m("label.form-label", "Label"), m("input.form-input", {
                onchange: this.field.setter("label", "value"),
                value: field.label,
                placeholder: "Label"
            })]));
            options.push(m(FormCheckBox_1.default, {
                checked: !!field.allowCustom,
                onchange: this.field.setter("allowCustom")
            }, "Allow Custom Terms"));
            if (field.allowCustom) {
                var unitsText = field.valueUnits === api_calculator_1.TermUnits.Month ? "Months" : "Years";
                var _valueUnitsInput = m(".form-group", [m("label.form-label", "Units"), m("select.form-select.select-sm", [m("option", { disabled: true }, "Units"), m("option", { value: api_calculator_1.TermUnits.Month, selected: field.valueUnits === api_calculator_1.TermUnits.Month }, "Month (s)")])]);
                options.push(_valueUnitsInput);
                var _defaultValueInput = m(".form-group", [m("label.form-label", "Default Value (" + unitsText + ")"), m("input.form-input.input-sm", {
                    onchange: this.field.setterNumber("value", "value"),
                    value: field.value,
                    placeholder: "Default Value"
                })]);
                options.push(_defaultValueInput);
                var _rangeInputs = [m("label.form-label", "Range (" + unitsText + ")"), m(".flex-row.flex-center-cross", [m("div.padding-right-h", { style: "width: 50%;" }, m("input.form-input.input-sm", {
                    onchange: this.field.setterNumber("minValue", "value"),
                    value: field.minValue,
                    placeholder: "Min"
                })), m("span", "—"), m("div.padding-left-h", { style: "width: 50%;" }, m("input.form-input.input-sm", {
                    onchange: this.field.setterNumber("maxValue", "value"),
                    value: field.maxValue,
                    placeholder: "Max"
                }))])];
                options.push(_rangeInputs);
            }
            return m(".flex-column", options);
        }
    }, {
        key: "_renderTermsList",
        value: function _renderTermsList() {
            var _this2 = this;

            var field = this.field.get();
            var termsList = void 0;
            var termLengthRows = [];

            var _loop = function _loop(term) {
                var keys = _this2._termKeys.get(term);
                if (!keys) {
                    keys = [utilities_1.genId(), utilities_1.genId()];
                    _this2._termKeys.set(term, keys);
                }

                var _keys = keys,
                    _keys2 = (0, _slicedToArray3.default)(_keys, 2),
                    btnKey = _keys2[0],
                    inputKey = _keys2[1];

                var termRemoveButton = m("button.btn-icon.btn-icon-hover-error", {
                    onclick: function onclick() {
                        _this2.removeTerm(term);
                        _this2.emitChange();
                    }
                }, [m(Icon_1.default, { icon: svg_icons_1.Feather.MinusSquare })]);
                var termInput = m("input.form-input.input-sm", {
                    value: term.length,
                    placeholder: "Term Length",
                    type: "text",
                    onchange: m.withAttr("value", function (val) {
                        var intVal = parseInt(val) || 0;
                        term.length = intVal;
                        _this2.emitChange();
                    })
                });
                var termUnitsSelect = m("select.form-select.select-sm", {
                    onchange: m.withAttr("value", function (value) {
                        term.units = value;
                        _this2.emitChange();
                    })
                }, [m("option", { disabled: true }, "Units"), m("option", { value: api_calculator_1.TermUnits.Month, selected: term.units === api_calculator_1.TermUnits.Month }, "Month (s)"), m("option", { value: api_calculator_1.TermUnits.Year, selected: term.units === api_calculator_1.TermUnits.Year }, "Year (s)")]);
                var termLengthGroup = m(".input-group", [termInput, termUnitsSelect]);
                var termRateInput = m("input.form-input.input-sm", {
                    value: term.rate || 0,
                    placeholder: "Term Rate",
                    type: "text",
                    onchange: m.withAttr("value", function (val) {
                        var floatVal = parseFloat(val) || 0;
                        term.rate = floatVal;
                        _this2.emitChange();
                    })
                });
                var termRateGroup = m(".input-group", {
                    style: "margin-left: 8px;"
                }, [termRateInput, m(".input-group-addon.addon-sm", "%")]);
                termLengthRows.push(m(".flex-row.flex-ali-center", { key: btnKey }, [termRemoveButton, termLengthGroup, termRateGroup]));
            };

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = (0, _getIterator3.default)(field.terms), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var term = _step.value;

                    _loop(term);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            if (termLengthRows.length > 0) {
                termsList = termLengthRows;
            } else {
                termsList = [m(".empty", [m(".empty-icon.h1", m(Icon_1.default, { icon: svg_icons_1.Feather.Calendar })), m("p.empty-title.h5", "No Default Term Lengths"), m("p.empty-subtitle", "Click the button below to add one.")])];
            }
            termsList.push(m(".flex-als-end", [m("button.btn", {
                style: "margin-top: 16px",
                onclick: function onclick() {
                    field.terms.push({ length: 3, units: api_calculator_1.TermUnits.Month, rate: 3 });
                    _this2.emitChange();
                }
            }, [m(Icon_1.default, { icon: svg_icons_1.Feather.PlusSquare }), " Add Term"])]));
            return m(".flex-column", { style: "margin-top: 8px;" }, termsList);
        }
    }, {
        key: "view",
        value: function view(vnode) {
            var field = this.field.get();
            console.assert(!!field, "No field supplied to term field editor.");
            var editorTitle = m(".field-title", [field.name]);
            return m(".field-editor", [editorTitle, m("label.form-label.label-bold", "Default Terms & Rates"), this._renderTermsList(), m("label.form-label.label-bold", "Options"), this._renderOptions()]);
        }
    }]);
    return TermFieldEditor;
}();

exports.TermFieldEditor = TermFieldEditor;
exports.default = TermFieldEditor;

/***/ }),
/* 462 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 463 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof2 = __webpack_require__(46);

var _typeof3 = _interopRequireDefault(_typeof2);

var _regenerator = __webpack_require__(7);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getIterator2 = __webpack_require__(18);

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

var _promise = __webpack_require__(6);

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = _promise2.default))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
var m = __webpack_require__(3);
var common_calc_types_1 = __webpack_require__(128);
var calculator_1 = __webpack_require__(464);
var CalculatorMoneyField_1 = __webpack_require__(465);
var CalculatorPercentageField_1 = __webpack_require__(467);
var CalculatorTermField_1 = __webpack_require__(468);
var CalculatorResultScreen_1 = __webpack_require__(472);
var ulitiies_1 = __webpack_require__(34);
var modal_1 = __webpack_require__(16);
var style_loader_1 = __webpack_require__(171);

var CalculatorScreen = function () {
    function CalculatorScreen() {
        (0, _classCallCheck3.default)(this, CalculatorScreen);

        this.calculatorResultState = CalculatorResultScreen_1.CalculatorResultScreenState.Empty;
        this.calculatorResults = null;
        this.previewMode = false;
        this.showDisclaimerAlert = this.showDisclaimerAlert.bind(this);
        this.showApplyForm = this.showApplyForm.bind(this);
        this.calculate = this.calculate.bind(this);
    }

    (0, _createClass3.default)(CalculatorScreen, [{
        key: "getBrandingImage",
        value: function getBrandingImage(vnode) {
            var imgstr = "/static/img/home/logo-black.png";
            if (typeof this.calculator.branding_img === "string" && this.calculator.branding_img.length > 0) {
                imgstr = this.calculator.branding_img.trim();
            } else if (typeof vnode.attrs.forceBrandingImg === "string" && vnode.attrs.forceBrandingImg.length > 0) {
                imgstr = vnode.attrs.forceBrandingImg;
            }
            if (imgstr.length > 0) {
                if (!imgstr.startsWith("/")) imgstr = "/" + imgstr;
            }
            return imgstr;
        }
    }, {
        key: "initVars",
        value: function initVars() {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = (0, _getIterator3.default)(this.calculator.fields), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var field = _step.value;

                    switch (field.type) {
                        case "money":
                            this.calculatorVars.set(field.name, field.value);
                            break;
                        case "percentage":
                            this.calculatorVars.set(field.name, field.value);
                            break;
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
    }, {
        key: "oninit",
        value: function oninit(vnode) {
            if (!this.calculator || this.calculator !== vnode.attrs.calculator) {
                this.calculator = vnode.attrs.calculator;
                this.calculatorVars = new calculator_1.CalculatorVars();
                this.initVars();
            }
            this.previewMode = !!vnode.attrs.previewMode;
        }
    }, {
        key: "onbeforeupdate",
        value: function onbeforeupdate(vnode) {
            if (this.calculator !== vnode.attrs.calculator) {
                this.calculator = vnode.attrs.calculator;
                this.calculatorVars = new calculator_1.CalculatorVars();
                this.initVars();
            }
            this.previewMode = !!vnode.attrs.previewMode;
        }
    }, {
        key: "oncreate",
        value: function oncreate() {
            style_loader_1.loadCalculatorStyle(this.calculator);
        }
    }, {
        key: "onremove",
        value: function onremove() {
            style_loader_1.unloadCalculatorStyle(this.calculator);
        }
    }, {
        key: "fetchCalculationResults",
        value: function fetchCalculationResults() {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/_regenerator2.default.mark(function _callee() {
                var data, result;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                data = {
                                    parameters: this.calculatorVars.vars
                                };

                                if (this.previewMode) {
                                    data["calctype"] = this.calculator.calc_type;
                                    data["preview"] = true;
                                } else {
                                    data["shortid"] = this.calculator.shortid;
                                }
                                _context.next = 4;
                                return m.request({
                                    method: "POST",
                                    url: "/api/calculate/calculate",
                                    data: data
                                });

                            case 4:
                                result = _context.sent;

                                if (!result["data"]) {
                                    _context.next = 9;
                                    break;
                                }

                                return _context.abrupt("return", result["data"]);

                            case 9:
                                console.error("Bad calculator result: ", result);
                                throw new Error("Bad calculator result.");

                            case 11:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));
        }
    }, {
        key: "calculate",
        value: function calculate() {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
                var minCalculateTime, calculateStartTime, results, calculateDuration;
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                minCalculateTime = 700;

                                this.calculatorResultState = CalculatorResultScreen_1.CalculatorResultScreenState.Calculating;
                                _context2.next = 4;
                                return ulitiies_1.delay(0);

                            case 4:
                                calculateStartTime = Date.now();
                                _context2.next = 7;
                                return this.fetchCalculationResults();

                            case 7:
                                results = _context2.sent;
                                calculateDuration = Date.now() - calculateStartTime;
                                _context2.next = 11;
                                return ulitiies_1.delay(calculateDuration >= minCalculateTime ? 0 : minCalculateTime - calculateDuration);

                            case 11:
                                this.calculatorResults = results;
                                this.calculatorResultState = CalculatorResultScreen_1.CalculatorResultScreenState.Display;
                                m.redraw();

                            case 14:
                            case "end":
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));
        }
    }, {
        key: "_renderFieldsScreen",
        value: function _renderFieldsScreen() {
            var _fields = [];
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = (0, _getIterator3.default)(this.calculator.fields), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var genericField = _step2.value;

                    if (genericField.type === "money") {
                        var moneyField = genericField;
                        _fields.push(m(CalculatorMoneyField_1.default, {
                            field: moneyField,
                            vars: this.calculatorVars
                        }));
                    } else if (genericField.type === "percentage") {
                        var percentField = genericField;
                        _fields.push(m(CalculatorPercentageField_1.default, {
                            field: percentField,
                            vars: this.calculatorVars
                        }));
                    } else if (genericField.type === "term") {
                        var termField = genericField;
                        _fields.push(m(CalculatorTermField_1.default, {
                            field: termField,
                            vars: this.calculatorVars,
                            interestVar: "Interest Rate"
                        }));
                    } else {
                        console.warn("Unknown calculator field: " + genericField.type);
                    }
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            var buttons = m("div.fcalc-field-padding", {
                style: "display: flex; flex-direction: row; justify-content: flex-end;"
            }, [m("button.btn.btn-primary.fcalc-calc-style", {
                class: this.calculatorResultState === CalculatorResultScreen_1.CalculatorResultScreenState.Calculating ? "loading" : "",
                onclick: this.calculate,
                disabled: this.calculatorResultState === CalculatorResultScreen_1.CalculatorResultScreenState.Calculating
            }, "Calculate")]);
            _fields.push(buttons);
            return m(".fcalc-screen.fcalc-fields", {}, _fields);
        }
    }, {
        key: "_renderResultsScreen",
        value: function _renderResultsScreen() {
            return m(CalculatorResultScreen_1.default, { calculator: this.calculator, currentState: this.calculatorResultState, results: this.calculatorResults });
        }
    }, {
        key: "_renderApplyScreen",
        value: function _renderApplyScreen() {
            return m(".fcalc-screen.fcalc-apply-screen", {
                style: "padding: 32px; display: flex; flex-direction: column; align-content: center;"
            }, [m("button.btn.btn-lg.btn-block.btn-free-height.btn-primary.fcalc-calc-style", {
                onclick: this.showApplyForm,
                style: "font-size: 2.5rem; height: 5rem; padding-left: 32px; padding-right: 32px;"
            }, "APPLY"), m("button.btn.fcalc-calc-style", {
                onclick: this.showDisclaimerAlert,
                style: "align-self: center; margin-top: 8px;"
            }, "Disclaimer")]);
        }
    }, {
        key: "sendApply",
        value: function sendApply(form) {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
                var result, _errors, prop, val;

                return _regenerator2.default.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _context3.prev = 0;
                                _context3.next = 3;
                                return m.request({
                                    method: "POST",
                                    url: "/api/leadgen",
                                    data: {
                                        preview: this.previewMode,
                                        name: form.data.name,
                                        email: form.data.email,
                                        phone_number: form.data.phone_number,
                                        shortid: this.calculator.shortid,
                                        term: this.calculatorVars.get("Term Length", undefined),
                                        amount: this.calculatorVars.get("Loan Amount", undefined)
                                    }
                                });

                            case 3:
                                result = _context3.sent;
                                return _context3.abrupt("return", true);

                            case 7:
                                _context3.prev = 7;
                                _context3.t0 = _context3["catch"](0);

                                if (_context3.t0["errors"] && (0, _typeof3.default)(_context3.t0["errors"]) === "object") {
                                    form.errors = {};
                                    _errors = _context3.t0["errors"];

                                    for (prop in _errors) {
                                        val = _errors[prop];

                                        if (typeof val["property"] === "string" && typeof val["message"] === "string") {
                                            form.errors[val["property"]] = val["message"];
                                        }
                                    }
                                } else {
                                    console.error("unhandled error while applying: ", _context3.t0);
                                }

                            case 10:
                                return _context3.abrupt("return", false);

                            case 11:
                            case "end":
                                return _context3.stop();
                        }
                    }
                }, _callee3, this, [[0, 7]]);
            }));
        }
    }, {
        key: "showApplyForm",
        value: function showApplyForm() {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
                var _this = this;

                var form;
                return _regenerator2.default.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                _context4.next = 2;
                                return modal_1.defaultModalQueue.push({
                                    init: function init() {
                                        return {
                                            loading: false,
                                            data: {
                                                name: "",
                                                phone_number: "",
                                                email: ""
                                            },
                                            errors: {}
                                        };
                                    },
                                    render: function render(closeModal, state) {
                                        var form = m("form", [m(".form-group", {
                                            class: !!state.errors["name"] ? "has-error" : ""
                                        }, [m("label.form-label", "Name"), m("input.form-input.fcalc-calc-style", {
                                            disabled: state.loading,
                                            value: state.data.name,
                                            onchange: m.withAttr("value", function (val) {
                                                return state.data.name = val;
                                            }),
                                            placeholder: "Name"
                                        }), !!state.errors["name"] ? m("p.form-input-hint", state.errors["name"]) : null]), m(".form-group", {
                                            class: !!state.errors["email"] ? "has-error" : ""
                                        }, [m("label.form-label", "Email Address"), m("input.form-input.fcalc-calc-style", {
                                            disabled: state.loading,
                                            value: state.data.email,
                                            onchange: m.withAttr("value", function (val) {
                                                return state.data.email = val;
                                            }),
                                            placeholder: "Email Address"
                                        }), !!state.errors["email"] ? m("p.form-input-hint", state.errors["email"]) : null]), m(".form-group", {
                                            class: !!state.errors["phone_number"] ? "has-error" : ""
                                        }, [m("label.form-label", "Phone Number"), m("input.form-input.fcalc-calc-style", {
                                            disabled: state.loading,
                                            value: state.data.phone_number,
                                            onchange: m.withAttr("value", function (val) {
                                                return state.data.phone_number = val;
                                            }),
                                            placeholder: "Phone Number"
                                        }), !!state.errors["phone_number"] ? m("p.form-input-hint", state.errors["phone_number"]) : null])]);
                                        return m(".modal-container", [m(".modal-header", [m("button.btn.btn-clear.float-right.fcalc-calc-style", { onclick: closeModal }), m(".modal-title.h5", "Apply")]), m(".modal-body", m(".content", [form])), m(".modal-footer.flex-row.flex-jc-end", [m("button.btn.fcalc-calc-style", {
                                            style: "margin-right: 8px;",
                                            onclick: closeModal
                                        }, "Close"), m("button.btn.btn-primary.fcalc-calc-style", {
                                            class: state.loading ? "loading" : "",
                                            onclick: function onclick() {
                                                state.errors = {};
                                                state.loading = true;
                                                _this.sendApply(state).then(function (result) {
                                                    if (result) {
                                                        closeModal();
                                                        modal_1.alertModal("Application Successful", function () {
                                                            return m("div", [m("div", "Thank you for applying."), m("a", {
                                                                href: "#"
                                                            }, "Redirecting to the loan application form...")]);
                                                        }, {
                                                            hideCloseButton: true
                                                        });
                                                        m.redraw();
                                                    }
                                                    state.loading = false;
                                                    m.redraw();
                                                });
                                            }
                                        }, "Apply")])]);
                                    },
                                    size: modal_1.ModalSize.Small
                                });

                            case 2:
                                form = _context4.sent;

                                console.log("apply result: ", form);

                            case 4:
                            case "end":
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));
        }
    }, {
        key: "showDisclaimerAlert",
        value: function showDisclaimerAlert() {
            var disclaimer = "Annual percentage rates, terms and availability may differ based upon evaluation of credit. Additional loan rates and terms may be available. Other restrictions may apply. The figures shown are hypothetical and may not be applicable to your individual situation.";
            modal_1.alertModal("Disclaimer", disclaimer);
        }
    }, {
        key: "_renderBranding",
        value: function _renderBranding(vnode) {
            return m(".fcalc-branding", {
                style: "background: url(" + this.getBrandingImage(vnode) + ") center center no-repeat;"
            }, [m("span.fcalc-branding-type", this.brandingLabelText)]);
        }
    }, {
        key: "view",
        value: function view(vnode) {
            if (!this.calculator) {
                return m(".fcalc.fcalc-calc-style", "...");
            }
            return m(".fcalc.fcalc-calc-style", [this._renderBranding(vnode), m(".fcalc-screens", {
                class: vnode.attrs.forceColumnMode ? "fcalc-force-column" : "fcalc-no-force-column"
            }, [this._renderFieldsScreen(), this._renderResultsScreen(), this.calculatorResults ? this._renderApplyScreen() : null])]);
        }
    }, {
        key: "brandingLabelText",
        get: function get() {
            switch (this.calculator.calc_type) {
                case common_calc_types_1.CalculatorType.Mortgage:
                    return "MortgageCalc";
                case common_calc_types_1.CalculatorType.AutoLoan:
                    return "AutoCalc";
                case common_calc_types_1.CalculatorType.HomeEquityLoan:
                    return "HomeEquityCalc";
                case common_calc_types_1.CalculatorType.CDLoan:
                    return "CDLoanCalc";
                case common_calc_types_1.CalculatorType.MoneyMarketLoan:
                    return "MoneyMarketCalc";
                case common_calc_types_1.CalculatorType.BoatRVLoan:
                    return "BoatRVCalc";
                case common_calc_types_1.CalculatorType.PersonalLoan:
                    return "PersonalCalc";
            }
        }
    }]);
    return CalculatorScreen;
}();

exports.default = CalculatorScreen;

/***/ }),
/* 464 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", { value: true });

var CalculatorVars = function () {
    function CalculatorVars() {
        (0, _classCallCheck3.default)(this, CalculatorVars);

        this.calcVars = {};
    }

    (0, _createClass3.default)(CalculatorVars, [{
        key: "set",
        value: function set(key, value) {
            if (typeof value === "string") {
                debugger;
            }
            this.calcVars[key] = value;
        }
    }, {
        key: "get",
        value: function get(key, def) {
            var v = this.calcVars[key];
            if (typeof v === "undefined") return def;
            return v;
        }
    }, {
        key: "vars",
        get: function get() {
            return this.calcVars;
        }
    }]);
    return CalculatorVars;
}();

exports.CalculatorVars = CalculatorVars;

/***/ }),
/* 465 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", { value: true });
var wNumb = __webpack_require__(55);
var m = __webpack_require__(3);
var Slider_1 = __webpack_require__(172);
var ulitiies_1 = __webpack_require__(34);
var moneyFormat = wNumb({
    mark: '.',
    decimals: 2,
    thousand: ',',
    prefix: '$'
});

var CalculatorMoneyField = function () {
    function CalculatorMoneyField() {
        (0, _classCallCheck3.default)(this, CalculatorMoneyField);

        this.inputId = ulitiies_1.genId();
    }

    (0, _createClass3.default)(CalculatorMoneyField, [{
        key: "oninit",
        value: function oninit(vnode) {
            this.field = vnode.attrs.field;
            this.vars = vnode.attrs.vars;
            console.assert(!!this.field, "[init] Calculator money field without field value set.");
            console.assert(!!this.vars, "[init] Calculator money field without vars set.");
        }
    }, {
        key: "onbeforeupdate",
        value: function onbeforeupdate(vnode) {
            this.field = vnode.attrs.field;
            this.vars = vnode.attrs.vars;
            console.assert(!!this.field, "[update] Calculator money field without field value set.");
            console.assert(!!this.vars, "[update] Calculator money field without vars set.");
        }
    }, {
        key: "ensureValueInBounds",
        value: function ensureValueInBounds(val) {
            if (typeof val === "number") {
                return Math.max(Math.min(val, this.maxValue), this.minValue);
            } else {
                return this.minValue;
            }
        }
    }, {
        key: "view",
        value: function view(vnode) {
            var _this = this;

            var slider = null;
            if (this.field.useSlider) {
                slider = m(Slider_1.default, {
                    value: this.vars.get(this.field.name, this.field.value),
                    options: {
                        step: 1,
                        range: {
                            min: this.minValue,
                            max: this.maxValue
                        },
                        tooltips: Slider_1.default.Tooltips.WhileDragging,
                        tooltipsFormat: [moneyFormat]
                    },
                    onChange: function onChange(value) {
                        return _this.vars.set(_this.field.name, value);
                    }
                });
            }
            return m(".fcalc-field", [m(".fcalc-field-row", [m("label.fcalc-field-label", { for: this.inputId }, this.field.label), m(".fcalc-field-row-flex"), m("input.form-input.input-inline.fcalc-calc-style", {
                id: this.inputId,
                value: moneyFormat.to(this.vars.get(this.field.name, this.field.value)),
                onchange: m.withAttr("value", function (val) {
                    var moneyVal = _this.ensureValueInBounds(moneyFormat.from(val));
                    _this.vars.set(_this.field.name, moneyVal);
                }),
                type: "text"
            })]), slider]);
        }
    }, {
        key: "minValue",
        get: function get() {
            return this.field.minValue;
        }
    }, {
        key: "maxValue",
        get: function get() {
            var _max = void 0;
            if (this.field.minValue === this.field.maxValue || this.field.maxValue < 0) {
                if ((this.field.maxValue < 0 || this.field.minValue === 0) && this.field.name === "Down Payment") {
                    _max = this.vars.get("Loan Amount", this.field.minValue + 1);
                } else {
                    _max = this.field.minValue + 1;
                }
            } else {
                _max = this.field.maxValue;
            }
            return _max;
        }
    }]);
    return CalculatorMoneyField;
}();

exports.CalculatorMoneyField = CalculatorMoneyField;
exports.default = CalculatorMoneyField;

/***/ }),
/* 466 */,
/* 467 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", { value: true });
var wNumb = __webpack_require__(55);
var m = __webpack_require__(3);
var Slider_1 = __webpack_require__(172);
var ulitiies_1 = __webpack_require__(34);
var percentFormat = wNumb({
    mark: '.',
    decimals: 2,
    thousand: ',',
    postfix: '%'
});

var CalculatorPercentField = function () {
    function CalculatorPercentField() {
        (0, _classCallCheck3.default)(this, CalculatorPercentField);

        this.inputId = ulitiies_1.genId();
    }

    (0, _createClass3.default)(CalculatorPercentField, [{
        key: "oninit",
        value: function oninit(vnode) {
            this.field = vnode.attrs.field;
            this.vars = vnode.attrs.vars;
            console.assert(!!this.field, "[init] Calculator percent field without field value set.");
            console.assert(!!this.vars, "[init] Calculator percent field without vars set.");
        }
    }, {
        key: "onbeforeupdate",
        value: function onbeforeupdate(vnode) {
            this.field = vnode.attrs.field;
            this.vars = vnode.attrs.vars;
            console.assert(!!this.field, "[update] Calculator percent field without field value set.");
            console.assert(!!this.vars, "[update] Calculator percent field without vars set.");
        }
    }, {
        key: "ensureValueInBounds",
        value: function ensureValueInBounds(val) {
            if (typeof val === "number") {
                return Math.max(Math.min(val, this.maxValue), this.minValue);
            } else {
                return this.minValue;
            }
        }
    }, {
        key: "view",
        value: function view(vnode) {
            var _this = this;

            var slider = null;
            if (this.field.useSlider) {
                slider = m(Slider_1.default, {
                    value: this.vars.get(this.field.name, this.field.value),
                    options: {
                        step: 1,
                        range: {
                            min: this.minValue,
                            max: this.maxValue
                        },
                        tooltips: Slider_1.default.Tooltips.WhileDragging,
                        tooltipsFormat: [percentFormat]
                    },
                    onChange: function onChange(value) {
                        return _this.vars.set(_this.field.name, value);
                    }
                });
            }
            return m(".fcalc-field", [m(".fcalc-field-row", [m("label.fcalc-field-label", { for: this.inputId }, this.field.label), m(".fcalc-field-row-flex"), m("input.form-input.input-inline.fcalc-calc-style", {
                id: this.inputId,
                value: percentFormat.to(this.vars.get(this.field.name, this.field.value)),
                onchange: m.withAttr("value", function (val) {
                    var percentVal = _this.ensureValueInBounds(percentFormat.from(val));
                    _this.vars.set(_this.field.name, percentVal);
                }),
                type: "text"
            })]), slider]);
        }
    }, {
        key: "minValue",
        get: function get() {
            return this.field.minValue;
        }
    }, {
        key: "maxValue",
        get: function get() {
            return this.field.minValue === this.field.maxValue ? this.field.minValue + 1 : this.field.maxValue;
        }
    }]);
    return CalculatorPercentField;
}();

exports.CalculatorPercentField = CalculatorPercentField;
exports.default = CalculatorPercentField;

/***/ }),
/* 468 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _isFinite = __webpack_require__(173);

var _isFinite2 = _interopRequireDefault(_isFinite);

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", { value: true });
var m = __webpack_require__(3);
var types_1 = __webpack_require__(471);
var ulitiies_1 = __webpack_require__(34);

var CalculatorTermField = function () {
    function CalculatorTermField() {
        (0, _classCallCheck3.default)(this, CalculatorTermField);

        this.customMode = false;
        this.customValue = 0;
        this.customUnits = types_1.TermUnits.Month;
        this.selectedTerm = null;
        this.inputId = ulitiies_1.genId();
    }

    (0, _createClass3.default)(CalculatorTermField, [{
        key: "oninit",
        value: function oninit(vnode) {
            this.field = vnode.attrs.field;
            this.vars = vnode.attrs.vars;
            console.assert(!!this.field, "[init] Calculator term field without field value set.");
            console.assert(!!this.vars, "[init] Calculator term field without vars set.");
            this.selectedTerm = this.field.terms[0] || null;
            if (this.selectedTerm) {
                this.customValue = this.selectedTerm.length;
                this.customUnits = this.selectedTerm.units;
                this.fieldValue = this.monthLength(this.selectedTerm.length, this.selectedTerm.units);
                if (vnode.attrs.interestVar) {
                    this.vars.set(vnode.attrs.interestVar, this.selectedTerm.rate);
                }
            } else {
                this.customValue = 1;
                this.customUnits = types_1.TermUnits.Month;
                this.fieldValue = this.monthLength(this.customValue, this.customUnits);
                this.customMode = true;
            }
        }
    }, {
        key: "onbeforeupdate",
        value: function onbeforeupdate(vnode) {
            this.field = vnode.attrs.field;
            this.vars = vnode.attrs.vars;
            console.assert(!!this.field, "[update] Calculator term field without field value set.");
            console.assert(!!this.vars, "[update] Calculator term field without vars set.");
            if (this.onlyCustomTermLength && !this.customMode) {
                this.customValue = 1;
                this.customUnits = types_1.TermUnits.Month;
                this.fieldValue = this.monthLength(this.customValue, this.customUnits);
                this.customMode = true;
            }
        }
    }, {
        key: "monthLength",
        value: function monthLength(value, units) {
            switch (units) {
                case types_1.TermUnits.Month:
                    return value;
                case types_1.TermUnits.Year:
                    return value * 12;
                default:
                    throw new Error("Bad term units.");
            }
        }
    }, {
        key: "monthsText",
        value: function monthsText(value, units) {
            var months = this.monthLength(value, units);
            switch (units) {
                case types_1.TermUnits.Month:
                    {
                        if (months === 1) return "1 Month";else return months + " Months";
                    }
                case types_1.TermUnits.Year:
                    {
                        var years = months / 12;
                        if (years === 1) return "1 Year";else return years.toFixed(2).replace(/\.?0+$/, "") + " Years";
                    }
                default:
                    throw new Error("Bad term units.");
            }
        }
    }, {
        key: "view",
        value: function view(vnode) {
            var _this = this;

            var rows = [m("label.fcalc-field-row.fcalc-field-label", { for: this.inputId }, this.field.label)];
            if (!this.onlyCustomTermLength) {
                var options = [];
                for (var idx = 0; idx < this.field.terms.length; idx++) {
                    var term = this.field.terms[idx];
                    var mlen = this.monthLength(term.length, term.units);
                    options.push(m("option", {
                        selected: term === this.selectedTerm,
                        value: idx
                    }, this.monthsText(term.length, term.units)));
                }
                if (this.allowCustom) {
                    options.push(m("option", {
                        selected: this.customMode,
                        value: -1
                    }, "Custom"));
                }
                rows.push(m(".fcalc-field-row", m("select.form-select.fcalc-calc-style", {
                    id: this.inputId,
                    onchange: m.withAttr("value", function (rawValue) {
                        var value = parseInt(rawValue);
                        if (!(0, _isFinite2.default)(value)) value = -1;
                        if (value < 0) {
                            _this.customMode = true;
                            _this.fieldValue = _this.monthLength(_this.customValue, _this.customUnits);
                        } else {
                            var termValue = _this.field.terms[value];
                            _this.selectedTerm = termValue;
                            _this.customMode = false;
                            _this.fieldValue = _this.monthLength(termValue.length, termValue.units);
                            if (vnode.attrs.interestVar) {
                                _this.vars.set(vnode.attrs.interestVar, _this.selectedTerm.rate);
                            }
                        }
                    })
                }, options)));
            }
            if (this.allowCustom && this.customMode) {
                rows.push(m(".fcalc-field-row", [m(".input-group", [m("input.form-input.input-inline.fcalc-calc-style", {
                    value: this.customValue,
                    placeholder: "Term Length",
                    type: "text",
                    onchange: m.withAttr("value", function (rawValue) {
                        var value = parseFloat(rawValue) || 0;
                        _this.customValue = value;
                        _this.fieldValue = _this.monthLength(_this.customValue, _this.customUnits);
                    })
                }), m("select.form-select.fcalc-calc-style", {
                    onchange: m.withAttr("value", function (value) {
                        _this.customUnits = value;
                        _this.fieldValue = _this.monthLength(_this.customValue, _this.customUnits);
                    })
                }, [m("option", { disabled: true }, "Units"), m("option", { selected: this.customUnits === types_1.TermUnits.Month, value: types_1.TermUnits.Month }, "Month(s)"), m("option", { selected: this.customUnits === types_1.TermUnits.Year, value: types_1.TermUnits.Year }, "Year(s)")])])]));
            }
            return m(".fcalc-field", rows);
        }
    }, {
        key: "fieldValue",
        get: function get() {
            return this.vars.get(this.field.name, this.field.value);
        },
        set: function set(val) {
            this.vars.set(this.field.name, val);
        }
    }, {
        key: "allowCustom",
        get: function get() {
            return this.field && (!this.field.terms || this.field.terms.length < 1 || this.field.allowCustom);
        }
    }, {
        key: "onlyCustomTermLength",
        get: function get() {
            return !this.field || !this.field.terms || this.field.terms.length < 1;
        }
    }]);
    return CalculatorTermField;
}();

exports.CalculatorTermField = CalculatorTermField;
exports.default = CalculatorTermField;

/***/ }),
/* 469 */,
/* 470 */,
/* 471 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var TermUnits;
(function (TermUnits) {
    TermUnits["Month"] = "month";
    TermUnits["Year"] = "year";
})(TermUnits = exports.TermUnits || (exports.TermUnits = {}));
var CalculatorType;
(function (CalculatorType) {
    CalculatorType["Mortgage"] = "mortgage";
    CalculatorType["AutoLoan"] = "auto-loan";
    CalculatorType["HomeEquityLoan"] = "home-equity-loan";
    CalculatorType["CDLoan"] = "cd-loan";
    CalculatorType["MoneyMarketLoan"] = "money-market-loan";
    CalculatorType["BoatRVLoan"] = "boat-rv-loan";
    CalculatorType["PersonalLoan"] = "personal-loan";
})(CalculatorType = exports.CalculatorType || (exports.CalculatorType = {}));

/***/ }),
/* 472 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", { value: true });
var wNumb = __webpack_require__(55);
var m = __webpack_require__(3);
var CalculatorResultsChart_1 = __webpack_require__(473);
var ulitiies_1 = __webpack_require__(34);
var moneyFormat = wNumb({
    mark: '.',
    decimals: 2,
    thousand: ',',
    prefix: '$'
});
var CalculatorResultScreenState;
(function (CalculatorResultScreenState) {
    CalculatorResultScreenState[CalculatorResultScreenState["Empty"] = 0] = "Empty";
    CalculatorResultScreenState[CalculatorResultScreenState["Calculating"] = 1] = "Calculating";
    CalculatorResultScreenState[CalculatorResultScreenState["Display"] = 2] = "Display";
})(CalculatorResultScreenState = exports.CalculatorResultScreenState || (exports.CalculatorResultScreenState = {}));

var CalculatorResultScreen = function () {
    function CalculatorResultScreen() {
        (0, _classCallCheck3.default)(this, CalculatorResultScreen);

        this.currentState = CalculatorResultScreenState.Empty;
        this.updatedToDifferentState = false;
    }

    (0, _createClass3.default)(CalculatorResultScreen, [{
        key: "onupdate",
        value: function onupdate(vnode) {
            if (this.updatedToDifferentState && vnode.attrs.currentState != CalculatorResultScreenState.Empty) {
                if (this.scrollingCancelHandle) {
                    this.scrollingCancelHandle.cancel = true;
                    this.scrollingCancelHandle = undefined;
                }
                this.scrollingCancelHandle = { cancel: false };
                var currentLeft = window.scrollX;
                var currentTop = window.scrollY;

                var _ulitiies_1$getElemen = ulitiies_1.getElementCoordinates(vnode.dom),
                    top = _ulitiies_1$getElemen.top,
                    left = _ulitiies_1$getElemen.left;

                ulitiies_1.easeValue(function (value) {
                    window.scrollTo(currentLeft, Math.round(value));
                }, currentTop, top, 500, 0, ulitiies_1.EasingFunctions.easeInOutCubic, this.scrollingCancelHandle);
            }
            this.updatedToDifferentState = false;
        }
    }, {
        key: "oninit",
        value: function oninit(vnode) {
            this.currentState = vnode.attrs.currentState;
            this.currentResults = vnode.attrs.results;
        }
    }, {
        key: "onbeforeupdate",
        value: function onbeforeupdate(vnode) {
            if (this.currentState === vnode.attrs.currentState) {
                if (this.currentState === CalculatorResultScreenState.Calculating) return false;
                if (this.currentState === CalculatorResultScreenState.Empty) return false;
            } else {
                this.updatedToDifferentState = true;
                this.currentState = vnode.attrs.currentState;
            }
            this.currentResults = vnode.attrs.results;
            return true;
        }
    }, {
        key: "_renderDisplay",
        value: function _renderDisplay(calculator) {
            var monthlyPayment = this.currentResults && this.currentResults["monthlyPayment"] || 0;
            return m(".fcalc-screen.fcalc-results", [m("h4", {
                style: "text-align: center;"
            }, "Estimated Monthly Payment"), m("h2", {
                style: "text-align: center;"
            }, [moneyFormat.to(monthlyPayment), m("small", " /month")]), m(CalculatorResultsChart_1.default, { calculator: calculator, graphInfo: this.currentResults ? this.currentResults["graph"] : null })]);
        }
    }, {
        key: "_renderEmpty",
        value: function _renderEmpty() {
            var containerStyle = "display: flex; flex-direction: column; align-items: center; justify-content: center;";
            return m(".fcalc-screen.fcalc-results", {
                style: containerStyle
            }, [m("div.h4", ["Click the ", m("span.label.label-primary.fcalc-calc-style", "calculate"), " button to calculate your monthly payment estimate."])]);
        }
    }, {
        key: "_renderCalculating",
        value: function _renderCalculating() {
            var containerStyle = "display: flex; flex-direction: column; align-items: center; justify-content: center;";
            return m(".fcalc-screen.fcalc-results", {
                style: containerStyle
            }, [m("div.h4", { style: "text-align: center;" }, ["Calculating..."]), m("div.sk-wandering-cubes", [m(".sk-cube sk-cube1"), m(".sk-cube sk-cube2")])]);
        }
    }, {
        key: "view",
        value: function view(vnode) {
            switch (vnode.attrs.currentState) {
                case CalculatorResultScreenState.Calculating:
                    return this._renderCalculating();
                case CalculatorResultScreenState.Display:
                    return this._renderDisplay(vnode.attrs.calculator);
                case CalculatorResultScreenState.Empty:
                    return this._renderEmpty();
                default:
                    return this._renderEmpty();
            }
        }
    }]);
    return CalculatorResultScreen;
}();

exports.CalculatorResultScreen = CalculatorResultScreen;
exports.default = CalculatorResultScreen;

/***/ }),
/* 473 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _keys = __webpack_require__(169);

var _keys2 = _interopRequireDefault(_keys);

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", { value: true });
var m = __webpack_require__(3);
var ChartWidget_1 = __webpack_require__(130);
var ulitiies_1 = __webpack_require__(34);
var GOOD_GRAPH_COLORS = ["#fa5252", "#495057", "#f06595", "#be4bdb", "#7950f2", "#4c6ef5", "#329af0", "#3bc9db", "#20c997", "#37b24d", "#94d82d", "#fcc419", "#fd7e14"];

var CalculatorResultsChart = function () {
    function CalculatorResultsChart() {
        (0, _classCallCheck3.default)(this, CalculatorResultsChart);

        this._colorCache = {};
    }

    (0, _createClass3.default)(CalculatorResultsChart, [{
        key: "attachGraphColorsToResults",
        value: function attachGraphColorsToResults() {
            if (this.graphInfo) {
                for (var key in this.graphInfo) {
                    if (!this._colorCache[key]) this._colorCache[key] = GOOD_GRAPH_COLORS[ulitiies_1.hashCode(key) % GOOD_GRAPH_COLORS.length];
                }
            }
        }
    }, {
        key: "oninit",
        value: function oninit(vnode) {
            this.graphInfo = vnode.attrs.graphInfo;
            this.attachGraphColorsToResults();
        }
    }, {
        key: "onbeforeupdate",
        value: function onbeforeupdate(vnode) {
            if (this.graphInfo !== vnode.attrs.graphInfo) {
                this.graphInfo = vnode.attrs.graphInfo;
                this.attachGraphColorsToResults();
                this.resultsVersion++;
            }
        }
    }, {
        key: "view",
        value: function view(vnode) {
            var _this = this;

            var info = this.graphInfo || {};
            var labels = (0, _keys2.default)(info);
            var labelsCol = [];
            var valuesCol = [];
            labels.forEach(function (label) {
                labelsCol.push(m(".fcalc-graph-table-label", [m(".fcalc-graph-table-color-dot", {
                    style: "background-color: " + _this._colorCache[label] || GOOD_GRAPH_COLORS[0]
                }), m("span", label)]));
                var val = void 0;
                if (typeof info[label] === "number") val = info[label];else if (typeof info[info] === "string") val = parseFloat(info[label]);else val = 0;
                valuesCol.push(m(".fcalc-graph-table-value", "$" + val.toFixed(2)));
            });
            return m("div.flex-column.flex-center.flex-center-cross", [m(ChartWidget_1.default, {
                labels: labels,
                datasets: [{
                    label: "$ Payment",
                    data: labels.map(function (label) {
                        return info[label] || 0;
                    }),
                    backgroundColor: labels.map(function (label) {
                        return _this._colorCache[label] || GOOD_GRAPH_COLORS[0];
                    })
                }],
                dataVersion: this.resultsVersion,
                type: "doughnut"
            }), m(".fcalc-graph-table", {
                style: "margin-top: 32px;"
            }, [m(".fcalc-graph-table-col", labelsCol), m(".fcalc-graph-table-col", valuesCol)])]);
        }
    }]);
    return CalculatorResultsChart;
}();

exports.CalculatorResultsChart = CalculatorResultsChart;
exports.default = CalculatorResultsChart;

/***/ }),
/* 474 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", { value: true });
var m = __webpack_require__(3);
var mx = __webpack_require__(10);
var index_1 = __webpack_require__(8);
var modal_1 = __webpack_require__(16);
var utilities_1 = __webpack_require__(17);
var CalculatorGeneral_1 = __webpack_require__(475);
var Icon_1 = __webpack_require__(15);
var svg_icons_1 = __webpack_require__(13);
var Header_1 = __webpack_require__(70);
var CalculatorStats_1 = __webpack_require__(477);
var ShareEmbedModal_1 = __webpack_require__(479);

var CalculatorViewerScreen = function () {
    function CalculatorViewerScreen() {
        (0, _classCallCheck3.default)(this, CalculatorViewerScreen);
    }

    (0, _createClass3.default)(CalculatorViewerScreen, [{
        key: "setCalculator",
        value: function setCalculator(calculator) {
            this.calculator = mx.binding(calculator);
        }
    }, {
        key: "oninit",
        value: function oninit() {
            var _this = this;

            if (m.route.param("uuid")) {
                index_1.default.getCalculator(m.route.param("uuid")).then(function (response) {
                    if (response.success) {
                        _this.setCalculator(response.data);
                        mx.gredraw();
                    } else {
                        console.error("Error while getting calculator (%s): ", m.route.param("uuid"), response.errors);
                        modal_1.alertModal("Error!", "Calculator not found.").then(function () {
                            m.route.set("/calculators");
                        });
                    }
                });
            } else {
                m.route.set("/calculators");
            }
        }
    }, {
        key: "renderHeader",
        value: function renderHeader() {
            var _this2 = this;

            var title = null,
                subtitle = null,
                actions = null,
                crumbs = null;
            if (this.calc) {
                crumbs = [{ title: "Calculators", href: "/calculators" }, this.calc.name];
                title = this.calc.name;
                if (this.calc.calc_type) subtitle = utilities_1.calculatorTypeToText(this.calc.calc_type);
                actions = [m("button.btn.wrmargins", {
                    onclick: function onclick() {
                        return _this2.showShareModal();
                    }
                }, [m(Icon_1.default, { icon: svg_icons_1.Feather.Share }), " Share"]), m("a.btn.wrmargins", {
                    href: "/calculator/" + this.calc.shortid,
                    target: "_blank"
                }, [m(Icon_1.default, { icon: svg_icons_1.Feather.Eye }), " Open Calculator"]), m("a.btn.wrmargins", {
                    href: "/calculators/editor?uuid=" + this.calc.uuid,
                    oncreate: m.route.link
                }, [m(Icon_1.default, { icon: svg_icons_1.Feather.Edit3 }), " Edit"])];
            } else {
                crumbs = [{ title: "Calculators", href: "/calculators" }, "..."];
                title = "Loading Calculator";
            }
            return m(Header_1.default, {
                title: title,
                subtitle: subtitle,
                actions: actions,
                crumbs: crumbs
            });
        }
    }, {
        key: "showShareModal",
        value: function showShareModal() {
            var calculator = this.calculator.get();
            var shareCalculatorModal = {
                size: modal_1.ModalSize.Normal,
                init: function init() {
                    var state = {};
                    return state;
                },
                render: function render(closeModal, state) {
                    return m(".modal-container", [m(".modal-header", [m("button.btn.btn-clear.float-right", { onclick: closeModal }), m(".modal-title.h5", "Share Calculator")]), m(".modal-body", m(".content", m(ShareEmbedModal_1.ShareEmbedModal, { calculator: calculator }))), m(".modal-footer.flex-row.flex-jc-end", m("button.btn.btn-primary", {
                        onclick: closeModal
                    }, "Close"))]);
                }
            };
            modal_1.defaultModalQueue.push(shareCalculatorModal);
        }
    }, {
        key: "view",
        value: function view(vnode) {
            var content = void 0;
            if (!!this.calc) {
                var calculator = this.calc;
                content = m(".layout-margin-2", [m(CalculatorGeneral_1.default, { calculator: calculator, domattrs: { style: "margin-bottom: 16px;" } }), m(CalculatorStats_1.CalculatorStats, { calculator: calculator })]);
            } else {
                content = m(".loading.loading-lg");
            }
            return m("div", [this.renderHeader(), content]);
        }
    }, {
        key: "calc",
        get: function get() {
            return this.calculator && this.calculator.get();
        }
    }]);
    return CalculatorViewerScreen;
}();

exports.CalculatorViewerScreen = CalculatorViewerScreen;
exports.default = CalculatorViewerScreen;

/***/ }),
/* 475 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", { value: true });
var m = __webpack_require__(3);
var utilities_1 = __webpack_require__(17);
var MetadataList_1 = __webpack_require__(476);

var CalculatorGeneral = function () {
    function CalculatorGeneral() {
        (0, _classCallCheck3.default)(this, CalculatorGeneral);
    }

    (0, _createClass3.default)(CalculatorGeneral, [{
        key: "view",
        value: function view(vnode) {
            var calculator = vnode.attrs.calculator;
            var calculatorGeneralData = m(MetadataList_1.MetadataList, {
                items: {
                    "Name": calculator.name,
                    "Type": utilities_1.calculatorTypeToText(calculator.calc_type),
                    "Created On": utilities_1.formatDate(calculator.created_at),
                    "Updated On": utilities_1.formatDate(calculator.updated_at)
                },
                alignLabelsLeft: true
            });
            return m(".card", vnode.attrs.domattrs || {}, [m(".card-header", [m(".card-title.h6", "General")]), m(".card-body", [calculatorGeneralData])]);
        }
    }]);
    return CalculatorGeneral;
}();

exports.CalculatorGeneral = CalculatorGeneral;
exports.default = CalculatorGeneral;

/***/ }),
/* 476 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", { value: true });
var m = __webpack_require__(3);

var MetadataList = function () {
    function MetadataList() {
        (0, _classCallCheck3.default)(this, MetadataList);
    }

    (0, _createClass3.default)(MetadataList, [{
        key: "view",
        value: function view(vnode) {
            if (vnode.attrs.items) {
                var items = vnode.attrs.items;
                var labels = [];
                var values = [];
                for (var label in items) {
                    var value = items[label];
                    labels.push(m(".metadata-label", label));
                    values.push(m(".metadata-value", value));
                }
                var labelsColumn = m(".metadata-labels-col", {
                    class: vnode.attrs.alignLabelsLeft ? "metadata-labels-left" : ""
                }, labels);
                var valuesColumn = m(".metadata-values-col", values);
                return m(".metadata-list", [labelsColumn, valuesColumn]);
            } else {
                return m(".metadata-list");
            }
        }
    }]);
    return MetadataList;
}();

exports.MetadataList = MetadataList;
exports.default = MetadataList;

/***/ }),
/* 477 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _regenerator = __webpack_require__(7);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

var _promise = __webpack_require__(6);

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = _promise2.default))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
var m = __webpack_require__(3);
var mx = __webpack_require__(10);
var DateRangePicker_1 = __webpack_require__(103);
var date_fns_1 = __webpack_require__(50);
var ReportsGraph_1 = __webpack_require__(91);
var api_1 = __webpack_require__(8);
var Reports_1 = __webpack_require__(65);

var CalculatorStats = function () {
    function CalculatorStats() {
        (0, _classCallCheck3.default)(this, CalculatorStats);

        this.startDate = new Date();
        this.endDate = new Date();
        this.loading = false;
        this.data = null;
    }

    (0, _createClass3.default)(CalculatorStats, [{
        key: "oninit",
        value: function oninit(vnode) {
            var now = new Date();
            this.startDate = date_fns_1.startOfMonth(now);
            this.endDate = date_fns_1.endOfMonth(now);
            this.calculator = vnode.attrs.calculator;
            this.loadData();
        }
    }, {
        key: "onbeforeupdate",
        value: function onbeforeupdate(vnode) {
            this.calculator = vnode.attrs.calculator;
        }
    }, {
        key: "loadData",
        value: function loadData() {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/_regenerator2.default.mark(function _callee() {
                var _start, _end, _searchStart, _searchEnd, response, _m, fixedEvents, endDay;

                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                this.loading = true;
                                _start = date_fns_1.startOfDay(this.startDate);
                                _end = date_fns_1.endOfDay(this.endDate);
                                _searchStart = date_fns_1.subDays(_start, 1);
                                _searchEnd = date_fns_1.addDays(_end, 1);
                                _context.next = 7;
                                return api_1.default.getDailyEvents(["visit", "engagement", "conversion"], _searchStart, _searchEnd, this.calculator.uuid);

                            case 7:
                                response = _context.sent;

                                if (response.success) {
                                    _m = this.startDate.getMonth();
                                    fixedEvents = response.data.events.map(Reports_1.toFixedEventCount).filter(function (e) {
                                        return e.created_at.getMonth() === _m && (date_fns_1.isBefore(e.created_at, _end) || date_fns_1.isEqual(e.created_at, _end)) && (date_fns_1.isAfter(e.created_at, _start) || date_fns_1.isEqual(e.created_at, _start));
                                    });
                                    endDay = _start.getDate() + date_fns_1.differenceInCalendarDays(_end, _start);

                                    this.data = Reports_1.createEventsReport(fixedEvents, _start.getDate(), endDay);
                                } else {
                                    this.data = null;
                                }
                                this.loading = false;
                                mx.gredraw();

                            case 11:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));
        }
    }, {
        key: "view",
        value: function view(vnode) {
            var _this = this;

            var content = [m(".form-group", { style: "display: flex; flex-direction: row;" }, [m(DateRangePicker_1.default, {
                onChange: function onChange(startDate, endDate) {
                    _this.startDate = startDate;
                    _this.endDate = endDate;
                    mx.gredraw(function () {
                        return _this.loadData();
                    });
                },
                startDate: this.startDate,
                endDate: this.endDate,
                domattrs: { disabled: this.loading, style: "text-align: center; width: auto; min-width: 16em;" },
                icon: true
            }), this.loading ? m("span.loading", { style: "margin-left: 1.6rem;" }) : null]), m("div", {
                style: "position: relative; max-width: 800px;"
            }, m(ReportsGraph_1.default, {
                data: this.data
            }))];
            return m(".card", vnode.attrs.domattrs || {}, [m(".card-header", [m(".card-title.h6", "Stats")]), m(".card-body", content)]);
        }
    }]);
    return CalculatorStats;
}();

exports.CalculatorStats = CalculatorStats;
exports.default = CalculatorStats;

/***/ }),
/* 478 */,
/* 479 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", { value: true });
var m = __webpack_require__(3);

var ShareEmbedModal = function () {
    function ShareEmbedModal() {
        (0, _classCallCheck3.default)(this, ShareEmbedModal);
    }

    (0, _createClass3.default)(ShareEmbedModal, [{
        key: "view",
        value: function view(vnode) {
            var calculator = vnode.attrs.calculator;
            var calculatorURL = window.location.origin + "/calculator/" + calculator.shortid;
            var urlSection = m(".form-group", [m("label.form-label", "Calculator URL"), m("input.form-input", { value: calculatorURL, readonly: true })]);
            var iframeSection = m(".form-group", [m("label.form-label", "Calculator IFrame Code"), m("input.form-input", { value: "<iframe src=\"" + calculatorURL + "\">", readonly: true })]);
            return m("div", [urlSection, iframeSection]);
        }
    }]);
    return ShareEmbedModal;
}();

exports.ShareEmbedModal = ShareEmbedModal;
exports.default = ShareEmbedModal;

/***/ }),
/* 480 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", { value: true });
var m = __webpack_require__(3);
var Header_1 = __webpack_require__(70);
var SettingsConnScreen_1 = __webpack_require__(481);
var SettingsGeneralScreen_1 = __webpack_require__(490);
var SettingsTab;
(function (SettingsTab) {
    SettingsTab["General"] = "general";
    SettingsTab["Connections"] = "conn";
})(SettingsTab || (SettingsTab = {}));

var SettingsScreen = function () {
    function SettingsScreen() {
        (0, _classCallCheck3.default)(this, SettingsScreen);

        this.currenTab = SettingsTab.General;
    }

    (0, _createClass3.default)(SettingsScreen, [{
        key: "tabSelect",
        value: function tabSelect() {
            var tab = m.route.param("tab");
            if (tab) {
                switch (tab) {
                    case SettingsTab.Connections:
                        this.currenTab = SettingsTab.Connections;
                        break;
                    case SettingsTab.General:
                    default:
                        this.currenTab = SettingsTab.General;
                        break;
                }
            }
        }
    }, {
        key: "oninit",
        value: function oninit() {
            this.tabSelect();
        }
    }, {
        key: "onbeforeupdate",
        value: function onbeforeupdate() {
            this.tabSelect();
        }
    }, {
        key: "renderHeander",
        value: function renderHeander() {
            return m(Header_1.default, { title: "Settings" });
        }
    }, {
        key: "renderTabItem",
        value: function renderTabItem(name, tab) {
            return m("li.tab-item", {
                class: this.currenTab === tab ? "active" : ""
            }, m("a", {
                href: "/settings?tab=" + tab,
                oncreate: m.route.link
            }, name));
        }
    }, {
        key: "renderTabs",
        value: function renderTabs() {
            return m("ul.tab", [this.renderTabItem("General", SettingsTab.General), this.renderTabItem("Connections", SettingsTab.Connections)]);
        }
    }, {
        key: "renderTabContent",
        value: function renderTabContent() {
            switch (this.currenTab) {
                case SettingsTab.Connections:
                    return m(SettingsConnScreen_1.default);
                case SettingsTab.General:
                default:
                    return m(SettingsGeneralScreen_1.default);
            }
        }
    }, {
        key: "view",
        value: function view(vnode) {
            return m("div", [this.renderHeander(), this.renderTabs(), this.renderTabContent()]);
        }
    }]);
    return SettingsScreen;
}();

exports.SettingsScreen = SettingsScreen;
exports.default = SettingsScreen;

/***/ }),
/* 481 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", { value: true });
var m = __webpack_require__(3);
var SettingsConnFacebook_1 = __webpack_require__(482);
var SettingsConnMailchimp_1 = __webpack_require__(486);
var SettingsConnCContact_1 = __webpack_require__(488);

var SettingsConnScreen = function () {
    function SettingsConnScreen() {
        (0, _classCallCheck3.default)(this, SettingsConnScreen);
    }

    (0, _createClass3.default)(SettingsConnScreen, [{
        key: "view",
        value: function view(vnode) {
            return m("div", [m(".card", { style: "margin: 2.4rem; " }, [m(".card-header", m(".card-title.h6", "Facebook")), m(".card-body", m(SettingsConnFacebook_1.default))]), m(".card", { style: "margin: 2.4rem; " }, [m(".card-header", m(".card-title.h6", "Mailchimp")), m(".card-body", m(SettingsConnMailchimp_1.default))]), m(".card", { style: "margin: 2.4rem; " }, [m(".card-header", m(".card-title.h6", "Constant Contact")), m(".card-body", m(SettingsConnCContact_1.default))])]);
        }
    }]);
    return SettingsConnScreen;
}();

exports.SettingsConnScreen = SettingsConnScreen;
exports.default = SettingsConnScreen;

/***/ }),
/* 482 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _regenerator = __webpack_require__(7);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

var _promise = __webpack_require__(6);

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = _promise2.default))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
var m = __webpack_require__(3);
var mx = __webpack_require__(10);
var FacebookConnectBtn_1 = __webpack_require__(483);
var api_1 = __webpack_require__(8);
var Icon_1 = __webpack_require__(15);
var svg_icons_1 = __webpack_require__(13);
var modal_1 = __webpack_require__(16);
var FacebookAvatarChip_1 = __webpack_require__(484);
var FacebookAccountsList_1 = __webpack_require__(485);

var SettingsConnFacebook = function () {
    function SettingsConnFacebook() {
        (0, _classCallCheck3.default)(this, SettingsConnFacebook);

        this.loading = false;
        this.facebookInfo = null;
        this.facebookAccounts = null;
        this.disconnectFacebook = this.disconnectFacebook.bind(this);
    }

    (0, _createClass3.default)(SettingsConnFacebook, [{
        key: "disconnectFacebook",
        value: function disconnectFacebook() {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/_regenerator2.default.mark(function _callee() {
                var response;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return modal_1.confirmModal("Disconnect Facebook", "Are you sure you would like to disconnect your Facebook account?");

                            case 2:
                                if (!_context.sent) {
                                    _context.next = 10;
                                    break;
                                }

                                this.loading = true;
                                _context.next = 6;
                                return api_1.default.disconnectFacebook();

                            case 6:
                                response = _context.sent;

                                if (response.success) {
                                    this.facebookInfo = null;
                                }
                                this.loading = false;
                                mx.gredraw();

                            case 10:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));
        }
    }, {
        key: "loadFacebookInfo",
        value: function loadFacebookInfo() {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
                var response;
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                this.loading = true;
                                _context2.next = 3;
                                return api_1.default.getFacebookInfo();

                            case 3:
                                response = _context2.sent;

                                if (response.success) {
                                    this.facebookInfo = response.data.info || null;
                                    this.facebookAccounts = response.data.accounts || null;
                                    console.log(response.data);
                                } else {
                                    this.facebookInfo = null;
                                    this.facebookAccounts = null;
                                }
                                this.loading = false;
                                mx.gredraw();

                            case 7:
                            case "end":
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));
        }
    }, {
        key: "oninit",
        value: function oninit() {
            this.loadFacebookInfo();
        }
    }, {
        key: "view",
        value: function view(vnode) {
            if (this.loading) {
                return m("div", [m(".loading.loading-lg")]);
            }
            if (this.facebookInfo) {
                return m("div.flex-column", [m("span", {
                    style: "margin-bottom: 1.6rem;"
                }, [m(Icon_1.default, { icon: svg_icons_1.Feather.CheckCircle, style: "color: #37b24d;" }), " Connected to Facebook as ", m(FacebookAvatarChip_1.FacebookAvatarChip, { name: this.facebookInfo.name, picture: this.facebookInfo.picture })]), m(FacebookAccountsList_1.FacebookAccountsList, { accounts: this.facebookAccounts }), m("button.btn.btn-sm", {
                    style: "align-self: flex-start; margin-top: 1.6rem;",
                    onclick: this.disconnectFacebook
                }, ["Disconnect Facebook"])]);
            } else {
                return m("div", [m(FacebookConnectBtn_1.FacebookConnectBtn)]);
            }
        }
    }]);
    return SettingsConnFacebook;
}();

exports.SettingsConnFacebook = SettingsConnFacebook;
exports.default = SettingsConnFacebook;

/***/ }),
/* 483 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _regenerator = __webpack_require__(7);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

var _promise = __webpack_require__(6);

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = _promise2.default))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
var m = __webpack_require__(3);
var mx = __webpack_require__(10);
var api_1 = __webpack_require__(8);
var modal_1 = __webpack_require__(16);
var FACEBOOK_COLOR = "#3b5998";

var FacebookConnectBtn = function () {
    function FacebookConnectBtn() {
        (0, _classCallCheck3.default)(this, FacebookConnectBtn);

        this.loading = false;
    }

    (0, _createClass3.default)(FacebookConnectBtn, [{
        key: "navigateToFacebookConnect",
        value: function navigateToFacebookConnect() {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/_regenerator2.default.mark(function _callee() {
                var response;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                this.loading = true;
                                _context.next = 3;
                                return api_1.default.getFacebookConnectURL();

                            case 3:
                                response = _context.sent;

                                if (!response.success) {
                                    _context.next = 8;
                                    break;
                                }

                                window.location.href = response.data;
                                _context.next = 10;
                                break;

                            case 8:
                                _context.next = 10;
                                return modal_1.alertModal("Error", "Unable to create Facebook connect link.");

                            case 10:
                                this.loading = false;
                                mx.gredraw();

                            case 12:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));
        }
    }, {
        key: "view",
        value: function view(vnode) {
            var _this = this;

            return m("button.btn", {
                class: this.loading ? "loading" : "",
                onclick: function onclick() {
                    _this.navigateToFacebookConnect();
                },
                "style": "background-color: " + FACEBOOK_COLOR + "; color: #f8f9fa;"
            }, [m("img.icon", {
                style: "width: 1.0em; height: 1.0em;",
                src: "/static/img/dash/fb-logo.svg"
            }), " Connect to Facebook"]);
        }
    }]);
    return FacebookConnectBtn;
}();

exports.FacebookConnectBtn = FacebookConnectBtn;
exports.default = FacebookConnectBtn;

/***/ }),
/* 484 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", { value: true });
var m = __webpack_require__(3);

var FacebookAvatarChip = function () {
    function FacebookAvatarChip() {
        (0, _classCallCheck3.default)(this, FacebookAvatarChip);
    }

    (0, _createClass3.default)(FacebookAvatarChip, [{
        key: "view",
        value: function view(vnode) {
            if (vnode.attrs.picture) {
                var picture = vnode.attrs.picture;
                if (picture.data && picture.data.url) {
                    return m(".chip", [m("img.avatar.avatar-sm", {
                        src: picture.data.url
                    }), vnode.attrs.name]);
                }
            } else {
                var trimmed = vnode.attrs.name ? vnode.attrs.name.trim() : "?";
                var initial = (trimmed.charAt(0) || "?").toUpperCase();
                return m(".chip", [m("figure.avatar.avatar-sm", {
                    "data-initial": initial
                }), vnode.attrs.name]);
            }
        }
    }]);
    return FacebookAvatarChip;
}();

exports.FacebookAvatarChip = FacebookAvatarChip;
exports.default = FacebookAvatarChip;

/***/ }),
/* 485 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _regenerator = __webpack_require__(7);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

var _promise = __webpack_require__(6);

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = _promise2.default))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
var m = __webpack_require__(3);
var mx = __webpack_require__(10);
var api_1 = __webpack_require__(8);

var FacebookAccountsList = function () {
    function FacebookAccountsList() {
        (0, _classCallCheck3.default)(this, FacebookAccountsList);

        this.loading = false;
    }

    (0, _createClass3.default)(FacebookAccountsList, [{
        key: "toggleFBTab",
        value: function toggleFBTab(account) {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/_regenerator2.default.mark(function _callee() {
                var response, _response;

                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                this.loading = true;
                                mx.gredraw();

                                if (!account.tab) {
                                    _context.next = 9;
                                    break;
                                }

                                _context.next = 5;
                                return api_1.default.postWithAuth("/facebook/tab-uninstall/" + account.id);

                            case 5:
                                response = _context.sent;

                                if (response.success && response.data) {
                                    account.tab = false;
                                }
                                _context.next = 13;
                                break;

                            case 9:
                                _context.next = 11;
                                return api_1.default.postWithAuth("/facebook/tab-install/" + account.id);

                            case 11:
                                _response = _context.sent;

                                if (_response.success && _response.data) {
                                    account.tab = true;
                                }

                            case 13:
                                this.loading = false;
                                mx.gredraw();

                            case 15:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));
        }
    }, {
        key: "view",
        value: function view(vnode) {
            var _this = this;

            if (Array.isArray(vnode.attrs.accounts)) {
                var accounts = vnode.attrs.accounts;
                var header = void 0;
                if (this.loading) {
                    header = m("h6.flex-row", [m("span", { style: "margin-right: 1.6rem;" }, "Installed Tabs"), m("span.loading")]);
                } else {
                    header = m("h6", "Install Page Tabs");
                }
                return m("div", [header, m("ul", {
                    style: "list-style: none; margin-left: 0; padding-left: 0;"
                }, [accounts.map(function (account) {
                    var checkbox = m("label.form-checkbox", [m("input", {
                        type: "checkbox",
                        checked: account.tab,
                        disabled: _this.loading,
                        onchange: function onchange() {
                            return _this.toggleFBTab(account);
                        }
                    }), m("i.form-icon"), " " + account.name]);
                    return m("li", [m(".form-group", [checkbox])]);
                })])]);
            } else {
                return m("div", [m("strong", "Installed Tabs"), m("div.muted-color", "No Facebook Pages")]);
            }
        }
    }]);
    return FacebookAccountsList;
}();

exports.FacebookAccountsList = FacebookAccountsList;
exports.default = FacebookAccountsList;

/***/ }),
/* 486 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _regenerator = __webpack_require__(7);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

var _promise = __webpack_require__(6);

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = _promise2.default))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
var m = __webpack_require__(3);
var mx = __webpack_require__(10);
var MailchimpConnectBtn_1 = __webpack_require__(487);
var svg_icons_1 = __webpack_require__(13);
var modal_1 = __webpack_require__(16);
var api_1 = __webpack_require__(8);
var Icon_1 = __webpack_require__(15);

var SettingsConnMailchimp = function () {
    function SettingsConnMailchimp() {
        (0, _classCallCheck3.default)(this, SettingsConnMailchimp);

        this.loading = false;
        this.mailchimpInfo = null;
        this.disconnectMailchimp = this.disconnectMailchimp.bind(this);
    }

    (0, _createClass3.default)(SettingsConnMailchimp, [{
        key: "disconnectMailchimp",
        value: function disconnectMailchimp() {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/_regenerator2.default.mark(function _callee() {
                var response;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return modal_1.confirmModal("Disconnect Facebook", "Are you sure you would like to disconnect your Mailchimp account?");

                            case 2:
                                if (!_context.sent) {
                                    _context.next = 10;
                                    break;
                                }

                                this.loading = true;
                                _context.next = 6;
                                return api_1.default.postWithAuth("/mailchimp/disconnect");

                            case 6:
                                response = _context.sent;

                                if (response.success) {
                                    this.mailchimpInfo = null;
                                }
                                this.loading = false;
                                mx.gredraw();

                            case 10:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));
        }
    }, {
        key: "loadMailchimpInfo",
        value: function loadMailchimpInfo() {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
                var response;
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                this.loading = true;
                                _context2.next = 3;
                                return api_1.default.getWithAuth("/mailchimp/user");

                            case 3:
                                response = _context2.sent;

                                if (response.success) {
                                    this.mailchimpInfo = response.data.info || null;
                                    console.log(response.data);
                                } else {
                                    this.mailchimpInfo = null;
                                }
                                this.loading = false;
                                mx.gredraw();

                            case 7:
                            case "end":
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));
        }
    }, {
        key: "oninit",
        value: function oninit() {
            this.loadMailchimpInfo();
        }
    }, {
        key: "view",
        value: function view(vnode) {
            if (this.loading) {
                return m("div", [m(".loading.loading-lg")]);
            }
            if (this.mailchimpInfo) {
                return m("div.flex-column", [m("span", {
                    style: "margin-bottom: 1.6rem;"
                }, [m(Icon_1.default, { icon: svg_icons_1.Feather.CheckCircle, style: "color: #37b24d;" }), " Connected to Mailchimp as ", m(".chip", this.mailchimpInfo.account_name)]), m("span.muted-text", "Edit a calculator to view options for placing leads in your mailchimp lists."), m("button.btn.btn-sm", {
                    style: "align-self: flex-start; margin-top: 1.6rem;",
                    onclick: this.disconnectMailchimp
                }, ["Disconnect Mailchimp"])]);
            } else {
                return m("div", [m(MailchimpConnectBtn_1.MailchimpConnectBtn)]);
            }
        }
    }]);
    return SettingsConnMailchimp;
}();

exports.SettingsConnMailchimp = SettingsConnMailchimp;
exports.default = SettingsConnMailchimp;

/***/ }),
/* 487 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _regenerator = __webpack_require__(7);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

var _promise = __webpack_require__(6);

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = _promise2.default))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
var m = __webpack_require__(3);
var mx = __webpack_require__(10);
var api_1 = __webpack_require__(8);
var modal_1 = __webpack_require__(16);

var MailchimpConnectBtn = function () {
    function MailchimpConnectBtn() {
        (0, _classCallCheck3.default)(this, MailchimpConnectBtn);

        this.loading = false;
    }

    (0, _createClass3.default)(MailchimpConnectBtn, [{
        key: "navigateToMailchimpConnect",
        value: function navigateToMailchimpConnect() {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/_regenerator2.default.mark(function _callee() {
                var response;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                this.loading = true;
                                _context.next = 3;
                                return api_1.default.getWithAuth("/mailchimp/connect-url");

                            case 3:
                                response = _context.sent;

                                if (!response.success) {
                                    _context.next = 8;
                                    break;
                                }

                                window.location.href = response.data;
                                _context.next = 10;
                                break;

                            case 8:
                                _context.next = 10;
                                return modal_1.alertModal("Error", "Unable to create Mailchimp connect link.");

                            case 10:
                                this.loading = false;
                                mx.gredraw();

                            case 12:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));
        }
    }, {
        key: "view",
        value: function view(vnode) {
            var _this = this;

            return m("button.btn", {
                class: this.loading ? "loading" : "",
                onclick: function onclick() {
                    _this.navigateToMailchimpConnect();
                },
                "style": "color: #495057;"
            }, [m("img.icon", {
                style: "width: 1.0em; height: 1.0em;",
                src: "/static/img/dash/mc-freddie-logo.svg"
            }), " Connect to Mailchimp"]);
        }
    }]);
    return MailchimpConnectBtn;
}();

exports.MailchimpConnectBtn = MailchimpConnectBtn;
exports.default = MailchimpConnectBtn;

/***/ }),
/* 488 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", { value: true });
var m = __webpack_require__(3);
var CContactConnectBtn_1 = __webpack_require__(489);

var SettingsConnCContact = function () {
    function SettingsConnCContact() {
        (0, _classCallCheck3.default)(this, SettingsConnCContact);
    }

    (0, _createClass3.default)(SettingsConnCContact, [{
        key: "view",
        value: function view(vnode) {
            return m("div", [m(CContactConnectBtn_1.CContactConnectBtn)]);
        }
    }]);
    return SettingsConnCContact;
}();

exports.SettingsConnCContact = SettingsConnCContact;
exports.default = SettingsConnCContact;

/***/ }),
/* 489 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", { value: true });
var m = __webpack_require__(3);

var CContactConnectBtn = function () {
    function CContactConnectBtn() {
        (0, _classCallCheck3.default)(this, CContactConnectBtn);
    }

    (0, _createClass3.default)(CContactConnectBtn, [{
        key: "view",
        value: function view(vnode) {
            return m("button.btn", {
                "style": "color: #495057;"
            }, [m("img.icon", {
                style: "width: 2.0em; height: 1.0em;",
                src: "/static/img/dash/ccontact-logo-small.svg"
            }), " Connect to Constant Contact"]);
        }
    }]);
    return CContactConnectBtn;
}();

exports.CContactConnectBtn = CContactConnectBtn;
exports.default = CContactConnectBtn;

/***/ }),
/* 490 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _regenerator = __webpack_require__(7);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _assign = __webpack_require__(28);

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

var _promise = __webpack_require__(6);

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = _promise2.default))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
var m = __webpack_require__(3);
var mx = __webpack_require__(10);
var api_1 = __webpack_require__(8);
var CurrentUser_1 = __webpack_require__(129);
var modal_1 = __webpack_require__(16);

var SettingsGeneralScreen = function () {
    function SettingsGeneralScreen() {
        (0, _classCallCheck3.default)(this, SettingsGeneralScreen);

        this.org = {};
        this.orgUpdates = {};
        this.user = {};
        this.userUpdates = {};
        this.hasUserChanges = false;
        this.hasOrgChanges = false;
        this.loadingUser = false;
        this.loadingOrg = false;
        this.changeTimer = null;
        this.uploadingProfileImage = false;
        this.uploadingBrandingImage = false;
    }

    (0, _createClass3.default)(SettingsGeneralScreen, [{
        key: "oninit",
        value: function oninit() {
            this.loadData();
        }
    }, {
        key: "startChangeTimer",
        value: function startChangeTimer() {
            var _this = this;

            if (this.changeTimer !== null) {
                clearTimeout(this.changeTimer);
                this.changeTimer = null;
            }
            this.changeTimer = setTimeout(function () {
                _this.changeTimer = null;
                _this.publishChanges();
            }, 1000);
        }
    }, {
        key: "publishChanges",
        value: function publishChanges() {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/_regenerator2.default.mark(function _callee() {
                var promises;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                promises = [];

                                if (!this.hasOrgChanges) {
                                    _context.next = 4;
                                    break;
                                }

                                _context.next = 4;
                                return api_1.default.postWithAuth("/user/org", undefined, this.orgUpdates);

                            case 4:
                                if (!this.hasUserChanges) {
                                    _context.next = 8;
                                    break;
                                }

                                _context.next = 7;
                                return api_1.default.postWithAuth("/user/me", undefined, this.userUpdates);

                            case 7:
                                CurrentUser_1.CurrentUserStream((0, _assign2.default)(CurrentUser_1.CurrentUserStream(), this.userUpdates));

                            case 8:
                                this.orgUpdates = {};
                                this.hasOrgChanges = false;
                                this.userUpdates = {};
                                this.hasUserChanges = false;
                                mx.gredraw();

                            case 13:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));
        }
    }, {
        key: "pushUserChange",
        value: function pushUserChange(prop, value) {
            this.user[prop] = value;
            this.userUpdates[prop] = value;
            this.hasUserChanges = true;
            this.startChangeTimer();
        }
    }, {
        key: "pushOrgChange",
        value: function pushOrgChange(prop, value) {
            this.org[prop] = value;
            this.orgUpdates[prop] = value;
            this.hasOrgChanges = true;
            this.startChangeTimer();
        }
    }, {
        key: "hasChange",
        value: function hasChange(obj, prop) {
            return obj[prop] !== undefined;
        }
    }, {
        key: "loadData",
        value: function loadData() {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
                var response;
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                this.loadingUser = true;
                                this.loadingOrg = true;
                                this.hasUserChanges = false;
                                this.hasOrgChanges = false;
                                this.orgUpdates = {};
                                this.userUpdates = {};
                                _context2.next = 8;
                                return api_1.default.getWithAuth("/user/meandorg");

                            case 8:
                                response = _context2.sent;

                                if (response.success) {
                                    this.org = response.data.org;
                                    this.user = response.data.user;
                                } else {}
                                this.loadingUser = false;
                                this.loadingOrg = false;
                                mx.gredraw();

                            case 13:
                            case "end":
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));
        }
    }, {
        key: "uploadNewProfileImage",
        value: function uploadNewProfileImage(files) {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
                var file, form, response, profileimg;
                return _regenerator2.default.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                if (!(files.length < 1)) {
                                    _context3.next = 2;
                                    break;
                                }

                                return _context3.abrupt("return");

                            case 2:
                                this.uploadingProfileImage = true;
                                mx.gredraw();
                                file = files[0];
                                form = new FormData();

                                form.append("profileimg", file);
                                _context3.next = 9;
                                return api_1.default.postWithAuth("/user/profile-img", undefined, form);

                            case 9:
                                response = _context3.sent;

                                if (!response.success) {
                                    _context3.next = 16;
                                    break;
                                }

                                profileimg = response.data.profile_img;

                                this.user.profile_img = profileimg;
                                CurrentUser_1.CurrentUserStream((0, _assign2.default)(CurrentUser_1.CurrentUserStream(), { profile_img: profileimg }));
                                _context3.next = 23;
                                break;

                            case 16:
                                if (!(response.errors && response.errors.length > 0 && typeof response.errors[0] === "string")) {
                                    _context3.next = 21;
                                    break;
                                }

                                _context3.next = 19;
                                return modal_1.alertModal("Error", "There was an error while uploading your file: " + response.errors[0]);

                            case 19:
                                _context3.next = 23;
                                break;

                            case 21:
                                _context3.next = 23;
                                return modal_1.alertModal("Error", "An unknown error occurred while uploading your file.");

                            case 23:
                                this.uploadingProfileImage = false;
                                mx.gredraw();

                            case 25:
                            case "end":
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));
        }
    }, {
        key: "uploadNewBrandingImage",
        value: function uploadNewBrandingImage(files) {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
                var file, form, response, brandingimg;
                return _regenerator2.default.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                if (!(files.length < 1)) {
                                    _context4.next = 2;
                                    break;
                                }

                                return _context4.abrupt("return");

                            case 2:
                                this.uploadingBrandingImage = true;
                                mx.gredraw();
                                file = files[0];
                                form = new FormData();

                                form.append("brandingimg", file);
                                _context4.next = 9;
                                return api_1.default.postWithAuth("/user/org-branding-img", undefined, form);

                            case 9:
                                response = _context4.sent;

                                if (!response.success) {
                                    _context4.next = 15;
                                    break;
                                }

                                brandingimg = response.data.branding_img;

                                this.org.branding_img = brandingimg;
                                _context4.next = 22;
                                break;

                            case 15:
                                if (!(response.errors && response.errors.length > 0 && typeof response.errors[0] === "string")) {
                                    _context4.next = 20;
                                    break;
                                }

                                _context4.next = 18;
                                return modal_1.alertModal("Error", "There was an error while uploading your file: " + response.errors[0]);

                            case 18:
                                _context4.next = 22;
                                break;

                            case 20:
                                _context4.next = 22;
                                return modal_1.alertModal("Error", "An unknown error occurred while uploading your file.");

                            case 22:
                                this.uploadingBrandingImage = false;
                                mx.gredraw();

                            case 24:
                            case "end":
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));
        }
    }, {
        key: "renderUserProfileImg",
        value: function renderUserProfileImg() {
            var _this2 = this;

            var profileImageInput = m(".form-group", [m("label.form-label", "Profile Image"), m("div.flex-row", [m("input.form-input.input-inline-s", {
                name: "profileimg",
                type: "file",
                single: true,
                disabled: this.uploadingProfileImage,
                onchange: m.withAttr("files", function (files) {
                    return _this2.uploadNewProfileImage(files);
                })
            }), this.uploadingProfileImage ? m(".loading", { style: "margin-left: 1.6rem;" }) : null])]);
            var profileImageElement = null;
            var profileImage = this.profileImage;
            if (profileImage) {
                profileImageElement = m("img", { src: profileImage });
            }
            return m("div", [profileImageInput, profileImageElement]);
        }
    }, {
        key: "renderBrandingImage",
        value: function renderBrandingImage() {
            var _this3 = this;

            var brandingImageInput = m(".form-group", [m("label.form-label", "Branding  Image"), m("div.flex-row", [m("input.form-input.input-inline-s", {
                name: "brandingimg",
                type: "file",
                single: true,
                disabled: this.uploadingBrandingImage,
                onchange: m.withAttr("files", function (files) {
                    return _this3.uploadNewBrandingImage(files);
                })
            }), this.uploadingBrandingImage ? m(".loading", { style: "margin-left: 1.6rem;" }) : null])]);
            var brandingImageElement = null;
            var brandingimg = this.brandingImage;
            if (brandingimg) {
                brandingImageElement = m("img", { src: brandingimg });
            }
            return m("div", [brandingImageInput, brandingImageElement]);
        }
    }, {
        key: "renderUserSettings",
        value: function renderUserSettings() {
            var _this4 = this;

            if (this.loadingUser) {
                return m(".loading.loading-lg");
            }
            var firstNameInput = m(".form-group", [m("label.form-label", "First Name"), m("div.flex-row", [m("input.form-input.input-inline-s", {
                placeholder: "First Name",
                value: this.user.first_name,
                oninput: m.withAttr("value", function (val) {
                    return _this4.pushUserChange("first_name", val);
                })
            }), this.hasChange(this.userUpdates, "first_name") ? m(".loading", { style: "margin-left: 1.6rem;" }) : null])]);
            var lastNameInput = m(".form-group", [m("label.form-label", "Last Name"), m("div.flex-row", [m("input.form-input.input-inline-s", {
                placeholder: "Last Name",
                value: this.user.last_name,
                oninput: m.withAttr("value", function (val) {
                    return _this4.pushUserChange("last_name", val);
                })
            }), this.hasChange(this.userUpdates, "last_name") ? m(".loading", { style: "margin-left: 1.6rem;" }) : null])]);
            var emailInput = m(".form-group", [m("label.form-label", "Email"), m("div.flex-row", [m("input.form-input.input-inline-s", {
                placeholder: "Email",
                value: this.user.email,
                oninput: m.withAttr("value", function (val) {
                    return _this4.pushUserChange("email", val);
                })
            }), this.hasChange(this.userUpdates, "email") ? m(".loading", { style: "margin-left: 1.6rem;" }) : null])]);
            var reportEmailsSelect = m(".form-group", [m("label.form-label", "Send Report Emails"), m("div.flex-row", [m("select.form-select.input-inline-s", {}, [m("option", "Don't Send"), m("option", "Weekly"), m("option", "Monthly")]), this.hasChange(this.userUpdates, "report_email_freq") ? m(".loading", { style: "margin-left: 1.6rem;" }) : null])]);
            return m("div.flex-column", [this.renderUserProfileImg(), firstNameInput, lastNameInput, emailInput, reportEmailsSelect]);
        }
    }, {
        key: "renderOrgSettings",
        value: function renderOrgSettings() {
            var _this5 = this;

            if (this.loadingOrg) {
                return m(".loading.loading-lg");
            }
            var nameInput = m(".form-group", [m("label.form-label", "Name"), m("div.flex-row", [m("input.form-input.input-inline-s", {
                placeholder: "Name",
                value: this.org.name,
                oninput: m.withAttr("value", function (val) {
                    return _this5.pushOrgChange("name", val);
                })
            }), this.hasChange(this.orgUpdates, "name") ? m(".loading", { style: "margin-left: 1.6rem;" }) : null])]);
            return m("div.flex-column", [nameInput, this.renderBrandingImage()]);
        }
    }, {
        key: "view",
        value: function view(vnode) {
            return m("div", { style: "margin: 16px" }, [m("h6", "User Settings"), this.renderUserSettings(), m("h6", { style: "margin-top: 16px;" }, "Organization Settings"), this.renderOrgSettings()]);
        }
    }, {
        key: "profileImage",
        get: function get() {
            if (this.user && typeof this.user.profile_img === "string") {
                var img = this.user.profile_img.trim();
                if (!img.startsWith("/")) return "/" + img;
                return img;
            } else {
                return null;
            }
        }
    }, {
        key: "brandingImage",
        get: function get() {
            if (this.org && typeof this.org.branding_img === "string") {
                var img = this.org.branding_img.trim();
                if (!img.startsWith("/")) return "/" + img;
                return img;
            } else {
                return "/static/img/home/logo-black.png";
            }
        }
    }]);
    return SettingsGeneralScreen;
}();

exports.SettingsGeneralScreen = SettingsGeneralScreen;
exports.default = SettingsGeneralScreen;

/***/ }),
/* 491 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function __export(m) {
    for (var p in m) {
        if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(492));

/***/ }),
/* 492 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _regenerator = __webpack_require__(7);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _parseInt = __webpack_require__(493);

var _parseInt2 = _interopRequireDefault(_parseInt);

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

var _promise = __webpack_require__(6);

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = _promise2.default))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
var m = __webpack_require__(3);
var mx = __webpack_require__(10);
var wNumb = __webpack_require__(55);
var api_1 = __webpack_require__(8);
var Header_1 = __webpack_require__(70);
var Table_1 = __webpack_require__(174);
var Pagination_1 = __webpack_require__(175);
var utilities_1 = __webpack_require__(17);
var Application_1 = __webpack_require__(30);
var DateRangePicker_1 = __webpack_require__(103);
var date_fns_1 = __webpack_require__(50);
var moneyFormat = wNumb({
    mark: '.',
    decimals: 2,
    thousand: ',',
    prefix: '$'
});
var LIST_HEADERS = [{ label: "Generated On", property: "created_at", order: true, extract: function extract(v) {
        return utilities_1.formatDate(v);
    }, defaultDir: "desc" }, { label: "Name", property: "name", order: true }, { label: "Phone Number", property: "phone_number", order: true }, { label: "Email", property: "email", order: true }, { label: "Product", property: "calc_type", order: true, extract: function extract(v) {
        return utilities_1.calculatorTypeToText(v);
    } }, { label: "Amount", property: "amount", order: true, extract: function extract(v) {
        return moneyFormat.to(parseFloat(v));
    }, defaultDir: "desc" }, { label: "Term", property: "term", order: true, extract: function extract(v) {
        return utilities_1.formatTerm(parseInt(v));
    }, defaultDir: "desc" }];
var LEADS_FIELDS = ["id", "created_at", "name", "phone_number", "email", "calc_type", "amount", "term"];

var LeadsListScreen = function () {
    function LeadsListScreen() {
        (0, _classCallCheck3.default)(this, LeadsListScreen);

        this.leadsPerPage = 0;
        this.leadsPageNumber = 0;
        this.loadingLeads = true;
        this.leadsOrdering = { property: "created_at", dir: "desc" };
        this.leads = [];
        this.leadsCount = 0;
        this.dateOptions = {
            useDateRange: false,
            startDate: new Date(),
            endDate: date_fns_1.subDays(new Date(), 7)
        };
    }

    (0, _createClass3.default)(LeadsListScreen, [{
        key: "getPageParameters",
        value: function getPageParameters() {
            this.leadsPageNumber = (0, _parseInt2.default)(m.route.param("page")) || 0;
            this.leadsPerPage = (0, _parseInt2.default)(m.route.param("items")) || Application_1.default.settings.get("leads.leadsPerPage", 10);
        }
    }, {
        key: "oninit",
        value: function oninit() {
            this.getPageParameters();
            return this.fetchLeads();
        }
    }, {
        key: "fetchLeads",
        value: function fetchLeads() {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/_regenerator2.default.mark(function _callee() {
                var response;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                this.loadingLeads = true;
                                mx.gredraw();
                                this.leads = [];
                                _context.next = 5;
                                return api_1.default.listLeads(this.leadsPageNumber * this.leadsPerPage, this.leadsPerPage, LEADS_FIELDS, this.leadsOrdering.property, this.leadsOrdering.dir);

                            case 5:
                                response = _context.sent;

                                if (response.success) {
                                    this.leads = response.data.leads || [];
                                    this.leadsCount = response.data.count;
                                } else {
                                    this.leads = [];
                                    this.leadsCount = 0;
                                }
                                this.loadingLeads = false;
                                mx.gredraw();

                            case 9:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));
        }
    }, {
        key: "renderHeader",
        value: function renderHeader() {
            var _this = this;

            var leadsPerPageSelect = m("select.form-select", {
                onchange: function onchange(event) {
                    if (event.target) {
                        _this.leadsPerPage = parseInt(event.target.value) || 10;
                        Application_1.default.settings.set("leads.leadsPerPage", _this.leadsPerPage);
                        _this.fetchLeads();
                    }
                }
            }, [m("option", { value: "10", selected: this.leadsPerPage === 10 }, "10 Leads"), m("option", { value: "30", selected: this.leadsPerPage === 30 }, "30 Leads"), m("option", { value: "50", selected: this.leadsPerPage === 50 }, "50 Leads"), m("option", { value: "75", selected: this.leadsPerPage === 75 }, "75 Leads"), m("option", { value: "100", selected: this.leadsPerPage === 100 }, "100 Leads")]);
            var leadsPerPageSelectGroup = m(".form-group", [m("label.form-label", "Leads Per Page"), leadsPerPageSelect]);
            return m(Header_1.default, {
                title: "Leads",
                subtitle: this.loadingLeads ? "... Leads" : this.leadsCount + " Leads",
                loading: this.loadingLeads,
                actions: [leadsPerPageSelectGroup]
            });
        }
    }, {
        key: "renderTable",
        value: function renderTable() {
            var _this2 = this;

            var table = m(Table_1.default, {
                headers: LIST_HEADERS,
                items: this.leads,
                striped: true,
                hover: true,
                pointer: true,
                ordering: this.leadsOrdering,
                disabled: this.loadingLeads,
                minRows: this.leadsPerPage,
                onReorder: function onReorder(ordering) {
                    _this2.leadsOrdering = ordering;_this2.fetchLeads();
                }
            });
            return m("div", {
                style: "overflow-x: auto;"
            }, table);
        }
    }, {
        key: "renderPagination",
        value: function renderPagination() {
            var _this3 = this;

            var pagination = m(Pagination_1.default, {
                prevAndNextButtons: true,
                currentPage: this.leadsPageNumber + 1,
                pageCount: Math.floor(this.leadsCount / this.leadsPerPage) + 1,
                pagesDisplayed: 6,
                createLink: function createLink(page) {
                    return "/leads?page=" + (page - 1) + "&items=" + _this3.leadsPerPage;
                },
                onPageClick: function onPageClick(page) {
                    _this3.leadsPageNumber = page - 1;
                    _this3.fetchLeads();
                }
            });
            return m("div.flex-row", {
                style: "margin-right: 16px; margin-left: 16px;"
            }, [m(".flex-1"), pagination]);
        }
    }, {
        key: "renderDateRange",
        value: function renderDateRange() {
            var _this4 = this;

            var dateRangeCheckbox = m("label.form-checkbox", [m("input", {
                type: "checkbox",
                checked: this.dateOptions.useDateRange,
                onchange: m.withAttr("checked", function (checked) {
                    _this4.dateOptions.useDateRange = checked;
                })
            }), m("i.form-icon"), "Enable Range"]);
            var dateRangePicker = m(DateRangePicker_1.DateRangePicker, {
                startDate: this.dateOptions.startDate,
                endDate: this.dateOptions.endDate,
                icon: true,
                domattrs: {
                    disabled: !this.dateOptions.useDateRange
                }
            });
            return m("div", {
                style: "display: flex; flex-direction: column; align-items: center; margin-top: 1.6rem;"
            }, [dateRangePicker, dateRangeCheckbox]);
        }
    }, {
        key: "view",
        value: function view(vnode) {
            var content = void 0;
            content = [this.renderDateRange(), this.renderHeader(), this.renderPagination(), this.renderTable(), this.renderPagination()];
            return m("div", content);
        }
    }]);
    return LeadsListScreen;
}();

exports.LeadsListScreen = LeadsListScreen;
exports.default = LeadsListScreen;

/***/ }),
/* 493 */,
/* 494 */,
/* 495 */,
/* 496 */,
/* 497 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _regenerator = __webpack_require__(7);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

var _promise = __webpack_require__(6);

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = _promise2.default))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
var m = __webpack_require__(3);
var mx = __webpack_require__(10);
var wNumb = __webpack_require__(55);
var Header_1 = __webpack_require__(70);
var date_fns_1 = __webpack_require__(50);
var DateRangePicker_1 = __webpack_require__(103);
var Reports_1 = __webpack_require__(65);
var api_1 = __webpack_require__(8);
var ReportsGraph_1 = __webpack_require__(91);
var Table_1 = __webpack_require__(174);
var utilities_1 = __webpack_require__(17);
var Pagination_1 = __webpack_require__(175);
var svg_icons_1 = __webpack_require__(13);
var Icon_1 = __webpack_require__(15);
var moneyFormat = wNumb({
    mark: '.',
    decimals: 2,
    thousand: ',',
    prefix: '$'
});
var LIST_HEADERS = [{ label: "Generated On", property: "created_at", order: true, extract: function extract(v) {
        return utilities_1.formatDate(v);
    }, defaultDir: "desc" }, { label: "Name", property: "name", order: true }, { label: "Phone Number", property: "phone_number", order: true }, { label: "Email", property: "email", order: true }, { label: "Product", property: "calc_type", order: true, extract: function extract(v) {
        return utilities_1.calculatorTypeToText(v);
    } }, { label: "Amount", property: "amount", order: true, extract: function extract(v) {
        return moneyFormat.to(parseFloat(v));
    }, defaultDir: "desc" }, { label: "Term", property: "term", order: true, extract: function extract(v) {
        return utilities_1.formatTerm(parseInt(v));
    }, defaultDir: "desc" }];
var LEADS_FIELDS = ["id", "created_at", "name", "phone_number", "email", "calc_type", "amount", "term"];

var ReportsScreen = function () {
    function ReportsScreen() {
        (0, _classCallCheck3.default)(this, ReportsScreen);

        this.startDate = new Date();
        this.endDate = new Date();
        this.loadingReports = false;
        this.reportsData = null;
        this.loadingLeads = false;
        this.leadsPerPage = 15;
        this.leadsPageNumber = 0;
        this.leadsOrdering = { property: "created_at", dir: "desc" };
        this.leads = [];
        this.leadsCount = 0;
        this.downloadingLeads = false;
    }

    (0, _createClass3.default)(ReportsScreen, [{
        key: "loadData",
        value: function loadData() {
            this.loadReportsData();
            this.loadLeadsData();
        }
    }, {
        key: "oninit",
        value: function oninit(vnode) {
            var now = new Date();
            this.startDate = date_fns_1.startOfMonth(now);
            this.endDate = date_fns_1.endOfMonth(now);
            this.loadReportsData();
            this.loadLeadsData();
        }
    }, {
        key: "loadLeadsData",
        value: function loadLeadsData() {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/_regenerator2.default.mark(function _callee() {
                var _start, _end, response;

                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                this.loadingLeads = true;
                                _start = date_fns_1.startOfDay(this.startDate);
                                _end = date_fns_1.endOfDay(this.endDate);
                                _context.next = 5;
                                return api_1.default.getWithAuth("/lead/listr", {
                                    offset: this.leadsPageNumber * this.leadsPerPage,
                                    count: this.leadsPerPage,
                                    fields: LEADS_FIELDS,
                                    order_by: this.leadsOrdering.property,
                                    order_dir: this.leadsOrdering.dir,
                                    from: _start.toISOString(),
                                    to: _end.toISOString()
                                });

                            case 5:
                                response = _context.sent;

                                if (response.success) {
                                    this.leads = response.data.leads;
                                    this.leadsCount = response.data.count;
                                } else {
                                    this.leads = [];
                                    this.leadsCount = 0;
                                }
                                this.loadingLeads = false;
                                mx.gredraw();

                            case 9:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));
        }
    }, {
        key: "loadReportsData",
        value: function loadReportsData() {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
                var _start, _end, _searchStart, _searchEnd, response, _m, fixedEvents, endDay;

                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                this.loadingReports = true;
                                _start = date_fns_1.startOfDay(this.startDate);
                                _end = date_fns_1.endOfDay(this.endDate);
                                _searchStart = date_fns_1.subDays(_start, 1);
                                _searchEnd = date_fns_1.addDays(_end, 1);
                                _context2.next = 7;
                                return api_1.default.getDailyEvents(["visit", "engagement", "conversion"], _searchStart, _searchEnd);

                            case 7:
                                response = _context2.sent;

                                if (response.success) {
                                    _m = this.startDate.getMonth();
                                    fixedEvents = response.data.events.map(Reports_1.toFixedEventCount).filter(function (e) {
                                        return e.created_at.getMonth() === _m && (date_fns_1.isBefore(e.created_at, _end) || date_fns_1.isEqual(e.created_at, _end)) && (date_fns_1.isAfter(e.created_at, _start) || date_fns_1.isEqual(e.created_at, _start));
                                    });
                                    endDay = _start.getDate() + date_fns_1.differenceInCalendarDays(_end, _start);

                                    this.reportsData = Reports_1.createEventsReport(fixedEvents, _start.getDate(), endDay);
                                } else {
                                    this.reportsData = null;
                                }
                                this.loadingReports = false;
                                mx.gredraw();

                            case 11:
                            case "end":
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));
        }
    }, {
        key: "renderHeader",
        value: function renderHeader() {
            return m(Header_1.default, {
                title: "Reports"
            });
        }
    }, {
        key: "renderReportsGraph",
        value: function renderReportsGraph() {
            return m("div", {
                style: "position: relative; max-width: 800px; margin: 0 auto; margin-bottom: 2.4rem;"
            }, m(ReportsGraph_1.default, {
                data: this.reportsData
            }));
        }
    }, {
        key: "downloadLeads",
        value: function downloadLeads() {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
                var _start, _end, response, a;

                return _regenerator2.default.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                this.downloadingLeads = true;
                                mx.gredraw();
                                _start = date_fns_1.startOfDay(this.startDate);
                                _end = date_fns_1.endOfDay(this.endDate);
                                _context3.next = 6;
                                return api_1.default.getWithAuth("/lead/gencsv", {
                                    offset: this.leadsPageNumber * this.leadsPerPage,
                                    count: this.leadsPerPage,
                                    fields: LEADS_FIELDS,
                                    order_by: this.leadsOrdering.property,
                                    order_dir: this.leadsOrdering.dir,
                                    from: _start.toISOString(),
                                    to: _end.toISOString()
                                });

                            case 6:
                                response = _context3.sent;

                                if (response.success) {
                                    a = document.createElement("a");

                                    a.href = response.data.path;
                                    a.download = "leads-list.csv";
                                    document.body.appendChild(a);
                                    a.click();
                                    document.body.removeChild(a);
                                } else {
                                    alert("An error occurred while generating the CSV.");
                                }
                                this.downloadingLeads = false;
                                mx.gredraw();

                            case 10:
                            case "end":
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));
        }
    }, {
        key: "renderLeadsHeader",
        value: function renderLeadsHeader() {
            var _this = this;

            var subtitle = this.loadingLeads ? "... Leads" : this.leadsCount + " Leads";
            var downloadLeadsButton = m(".form-group", [m("button.btn", {
                class: this.downloadingLeads ? "loading" : "",
                disabled: this.loadingLeads,
                onclick: function onclick() {
                    return _this.downloadLeads();
                }
            }, [m(Icon_1.default, { icon: svg_icons_1.Feather.Download }), " Download " + this.leadsCount + " Leads"])]);
            return m("div", [m(Header_1.default, {
                title: "Leads",
                subtitle: subtitle,
                loading: this.loadingLeads,
                actions: [downloadLeadsButton]
            })]);
        }
    }, {
        key: "renderLeadsTable",
        value: function renderLeadsTable() {
            var _this2 = this;

            var table = m(Table_1.default, {
                headers: LIST_HEADERS,
                items: this.leads,
                striped: true,
                hover: true,
                pointer: true,
                ordering: this.leadsOrdering,
                disabled: this.loadingLeads,
                minRows: this.leadsPerPage,
                onReorder: function onReorder(ordering) {
                    _this2.leadsOrdering = ordering;_this2.loadLeadsData();
                }
            });
            return m(".card", {
                style: "overflow-x: auto; margin-bottom: 1.6rem;"
            }, table);
        }
    }, {
        key: "renderLeadsPagination",
        value: function renderLeadsPagination() {
            var _this3 = this;

            var pagination = m(Pagination_1.default, {
                prevAndNextButtons: true,
                currentPage: this.leadsPageNumber + 1,
                pageCount: Math.floor(this.leadsCount / this.leadsPerPage) + 1,
                pagesDisplayed: 6,
                noNavigation: true,
                createLink: function createLink(page) {
                    return "";
                },
                onPageClick: function onPageClick(page, event) {
                    event.preventDefault();
                    _this3.leadsPageNumber = page - 1;
                    _this3.loadLeadsData();
                }
            });
            return m("div.flex-row", {
                style: "margin-right: 16px; margin-left: 16px;"
            }, [m(".flex-1"), pagination]);
        }
    }, {
        key: "view",
        value: function view(vnode) {
            var _this4 = this;

            var content = [m(".form-group", { style: "display: flex; flex-direction: column; margin: 0 auto; align-items: center; margin-bottom: 2.4rem;" }, [m(DateRangePicker_1.DateRangePicker, {
                onChange: function onChange(startDate, endDate) {
                    _this4.startDate = startDate;
                    _this4.endDate = endDate;
                    mx.gredraw(function () {
                        return _this4.loadData();
                    });
                },
                startDate: this.startDate,
                endDate: this.endDate,
                domattrs: { disabled: this.loading, style: "text-align: center; width: auto; min-width: 16em;" },
                icon: true
            }), this.loading ? m("span.loading", { style: "margin-left: 1.6rem;" }) : null])];
            if (this.loadingReports) {
                content.push(m(".loading.loading-lg"));
            } else {
                content.push(this.renderReportsGraph());
            }
            content.push(this.renderLeadsHeader());
            content.push(this.renderLeadsPagination());
            content.push(this.renderLeadsTable());
            return m("div", [this.renderHeader(), m("div", {}, content)]);
        }
    }, {
        key: "loading",
        get: function get() {
            return this.loadingLeads || this.loadingReports;
        }
    }]);
    return ReportsScreen;
}();

exports.ReportsScreen = ReportsScreen;
exports.default = ReportsScreen;

/***/ })
],[176]);