const express = require('express');
const TradesService = require('./trades-service');
const tradesRouter = express.Router();
const { requireAuth } = require('../middlewear/jwt-auth');
const xss = require('xss');
const path = require('path');
const jsonParser = express.json();

const TradeTemp = trade => ({
    id: trade.id,
    title: trade.title,
    image1: xss(trade.image1),
    image2: xss(trade.image2),
    date_created: trade.date_created,
    active: trade.active,
    user_id: trade.user_id,
})

tradesRouter
    .route('/')
    .all(requireAuth)
    .get((req, res, next) => {
        TradesService.getAllTrades(req.app.get('db'))
            .then(trades => {
                res.json(trades.map(TradeTemp))
            })
            .catch(next)
    })
    .post(jsonParser, (req, res, next) => {
        const knexInstance = req.app.get('db')
        const { title, image1, image2, user_id } = req.body
        const newTrade = { title, image1, image2, user_id }
        console.log(req.body)

        TradesService.insertTrade(knexInstance, newTrade)
            .then(trade => {
                res
                    .status(201)
                    .location(path.posix.join(req.originalUrl, `/${trade.id}`))
                    .json(TradeTemp(trade))
            })
            .catch(next)
    })

tradesRouter
    .route('/:trade_id')
    .all(checkTradeExists)
    .get((req, res) => {
        res.send(TradeTemp(res.trade))
    })
    .delete((req, res, next) => {
        TradesService.deleteTrade(
            req.app.get('db'),
            req.params.trade_id
        )
            .then(row => {
                res.status(204).end();
            })
            .catch(next)
    })
    .patch(jsonParser, (req, res, next) => {
        const { active, claim_user } = req.body;
        const updatedTrade = { active, claim_user };
        TradesService.updateTrade(
            req.app.get('db'),
            req.params.trade_id,
            updatedTrade
        )
            .then(row => {
                res.status(204).end()
            })
            .catch(next)
    })


async function checkTradeExists(req, res, next) {
    try {
        const trade = await TradesService.getById(
            req.app.get('db'),
            req.params.trade_id
        )

        if (!trade)
            return res.status(404).json({
                error: `Trade doesn't exist`
            })

        res.trade = trade
        next()
    } catch (error) {
        next(error)
    }
}

//     .all((req, res) => {
//     TradesService.getById(
//         req.app.get('db'),
//         req.params.trade_id
//     )
//         .then(trade => {
//             console.log(req.params.trade_id)
//             if (!trade) {
//                 return res.status(404).json({
//                     error: { message: 'Trade does not exist' }
//                 })
//             }
//             res.trade = trade
//             next()
//         })
//         .catch(next)
// })

module.exports = tradesRouter