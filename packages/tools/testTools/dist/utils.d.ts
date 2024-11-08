import type { Page } from "puppeteer";
import type { StacktracedObject } from "./window";
export interface CountValues {
    numberOfObjects: number;
    usedJSHeapSize: number;
    specifics: {
        [type: string]: string[];
    };
    eventsRegistered: typeof window.eventsRegistered;
}
export declare const countCurrentObjects: (initialValues: CountValues, classes?: string[], checkGlobalObjects?: boolean, flip?: boolean) => Promise<void>;
export declare const evaluateInitEngine: (engineName: string, baseUrl: string, parallelCompilation?: boolean) => Promise<true | undefined>;
export declare const evaluateEventListenerAugmentation: () => Promise<void>;
export declare const evaluateCreateScene: () => Promise<boolean>;
export declare const evaluateRenderScene: (renderCount?: number) => Promise<number>;
export declare const evaluateDisposeScene: () => Promise<void>;
export declare const evaluateDisposeEngine: () => Promise<void>;
export declare const evaluateDefaultScene: () => Promise<void>;
export declare const prepareLeakDetection: (classes?: string[]) => Promise<void>;
export declare const countObjects: (page: Page, classes?: string[]) => Promise<{
    numberOfObjects: number;
    usedJSHeapSize: any;
    specifics: {
        [type: string]: string[];
    };
    eventsRegistered: {
        [eventName: string]: {
            numberAdded: number;
            numberRemoved: number;
            registeredFunctions: [{
                eventListener: EventListenerOrEventListenerObject | null;
                timesAdded: number;
            } | null];
            stackTraces: string[];
        };
    };
    stackTraces: {
        [id: string]: StacktracedObject;
    };
}>;
export type PerformanceTestType = "dev" | "preview" | "stable";
export declare const checkPerformanceOfScene: (page: Page, baseUrl: string, type: PerformanceTestType, createSceneFunction: (metadata?: {
    playgroundId?: string;
}, config?: any) => Promise<void>, numberOfPasses?: number, framesToRender?: number, metadata?: {
    playgroundId: string;
}, config?: any) => Promise<number>;
export declare const logPageErrors: (page: Page, debug?: boolean) => Promise<void>;
