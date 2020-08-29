# AutoReload-Reactjs
Auto reload for clients after deploy with React js (Production build)


One of the common issue our react js app has is that clients has to do browser hard refresh when developers push any new changes. Is there any other way to handle it ? Where client don’t have to do hard refresh on browser?
<strong>Yes</strong>, We will hash our file names each build so we know when they have change.

1) We’ll create version.json ,which holds the current build hash and also enter the current build hash into the code itself.
2) We’ll make frontend pull the version.json every X seconds or minutes to check if the hash has changed compared to it’s previous hash.
3) If it has, we’ll reload the client.


When building React js project, it will hash the files automatically. All you need to do is: npm run build — prod and you’ll get bunch of files in your /build/ folder, one of them being /build/static/js/main.somehash.js. This is the file we care about as this holds all of our own JS. There are bunch of other files too that get generated during the build process, but we’ll focus on the main.js
