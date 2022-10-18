function Ajax($method, $url, $parmas) {
    // 使用Promise
    return new Promise(function (resolve, reject) {
      let xhr = new XMLHttpRequest();
      let str = "?";
      if ($parmas) {
        for (let key in $parmas) {
          str += `${key}=${$parmas[key]}&`;
        }
      };
  
      if ($method.toUpperCase() === "GET") {
        xhr.open($method, $url + str.slice(0, -1));
        xhr.send();
      } else {
        xhr.open($method, $url);
        xhr.setRequestHeader("content-type", "application/json");
        xhr.send(JSON.stringify($parmas));
      };
  
      xhr.addEventListener("readystatechange", function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            // 返回成功
            resolve(JSON.parse(xhr.response));
          } else {
            // 返回错误
            reject(JSON.parse(xhr.response));
          }
        }
      });
    });
  };
  
  
  // Ajax().then()