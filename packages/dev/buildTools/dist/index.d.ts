#!/usr/bin/env node
import { checkArgs, populateEnvironment } from "./utils.js";
import { umdPackageMapping } from "./packageMapping.js";
import transformer from "./pathTransform.js";
import * as webpackTools from "./webpackTools.js";
export { transformer, webpackTools, checkArgs, umdPackageMapping, populateEnvironment };
