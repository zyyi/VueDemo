

// 通过本地存储来帮我们进行数据的存取

const KEY = "KEY";


// 封装一个获取数据的方法，并把它暴露出去
export function getItem () {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
}

// 封装一个存储数据的方法，并将其暴露出去
export function setItem (data) {
    // 首先将本地数据库中的数据取出来
    var array = getItem();
    // 然后将数据存入到本地数据库数组中
    array.push(data);
    // 重新存入到本地数据库中
    localStorage.setItem(KEY, JSON.stringify(array));
}

