// 本地存储，用来设置缓存的问题
function getSessionStorage(key){
    return window.sessionStorage.getItem(key);
}


function setSessionStorage(key,value) {
    window.sessionStorage.setItem(key,value);
}

export {
  getSessionStorage,
  setSessionStorage
};
