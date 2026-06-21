const sharp = require('sharp')
const path = require('path')
const fs = require('fs')

const outDir = path.join(__dirname, '../public/icons')
fs.mkdirSync(outDir, { recursive: true })

function svgIcon(size) {
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1A1535"/>
      <stop offset="100%" stop-color="#0D0B1E"/>
    </linearGradient>
    <linearGradient id="g" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#8B5CF6"/>
      <stop offset="50%" stop-color="#C026D3"/>
      <stop offset="100%" stop-color="#EC4899"/>
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" rx="${Math.round(size*0.22)}" fill="url(#bg)"/>
  <path d="M${size*0.2} ${size*0.75} L${size*0.5} ${size*0.22} L${size*0.8} ${size*0.75}"
    stroke="url(#g)" stroke-width="${size*0.1}" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <path d="M${size*0.32} ${size*0.62} L${size*0.5} ${size*0.22} L${size*0.68} ${size*0.62}"
    stroke="url(#g)" stroke-width="${size*0.06}" stroke-linecap="round" stroke-linejoin="round" fill="none" opacity="0.5"/>
</svg>`)
}

async function run() {
  for (const size of [192, 512]) {
    await sharp(svgIcon(size))
      .resize(size, size)
      .png()
      .toFile(path.join(outDir, `icon-${size}.png`))
    console.log(`icon-${size}.png ✓`)
  }
  await sharp({
    create: { width: 390, height: 844, channels: 4, background: { r: 13, g: 11, b: 30, alpha: 1 } }
  }).png().toFile(path.join(outDir, 'screenshot-mobile.png'))
  console.log('screenshot-mobile.png ✓')
}

run().catch(console.error)
