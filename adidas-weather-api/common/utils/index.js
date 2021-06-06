const utils = {
    getAWeekfromDate(date) {
        const dateElement = new Date(date)
        dateElement.setHours(0, 0, 0, 0)
        dateElement.setDate(dateElement.getDate() + 7)

        return dateElement.getTime()
    },

    getPlainDay(date) {
        const currentDate = new Date(date)
        currentDate.setHours(0, 0, 0, 0)

        return currentDate.getTime()
    },

    getNextDayFrom(date, skipNumber = 1) {
        const dateAgo = new Date(date)
        dateAgo.setDate(dateAgo.getDate() + skipNumber);

        return dateAgo.getTime()
    }
}


module.exports = utils