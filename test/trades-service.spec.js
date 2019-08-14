const TradesService = require('../src/trades/trades-service')
const knex = require('knex')
const { makeTradesArray } = require('./trades-fixtures')

describe('Trades service object', function () {
    let db
    let testTrades = makeTradesArray()

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL,
        })
    })

    before(() => db('trades').truncate())

    afterEach(() => db('trades').truncate())

    after(() => db.destroy())

    context(`Given 'trades' has data`, () => {
        beforeEach(() => {
            return db
                .into('trades')
                .insert(testTrades)
        })

        it(`getAllTrades() resolves all trades from 'trades' table`, () => {
            return TradesService.getAllTrades(db)
                .then(actual => {
                    expect(actual).to.eql(testTrades)
                })
        })

        it(`getById() resolves a trade by id from 'trades' table`, () => {
            const idToGet = 3
            const thirdTrade = testTrades[idToGet - 1]
            return TradesService.getById(db, idToGet)
                .then(actual => {
                    expect(actual).to.eql({
                        id: idToGet,
                        title: thirdTrade.title,
                        image1: thirdTrade.image1,
                        image2: thirdTrade.image2,
                        user_id: null
                    })
                })
        })

        it(`UpdateTrade() updates a trade from the 'trades' table`, () => {
            const idOfTradeToUpdate = 3
            const newTradeData = {
                title: 'updated title',
                image1: 'updated image',
                image2: 'updated image',
                user_id: null
            }
            const originalTrade = testTrades[idOfTradeToUpdate - 1]
            return TradesService.updateTrade(db, idOfTradeToUpdate, newTradeData)
                .then(() => TradesService.getById(db, idOfTradeToUpdate))
                .then(trade => {
                    expect(trade).to.eql({
                        id: idOfTradeToUpdate,
                        ...originalTrade,
                        ...newTradeData,
                    })
                })
        })
    })

    context(`Given 'trades' has no data`, () => {
        it(`getAllTrades() resolves an empty array`, () => {
            return TradesService.getAllTrades(db)
                .then(actual => {
                    expect(actual).to.eql([])
                })
        })

        it(`insertTrade() inserts a trade and resolves the article with an 'id'`, () => {
            const newTrade = {
                title: 'Test new title',
                image1: 'Test new Image',
                image2: 'Test new Image',
                user_id: null
            }
            return TradesService.insertTrade(db, newTrade)
                .then(actual => {
                    expect(actual).to.eql({
                        id: 1,
                        title: newTrade.title,
                        image1: newTrade.image1,
                        image2: newTrade.image2,
                        user_id: null
                    })
                })
        })
    })
})

