import type { ThenableWebDriver } from "selenium-webdriver";
import "selenium-webdriver/safari";
export declare const macOSSafariCapabilities: {
    "bstack:options": {
        os: string;
        osVersion: string;
        local: string;
        seleniumVersion: string;
        userName: string | undefined;
        accessKey: string | undefined;
    };
    browserName: string;
    browserVersion: string;
};
export declare const LoadPlayground: (driver: ThenableWebDriver, pgId: string, globalConfig: {
    root: string;
    baseUrl: string;
    snippetUrl: string;
    pgRoot: string;
}, framesToRender?: number) => Promise<void>;
export declare const CheckTestSuccessStatus: (driver: ThenableWebDriver) => Promise<boolean>;
