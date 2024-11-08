import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import "./log.scss";
export class LogEntry {
    constructor(message, isError) {
        this.message = message;
        this.isError = isError;
        this.time = new Date();
    }
}
export class LogComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { logs: [] };
        this._logConsoleRef = React.createRef();
    }
    componentDidMount() {
        this.props.globalState.onLogRequiredObservable.add((log) => {
            const currentLogs = this.state.logs;
            currentLogs.push(log);
            this.setState({ logs: currentLogs });
        });
    }
    componentDidUpdate() {
        if (!this._logConsoleRef.current) {
            return;
        }
        this._logConsoleRef.current.scrollTop = this._logConsoleRef.current.scrollHeight;
    }
    render() {
        return (_jsx("div", { id: "nme-log-console", ref: this._logConsoleRef, children: this.state.logs.map((l, i) => {
                return (_jsx("div", { className: "log" + (l.isError ? " error" : ""), children: l.time.getHours() + ":" + l.time.getMinutes() + ":" + l.time.getSeconds() + ": " + l.message }, i));
            }) }));
    }
}
//# sourceMappingURL=logComponent.js.map