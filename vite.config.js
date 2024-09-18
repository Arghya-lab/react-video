var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import dts from "vite-plugin-dts";
import { createRequire } from "node:module";
var requireFile = createRequire(import.meta.url);
var packageJson = requireFile("./package.json");
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        dts({
            insertTypesEntry: true, // Creates type declaration files
        }),
    ],
    build: {
        lib: {
            entry: path.resolve(__dirname, "src/index.ts"),
            name: "react-video",
            fileName: function (format) { return "index.".concat(format, ".js"); },
        },
        rollupOptions: {
            // External dependencies to exclude from the bundle
            // external: ["react", "react-dom"],
            external: __spreadArray(__spreadArray([], Object.keys(packageJson.peerDependencies || {}), true), Object.keys(packageJson.dependencies || {}), true),
            output: {
                globals: {
                    react: "React",
                    "react-dom": "ReactDOM",
                },
            },
        },
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
});
