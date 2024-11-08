import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import eyeOpen from "./assets/eyeOpen.svg";
import eyeClosed from "./assets/eyeClosed.svg";
export class ChannelsBar extends React.PureComponent {
    render() {
        return (_jsx("div", { id: "channels-bar", children: this.props.channels.map((channel, index) => {
                const visTip = channel.visible ? "Hide" : "Show";
                const editTip = channel.editable ? "Lock" : "Unlock";
                return (_jsxs("div", { className: channel.editable ? "channel" : "channel uneditable", children: [_jsx("img", { className: channel.visible ? "icon channel-visibility visible" : "icon channel-visibility", onClick: () => {
                                const newChannels = this.props.channels;
                                newChannels[index].visible = !newChannels[index].visible;
                                this.props.setChannels(newChannels);
                            }, src: channel.visible ? eyeOpen : eyeClosed, title: `${visTip} ${channel.name}` }), _jsx("img", { className: "icon channel-name", onClick: () => {
                                const newChannels = this.props.channels;
                                newChannels[index].editable = !newChannels[index].editable;
                                this.props.setChannels(newChannels);
                            }, src: channel.icon, title: `${editTip} ${channel.name}` })] }, channel.name));
            }) }));
    }
}
//# sourceMappingURL=channelsBar.js.map