// const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')

// function makeUsersArray() {
//     return [
//         {
//             id: 1,
//             user_name: 'test-user-1',
//             full_name: 'Test user 1',
//             password: 'password',
//             date_created: '2029-01-22T16:28:32.615Z',
//         },
//         {
//             id: 2,
//             user_name: 'test-user-2',
//             full_name: 'Test user 2',
//             password: 'password',
//             date_created: '2029-01-22T16:28:32.615Z',
//         },
//         {
//             id: 3,
//             user_name: 'test-user-3',
//             full_name: 'Test user 3',
//             password: 'password',
//             date_created: '2029-01-22T16:28:32.615Z',
//         },
//         {
//             id: 4,
//             user_name: 'test-user-4',
//             full_name: 'Test user 4',
//             password: 'password',
//             date_created: '2029-01-22T16:28:32.615Z',
//         },
//     ]
// }

// function makeThingsArray(users) {
//     return [
//         {
//             id: 1,
//             title: 'First test thing!',
//             image: 'http://placehold.it/500x500',
//             user_id: users[0].id,
//             date_created: '2029-01-22T16:28:32.615Z',
//             content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
//         },
//         {
//             id: 2,
//             title: 'Second test thing!',
//             image: 'http://placehold.it/500x500',
//             user_id: users[1].id,
//             date_created: '2029-01-22T16:28:32.615Z',
//             content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
//         },
//         {
//             id: 3,
//             title: 'Third test thing!',
//             image: 'http://placehold.it/500x500',
//             user_id: users[2].id,
//             date_created: '2029-01-22T16:28:32.615Z',
//             content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
//         },
//         {
//             id: 4,
//             title: 'Fourth test thing!',
//             image: 'http://placehold.it/500x500',
//             user_id: users[3].id,
//             date_created: '2029-01-22T16:28:32.615Z',
//             content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
//         },
//     ]
// }



// function makeExpectedTrade(users, trade = []) {
//     const user = users
//         .find(user => user.id === trade.user_id)

//     return {
//         id: trade.id,
//         image1: trade.image1,
//         image2: trade.image2,
//         title: trade.title,
//         user: {
//             id: user.id,
//             user_name: user.user_name,
//             full_name: user.full_name,
//             date_created: user.date_created,
//         },
//     }
// }

// function makeMaliciousTrade(user) {
//     const maliciousTrade = {
//         id: 911,
//         image1: 'http://placehold.it/500x500',
//         image2: 'http://placehold.it/500x500',
//         date_created: new Date().toISOString(),
//         title: 'Naughty naughty very naughty <script>alert("xss");</script>',
//         user_id: user.id,
//     }
//     const expectedTrade = {
//         ...makeExpectedTrade([user], maliciousTrade),
//         title: 'Naughty naughty very naughty &lt;script&gt;alert(\"xss\");&lt;/script&gt;',
//     }
//     return {
//         maliciousTrade,
//         expectedTrade,
//     }
// }

// function makeTradesFixtures() {
//     const testUsers = makeUsersArray()
//     const testTrades = makeTradesArray(testUsers)
//     return { testUsers, testTrades }
// }

// function cleanTables(db) {
//     return db.raw(
//         `TRUNCATE
//       trades,
//       users,
//       RESTART IDENTITY CASCADE`
//     )
// }

// function seedUsers(db, users) {
//     const preppedUsers = users.map(user => ({
//         ...user,
//         password: bcrypt.hashSync(user.password, 1)
//     }))
//     return db.into('users').insert(preppedUsers)
//         .then(() =>
//             // update the auto sequence to stay in sync
//             db.raw(
//                 `SELECT setval('users_id_seq', ?)`,
//                 [users[users.length - 1].id],
//             )
//         )
// }

// function seedTradesTables(db, users, trades = []) {
//     return db
//         .into('users')
//         .insert(users)
//         .then(() =>
//             db
//                 .into('trades')
//                 .insert(trades)
//         )
// }

// function seedMaliciousTrade(db, user, trade) {
//     return db
//         .into('users')
//         .insert([user])
//         .then(() =>
//             db
//                 .into('trades')
//                 .insert([trade])
//         )
// }

// function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
//     const token = jwt.sign({ user_id: user.id }, secret, {
//         subject: user.user_name,
//         algorithm: 'HS256',
//     })
//     return `Bearer ${token}`
// }

// module.exports = {
//     makeUsersArray,
//     makeTradesArray,
//     makeExpectedTrade,
//     makeMaliciousTrade,

//     makeTradesFixtures,
//     cleanTables,
//     seedTradesTables,
//     seedMaliciousTrade,
//     seedUsers
// }
