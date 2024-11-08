import type { IExplorerExtensibilityGroup } from "core/Debug/debugLayer";
import * as React from "react";
import type { Sound } from "core/Audio/sound";
interface ISoundTreeItemComponentProps {
    sound: Sound;
    extensibilityGroups?: IExplorerExtensibilityGroup[];
    onClick: () => void;
}
export declare class SoundTreeItemComponent extends React.Component<ISoundTreeItemComponentProps> {
    constructor(props: ISoundTreeItemComponentProps);
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
