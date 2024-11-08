import * as React from "react";
import type { Observable } from "core/Misc/observable";
import type { PropertyChangedEvent } from "../../../../propertyChangedEvent";
import type { LockObject } from "shared-ui-components/tabs/propertyGrids/lockObject";
import type { GlobalState } from "../../../../globalState";
import type { Sound } from "core/Audio/sound";
import type { IExplorerExtensibilityGroup } from "core/Debug/debugLayer";
interface ISoundPropertyGridComponentProps {
    globalState: GlobalState;
    sound: Sound;
    extensibilityGroups?: IExplorerExtensibilityGroup[];
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
}
export declare class SoundPropertyGridComponent extends React.Component<ISoundPropertyGridComponentProps> {
    constructor(props: ISoundPropertyGridComponentProps);
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
