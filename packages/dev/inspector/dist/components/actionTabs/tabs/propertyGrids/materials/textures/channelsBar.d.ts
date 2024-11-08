import * as React from "react";
export interface IChannel {
    visible: boolean;
    editable: boolean;
    name: string;
    id: "R" | "G" | "B" | "A";
    icon: any;
}
interface IChannelsBarProps {
    channels: IChannel[];
    setChannels(channelState: IChannel[]): void;
}
export declare class ChannelsBar extends React.PureComponent<IChannelsBarProps> {
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
