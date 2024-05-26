import resolve from "@rollup/plugin-node-resolve"
import terser from "@rollup/plugin-terser"
import typescript from "@rollup/plugin-typescript"
import json from "@rollup/plugin-json"
import replace from "@rollup/plugin-replace"
import { getConfigHome, getDocumentsFolder } from "platform-folders"

const build = process.env.BUILD || "development"
const isDev = build === "development"

const options = {
  /**
   * Change the file name of the output file here.
   */
  filename: "dynamicdashboard.js",

  /**
   * Determines in what build mode the plugin should be build. The default here takes
   * from the environment (ex. CLI arguments) with "development" as fallback.
   */
  build: process.env.BUILD || "development"
}

/**
 * Tip: if you change the path here to your personal user folder,
 * you can ignore this change in git with:
 * ```
 * > git update-index --skip-worktree rollup.config.js
 * ```
 * To accept changes on this file again, use:
 * ```
 * > git update-index --no-skip-worktree rollup.config.js
 * ```
 */
function getOutput() {
  if (options.build !== "development") return `./dist/${options.filename}`

  const pluginPath = `OpenRCT2/plugin/${options.filename}`
  if (process.platform === "win32") {
    return `${getDocumentsFolder()}/${pluginPath}`
  } // for both Mac and Linux
  else {
    return `${getConfigHome()}/${pluginPath}`
  }
}

/**
 * @type {import("rollup").RollupOptions}
 */
const config = {
  input: "./src/index.ts",
  output: {
    file: getOutput(),
    format: "iife",
    compact: true
  },
  treeshake: "smallest",
  plugins: [
    replace({
      preventAssignment: true,
      values: {
        __BUILD_CONFIGURATION__: JSON.stringify(build),
        ...(isDev ? {} : { "Logger.debug": "//" })
      }
    }),
    resolve(),
    typescript(),
    json()
  ]
}

if (!isDev) {
  config.plugins.push(
    terser({
      compress: {
        passes: 5,
        toplevel: true,
        unsafe: true
      },
      format: {
        comments: false,
        quote_style: 1,
        wrap_iife: true,
        beautify: false
      }
    })
  )
}

export default config
