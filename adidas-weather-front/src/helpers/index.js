const helpers = {
    weekDays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],

    formatHours(timestamp) {
        let hours = new Date(timestamp).getHours();
        let minutes = new Date(timestamp).getMinutes();

        hours = (hours < 10) ? '0' + hours : hours;
        minutes = (minutes < 10) ? '0' + minutes : minutes;

        return `${hours}:${minutes}`;
    },

    formatDays(timestamp) {
        return this.weekDays[new Date(timestamp).getDay()]
    }
}

export default helpers