import React, { Component } from "react"
import ReactDOM from "react-dom"
import { ipcRenderer, remote } from "electron"
import "./sass/main.scss"

class App extends Component{
    constructor(props){
        super(props)
        this.token = "2a7d04afb4c070480fb298b06d673ad48fcb"
        this.secret = "2c54b48af82efbd007f5478acc6a27e68d61e112726d5e0525373dcb7dcc76b1b1ab1ac3"
        this.state = { monitor: {}, sysinfo: {} }
        this.monitor = this.monitor.bind(this)
        this.syncData = this.syncData.bind(this)
    }
    componentWillMount(){
        this.state.sysinfo = remote.getGlobal("sysinfo")
        console.log(this.state)
        //ipcRenderer.send("monitor", "")
        ipcRenderer.on("monitor-reply", this.monitor)
    }
    monitor(event, data){
        this.setState({ monitor: data })
    }
    syncData(){
        const token = document.getElementById("token").value
        const secret = document.getElementById("secret").value
        const data = {
            token: token,
            secret: secret
        }
        ipcRenderer.send("sync", data)
    }
    render(){
        const cpuUsage = (this.state.monitor.cpuUsage)? this.state.monitor.cpuUsage : 0
        const memUsage = (this.state.monitor.memUsage)? this.state.monitor.memUsage : 0
        return (
            <div>
                <div className="body responsive-utilities">
                    <div className="row">
                        <div className="col-12">
                            <div className="sysinfo">
                                <div className="header"> 
                                    OS Information
                                </div>
                                <div className="content">
                                    <div className="">Host Name: {this.state.sysinfo.hostname}</div>
                                    <div className="">OS Name: {this.state.sysinfo.osname}</div>
                                    <div className="">OS Version: {this.state.sysinfo.osversion}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <div className="monitor">
                                <div className="header"> 
                                    OS Information
                                </div>
                                <div className="content">
                                    <div className={`pie-wrapper progress-${cpuUsage}`}>
                                        <div className="pie">
                                            <div className="left-side half-circle"></div>
                                            <div className="right-side half-circle"></div>
                                        </div>
                                        <div className="shadow"></div>
                                        <span className="label">{`${cpuUsage}%`}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="monitor">
                                <div className="header"> 
                                    OS Information
                                </div>
                                <div className="content"> 
                                    <div className={`pie-wrapper progress-${memUsage}`}>
                                        <div className="pie">
                                            <div className="left-side half-circle"></div>
                                            <div className="right-side half-circle"></div>
                                        </div>
                                        <div className="shadow"></div>
                                        <span className="label">{`${memUsage}%`}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="disksinfo">
                                <div className="header"> 
                                    Disks Information
                                </div>
                                <div className="content">
                                    <div className="disk-item">
                                        <div className="disk-name">
                                            Disk C:
                                        </div>
                                        <div className="disk-bar">

                                        </div>
                                        <div className="disk-space">

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="data-sync">
                            <input type="text" id="token" value={this.token} placeholder="token" />
                            <input type="text" id="secret" value={this.secret} placeholder="secret-key" />
                            <input type="submit" value="Sync" onClick={this.syncData} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById("app"))