const fs = require('fs');
const path = require('path');
const https = require('https');

const dir = 'C:/Users/Johnmary/Downloads/ANTIGRAVITY/FETZY';

const pages = [
    { name: 'index.html', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sX2UwOTU3NDQxYmZlNzRjZmRiOWI2NjE0OTlhMjA5YTg5EgsSBxD5r5CB5gEYAZIBIwoKcHJvamVjdF9pZBIVQhM0MzA0MzMzMjU2NTcxMDQ5NzUx&filename=&opi=89354086' },
    { name: 'about.html', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzYxMzQxNjUyNWQ1YTRjZmQ4ODJiMDg0MDllZDMxMTc3EgsSBxD5r5CB5gEYAZIBIwoKcHJvamVjdF9pZBIVQhM0MzA0MzMzMjU2NTcxMDQ5NzUx&filename=&opi=89354086' },
    { name: 'services.html', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzY5NmM0MDU0YWE0ZjRjMzI5OGEyMzBmZWRlYWNjOTMzEgsSBxD5r5CB5gEYAZIBIwoKcHJvamVjdF9pZBIVQhM0MzA0MzMzMjU2NTcxMDQ5NzUx&filename=&opi=89354086' },
    { name: 'projects.html', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzJhMDU4MWI1MWJkMjQ3MWM4MDU2N2RlYzYxMzI3NThjEgsSBxD5r5CB5gEYAZIBIwoKcHJvamVjdF9pZBIVQhM0MzA0MzMzMjU2NTcxMDQ5NzUx&filename=&opi=89354086' },
    { name: 'contact.html', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzNhODg4NDYxZTIzNTQ3MWM5NGQ4NGFiMzk3NjY3MmFiEgsSBxD5r5CB5gEYAZIBIwoKcHJvamVjdF9pZBIVQhM0MzA0MzMzMjU2NTcxMDQ5NzUx&filename=&opi=89354086' },
    { name: 'careers.html', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzE4MGQxMDljODk3ZjRhOTVhMTc3M2QzOTBlNGIwNmYxEgsSBxD5r5CB5gEYAZIBIwoKcHJvamVjdF9pZBIVQhM0MzA0MzMzMjU2NTcxMDQ5NzUx&filename=&opi=89354086' },
    { name: 'process.html', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzM5NDYwMDEyNzliZTQwMDg5ZGE5OThiNWIwYzIzNzFlEgsSBxD5r5CB5gEYAZIBIwoKcHJvamVjdF9pZBIVQhM0MzA0MzMzMjU2NTcxMDQ5NzUx&filename=&opi=89354086' },
    { name: 'legal.html', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzVjMWYxYmVlMTM0NDRkNjU4ZGUyNzI5OGY1YzQzZDEyEgsSBxD5r5CB5gEYAZIBIwoKcHJvamVjdF9pZBIVQhM0MzA0MzMzMjU2NTcxMDQ5NzUx&filename=&opi=89354086' },
    { name: 'sitemap.html', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzgxNzU0MGVhNmJmNTRiOWY5MmFlNDQzZWZjMmEwMTI3EgsSBxD5r5CB5gEYAZIBIwoKcHJvamVjdF9pZBIVQhM0MzA0MzMzMjU2NTcxMDQ5NzUx&filename=&opi=89354086' }
];

async function downloadFile(url, dest) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, (response) => {
            if (response.statusCode !== 200) {
                reject(new Error(`Failed to download '${url}' (${response.statusCode})`));
                return;
            }
            response.pipe(file);
            file.on('finish', () => {
                file.close(resolve);
            });
        }).on('error', (err) => {
            fs.unlink(dest, () => reject(err));
        });
    });
}

(async () => {
    console.log('Starting download for 9 final pages from Stitch...');
    for (const page of pages) {
        console.log(`Downloading ${page.name}...`);
        await downloadFile(page.url, path.join(dir, page.name));
    }
    console.log('All downloads complete.');
})();
