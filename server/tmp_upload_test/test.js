// test_types.js
import { extractFunctions } from "../src/services/functionExtractor.js" 
import { initParser } from "../src/utils/jsParser.js";
import fs from "fs";

const parser = await initParser();
const code = fs.readFileSync("./valid.js", "utf-8");
const tree = parser.parse(code);

const walk = (node) => {
    console.log(node.type);
    for (let i = 0; i < node.childCount; i++) {
        walk(node.child(i));
    }
};

walk(tree.rootNode);