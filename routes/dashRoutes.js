const db = require("../models");
const isAuthenticated = require("../config/isAuthenticated");
var moment = require('moment');
var ObjectId = require('mongodb').ObjectID

const today = moment().toDate();
const sevenDays = moment().subtract(6, "d").toDate();
const startOfYear = moment(new Date("1/1/" + (new Date()).getFullYear())).toDate();
module.exports = app => {
    app.post('/dashboard', (req, res) => {
        var theObj = {
            "userid": ObjectId(req.body.userId),
            "createdAt": { $lte: today, $gte: sevenDays },
            reviewComplete: true,
            reviewValid: true
        };
        if (req.body.locationPhone && req.body.locationPhone != 0) {
            theObj = {
                "locationPhonenumber": req.body.locationPhone,
                "userid": ObjectId(req.body.userId),
                "createdAt": { $lte: today, $gte: sevenDays },
                reviewComplete: true,
                reviewValid: true
            };
        }
        db.Text
            .aggregate([
                {
                    $match: theObj
                },
                {
                    $group: {
                        _id:
                        {
                            month: { $month: "$createdAt" },
                            day: { $dayOfMonth: "$createdAt" },
                            year: { $year: "$createdAt" }
                        },
                        aveRating: { $avg: "$rating" },
                    }
                },
                {
                    $sort: {
                        "_id.year": 1,
                        "_id.month": 1,
                        "_id.day": 1
                    }
                }
            ])
            .then(data => {
                if (data) {
                    res.status(200).json(data);
                } else {
                    res.status(400).json({ "message": "No Data" });
                }
            }).catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    });

    app.post('/api/dashboardMonthly', (req, res) => {
        var theObj = {
            "userid": ObjectId(req.body.userId),
            "createdAt": { $lte: today, $gte: startOfYear },
            reviewComplete: true,
            reviewValid: true
        };
        if (req.body.locationPhone && req.body.locationPhone != 0) {
            theObj = {
                "locationPhonenumber": req.body.locationPhone,
                "userid": ObjectId(req.body.userId),
                "createdAt": { $lte: today, $gte: startOfYear },
                reviewComplete: true,
                reviewValid: true
            };
        }
        db.Text
            .aggregate([
                {
                    $match: theObj
                },
                {
                    $group: {
                        _id:
                        {
                            month: { $month: "$createdAt" },
                            year: { $year: "$createdAt" }
                        },
                        aveRating: { $avg: "$rating" },
                    }
                },
                {
                    $sort: {
                        "_id.year": 1,
                        "_id.month": 1
                    }
                }
            ])
            .then(data => {
                if (data) {
                    res.status(200).json(data);
                } else {
                    res.status(400).json({ "message": "No Data" });
                }
            }).catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    });
    // reviewComplete: {
    //     $or: [
    //         {reviewComplete: false},{reviewComplete: null}
    //     ]
    // },
    // reviewValid: {
    //     $or: [
    //         {reviewValid: false},{reviewValid: null}
    //     ]
    // }
    app.post('/api/dashboardInvalid', (req, res) => {
        var theObj = {
            "userid": ObjectId(req.body.userId),
            "createdAt": { $lte: today, $gte: sevenDays },
            $or: [
                { "reviewComplete": false },
                { "reviewComplete": null },
                { "reviewValid": false },
                { "reviewValid": null }
            ]
        };
        if (req.body.locationPhone && req.body.locationPhone != 0) {
            theObj = {
                "locationPhonenumber": req.body.locationPhone,
                "userid": ObjectId(req.body.userId),
                "createdAt": { $lte: today, $gte: sevenDays },
                $or: [
                    { "reviewComplete": false },
                    { "reviewComplete": null },
                    { "reviewValid": false },
                    { "reviewValid": null }
                ],
            };
        }
        db.Text
            .aggregate([
                {
                    $match: theObj
                },

                {
                    $group: {
                        _id:
                        {
                            month: { $month: "$createdAt" },
                            year: { $year: "$createdAt" },
                            day: { $dayOfMonth: "$createdAt" }
                        },
                        aveRating: { $avg: "$rating" },
                    }
                },
                {
                    $sort: {
                        "_id.year": 1,
                        "_id.month": 1,
                        "_id.day": 1
                    }
                }
            ])
            .then(data => {
                if (data) {
                    res.status(200).json(data);
                } else {
                    res.status(400).json({ "message": "No Data" });
                }
            }).catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    });
}
