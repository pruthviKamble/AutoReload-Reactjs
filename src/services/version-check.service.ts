import axios, { AxiosError, AxiosResponse, } from "axios";

let currentHash = '{{POST_BUILD_ENTERS_HASH_HERE}}';

function initVersionCheck(url: any, frequency = 50000) {
console.log('loding currentHAsh: ', currentHash);

    setInterval(() => {
      checkVersion(url);
    }, frequency);
   checkVersion(url);
  }
 
  function checkVersion(url: string) {
    axios.get(url+ '?t=' + new Date().getTime())
      .then((response: any) => {
        const hash = response.data.hash;
        const hashChanged = hasHashChanged(currentHash, hash);
        if(hash != undefined) {
            if (hashChanged) {
                window.location.reload();
              }
              
        }
        currentHash = hash;
        console.log('currentHash: ', currentHash)
      })
      .catch((err: AxiosError) => {
        console.error(err, 'Could not get version');
      })
  }

  function hasHashChanged(currentHash: string, newHash: string) {
    if (!currentHash || currentHash === '{{POST_BUILD_ENTERS_HASH_HERE}}') {
      return false;
    }
    return currentHash !== newHash;
  }

export {
    initVersionCheck,
    checkVersion,
    hasHashChanged
}