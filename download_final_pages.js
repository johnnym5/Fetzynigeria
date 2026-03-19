const fs = require('fs');
const https = require('https');

const pages = {
    'index.html': 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzdkNDY1YTJmZGJhYTRjMTJiYmEyMDAzMjZlYTAyOGZmEgsSBxD5r5CB5gEYAZIBIwoKcHJvamVjdF9pZBIVQhM0MzA0MzMzMjU2NTcxMDQ5NzUx&filename=&opi=89354086',
    'about.html': 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzM2OTg1MjkzNGYxODQ5ZjhhYmE1ZDUxY2ZiODlhZGU5EgsSBxD5r5CB5gEYAZIBIwoKcHJvamVjdF9pZBIVQhM0MzA0MzMzMjU2NTcxMDQ5NzUx&filename=&opi=89354086',
    'services.html': 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzFmNzcxOWViNzY3ZjQxNjA5MzViMTFhNTY0MGE4OGFmEgsSBxD5r5CB5gEYAZIBIwoKcHJvamVjdF9pZBIVQhM0MzA0MzMzMjU2NTcxMDQ5NzUx&filename=&opi=89354086',
    'projects.html': 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzI3N2Y5OGNhNDcyMDRlMDdhODA5M2ViNDg3OGVkZjU3EgsSBxD5r5CB5gEYAZIBIwoKcHJvamVjdF9pZBIVQhM0MzA0MzMzMjU2NTcxMDQ5NzUx&filename=&opi=89354086',
    'contact.html': 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sX2RlMTBmNDNlNTA1MjRhM2Q5MTE2MmI0MWViODYxZjkyEgsSBxD5r5CB5gEYAZIBIwoKcHJvamVjdF9pZBIVQhM0MzA0MzMzMjU2NTcxMDQ5NzUx&filename=&opi=89354086',
    'careers.html': 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzg0NjgwZDM1ODY4ZjQ4ZGVhMzA5NGE3ODYzMWI2NjIxEgsSBxD5r5CB5gEYAZIBIwoKcHJvamVjdF9pZBIVQhM0MzA0MzMzMjU2NTcxMDQ5NzUx&filename=&opi=89354086',
    'process.html': 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzAwYTRmYWM4YWY1MDQyYzBhNzc4MzdiYjA5YTM2YmM3EgsSBxD5r5CB5gEYAZIBIwoKcHJvamVjdF9pZBIVQhM0MzA0MzMzMjU2NTcxMDQ5NzUx&filename=&opi=89354086',
    'legal.html': 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzNhOTA1OTE1N2Y0NjQyNzJhZjA2M2MwYTFlZjVmMzhjEgsSBxD5r5CB5gEYAZIBIwoKcHJvamVjdF9pZBIVQhM0MzA0MzMzMjU2NTcxMDQ5NzUx&filename=&opi=89354086',
    'sitemap.html': 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sX2ZlOTUzYjQwNjhkNTQxZmI4MDJhZThkNWU3NGIzOTNiEgsSBxD5r5CB5gEYAZIBIwoKcHJvamVjdF9pZBIVQhM0MzA0MzMzMjU2NTcxMDQ5NzUx&filename=&opi=89354086'
};

const downloadFile = (url, dest) => {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, (response) => {
            response.pipe(file);
            file.on('finish', () => { file.close(resolve); });
        }).on('error', (err) => { fs.unlink(dest, () => reject(err)); });
    });
};

async function main() {
    console.log(`Starting download of ${Object.keys(pages).length} core pages...`);
    for (const [filename, url] of Object.entries(pages)) {
        console.log(`Downloading ${filename}...`);
        await downloadFile(url, filename);
    }
    console.log('All core pages downloaded successfully.');
}

main().catch(console.error);
