const { Octokit } = require("@octokit/rest");
const { _ } = require('dotenv').config();
const fs = require('fs');
const path = require('path');

const octokit = new Octokit({
    auth: process.env.GH_PAT,
});

const repoOwner = "noxelisdev";
const repoName = "LoL_DDragon";

const getTreeFromEntry = (entry) => octokit.rest.git.getTree({
    owner: repoOwner,
    repo: repoName,
    tree_sha: entry.sha
});

async function fetch_images() {
    const master = await octokit.rest.git.getRef({
        owner: repoOwner,
        repo: repoName,
        ref: "heads/master",
    })
        .then((ref) => octokit.rest.repos.getCommit({
            owner: repoOwner,
            repo: repoName,
            ref: ref.data.object.sha,
        }))
        .then((commit) => octokit.rest.git.getTree({
            owner: repoOwner,
            repo: repoName,
            tree_sha: commit.data.commit.tree.sha,
        }))
        .then((tree) => tree.data.tree.filter((key) => key.path === "latest")[0])
        .then(getTreeFromEntry)
        .then((tree) => tree.data.tree.filter((key) => key.path === "img")[0])
        .then(getTreeFromEntry)
        .then((tree) => tree.data.tree.filter((key) => key.path === "champion")[0])
        .then(getTreeFromEntry)
        .then(async (tree) => await Promise.all(tree.data.tree.map(async (entry) => [entry.path, await octokit.rest.git.getBlob({
            owner: repoOwner,
            repo: repoName,
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

async function fetch_names() {
    const master = await octokit.rest.git.getRef({
        owner: repoOwner,
        repo: repoName,
        ref: "heads/master",
    })
        .then((ref) => octokit.rest.repos.getCommit({
            owner: repoOwner,
            repo: repoName,
            ref: ref.data.object.sha,
        }))
        .then((commit) => octokit.rest.git.getTree({
            owner: repoOwner,
            repo: repoName,
            tree_sha: commit.data.commit.tree.sha,
        }))
        .then((tree) => tree.data.tree.filter((key) => key.path === "latest")[0])
        .then(getTreeFromEntry)
        .then((tree) => tree.data.tree.filter((key) => key.path === "data")[0])
        .then(getTreeFromEntry)
        .then((tree) => tree.data.tree.filter((key) => key.path === "en_US")[0])
        .then(getTreeFromEntry)
        .then((tree) => tree.data.tree.filter((key) => key.path === "champion.json")[0])
        .then((entry) => octokit.rest.git.getBlob({
            owner: repoOwner,
            repo: repoName,
            file_sha: entry.sha,
        }))
        .then((entry) => {
            const champs = JSON.parse(atob(entry.data.content)).data
            Object.keys(champs).forEach((champId) => champs[champId] = champs[champId].name)
            return champs
        })

    console.log(master)
}

fetch_images()
fetch_names()