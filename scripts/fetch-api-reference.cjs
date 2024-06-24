const fs = require("fs")
const fetch = require("node-fetch")

const path = "./lib/openrct2.d.ts"
const source = process.env.SOURCE === "master" ? "master" : "develop"
const URL = `https://raw.githubusercontent.com/OpenRCT2/OpenRCT2/${source}/distribution/openrct2.d.ts`

const fetchApiReference = async () => {
  const response = await fetch(URL)
  const text = await response.text()
  fs.writeFileSync(path, text)
}

fetchApiReference()
