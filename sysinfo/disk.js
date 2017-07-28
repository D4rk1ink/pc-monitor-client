const exec = require("child_process").exec

const diskSpace = () => {
    return new Promise((resolve, reject) => {
        const filterSpace = (data) => {
            return data.map((item) => {
                const diskRegex = /(\w+)\:[^\d]+(\d+)[^\d]+(\d+)/g.exec(item)
                let disk = diskRegex
                if(diskRegex) disk = [diskRegex[1], diskRegex[2], diskRegex[3]]
                return disk
            })
            .filter((item) => {
                return item != null
            })
        }
        exec("wmic logicaldisk get size,freespace,caption", (err, stdout, stderr) => {
            if(err) return reject(new Error("error"))
            stdout = stdout.split("\n")
            stdout.splice(0,1)
            let disks = filterSpace(stdout)
            return resolve(disks)
        })
    })
}

module.exports = { diskSpace }