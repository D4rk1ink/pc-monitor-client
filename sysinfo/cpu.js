const exec = require("child_process").exec

const cpuUsage = (callback) => {
    return new Promise((resolve, reject) => {
        exec("wmic cpu get loadpercentage", (err, stdout, stderr) => {
            if(err) return reject(new Error(stderr))
            stdout = stdout.split("\n")[1].replace(/(\r|\s)/g, "")
            return resolve(stdout)
        })
    })
}

module.exports = { cpuUsage }