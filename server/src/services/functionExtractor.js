import { initParser } from "../utils/jsParser.js";
import fs from "fs";

const FUNCTION_TYPES = new Set([
    "function_declaration",
    "function_expression",
    "arrow_function",
]);




const walk = (node, visitor) => {
    visitor(node);
    for (let i = 0; i < node.childCount; i++) {
        walk(node.child(i), visitor);
    }
}

const getFunctionName =  (node) => {
    if (node.type === "function_declaration") {
        const nameNode = node.childForFieldName("name");
        return nameNode ? nameNode.text : "<anonymous>";
    }

    const parent = node.parent;
    if (parent && parent.type === "variable_declarator") {
        const nameNode = parent.childForFieldName("name");
        return nameNode ? nameNode.text : "<anonymous>";
    }

    if (parent && parent.type === "assignment_expression") {
        const left = parent.childForFieldName("left");
        return left ? left.text : "<anonymous>";
    }
    return "<anonymous>";
}

export const extractFunctions = async (filePath) => {
    const parser = await initParser();
    let code;
    try {
        code = fs.readFileSync(filePath, "utf-8");
    } catch {
        throw new Error(`Không thể đọc file: ${filePath}`);
    }
    const tree = parser.parse(code);
    const functions = [];
    walk(tree.rootNode, (node) => {
        if (!FUNCTION_TYPES.has(node.type)) return;
        const cc = countCC(node);
        functions.push({
            name: getFunctionName(node),
            type: node.type,
            startLine: node.startPosition.row + 1, 
            endLine: node.endPosition.row + 1,
            cc: cc
        });
    });
    return functions;
}

export const countCC = (treeNode) => {
    let cc = 1;
    const ccWalk = (node) => {
    if (node !== treeNode && FUNCTION_TYPES.has(node.type)) return;
    switch(node.type){
        case "if_statement": cc++; break;
        case "for_statement": cc++; break;
        case "for_in_statement": cc++; break;
        case "while_statement": cc++; break;
        case "do_statement": cc++; break;
        case "catch_clause": cc++; break;
        case "ternary_expression": cc++;break;
        case "switch_case": {
            if (node.childCount > 0) cc++;
            break;
            }
        case "binary_expression": {
            const op = node.childForFieldName("operator");
            if(op && (op.text === "&&" || op.text === "||") ) cc++;
            break;
            }
        }
        for (let i = 0; i < node.childCount; i++) {
        ccWalk(node.child(i));
        }
    }
    ccWalk(treeNode);
    return cc;
}