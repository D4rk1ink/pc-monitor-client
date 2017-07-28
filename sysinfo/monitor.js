const cpu = require("./cpu")
const memory = require("./memory")

const monitor = (callback) => {
    setInterval(() => {
        Promise.all([cpu.cpuUsage(), memory.memUsage()])
        .then((data) => {
            const json = {
                cpuUsage: data[0],
                memUsage: data[1],
            }
            callback(json)
        })
    }, 1000)
}

module.exports = { monitor }