"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helper_plugin_utils_1 = require("@babel/helper-plugin-utils");
// @ts-ignore
const plugin_syntax_typescript_1 = require("@babel/plugin-syntax-typescript");
const t = require("@babel/types");
const generator_1 = require("@babel/generator");
function getValueFromBinaryExpression(node, mapValue, unMapValue = []) {
    const { left, operator, right } = node;
    let leftValue = 0;
    let rightValue = 0;
    if (t.isBinaryExpression(left))
        leftValue = getValueFromBinaryExpression(left, mapValue, unMapValue);
    else if (t.isNumericLiteral(left))
        leftValue = left.value;
    else if (t.isIdentifier(left))
        leftValue = +mapValue.get(left.name);
    if (t.isBinaryExpression(right))
        rightValue = getValueFromBinaryExpression(right, mapValue, unMapValue);
    else if (t.isNumericLiteral(right))
        rightValue = right.value;
    else if (t.isIdentifier(right))
        rightValue = +mapValue.get(right.name);
    if (operator === '+')
        return leftValue + rightValue;
    if (operator === '-')
        return leftValue - rightValue;
    if (operator === '*')
        return leftValue * rightValue;
    if (operator === '/')
        return leftValue / rightValue;
    if (operator === '%')
        return leftValue % rightValue;
    if (operator === '**')
        return Math.pow(leftValue, rightValue);
    if (operator === '<<')
        return leftValue << rightValue;
    if (operator === '>>')
        return leftValue >> rightValue;
    if (operator === '>>>')
        return leftValue >>> rightValue;
    if (operator === '|')
        return leftValue | rightValue;
    if (operator === '^')
        return leftValue ^ rightValue;
    if (operator === '&') 
        return leftValue & rightValue;
    return 0;
} 
exports.default = (0, helper_plugin_utils_1.declare)((api, options) => {
    api.assertVersion(7);
    const { types: t } = api; 
    const { reflect = true } = options;
    return {
        name: 'enum-to-object',
        inherits: plugin_syntax_typescript_1.default,
        visitor: {
            TSEnumDeclaration(path) { 
                const { node } = path;
                const { id, members } = node;
                let preNum = -1;
                const targetMap = new Map();
                members.forEach((member) => {
                    let { initializer, id: memberId } = member;
                    if (!initializer) {
                        preNum++;
                        initializer = t.numericLiteral(preNum);
                    }
                    else if (t.isNumericLiteral(initializer)) {
                        preNum = initializer.value;
                    }
                    let key = '';
                    if (t.isIdentifier(memberId))
                        key = memberId.name;
                    else
                        key = memberId.value;
                    let value = preNum;
                    if (t.isStringLiteral(initializer)) {
                        value = initializer.value;
                    }
                    else if (t.isBinaryExpression(initializer)) {
                        value = getValueFromBinaryExpression(initializer, targetMap);
                    }
                    else if (!t.isNumericLiteral(initializer)) {
                        const { code } = (0, generator_1.default)(initializer);
                        value = t.identifier(code);
                    }
                    targetMap.set(key, value);
                    if (reflect)
                        targetMap.set(value, key);
                });
                const obj = t.variableDeclarator(id, t.objectExpression([...targetMap.entries()].map(([key, value]) => {
                    const objectKey = t.isIdentifier(key) ? t.identifier(`[${key.name}]`) : t.stringLiteral(String(key));
                    const objectValue = t.isIdentifier(value) ? value : typeof value === 'string' ? t.stringLiteral(value) : t.numericLiteral(value);
                    return t.objectProperty(objectKey, objectValue);
                })));
                const constObjVariable = t.variableDeclaration('const', [obj]);
                path.replaceWith(constObjVariable);
            },
            Identifier(path, state) {
                let name = path.node.name;
                console.error(name, state);
            }
        },
    };
});
