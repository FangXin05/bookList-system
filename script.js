//获取
const localData = localStorage.getItem("formData");
const tbody = document.querySelector("#bookList");
const arr = localData ? JSON.parse(localData) : [];
const form = document.querySelector(".form");
const items = document.querySelectorAll("[name]");
render();
//渲染
function render() {
  const trArr = arr.map((item, index) => {
    return `<tr>
        <td>${item.bookName}</td>
        <td>${item.author}</td>
        <td>${item.publisher}</td>
        <td>${item.publicationYear}</td>
        <td>${item.price}</td>
        <td><a href="javascript:" data-id=${index}>删除</a></td>
    </tr>`;
  });
  tbody.innerHTML = trArr.join("");
}

//录入
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const obj = {};
  for (const item of items) {
    obj[item.name] = item.value;
  }
  arr.push(obj);
  localStorage.setItem("formData", JSON.stringify(arr));
  render();
  for (const item of items) {
    item.value = "";
  }
});

//删除
tbody.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    const index = e.target.dataset.id;
    arr.splice(index, 1);
    localStorage.setItem("formData", JSON.stringify(arr));
    render();
  }
});
