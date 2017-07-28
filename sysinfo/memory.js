const os = require("os")

const memUsage = () => {
    return new Promise((resolve, reject) => {
        const totalmem = os.totalmem()
        const freemem = os.freemem()
    const result = Math.floor(((totalmem-freemem)/totalmem)*100)
        resolve(result)
    })
}

module.exports = { memUsage }