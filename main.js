"use strict"
const { app, BrowserWindow, ipcMain } = require("electron")
const socketio = require("socket.io-client")
const system = require("./sysinfo/system")
const disk = require("./sysinfo/disk")
const { monitor } = require("./sysinfo/monitor")

let win = null
let io = null
global.sysinfo = {}
global.disksinfo = {}
const socket_sync_url = "http://localhost:11555/sync"

ipcMain.on("sync", (event, data) => {
    io = socketio(socket_sync_url)
    io.on("connect", () => {
        io.emit("sync", data)
    })
    io.on("disconnect", () => {

    })
})

monitor((data) => {
    if(io){
        io.emit("data-reply", data)
    }
    win.webContents.send("monitor-reply", data)
})

app.on("ready", () => {
    disk.diskSpace().then((data) => {
        conosole.log(data)
    })
    
    system.info().then((data) => {
        global.sysinfo = data
    })
    .then(() => {
        console.log(global.sysinfo)
        win = new BrowserWindow({ width: 1000, height: 800 })
        win.loadURL(`file://${__dirname}/public/index.html`)
    })
    
})