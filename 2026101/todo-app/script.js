// ========================================
// TODOデータ
// ========================================

// LocalStorageからTODOを読み込む
let todos = JSON.parse(
  localStorage.getItem("todos")
) || [];


// ========================================
// HTML要素取得
// ========================================

const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-title");
const todoList = document.getElementById("todo-list");


// ========================================
// LocalStorageに保存
// ========================================

function saveTodos() {

  localStorage.setItem(
    "todos",
    JSON.stringify(todos)
  );

}


// ========================================
// TODO一覧を表示
// ========================================

function renderTodos() {

  // 一度リストを空にする
  todoList.innerHTML = "";


  // TODOが0件の場合
  if (todos.length === 0) {

    const emptyMessage =
      document.createElement("li");

    emptyMessage.className =
      "list-group-item text-center text-muted py-3";

    emptyMessage.textContent =
      "TODOはまだありません";

    todoList.appendChild(emptyMessage);

    return;
  }


  // TODOを1件ずつ表示
  todos.forEach(todo => {

    const li = document.createElement("li");

    li.className =
      "list-group-item d-flex justify-content-between align-items-center py-3 todo-item";


    // ------------------------
    // 左側
    // ------------------------

    const leftArea =
      document.createElement("div");

    leftArea.className = "form-check";


    // チェックボックス
    const checkbox =
      document.createElement("input");

    checkbox.type = "checkbox";

    checkbox.className =
      "form-check-input";

    checkbox.checked =
      todo.completed;


    // タイトル
    const label =
      document.createElement("label");

    label.className =
      "form-check-label todo-title ms-2";

    label.textContent =
      todo.title;


    // 完了済みなら線を引く
    if (todo.completed) {

      label.classList.add(
        "completed"
      );

    }


    // ------------------------
    // 完了状態変更
    // ------------------------

    checkbox.addEventListener(
      "change",
      () => {

        todo.completed =
          checkbox.checked;

        saveTodos();

        renderTodos();

      }
    );


    leftArea.appendChild(
      checkbox
    );

    leftArea.appendChild(
      label
    );


    // ------------------------
    // 削除ボタン
    // ------------------------

    const deleteButton =
      document.createElement("button");

    deleteButton.className =
      "btn btn-sm btn-outline-danger delete-btn";

    deleteButton.textContent =
      "削除";


    deleteButton.addEventListener(
      "click",
      () => {

        const result =
          confirm(
            "このTODOを削除しますか？"
          );


        if (!result) {
          return;
        }


        // 対象TODOを削除
        todos = todos.filter(
          item => item.id !== todo.id
        );


        saveTodos();

        renderTodos();

      }
    );


    // ------------------------
    // HTMLに追加
    // ------------------------

    li.appendChild(
      leftArea
    );

    li.appendChild(
      deleteButton
    );

    todoList.appendChild(
      li
    );

  });

}


// ========================================
// TODO追加
// ========================================

todoForm.addEventListener(
  "submit",
  event => {

    // ページ更新を防ぐ
    event.preventDefault();


    // 入力内容取得
    const title =
      todoInput.value.trim();


    // 空欄なら追加しない
    if (title === "") {
      return;
    }


    // 新しいTODO
    const newTodo = {

      id: Date.now(),

      title: title,

      completed: false

    };


    // 配列に追加
    todos.push(
      newTodo
    );


    // 保存
    saveTodos();


    // 再表示
    renderTodos();


    // 入力欄を空にする
    todoInput.value = "";


    // 入力欄にカーソルを戻す
    todoInput.focus();

  }
);


// ========================================
// 最初の画面表示
// ========================================

renderTodos();