<template>
    <div class="card">
        <div class="card-tabs">
            <ul class="tabs tabs-fixed-width">
                <li class="tab"><a class="active" href="#tab1">xTerm</a></li>
            </ul>
        </div>
        <div class="card-content grey lighten-4">
            <div id="tab1">
                <div id="terminal-tab" class="terminal"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import * as Terminal from 'xterm'
    // import {ipcRenderer} from 'electron'
    import os from 'os'
    import * as pty from 'node-pty'
    import path from 'path'

    export default {
        name: 'terminal-page',
        data: function () {
            return {
                rendered: false,
                term: null,
                tab: null,
                connected: false,
                stream: null,
                org: null,
                cloudService: null,
                ptyProcess: null,
                instance: {}
            }
        },
        methods: {},
        mounted: function () {
            const vue = this
            this.term = new Terminal({})
            this.term.open(document.getElementById('terminal-tab'), true)
            this.term._initialized = true
            this.term.write('Hello from')

            var shell = os.platform() === 'win32' ? 'powershell.exe' : 'bash'

            this.ptyProcess = pty.spawn(shell, [], {
                name: 'xterm-color',
                cols: 80,
                rows: 10,
                cwd: process.env.HOME,
                env: process.env
            })

            this.ptyProcess.on('data', function (data) {
                vue.term.write(data)
            })
            vue.term.on('data', function (data) {
                vue.ptyProcess.write(data)
            })
        }
    }
</script>