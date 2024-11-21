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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJobs = getJobs;
exports.getJob = getJob;
exports.createJob = createJob;
exports.updateJobDetails = updateJobDetails;
exports.closeJobById = closeJobById;
exports.deleteJobById = deleteJobById;
var jobsModel_ts_1 = require("../models/jobsModel.ts");
function getJobs(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var closed, jobs, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    closed = req.params.closed;
                    console.log(closed);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, jobsModel_ts_1.getAllJobs)()];
                case 2:
                    jobs = _a.sent();
                    res.status(200).json(jobs);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error("Error fetching jobs:", error_1);
                    res.status(500).json({ error: "Failed to retrieve jobs." });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function getJob(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var jobId, job, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    jobId = req.params.id;
                    if (!jobId) {
                        res.status(400).json({ error: "jobId is required" });
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, jobsModel_ts_1.getJobById)(jobId)];
                case 2:
                    job = _a.sent();
                    if (!job) {
                        res.status(404).json({ error: "Job not found." });
                    }
                    res.status(200).json(job);
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    console.error("Error fetching job:", error_2);
                    res.status(500).json({ error: "Failed to retrieve job." });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function createJob(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, id, job_title, description, date_added, expires, closed, employer, newJob, error_3;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, id = _a.id, job_title = _a.job_title, description = _a.description, date_added = _a.date_added, expires = _a.expires, closed = _a.closed, employer = _a.employer;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, jobsModel_ts_1.createNewJob)(id, job_title, description, new Date(date_added), new Date(expires), closed, employer)];
                case 2:
                    newJob = _b.sent();
                    res.status(201).json(newJob);
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _b.sent();
                    console.error("Error adding a new job:", error_3);
                    res.status(500).json({ error: "Failed to create job." });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function updateJobDetails(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var jobId, updates, updatedJob, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    jobId = req.params.id;
                    updates = req.body;
                    if (!jobId) {
                        res.status(400).json({ error: "jobId is required" });
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, jobsModel_ts_1.updateJob)(jobId, updates)];
                case 2:
                    updatedJob = _a.sent();
                    if (!updatedJob) {
                        return [2 /*return*/, res.status(404).json({ error: "Job not found." })];
                    }
                    res.status(200).json(updatedJob);
                    return [3 /*break*/, 4];
                case 3:
                    error_4 = _a.sent();
                    console.error("Error updating a job", error_4);
                    // res.status(500).json({ error: "Failed to update job" });
                    next(error_4);
                    return [3 /*break*/, 4];
                case 4:
                    console.log(updateJobDetails);
                    return [2 /*return*/];
            }
        });
    });
}
function closeJobById(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var jobId, closedJob, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    jobId = req.params.id;
                    if (!jobId) {
                        res.status(400).json({ error: "jobId is required" });
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, jobsModel_ts_1.closeJob)(jobId, true)];
                case 2:
                    closedJob = _a.sent();
                    res.status(200).json(closedJob);
                    return [3 /*break*/, 4];
                case 3:
                    error_5 = _a.sent();
                    res.status(500).json({ error: "Failed to close job." });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function deleteJobById(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var jobId, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    jobId = req.params.id;
                    if (!jobId) {
                        res.status(400).json({ error: "jobId is required" });
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, jobsModel_ts_1.deleteJob)(jobId)];
                case 2:
                    _a.sent();
                    res.status(204).send();
                    return [3 /*break*/, 4];
                case 3:
                    error_6 = _a.sent();
                    res.status(500).json({ error: "Failed to delete job" });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
