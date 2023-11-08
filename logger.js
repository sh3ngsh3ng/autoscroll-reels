class Logs {
    constructor(message) {
        this.message = message
        this.type = message[0]
        if (this.type != 'R') {
            this.status = 'N'
        }
    }

    isHandled() {
        if (this.type != "R") {
            if (this.status != "Y") {
                return false
            }
        }
        return true
    }
}



class Logger {
    constructor() {
        this.logs = []
    }


    getLogs() {
        console.log(this.logs)
        return this.logs
    }

    addLogs(message) {
        let log = new Logs(message)
        this.logs.push(log)
    }
}

// TESTING PERSONAL LOGGER
// let logger = new Logger()
// logger.addLogs("T: This is log 1")
// logger.addLogs("R: This is log 2")
// logger.getLogs()


