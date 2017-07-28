const exec = require("child_process").exec

const info = () => {
    const splitText = (data, sub, index) => {
        const start = data.split(sub, index).join(sub).length + 1 
        return data.substring(start, data.length).replace(/(^(\s*)|\r)/g, "")
    }
    return new Promise((resolve, reject) => {
        exec("systeminfo", (err, stdout, stderr) => {
            if(err) return reject(new Error("error"))
            stdout = stdout.split("\n")
            let info = {}
            info.hostname = splitText(stdout[1], ":", 1)
            info.osname = splitText(stdout[2], ":", 1)
            info.osversion = splitText(stdout[3], ":", 1)
            return resolve(info)
        })
    })    
}

module.exports = { info }