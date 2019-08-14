//CRUD
const TradeService = {
    getAllTrades(knex) {
        return knex
            .select('*')
            .from('trades')
    },
    getById(knex, id) {
        return knex
            .from('trades')
            .select('*')
            .where('id', id)
            .first()
    },
    insertTrade(knex, newTrade) {
        return knex
            .insert(newTrade)
            .into('trades')
            .returning('*')
            .then(row => {
                return row[0]
            })
    },
    deleteTrade(knex, id) {
        return knex('trades')
            .where({ id })
            .delete()
    },
    updateTrade(knex, id, newTradeFeilds) {
        return knex('trades')
            .where({ id })
            .update(newTradeFeilds)
    },
}

module.exports = TradeService