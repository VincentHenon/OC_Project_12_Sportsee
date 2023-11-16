export default class UserMain {
    constructor(data) {
        this.id = data.id
        this.firstName = data.userInfos.firstName
        this.keyData = data.keyData
        this.todayScore = data.score || data.todayScore
    }
}