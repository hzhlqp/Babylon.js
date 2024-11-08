import * as React from "react";
import type { IToolData, IToolType, IMetadata } from "./textureEditorComponent";
import { Color4 } from "core/Maths/math.color";
export interface ITool extends IToolData {
    instance: IToolType;
}
interface IToolBarProps {
    tools: ITool[];
    addTool(url: string): void;
    changeTool(toolIndex: number): void;
    activeToolIndex: number;
    metadata: IMetadata;
    setMetadata(data: any): void;
    pickerOpen: boolean;
    setPickerOpen(open: boolean): void;
    pickerRef: React.RefObject<HTMLDivElement>;
    hasAlpha: boolean;
}
interface IToolBarState {
    toolURL: string;
    addOpen: boolean;
}
export declare class ToolBar extends React.Component<IToolBarProps, IToolBarState> {
    private _lockObject;
    constructor(props: IToolBarProps);
    computeRGBAColor(): Color4;
    shouldComponentUpdate(nextProps: IToolBarProps): boolean;
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
