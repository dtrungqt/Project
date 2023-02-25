"use strict";
document.writeln(
  "<script type='text/javascript' src = '../lib/FileSaver.js'></script>"
);
const sidebarHeader = document.querySelector(".sidebar-header");
const exportBtn = document.getElementById("export-btn");

let petArrString = getFromStorage("petArrStore"); //lấy dữ liệu có sẵn từ Local Storage và giữ nguyên kiểu String của data

//xử lý trường hợp Local Storage không có dữ liệu của petArrStore - kết quả quả về là null
if (petArrString === null) petArrString = [];

//hàm lưu trữ data vào Local Storage
function saveToStorage(key, value) {
  localStorage.setItem(key, value);
}

//hàm lấy dữ data từ Local Storage
function getFromStorage(key) {
  return localStorage.getItem(key);
}

////////////////////////////////////////////////////////////////////////////////////
//YÊU CẦU 1 - BỔ SUNG ANIMATION CHO SIDEBAR
////////////////////////////////////////////////////////////////////////////////////
sidebarHeader.addEventListener("click", () =>
  sidebarHeader.parentElement.classList.toggle("active")
);

////////////////////////////////////////////////////////////////////////////////////
//SỰ KIỆN EXPORT DATA
////////////////////////////////////////////////////////////////////////////////////
exportBtn.addEventListener("click", function () {
  const petObj = new Blob([petArrString], {
    type: "text/plain;charset=utf-8",
  });
  saveAs(petObj, "petObj.json");
});
