const utils = {
    getAWeekAgofromDate(date) {
        const dateElement = new Date(date)
        dateElement.setHours(0, 0, 0, 0)
        dateElement.setDate(dateElement.getDate() - 6)

        return dateElement.getTime()
    },

    getPlainDay(date) {
        const currentDate = new Date(date)
        currentDate.setHours(23, 59, 59, 59)
        
        return currentDate.getTime()
    },

    getaDayAgo(date, skipNumber = 1) {
        const dateAgo = new Date(date)
        dateAgo.setDate(dateAgo.getDate() - skipNumber);

        return dateAgo.getTime()
    }
}


module.exports = utils