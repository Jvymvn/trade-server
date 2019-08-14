const knex = require('knex')
const { makeTradesArray } = require('./trades-fixtures')
const app = require('../src/app')

describe('Trades endpoints', function () {
    let db

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL,
        })
        app.set('db', db)
    })

    after('disconnect from db', () => db.destroy())

    before('clean the table', () => db('trades').truncate())

    afterEach('cleanup', () => db('trades').truncate())

    describe(`GET /trades`, () => {
        context(`Given no trades`, () => {
            it(`responds with 200 and an empty list`, () => {
                return supertest(app)
                    .get('/api/trades')
                    // .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(200, [])
            })
        })

        context('Given there are trades in the database', () => {
            const testTrades = makeTradesArray()

            beforeEach('insert trades', () => {
                return db
                    .into('trades')
                    .insert(testTrades)
            })

            it('responds with 200 and all of the trades', () => {
                return supertest(app)
                    .get('/api/trades')
                    // .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(200, testTrades)
            })
        })
    })

    describe(`POST /trades`, () => {
        it(`creates a trade, responding with 201 and the new trade`, function () {
            this.retries(3)
            const newTrade = {
                title: 'Test new Trade',
                image1: 'Test image',
                image2: 'Test image',
            }
            return supertest(app)
                .post('/api/trades')
                .send(newTrade)
                .expect(201)
                .expect(res => {
                    expect(res.body.title).to.eql(newTrade.title)
                    expect(res.body.image1).to.eql(newTrade.image1)
                    expect(res.body.image2).to.eql(newTrade.image2)
                    expect(res.body).to.have.property('id')
                    expect(res.headers.location).to.eql(`/api/trades/${res.body.id}`)
                })
                .then(postRes =>
                    supertest(app)
                        .get(`/api/trades/${postRes.body.id}`)
                        .expect(postRes.body)
                )
        })
    })

})

