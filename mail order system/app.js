/*
 管理者用画面
*/


/* url value */
let api_getAllItems    = "http://192.168.11.2:5001/api/getAllItems";  // GET
let api_addItem        = "http://192.168.11.2:5001/api/addItem";      // POST
let api_deleteItem     = "http://192.168.11.2:5001/api/deleteItem";   // DELETE
let api_deleteAllItems = "http://192.168.11.2:5001/deleteAllItems";   // DELETE
let api_updateItem     = "http://192.168.11.2:5001/api/updateItem";   // PUT
let api_buyItem        = "http://192.168.11.2:5001/api/buyItem";      // GET
let api_resetItemDB    = "http://192.168.11.2:5001/api/resetItemDB";  // PUT

/* JSONオブジェクトを  テーブル表示 */
function set_table(json) {
    let obj_json = JSON.parse(JSON.stringify(json));
    // let obj_json = json_sample
    generate_table(obj_json)
}

    
/* APIにアクセスしJSONオブジェクトを取得 */
function get_all_items() {
    fetch(api_getAllItems, { method: "GET" })
    .then(response => response.json())
    .then(json => set_table(json));
}

/* add item */
function add_item() {
    let add_data = {
        "name": "電気スタンド", 
        "category": "家具", 
        "manufacturer": "エメラルド", 
        "image_path": "/images/stand.jpg",
        "price": 1500, 
        "stock": 5,
        "description": "とても明るい"
    }

    fetch(api_addItem,{ method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(add_data)
        }).then(response => response.json())
        .then(json => set_text(json));
}
/* delete */
function delete_item() {
    fetch(api_deleteItem,{ method: "DELETE",
        }).then(response => response.json());
}

// Table作成
function generate_table(obj_json) {
    // 既存のtableを削除
    let table_del = document.getElementById("table_id");
    if (table_del) {
      if (table_del.parentNode) {
        table_del.parentNode.removeChild(table_del);
      }
    }

    // body の参照を取得
    let body = document.getElementsByClassName("table-container")[0];
    

    // <table> 要素と <tbody> 要素を作成
    tbl = document.createElement("table");
    tbl.setAttribute("id","table_id")
    tblBody = document.createElement("tbody");


    // JSON 要素配列
    let json_element = ["ID","name","category","manufacturer","price","image_path","stock","description","created_at","updated_at"]
  
    let len = Object.keys(obj_json).length;

    // すべてのセルを作成
    for (let i = -1; i < len; i++) {
        // 表の行を作成
        let row = document.createElement("tr");

        // table header
        if (i < 0){
            for (let j = 0; j < 10; j++) {
                let cell = document.createElement("th");
                let cellText = document.createTextNode(json_element[j]);
                cell.appendChild(cellText);
                row.appendChild(cell);
            }
            // 表の本体の末尾に行を追加
            tblBody.appendChild(row);
        }
        // table data
        else if (i >= 0){
            for (let j = 0; j < 10; j++) {
                // <td> 要素とテキストノードを作成し、テキストノードを
                // <td> の内容として、その <td> を表の行の末尾に追加
                let cell = document.createElement("td");
                let cellText = document.createTextNode(obj_json[i][json_element[j]]);
                cell.appendChild(document.createElement("input"));
                cell.setAttribute("value",cellText)
                row.appendChild(cell);
            }
            // 表の本体の末尾に行を追加
            tblBody.appendChild(row);
        }
        // 表の本体の末尾に行を追加
        tblBody.appendChild(row);

    }
  
    // <tbody> を <table> の中に追加
    tbl.appendChild(tblBody);
    // <table> を <body> の中に追加
    body.appendChild(tbl);

}

//offline環境テスト用
json_sample = [
    {
        "ID": 1,
        "name": "フライ返し",
        "category": "調理",
        "manufacturer": "ダイヤモンド",
        "price": 300,
        "image_path": "/images/item01_thumb.jpg",
        "stock": 10,
        "description": "焦げついていても大丈夫",
        "created_at": "2023-06-20 16:04:59.778851",
        "updated_at": "2023-06-20 16:04:59.778867"
    },
    {
        "ID": 2,
        "name": "包丁",
        "category": "調理",
        "manufacturer": "ダイヤモンド",
        "price": 3000,
        "image_path": "/images/item02_thumb.jpg",
        "stock": 5,
        "description": "よく切れる",
        "created_at": "2023-06-20 16:04:59.780814",
        "updated_at": "2023-06-20 16:04:59.780858"
    },
    {
        "ID": 3,
        "name": "やかん",
        "category": "調理",
        "manufacturer": "真珠",
        "price": 1500,
        "image_path": "/images/item03_thumb.jpg",
        "stock": 2,
        "description": null,
        "created_at": "2023-06-20 16:04:59.782000",
        "updated_at": "2023-06-20 16:04:59.782008"
    },
    {
        "ID": 4,
        "name": "電動ドリル",
        "category": "工具",
        "manufacturer": "サファイア",
        "price": 4500,
        "image_path": null,
        "stock": 12,
        "description": null,
        "created_at": "2023-06-20 16:04:59.782527",
        "updated_at": "2023-06-20 16:04:59.782532"
    }
]