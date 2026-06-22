import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const api = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../../server/attractions_dump.json'), 'utf8')
)
const js = fs.readFileSync(path.join(__dirname, '../src/constants/tripImages.js'), 'utf8')
const tripsDir = path.join(__dirname, '../src/assets/trips')

const entries = [...js.matchAll(/'([^']+)':\s*\{[\s\S]*?image:\s*LOCAL\('([^']+)'\)/g)]
const mapping = Object.fromEntries(entries.map((m) => [m[1], `${m[2]}.jpg`]))

console.log(`TRIP_META entries: ${entries.length}`)
console.log(`API trips: ${api.length}\n`)

for (const trip of api) {
  const name = trip.nameTraveler
  const file = mapping[name]
  if (!file) {
    console.log('NO KEY:', JSON.stringify(name))
    continue
  }
  const full = path.join(tripsDir, file)
  const ok = fs.existsSync(full)
  const size = ok ? fs.statSync(full).size : 0
  const buf = ok ? fs.readFileSync(full) : Buffer.alloc(0)
  const jpeg = buf[0] === 0xff && buf[1] === 0xd8
  console.log(`${ok && jpeg ? 'OK' : 'BAD'} | ${name} -> ${file} (${size}b)`)
}

const extra = Object.keys(mapping).filter((k) => !api.some((t) => t.nameTraveler === k))
if (extra.length) console.log('\nUnused TRIP_META keys:', extra)
