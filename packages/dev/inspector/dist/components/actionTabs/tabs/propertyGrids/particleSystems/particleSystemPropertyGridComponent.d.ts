import * as React from "react";
import type { Observable } from "core/Misc/observable";
import type { PropertyChangedEvent } from "../../../../propertyChangedEvent";
import type { LockObject } from "shared-ui-components/tabs/propertyGrids/lockObject";
import type { GlobalState } from "../../../../globalState";
import type { IParticleSystem } from "core/Particles/IParticleSystem";
interface IParticleSystemPropertyGridComponentProps {
    globalState: GlobalState;
    system: IParticleSystem;
    lockObject: LockObject;
    onSelectionChangedObservable?: Observable<any>;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
}
export declare class ParticleSystemPropertyGridComponent extends React.Component<IParticleSystemPropertyGridComponentProps> {
    private _snippetUrl;
    constructor(props: IParticleSystemPropertyGridComponentProps);
    renderEmitter(): import("react/jsx-runtime").JSX.Element | null;
    raiseOnPropertyChanged(property: string, newValue: any, previousValue: any): void;
    renderControls(): import("react/jsx-runtime").JSX.Element;
    saveToFile(): void;
    loadFromFile(file: File): void;
    loadFromSnippet(): void;
    saveToSnippet(): void;
    updateTexture(file: File): void;
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
