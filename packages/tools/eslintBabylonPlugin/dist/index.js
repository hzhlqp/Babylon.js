"use strict";
var tslib_1 = require("tslib");
var tsdoc_1 = require("@microsoft/tsdoc");
var tsdoc = require("@microsoft/tsdoc");
var ts = require("typescript");
// import { Debug } from "./Debug";
var ConfigCache_1 = require("./ConfigCache");
var tsdocMessageIds = {};
var defaultTSDocConfiguration = new tsdoc_1.TSDocConfiguration();
defaultTSDocConfiguration.allTsdocMessageIds.forEach(function (messageId) {
    tsdocMessageIds[messageId] = "".concat(messageId, ": {{unformattedText}}");
});
var allowedTags = ["@internal", "@since"];
function isDeclarationKind(kind) {
    return (kind === ts.SyntaxKind.ArrowFunction ||
        // kind === ts.SyntaxKind.BindingElement ||
        kind === ts.SyntaxKind.ClassDeclaration ||
        kind === ts.SyntaxKind.ClassExpression ||
        kind === ts.SyntaxKind.Constructor ||
        kind === ts.SyntaxKind.EnumDeclaration ||
        kind === ts.SyntaxKind.EnumMember ||
        kind === ts.SyntaxKind.ExportSpecifier ||
        kind === ts.SyntaxKind.FunctionDeclaration ||
        kind === ts.SyntaxKind.FunctionExpression ||
        kind === ts.SyntaxKind.GetAccessor ||
        // kind === ts.SyntaxKind.ImportClause ||
        // kind === ts.SyntaxKind.ImportEqualsDeclaration ||
        // kind === ts.SyntaxKind.ImportSpecifier ||
        kind === ts.SyntaxKind.InterfaceDeclaration ||
        kind === ts.SyntaxKind.JsxAttribute ||
        kind === ts.SyntaxKind.MethodDeclaration ||
        kind === ts.SyntaxKind.MethodSignature ||
        // kind === ts.SyntaxKind.ModuleDeclaration ||
        // kind === ts.SyntaxKind.NamespaceExportDeclaration ||
        // kind === ts.SyntaxKind.NamespaceImport ||
        // kind === ts.SyntaxKind.Parameter ||
        // kind === ts.SyntaxKind.PropertyAssignment ||
        kind === ts.SyntaxKind.PropertyDeclaration ||
        // kind === ts.SyntaxKind.PropertySignature ||
        kind === ts.SyntaxKind.SetAccessor // TODO - setters should technically be documented as well!
    // kind === ts.SyntaxKind.ShorthandPropertyAssignment ||
    // kind === ts.SyntaxKind.TypeAliasDeclaration
    // kind === ts.SyntaxKind.TypeParameter ||
    // kind === ts.SyntaxKind.VariableDeclaration
    // kind === ts.SyntaxKind.JSDocTypedefTag ||
    // kind === ts.SyntaxKind.JSDocCallbackTag ||
    // kind === ts.SyntaxKind.JSDocPropertyTag
    );
}
function getJSDocCommentRanges(node, text) {
    var commentRanges = [];
    switch (node.kind) {
        case ts.SyntaxKind.Parameter:
        case ts.SyntaxKind.TypeParameter:
        case ts.SyntaxKind.FunctionExpression:
        case ts.SyntaxKind.ArrowFunction:
        case ts.SyntaxKind.ParenthesizedExpression:
            commentRanges.push.apply(commentRanges, (ts.getTrailingCommentRanges(text, node.pos) || []));
            break;
    }
    commentRanges.push.apply(commentRanges, (ts.getLeadingCommentRanges(text, node.pos) || []));
    // True if the comment starts with '/**' but not if it is '/**/'
    return commentRanges.filter(function (comment) {
        return text.charCodeAt(comment.pos + 1) === 0x2a /* ts.CharacterCodes.asterisk */ &&
            text.charCodeAt(comment.pos + 2) === 0x2a /* ts.CharacterCodes.asterisk */ &&
            text.charCodeAt(comment.pos + 3) !== 0x2f;
    } /* ts.CharacterCodes.slash */);
}
function walkCompilerAstAndFindComments(node, indent, notFoundComments, sourceText, getterSetterFound) {
    var _a;
    var buffer = sourceText; // node.getSourceFile().getFullText(); // don't use getText() here!
    // Only consider nodes that are part of a declaration form.  Without this, we could discover
    // the same comment twice (e.g. for a MethodDeclaration and its PublicKeyword).
    if (isDeclarationKind(node.kind)) {
        var skip_1 = false;
        (_a = ts.getModifiers(node)) === null || _a === void 0 ? void 0 : _a.forEach(function (modifier) {
            if (modifier.kind === ts.SyntaxKind.PrivateKeyword || modifier.kind === ts.SyntaxKind.ProtectedKeyword) {
                skip_1 = true;
            }
        });
        if (!skip_1) {
            // Find "/** */" style comments associated with this node.
            // Note that this reinvokes the compiler's scanner -- the result is not cached.
            var comments = getJSDocCommentRanges(node, buffer);
            var identifier = node.name;
            if (comments.length === 0) {
                if (identifier) {
                    notFoundComments.push({
                        compilerNode: node,
                        name: identifier.escapedText && identifier.escapedText.toString(),
                        textRange: tsdoc.TextRange.fromStringRange(buffer, identifier ? identifier.pos + 1 : node.pos, identifier ? identifier.end : node.end),
                    });
                }
            }
            else {
                // if this is a getter or setter
                if (node.kind === ts.SyntaxKind.GetAccessor || node.kind === ts.SyntaxKind.SetAccessor) {
                    getterSetterFound.push(identifier.escapedText.toString());
                }
                else {
                    // stop iterating anything with @internal
                    var comment = comments[0];
                    // get the comment text
                    var commentTest = tsdoc.TextRange.fromStringRange(buffer, comment.pos, comment.end).toString();
                    if (commentTest.includes("@internal")) {
                        return;
                    }
                }
            }
        }
    }
    return node.forEachChild(function (child) { return walkCompilerAstAndFindComments(child, indent + "  ", notFoundComments, sourceText, getterSetterFound); });
}
var plugin = {
    rules: {
        // NOTE: The actual ESLint rule name will be "tsdoc/syntax".  It is calculated by deleting "eslint-plugin-"
        // from the NPM package name, and then appending this string.
        syntax: {
            meta: {
                messages: tslib_1.__assign({ "error-loading-config-file": "Issue loading TSDoc config file:\n{{details}}", "error-applying-config": "Issue applying TSDoc configuration: {{details}}" }, tsdocMessageIds),
                type: "problem",
                docs: {
                    description: "Validates that TypeScript documentation comments conform to the TSDoc standard",
                    category: "Stylistic Issues",
                    // This package is experimental
                    recommended: false,
                    url: "https://tsdoc.org/pages/packages/eslint-plugin-tsdoc",
                },
            },
            create: function (context) {
                var sourceFilePath = context.getFilename();
                var tsdocConfiguration = new tsdoc_1.TSDocConfiguration();
                try {
                    var tsdocConfigFile = ConfigCache_1.ConfigCache.GetForSourceFile(sourceFilePath);
                    if (!tsdocConfigFile.fileNotFound) {
                        if (tsdocConfigFile.hasErrors) {
                            context.report({
                                loc: { line: 1, column: 1 },
                                messageId: "error-loading-config-file",
                                data: {
                                    details: tsdocConfigFile.getErrorSummary(),
                                },
                            });
                        }
                        try {
                            tsdocConfigFile.configureParser(tsdocConfiguration);
                        }
                        catch (e) {
                            context.report({
                                loc: { line: 1, column: 1 },
                                messageId: "error-applying-config",
                                data: {
                                    details: e.message,
                                },
                            });
                        }
                    }
                }
                catch (e) {
                    context.report({
                        loc: { line: 1, column: 1 },
                        messageId: "error-loading-config-file",
                        data: {
                            details: "Unexpected exception: ".concat(e.message),
                        },
                    });
                }
                var tsdocParser = new tsdoc_1.TSDocParser(tsdocConfiguration);
                var sourceCode = context.getSourceCode();
                var checkCommentBlocks = function (_node) {
                    for (var _i = 0, _a = sourceCode.getAllComments(); _i < _a.length; _i++) {
                        var comment = _a[_i];
                        if (comment.type !== "Block") {
                            continue;
                        }
                        if (!comment.range) {
                            continue;
                        }
                        var textRange = tsdoc_1.TextRange.fromStringRange(sourceCode.text, comment.range[0], comment.range[1]);
                        // Smallest comment is "/***/"
                        if (textRange.length < 5) {
                            continue;
                        }
                        // Make sure it starts with "/**"
                        if (textRange.buffer[textRange.pos + 2] !== "*") {
                            continue;
                        }
                        var parserContext = tsdocParser.parseRange(textRange);
                        var _loop_1 = function (message) {
                            if (message.messageId === "tsdoc-param-tag-missing-hyphen") {
                                return "continue";
                            }
                            // console.log(message.messageId, message.unformattedText);
                            if (message.messageId === "tsdoc-undefined-tag") {
                                if (allowedTags.some(function (tag) { return message.unformattedText.includes(tag); })) {
                                    return "continue";
                                }
                            }
                            context.report({
                                loc: {
                                    start: sourceCode.getLocFromIndex(message.textRange.pos),
                                    end: sourceCode.getLocFromIndex(message.textRange.end),
                                },
                                messageId: message.messageId,
                                data: {
                                    unformattedText: message.unformattedText,
                                },
                            });
                        };
                        // if (parserContext.log.messages.length > 0) {
                        //     console.log(`Linting: "${sourceFilePath}"`);
                        // }
                        for (var _b = 0, _c = parserContext.log.messages; _b < _c.length; _b++) {
                            var message = _c[_b];
                            _loop_1(message);
                        }
                    }
                };
                return {
                    Program: checkCommentBlocks,
                };
            },
        },
        available: {
            meta: {
                messages: tslib_1.__assign({ "error-no-doc-found": "Issue finding code doc for: {{name}}" }, tsdocMessageIds),
                type: "problem",
                docs: {
                    description: "Make sure documentation is available for public members",
                    category: "Stylistic Issues",
                    // This package is experimental
                    recommended: false,
                    url: "https://tsdoc.org/pages/packages/eslint-plugin-tsdoc",
                },
            },
            create: function (context) {
                var sourceCode = context.getSourceCode();
                var checkCommentBlocks = function (node) {
                    var _a, _b;
                    var text = sourceCode.getText(node);
                    // avoid private, protected and hidden public
                    if (text.includes("private ") || text.includes("protected ") || text.includes("public _")) {
                        return;
                    }
                    if (sourceCode.getCommentsBefore(node).length === 0) {
                        // check if  another one with the same name has a comment (for example getter/setter)
                        var tokens = sourceCode.getTokensBefore(node, {
                            filter: function (token) { return token.value === node.key.name; },
                        });
                        if (tokens.length) {
                            var hasComment = tokens.some(function (token) {
                                var node = sourceCode.getNodeByRangeIndex(token.range[0]);
                                return (node &&
                                    node.parent &&
                                    node.parent.type === "MethodDefinition" &&
                                    sourceCode.getCommentsBefore(node.parent).length > 0);
                            });
                            if (hasComment) {
                                return;
                            }
                        }
                        // }
                        context.report({
                            loc: {
                                start: sourceCode.getLocFromIndex((_a = node.key) === null || _a === void 0 ? void 0 : _a.range[0]),
                                end: sourceCode.getLocFromIndex((_b = node.key) === null || _b === void 0 ? void 0 : _b.range[1]),
                            },
                            messageId: "error-no-doc-found",
                            data: {
                                name: node.key.name,
                            },
                        });
                    }
                };
                return {
                    // Program: checkCommentBlocks,
                    MethodDefinition: checkCommentBlocks,
                    PropertyDefinition: checkCommentBlocks,
                };
            },
        },
        existing: {
            meta: {
                messages: {
                    "error-no-tsdoc-found": "No TSDoc Found for {{details}}",
                },
                type: "problem",
                docs: {
                    description: "Make sure a comment exists",
                    category: "Stylistic Issues",
                    recommended: false,
                    url: "https://tsdoc.org/pages/packages/eslint-plugin-tsdoc",
                },
            },
            create: function (context) {
                var sourceFilePath = context.getFilename();
                var program = ts.createProgram([sourceFilePath], {
                    checkJs: false,
                    resolveJsonModule: false,
                    declaration: false,
                    noEmit: true,
                    stripInternal: true,
                    noLib: true,
                    noResolve: true,
                    strictNullChecks: false,
                    strictPropertyInitialization: false,
                    skipLibCheck: true,
                    skipDefaultLibCheck: true,
                    sourceMap: false,
                    inlineSourceMap: false,
                });
                var sourceCode = context.getSourceCode();
                var sourceFile = program.getSourceFile(sourceFilePath);
                if (!sourceFile) {
                    throw new Error("Error retrieving source file");
                }
                var checkCommentBlocks = function (_node) {
                    var foundComments = [];
                    var gettersSetters = [];
                    walkCompilerAstAndFindComments(sourceFile, "", foundComments, sourceCode.getText(), gettersSetters);
                    for (var _i = 0, foundComments_1 = foundComments; _i < foundComments_1.length; _i++) {
                        var notFoundNode = foundComments_1[_i];
                        // check if it is a getter/setter
                        if (gettersSetters.includes(notFoundNode.name)) {
                            continue;
                        }
                        context.report({
                            loc: {
                                start: sourceCode.getLocFromIndex(notFoundNode.textRange.pos),
                                end: sourceCode.getLocFromIndex(notFoundNode.textRange.end),
                            },
                            messageId: "error-no-tsdoc-found",
                            data: {
                                details: notFoundNode.compilerNode.name ? notFoundNode.compilerNode.name.escapedText : "",
                            },
                        });
                    }
                };
                return {
                    Program: checkCommentBlocks,
                };
            },
        },
    },
};
module.exports = plugin;
//# sourceMappingURL=index.js.map