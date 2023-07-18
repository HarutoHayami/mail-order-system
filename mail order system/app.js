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
    generate_table(obj_json)
}

    
/* APIにアクセスしJSONオブジェクトを取得 */
function get_all_items() {
    fetch(api_getAllItems, { method: "GET" })
    .then(response => response.json())
    .then(json => set_table(json));
}

// Table作成
function generate_table(obj_json) {

    // 既存のtbodyを削除
    let table_del = document.getElementById("tbl_body");
    if (table_del) {
      if (table_del.parentNode) {
        table_del.parentNode.removeChild(table_del);
      }
    }

    // body の参照を取得
    let body = document.getElementsByClassName("table-container")[0];

    // <table> 要素と <tbody> 要素を作成
    tbl = document.getElementById("table_id");
    tblBody = document.createElement("tbody");
    tblBody.setAttribute("id","tbl_body");

    // JSON 要素配列
    let json_element = ["ID","name","category","manufacturer","price","image_path","stock","description","created_at","updated_at"]
  
    let len = Object.keys(obj_json).length;

    // すべてのセルを作成
    for (let i = 0; i < len; i++) {
        // 表の行を作成
        let row = document.createElement("tr");

        // table data
            for (let j = 0; j < 10; j++) {
                // <td> 要素とテキストノードを作成し、テキストノードを
                // <td> の内容として、その <td> を表の行の末尾に追加
                let cell = document.createElement("td");
                let cellText = obj_json[i][json_element[j]];
                let cellInput = cell.appendChild(document.createElement("input"));
                cellInput.setAttribute("value",cellText);
                row.appendChild(cell);

            // 表の本体の末尾に行を追加
            tblBody.appendChild(row);
        }

        // btn
        let btn_update = document.createElement("td");
        let btn_delete = document.createElement("td");
            
        let btnui = btn_update.appendChild(document.createElement("input"));
        let btndi = btn_delete.appendChild(document.createElement("input"));
        btnui.setAttribute("type","button");
        btndi.setAttribute("type","button");
        btnui.setAttribute("value","更新");
        btndi.setAttribute("value","削除");
        row.appendChild(btn_update);
        row.appendChild(btn_delete);

        // 表の本体の末尾に行を追加
        tblBody.appendChild(row);

    }
  
    // <tbody> を <table> の中に追加
    tbl.appendChild(tblBody);
    // <table> を <body> の中に追加
    body.appendChild(tbl);

}

/* add item */
function add_item() {
    let add_name = document.getElementById('add_name');
    let add_category = document.getElementById('add_category');
    let add_manufacturer = document.getElementById('add_manufacturer');
    let add_price = document.getElementById('add_price');
    let add_image_path = document.getElementById('add_image_path');
    let add_description = document.getElementById('add_description');
    let add_stock = document.getElementById('add_stock');

    let add_data = {
        "name": add_name.value,
        "category": add_category.value, 
        "manufacturer": add_manufacturer.value, 
        "image_path": add_image_path.value,
        "price": add_price.value, 
        "stock": add_stock.value,
        "description": add_description.value
    }

    fetch(api_addItem,{ method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(add_data)
        }).then(response => response.json())
        .then(json => set_text(json));
}

/* db reset*/
function reset_item_db() {
    fetch(api_resetItemDB,{ method: "PUT",
        headers: { "Content-Type": "application/json" },
        });
}

/* delete all*/
function delete_all_items() {
    fetch(api_deleteAllItems,{ method: "DELETE",
        headers: { "Content-Type": "application/json" },
        });
}


/* JSONオブジェクトを  テーブル表示 */
function set_table2(json) {
    let obj_json = JSON.parse(JSON.stringify(json));
    generate_table2(obj_json)
}

    
/* SHOP */
function buy_item() {
    fetch(api_getAllItems, { method: "GET" })
    .then(response => response.json())
    .then(json => set_table2(json));
}

// SHOP
function generate_table2(obj_json) {

    // 既存のtbodyを削除
    let table_del = document.getElementById("tbl_body");
    if (table_del) {
      if (table_del.parentNode) {
        table_del.parentNode.removeChild(table_del);
      }
    }

    // body の参照を取得
    let body = document.getElementsByClassName("table-container")[0];

    // <table> 要素と <tbody> 要素を作成
    tbl = document.getElementById("table_id");
    tblBody = document.createElement("tbody");
    tblBody.setAttribute("id","tbl_body");

    // JSON 要素配列
    let json_element = ["ID","name","category","manufacturer","price","image_path","stock","description","created_at","updated_at"]
  
    let len = Object.keys(obj_json).length;

    // すべてのセルを作成
    for (let i = 0; i < len; i++) {
        // 表の行を作成
        let row = document.createElement("tr");

        // table data
            for (let j = 0; j < 10; j++) {
                // <td> 要素とテキストノードを作成し、テキストノードを
                // <td> の内容として、その <td> を表の行の末尾に追加
                let cell = document.createElement("td");
                let cellText = document.createTextNode(obj_json[i][json_element[j]]);
                cell.appendChild(cellText)
                row.appendChild(cell);

            // 表の本体の末尾に行を追加
            tblBody.appendChild(row);
        }
        // btn
        let btn_buy = document.createElement("td");
        let btnbi = btn_buy.appendChild(document.createElement("input"));
        btnbi.setAttribute("type","button");
        btnbi.setAttribute("value","購入");
        row.appendChild(btn_buy);

        // 表の本体の末尾に行を追加
        tblBody.appendChild(row);
    }
  
    // <tbody> を <table> の中に追加
    tbl.appendChild(tblBody);
    // <table> を <body> の中に追加
    body.appendChild(tbl);

}