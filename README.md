# AutoReload-Reactjs
Auto reload for clients after deploy with React js (Production build)


One of the common issue our react js app has is that clients has to do browser hard refresh when developers push any new changes. Is there any other way to handle it ? Where client don’t have to do hard refresh on browser?

<strong>Yes</strong>, We will hash our file names each build so we know when they have change.

1) We’ll create version.json ,which holds the current build hash and also enter the current build hash into the code itself.
2) We’ll make frontend pull the version.json every X seconds or minutes to check if the hash has changed compared to it’s previous hash.
3) If it has, we’ll reload the client.


When building React js project, it will hash the files automatically. All you need to do is: npm run build — prod and you’ll get bunch of files in your /build/ folder, one of them being /build/static/js/main.somehash.js. This is the file we care about as this holds all of our own JS. There are bunch of other files too that get generated during the build process, but we’ll focus on the main.js


##Create a /build/post-build.js file:

````
const path = require('path');
const fs = require('fs');
const util = require('util');
// get application version from package.json
const appVersion = require('../package.json').version;
// promisify core API's
const readDir = util.promisify(fs.readdir);
const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);
console.log('\nRunning post-build tasks');
// our version.json will be in the auto-reload folder
const versionFilePath = path.join(__dirname + '/../auto-reload/version.json');
let mainHash = '';
let mainBundleFile = '';

// read the build folder files and find the one we're looking for
readDir(path.join(__dirname, '/../build/static/js/'))
 .then(files => {
 mainBundleFile = files.find(f => {
    if(f.startsWith('main.')){
        return f;
    }
    
 });
    
 console.log(mainBundleFile)
 if (mainBundleFile) {
    console.log("inside mainBundleFile")
 let matchHash = mainBundleFile.split(".");
 console.log(matchHash)
 // if it has a hash in it's name, mark it down
 if (matchHash.length > 1 && !!matchHash[1]) {
 mainHash = matchHash[1];
 console.log(mainHash)
 }

 }

console.log(`Writing version and hash to ${versionFilePath}`);
// write current version and hash into the version.json file
 const src = `{"version": "${appVersion}", "hash": "${mainHash}"}`;
 return writeFile(versionFilePath, src);
 }).then(() => {
 // main bundle file not found, dev build?
 if (!mainBundleFile) {
 return;
 }
console.log(`Replacing hash in the ${mainBundleFile}`);
// replace hash placeholder in our main.js file so the code knows it's current hash
 const mainFilepath = path.join(__dirname, '/../build/static/js/', mainBundleFile);
 return readFile(mainFilepath, 'utf8')
 .then(mainFileData => {
 const replacedFile = mainFileData.replace('{{POST_BUILD_ENTERS_HASH_HERE}}', mainHash);
 return writeFile(mainFilepath, replacedFile);
 });
 }).catch(err => {
 console.log('Error with post build:', err);
 });

````
