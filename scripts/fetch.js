const { Octokit } = require("@octokit/rest");
const { _ } = require('dotenv').config();
const fs = require('fs');
const path = require('path');

const octokit = new Octokit({
    auth: process.env.GH_PAT,
});

async function main() {
    const master = await octokit.rest.git.getRef({
        owner: "InFinity54",
        repo: "LoL_DDragon",
        ref: "heads/master",
    })
        .then((ref) => octokit.rest.repos.getCommit({
            owner: "InFinity54",
            repo: "LoL_DDragon",
            ref: ref.data.object.sha,
        }))
        .then((commit) => octokit.rest.git.getTree({
            owner: "InFinity54",
            repo: "LoL_DDragon",
            tree_sha: commit.data.commit.tree.sha,
        }))
        .then((tree) => tree.data.tree.filter((key) => key.path === "latest")[0])
        .then((entry) => octokit.rest.git.getTree({
            owner: "InFinity54",
            repo: "LoL_DDragon",
            tree_sha: entry.sha
        }))
        .then((tree) => tree.data.tree.filter((key) => key.path === "img")[0])
        .then((entry) => octokit.rest.git.getTree({
            owner: "InFinity54",
            repo: "LoL_DDragon",
            tree_sha: entry.sha
        }))
        .then((tree) => tree.data.tree.filter((key) => key.path === "champion")[0])
        .then((entry) => octokit.rest.git.getTree({
            owner: "InFinity54",
            repo: "LoL_DDragon",
            tree_sha: entry.sha,
            recursive: "true"
        }))
        .then(async (tree) => await Promise.all(tree.data.tree.map(async (entry) => [entry.path, await octokit.rest.git.getBlob({
            owner: "InFinity54",
            repo: "LoL_DDragon",
            file_sha: entry.sha
        })])))
        .then(
            async (entries) => {
                if (!fs.existsSync(path.join(__dirname, 'img'))) {
                    fs.mkdir(path.join(__dirname, 'img'), (err) => {
                        if (err) {
                            return console.error(err);
                        }
                    });
                }
                entries.forEach((entry) => {
                    const [name, image] = entry;
                    const base64data = image.data.content.replace(/\\n/g, '');
                    fs.writeFile(path.join(__dirname, 'img/') + name, base64data, { encoding: 'base64' }, (err) => { console.log("Created " + name) })
                })

            })
    return master;
}

main()