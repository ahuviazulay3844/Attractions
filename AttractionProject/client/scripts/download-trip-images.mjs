/**
 * Download 24 unique trip photos into src/assets/trips/
 * Run: node scripts/download-trip-images.mjs
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import https from 'https'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outDir = path.join(__dirname, '../src/assets/trips')
fs.mkdirSync(outDir, { recursive: true })

const trips = [
  { file: 'banias.jpg', id: '1433086966358-54859d0ed716' },
  { file: 'ein-gedi.jpg', id: '1501785888041-af3ef285b470' },
  { file: 'ramon.jpg', id: '1432405972618-c60b0225b8f9' },
  { file: 'masada.jpg', id: '1452421822248-d4c2b47f0c81' },
  { file: 'meron.jpg', id: '1506905925346-21bda4d32df4' },
  { file: 'hula.jpg', id: '1439066615861-d1af74d74000' },
  { file: 'yehudiya.jpg', id: '1469474968028-56623f02e42e' },
  { file: 'habonim.jpg', id: '1507525428034-b723cf961d3e' },
  { file: 'yarkon.jpg', id: '1502082553048-f009c37129b9' },
  { file: 'tel-dan.jpg', id: '1518496435935-bc5c23b92b94' },
  { file: 'meshushim.jpg', id: '1559827262864-3a6695b4c610' },
  { file: 'timna.jpg', id: '1500534623283-312aade485b7' },
  { file: 'beit-guvrin.jpg', id: '1558618666-fbd08984a036' },
  { file: 'darga.jpg', id: '1470770841072-f978cf4d019e' },
  { file: 'caesarea.jpg', id: '1499793983690-b29da567a1e0' },
  { file: 'snir.jpg', id: '1470074568968-0783d8a285ce' },
  { file: 'tavor.jpg', id: '1472214103451-56f852254b64' },
  { file: 'mitzpe-ramon.jpg', id: '1418065463797-164f8f4c2a66' },
  { file: 'ein-bokek.jpg', id: '1540206351-d645252ee167' },
  { file: 'dor.jpg', id: '1505118387-ceecb8fa54ff' },
  { file: 'ayun.jpg', id: '1518709262385-08ef3073eb04' },
  { file: 'zippori.jpg', id: '1515547678948-57d128bb43e3' },      // ancient columns (fallback: Pexels 8134779)
  { file: 'hazoreim.jpg', id: '1509316785289-025066e21422' },
  { file: 'beit-shean.jpg', id: '1523906834658-6e24ef2386f9' },   // roman amphitheater
]

function download(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { Accept: 'image/*', 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode}`))
        res.resume()
        return
      }
      const chunks = []
      res.on('data', (c) => chunks.push(c))
      res.on('end', () => resolve(Buffer.concat(chunks)))
    }).on('error', reject)
  })
}

let ok = 0
for (const trip of trips) {
  const url = `https://images.unsplash.com/photo-${trip.id}?w=960&q=85&auto=format&fit=crop`
  const dest = path.join(outDir, trip.file)
  try {
    const buf = await download(url)
    if (buf.length < 10000 || buf.toString('utf8', 0, 15).includes('<html')) {
      console.log(`SKIP ${trip.file} (${buf.length} bytes)`)
      continue
    }
    fs.writeFileSync(dest, buf)
    console.log(`OK ${trip.file} ${Math.round(buf.length / 1024)}KB`)
    ok++
  } catch (e) {
    console.log(`FAIL ${trip.file} ${e.message}`)
  }
}
console.log(`Done: ${ok}/${trips.length}`)
