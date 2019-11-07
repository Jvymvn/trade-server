const express = require('express');
const TradesService = require('./trades-service');
const tradesRouter = express.Router();
const { requireAuth } = require('../middlewear/jwt-auth');
const xss = require('xss');
// const path = require('path');
const jsonParser = express.json();

const TradeTemp = trade => ({
    id: trade.id,
    title: trade.title,
    image1: xss(trade.image1),
    image2: xss(trade.image2),
    date_created: trade.date_created,
    active: trade.active,
    user_id: trade.user_id,
    claim_user: trade.claim_user,
})

tradesRouter
    .route('/')
    // .all(requireAuth)
    .get((req, res, next) => {
        TradesService.getAllTrades(req.app.get('db'))
            .then(trades => {
                res.json(trades.map(TradeTemp))
            })
            .catch(next)
    })
    .post(jsonParser, (req, res, next) => {
        const knexInstance = req.app.get('db');
        const { title, image1, image2, user_id } = req.body;
        const newTrade = { title, image1, image2, user_id };

        for(const [key, value] of Object.entries(newTrade)){
            if(!value)
            return res.status(400).json({
                error: `Missing '${key}' in request body`
            });
        }

        const tradePost = TradeTemp(newTrade);

        TradesService.insertTrade(knexInstance, tradePost)
            .then(trade => {
                res
                    .status(201)
                    .json(trade)
            })
            .catch(next);
    })
    .delete(jsonParser, async (req, res, next) => {
            try{
            const {tradeId} = req.body;
            //delete ride by id
            await TradesService.deleteTrade(
                req.app.get('db'),
                tradeId
            )
            .then(rows => {
                res.status(204).end()
            })
        }
        catch(err){
            next(err);
        }
            
    });

tradesRouter
    .route('/:trade_id')
    .all(checkTradeExists)
    .get((req, res) => {
        res.send(TradeTemp(res.trade))
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

module.exports = tradesRouter