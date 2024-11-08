/// <reference types="react" />
import type { Layout } from "./types";
export declare const LayoutContext: import("react").Context<{
    /**
     * The layout object
     */
    layout: Layout;
    /**
     * Function to set the layout object in the context
     */
    setLayout: (layout: Layout) => void;
}>;
