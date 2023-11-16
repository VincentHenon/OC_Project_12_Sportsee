export default class UserAverage {
    constructor(data) {
        this.userId = data.userId;
        this.sessions = data.sessions.map((session) => ({
            day: convertDay(session.day),
            sessionLength: session.sessionLength
        }))
    }
}

function convertDay(day) {
    switch(day) {
      case 1:
        return 'L'
      case 2:
        return 'M'
      case 3:
        return 'M'
      case 4:
        return 'J'
      case 5:
        return 'V'
      case 6:
        return 'S'
      case 7:
        return 'D'
      default:
        return ''// where day is not a number or not within the cases
    }
  }