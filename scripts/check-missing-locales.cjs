const fs = require("fs")
const path = require("path")
const { context, GitHub, getOctokit } = require("@actions/github")
const core = require("@actions/core")

const localesDir = path.join(__dirname, "../src/languages/locale")
const baseLocalePath = path.join(localesDir, "en-GB.json")
const baseLocale = JSON.parse(fs.readFileSync(baseLocalePath, "utf8"))
const localeFiles = fs
  .readdirSync(localesDir)
  .filter(
    (file) =>
      file.endsWith(".json") && file !== "en-GB.json" && file !== "en-US.json"
  )

const getMissingEntries = (base, compare, prefix = "") => {
  let missing = {}
  for (const key in base) {
    const fullKey = prefix ? `${prefix}.${key}` : key
    if (!compare.hasOwnProperty(key)) {
      missing[fullKey] = base[key]
    } else if (typeof base[key] === "object" && base[key] !== null) {
      const nestedMissing = getMissingEntries(base[key], compare[key], fullKey)
      if (Object.keys(nestedMissing).length > 0) {
        missing = { ...missing, ...nestedMissing }
      }
    }
  }
  return missing
}

const formatMissingEntries = (missingEntries) => {
  const formattedEntries = {}
  Object.entries(missingEntries).forEach(([file, keys]) => {
    formattedEntries[file] = {}
    Object.keys(keys).forEach((key) => {
      const keyParts = key.split(".")
      let currentLevel = formattedEntries[file]
      keyParts.forEach((part, index) => {
        if (!currentLevel[part]) {
          currentLevel[part] = index === keyParts.length - 1 ? keys[key] : {}
        }
        currentLevel = currentLevel[part]
      })
    })
  })
  return formattedEntries
}

const missingEntries = {}

localeFiles.forEach((file) => {
  const localePath = path.join(localesDir, file)
  const locale = JSON.parse(fs.readFileSync(localePath, "utf8"))
  const missing = getMissingEntries(baseLocale, locale)
  if (Object.keys(missing).length > 0) {
    missingEntries[file] = missing
  }
})

if (Object.keys(missingEntries).length > 0) {
  const formattedMissingEntries = formatMissingEntries(missingEntries)
  const missingEntriesStr = JSON.stringify(formattedMissingEntries, null, 2)
  console.log(`Missing entries:\n${missingEntriesStr}`)

  if (!process.env.GITHUB_TOKEN) return

  const token = process.env.GITHUB_TOKEN
  const octokit = getOctokit(token)

  const { owner, repo } = context.repo
  const issueNumber = context.payload.pull_request.number

  octokit.rest.issues.createComment({
    owner,
    repo,
    issue_number: issueNumber,
    body: `Missing entries:\n\`\`\`\n${missingEntriesStr}\n\`\`\``
  })
} else {
  console.log("No missing entries found.")
}
