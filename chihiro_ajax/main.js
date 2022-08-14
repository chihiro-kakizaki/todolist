function _onClickAjaxReqButton(e) {
    _readUsersByAjaxAnd(2); // 1ページ目のデータを読み込みます
}

function _readUsersByAjaxAnd(pageNum) {
    pageNum = pageNum || 1; // pageNumが空であれば 1 を初期値にします
    // 新しい XMLHttpRequest インスタンスを作成します
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://reqres.in/api/users?page=' + pageNum); // リクエスト方法, リクエスト先のURL

    // リクエストの状態が変更したときに実行されるコールバック関数を設定します
    xhr.onreadystatechange = function() {

        // リクエストの状態で 4 以外は未完了のため、終了します
        // https://developer.mozilla.org/ja/docs/Web/API/XMLHttpRequest/readyState
        if (xhr.readyState !== 4) return;

        if (xhr.status === 200) {
            // リクエストのレスポンスコードが 200(OK) 
            const jsObject = JSON.parse(xhr.responseText);  // レスポンス結果のJSONを JSオブジェクトに変換します
            appendJsObject(jsObject); 
            console.log(jsObject)                   // jsObjectを コンソールに出力します
        }
        else {
            // リクエストのレスポンスコードが 200以外(OKではない) 
            console.log('HTTP error', xhr.status, xhr.statusText);
        }
    };

    // リクエストを開始します
    xhr.send();
}

const appendJsObject = (jsObject) => {
    const personArea = document.querySelector('#person_area');
    const personDate = jsObject.data
    for (let i = 0; i < personDate.length; i++) {
        const appendJsObjectElm = document.createElement('li');
        appendJsObjectElm.textContent = personDate[i].first_name + personDate[i].last_name + "," + personDate[i].email 
    
        personArea.appendChild(appendJsObjectElm)
    }
    
}
// function _onClickAjaxReqButton(e) {
//     _readUsersByAjaxAnd(2); // 1ページ目のデータを読み込みます
// }

// function _onClickAjaxReqButton(num) {
//     num = num || 1
//     let date = {
//         // "name": "morpheus",
//         // "job": "leader"
//         "name": "morpheus",
//         "job": "zion resident"
//     };
//     let json_text = JSON.stringify(date);

//     xhr = new XMLHttpRequest();
//     xhr.onreadystatechange = function() {
//             if (xhr.readyState !== 4) return;

//             if (xhr.status === 200) {
//                 let res = JSON.parse(xhr.responseText);
//                 console.log(res);
//             }
//             else {
//                 // リクエストのレスポンスコードが 200以外(OKではない) 
//                 console.log('HTTP error', xhr.status, xhr.statusText);
//             }
//     };
    
//     // xhr.onload = function() {
//     //     let res = xhr.responseText;
//     //     if (res.length>0) alert(res);
//     // };
//     // xhr.onerror = function() {
//     //     alert("error!");
//     // }
//     xhr.open('PUT', 'https://reqres.in/api/users/' + num );
//     xhr.setRequestHeader('Content-Type', 'application/json')
//     xhr.send(json_text);

// }