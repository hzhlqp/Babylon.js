/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 * @oncall web_perf_infra
 */
import type { CommandOptionExample } from '@memlab/core';
type GenerateExampleCommandOption = {
    descriptionAsBashComment?: boolean;
};
declare function generateExampleCommand(command: string, cliExample: CommandOptionExample, options?: GenerateExampleCommandOption): string;
declare const _default: {
    generateExampleCommand: typeof generateExampleCommand;
};
export default _default;
//# sourceMappingURL=DocUtils.d.ts.map