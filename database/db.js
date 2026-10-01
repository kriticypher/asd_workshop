const fs = require('fs/promises')
const path = require('path')

const db_path = path.join(__dirname, '../db.json')

async function readData() {
    const data = await fs.readFile(db_path, 'utf-8')
    return JSON.parse(data)
}

async function writeData(data) {
    await fs.writeFile(db_path, JSON.stringify(data, null, 2), 'utf-8')
}

module.exports = { readData, writeData }
