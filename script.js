//获取
const localData = localStorage.getItem("formData");
const tbody = document.querySelector("#bookList");
const arr = localData ? JSON.parse(localData) : [];
const form = document.querySelector(".form");
const items = form.querySelectorAll("[name]"); // 仅选择表单内的输入项
const submitBtn = form.querySelector("input[type='submit']");
let editId = null; // 用于记录当前正在编辑的图书ID
const searchBookName = document.querySelector("#searchBookName");
const searchInput = document.querySelector("#searchName");
render();
//渲染
function render(list = arr) {
  const trArr = list.map((item, index) => {
    return `<tr>
        <td>${item.bookName}</td>
        <td>${item.author}</td>
        <td>${item.publisher}</td>
        <td>${item.publicationYear}</td>
        <td>${item.price}</td>
        <td>
          <a href="javascript:" class="edit" data-id="${item.id}">编辑</a>
          <a href="javascript:" class="del" data-id="${item.id}">删除</a>
        </td>
    </tr>`;
  });
  tbody.innerHTML = trArr.join("");
}

//录入与修改
form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (editId) {
    // 修改逻辑
    const index = arr.findIndex((item) => item.id == editId);
    for (const item of items) {
      arr[index][item.name] = item.value;
    }
    editId = null;
    submitBtn.value = "添加图书";
  } else {
    // 新增逻辑
    const obj = {
      id: Date.now(),
    };
    for (const item of items) {
      obj[item.name] = item.value;
    }
    arr.push(obj);
  }

  localStorage.setItem("formData", JSON.stringify(arr));
  render();
  form.reset(); // 使用 reset() 清空表单
});

//删除与编辑
tbody.addEventListener("click", (e) => {
  const id = e.target.dataset.id;
  if (e.target.classList.contains("del")) {
    // 删除
    const index = arr.findIndex((item) => item.id == id);
    arr.splice(index, 1);
    localStorage.setItem("formData", JSON.stringify(arr));
    render();
  } else if (e.target.classList.contains("edit")) {
    // 编辑
    editId = id;
    const book = arr.find((item) => item.id == id);
    // 回填数据
    for (const item of items) {
      item.value = book[item.name];
    }
    submitBtn.value = "保存修改";
  }
});
//查找
let i = 0;
//防抖debounce
let timer;
searchInput.addEventListener("input", function () {
  clearTimeout(timer);
  timer = setTimeout(() => {
    const keyword = this.value.trim();
    search(keyword);
  }, 300); // 等待300ms后再执行搜索
});
function search(keyword) {
  if (keyword === "") {
    render(arr);
    return;
  }
  const newArr = arr.filter((item) => {
    //双向转小写，书名和输入值都转为小写加大搜索效率
    return item.bookName.toLowerCase().includes(keyword.toLowerCase());
  });
  render(newArr);
  i++;
  console.log(i);
}
