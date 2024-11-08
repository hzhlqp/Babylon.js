import type { ComponentClass } from "react";
import type { IPropertyComponentProps } from "./interfaces/propertyComponentProps";
export declare class PropertyLedger {
    static DefaultControl: ComponentClass<IPropertyComponentProps>;
    static RegisteredControls: {
        [key: string]: ComponentClass<IPropertyComponentProps>;
    };
}
