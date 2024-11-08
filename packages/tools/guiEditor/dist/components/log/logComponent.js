import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import * as ReactDOM from "react-dom";
import "./log.scss";
export class LogEntry {
    constructor(message, isError) {
        this.message = message;
        this.isError = isError;
    }
}
export class LogComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { logs: [] };
    }
    componentDidMount() {
        this.props.globalState.onLogRequiredObservable.add((log) => {
            const newLogArray = this.state.logs.map((number) => number);
            newLogArray.push(log);
            this.setState({ logs: newLogArray });
        });
    }
    componentDidUpdate() {
        const logConsole = ReactDOM.findDOMNode(this.refs["log-console"]);
        if (!logConsole) {
            return;
        }
        logConsole.scrollTop = logConsole.scrollHeight;
    }
    render() {
        const today = new Date();
        const h = today.getHours();
        const m = today.getMinutes();
        const s = today.getSeconds();
        return (_jsx("div", { id: "log-console", ref: "log-console", children: this.state.logs.map((l, i) => {
                return (_jsx("div", { className: "log" + (l.isError ? " error" : ""), children: h + ":" + m + ":" + s + ": " + l.message }, i));
            }) }));
    }
}
//# sourceMappingURL=logComponent.js.map