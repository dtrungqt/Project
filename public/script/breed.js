"use strict";

//YÊU CẦU 3 - CHỨC NĂNG QUẢN LÝ BREED
//Select elements
const sidebarHeader = document.querySelector(".sidebar-header");
const breedInput = document.getElementById("input-breed");
const typeInput = document.getElementById("input-type");
const submitBtn = document.getElementById("submit-btn");
const tableBodyEl = document.getElementById("tbody");
//khai báo các biến cơ bản
let breedArr = JSON.parse(getFromStorage("breedArrStore")); //lấy dữ liệu có sẵn từ Local Storage và chuyển đổi thành dạng Array
let idValue = 1;
let j = 0;

//xử lý trường hợp Local Storage không có dữ liệu của petArrStore - kết quả quả về là null
if (breedArr === null) breedArr = [];

//hiển thị data đã được lưu trong Local Storage
renderTableData(breedArr);

//YÊU CẦU 1 - BỔ SUNG ANIMATION CHO SIDEBAR
sidebarHeader.addEventListener("click", () =>
  sidebarHeader.parentElement.classList.toggle("active")
);

//Them 1 hang thong tin ve Breed
function renderTableData(breeds) {
  tableBodyEl.innerHTML = "";

  //tao 1 hang thong tin Breed
  breeds.forEach((breed) => {
    const row = document.createElement("tr"); //tao 1 new row

    //tao noi dung cho row
    row.innerHTML = genRow(breed);
    tableBodyEl.appendChild(row); //hien thi new row
  });
}

//ham tao noi dung cho 1 row - YEU CAU 1.5
function genRow(breed) {
  return `
  
        <th scope="row">${breed.id}</th>
  
        <td>${breed.breed}</td>
  
        <td>${breed.type}</td>

        <td>
        <button type="button" class="btn btn-danger btn-delete"

        id="btn-delete" data-id="${breed.id}">Delete</button>
         </td>
    `;
}

// xóa thông tin điền vào
function resetForm() {
  breedInput.value = "";
  typeInput.value = "Select Type";
}

//SỰ KIỆN CLICK VÀO SUBMIT BTN
submitBtn.addEventListener("click", function () {
  const data = {
    id: idValue,
    breed: breedInput.value,
    type: typeInput.value,
  };

  //valid data
  let breed = true;
  let type = false;
  let validData;
  const breedCheck = data.breed;
  const typeCheck = data.type;
  let idCheck = data.id;

  //cập nhật data.id và idCheck mới
  function creatNewID() {
    data.id = idValue;
    idCheck = data.id;
  }
  //kiểm tra để không được nhập trùng breed của cùng 1 loại
  if (data.breed === "") {
    breed = false;
    alert("Please fill in Breed!");
  } else {
    for (let i = 0; i < breedArr.length; i++) {
      if (breedArr[i].breed === breedCheck && breedArr[i].type === typeCheck) {
        alert(`Breed: ${breedCheck}, Type:${typeCheck} already exists!`);
        breed = false;
        break;
      } else breed = true;
    }
  }

  for (j = 0; j < breedArr.length; j++) {
    //gán giá trị id sau luôn lớn hơn id trước để không bị trùng id
    if (idCheck < breedArr[j].id) {
      idValue = breedArr[j].id + 1;
      creatNewID();
    }
    while (breedArr[j].id === idCheck) {
      idValue++;
      creatNewID();
    }
  }

  if (data.type === "Select Type") alert("Please select Type!");
  else type = true;

  validData = breed && type;

  if (validData) {
    idValue++;
    breedArr.push(data);

    //lưu mảng vào LocalStorage
    saveToStorage("breedArrStore", JSON.stringify(breedArr));

    //xóa thông tin điền vào
    resetForm();

    //hiển thị hàng thông tin về breed
    renderTableData(breedArr);
  }
});

//SỰ KIỆN CLICK VÀO DELETE BTN ĐỂ XÓA 1 HÀNG
tableBodyEl.addEventListener("click", function (e) {
  if (e.target.id != "btn-delete") return;
  const breedId = e.target.getAttribute("data-id");
  //   idValue = Number(breedId);
  if (!breedId) return;
  const isConfirm = confirm("Are you sure?");
  if (!isConfirm) return;

  //remove
  breedArr.splice(
    breedArr.findIndex((breed) => breed.id == breedId),
    1
  );

  // cập nhật petArr vào Local Storage
  saveToStorage("breedArrStore", JSON.stringify(breedArr));

  //reload
  renderTableData(breedArr);
});

//HÀM LƯU DỮ LIỆU VÀO LOCAL STORAGE
function saveToStorage(key, value) {
  localStorage.setItem(key, value);
}

//HÀM LẤY DỮ LIỆU TỪ LOCAL STORAGE
function getFromStorage(key) {
  return localStorage.getItem(key);
}
