import * as TreeSitter from "web-tree-sitter";
import { fileURLToPath } from "url";
import fs from "fs"; 

const wasmPath = fileURLToPath(
    new URL("../../node_modules/tree-sitter-javascript/tree-sitter-javascript.wasm", import.meta.url)
);

let parser = null;

export const initParser = async () => {
    if(parser === null){
        await TreeSitter.Parser.init();
        parser = new TreeSitter.Parser();
        const load = await TreeSitter.Language.load(wasmPath);
        parser.setLanguage(load);
        return parser;
    }
    else return parser;
}

export const parserFile = async (filePath) => {
    const parsed = await initParser();
    let file;
    try {
    file = fs.readFileSync(filePath, "utf-8");
    } catch (err) {
        throw new Error(`Không thể đọc file: ${filePath}`);
    }
    const tree = parsed.parse(file);
    if (tree.rootNode.hasError) {
        throw new Error(`File chứa syntax error: ${filePath}`);
    }
    return tree.rootNode.toString();
}