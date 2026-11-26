const { execFileSync } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const REPO_URL = 'https://github.com/noxelisdev/LoL_DDragon.git';

function main() {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'lol-ddragon-'));

    try {
        execFileSync(
            'git',
            ['clone', '--depth=1', '--filter=blob:none', '--sparse', REPO_URL, tmpDir],
            { stdio: 'inherit' }
        );

        execFileSync(
            'git',
            ['-C', tmpDir, 'sparse-checkout', 'set', '--no-cone', '/latest/img/champion/', '/latest/data/en_US/champion.json'],
            { stdio: 'inherit' }
        );

        const srcIcoDir = path.join(tmpDir, 'latest/img/champion');
        const destIcoDir = path.join(__dirname, '../public/ico');
        fs.mkdirSync(destIcoDir, { recursive: true });

        let copiedCount = 0;
        for (const entry of fs.readdirSync(srcIcoDir, { withFileTypes: true })) {
            if (!entry.isFile()) continue;
            fs.copyFileSync(path.join(srcIcoDir, entry.name), path.join(destIcoDir, entry.name));
            copiedCount++;
        }
        console.log(`Copied ${copiedCount} champion icons`);

        const champJsonPath = path.join(tmpDir, 'latest/data/en_US/champion.json');
        const rawData = JSON.parse(fs.readFileSync(champJsonPath, 'utf8')).data;
        const champs = {};
        for (const champId of Object.keys(rawData)) {
            champs[champId] = rawData[champId].name;
        }

        fs.writeFileSync(path.join(__dirname, '../src/champs.json'), JSON.stringify(champs, null, 4));
        console.log(`Wrote ${Object.keys(champs).length} champions to src/champs.json`);
    } finally {
        fs.rmSync(tmpDir, { recursive: true, force: true });
    }
}

main();
