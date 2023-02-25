"use strict";

const sidebarHeader = document.querySelector(".sidebar-header");
// const breedInputOption = document.getElementById("input-breed");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const typeInput = document.getElementById("input-type");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const findBtn = document.getElementById("find-btn");
const tableBodyEl = document.getElementById("tbody");

//YÊU CẦU 1 - BỔ SUNG ANIMATION CHO SIDEBAR
sidebarHeader.addEventListener("click", () =>
  sidebarHeader.parentElement.classList.toggle("active")
);

////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
//HIỂN THỊ ĐẦY ĐỦ CÁC GIÁ TRỊ BREED
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
let breedArr = JSON.parse(getFromStorage("breedArrStore")); //lấy dữ liệu Breed có sẵn từ Local Storage và chuyển đổi thành dạng Array

//xử lý trường hợp Breed trong Local Storage không có dữ liệu của breedArrStore - kết quả quả về là null
if (breedArr === null) breedArr = [];

//hàm lưu trữ data vào Local Storage
function saveToStorage(key, value) {
  localStorage.setItem(key, value);
}

//hàm lấy dữ data từ Local Storage
function getFromStorage(key) {
  return localStorage.getItem(key);
}

//hàm tạo ra các option trong newBreedsAll
function renderBreedAll(breeds) {
  //xóa các options hiện tại
  breedInput.innerHTML = "";

  breeds.forEach((breed) => {
    //tạo 1 new option element
    const option = document.createElement("option");
    option.innerHTML = genOptionBreed(breed);
    breedInput.appendChild(option);
  });
}

//hàm tạo ndung cho 1 option
function genOptionBreed(breed) {
  return `${breed}`;
}

//Tạo 1 mảng là các giá trị của breed (bao gồm cả phần tử trùng)
const breedsAll = [];
breedArr.forEach((breed) => breedsAll.push(breed.breed));

//Tạo 1 mảng là các giá trị của breed đã loại ra các phần tử trùng lặp
const newBreedsAll = breedsAll.reduce(
  function (newBreed, breed) {
    if (newBreed.indexOf(breed) < 0) newBreed.push(breed);
    return newBreed;
  },
  ["Select Breed"]
);

////////////////////////////////////////////////////////////////////////////////////
//CHỨC NĂNG HIỂN THỊ BREED TƯƠNG ỨNG THEO OPTION
////////////////////////////////////////////////////////////////////////////////////
let dogBreedArr = [];
let catBreedArr = [];
// HIỂN THỊ ĐẦY ĐỦ CÁC GIÁ TRỊ BREED
renderBreedAll(newBreedsAll);

// thêm 2 object có breed: Select Breed cho mỗi Type property: dog và cat
//để Opt đầu tiên của Breed trong Quản lý thú cưng luôn là Select Breed
const dogObjAdder = {
  breed: "Select Breed",
  type: "Dog",
};
const catObjAdder = {
  breed: "Select Breed",
  type: "Cat",
};
breedArr.unshift(dogObjAdder);
breedArr.unshift(catObjAdder);
//////////////////////////////////////////

//hàm tạo ra các option trong Breed Type
function renderBreed(breeds) {
  //xóa các options hiện tại
  breedInput.innerHTML = "";

  breeds.forEach((breed) => {
    //tạo 1 new option element
    const option = document.createElement("option");
    option.innerHTML = genOption(breed);
    breedInput.appendChild(option);
  });
}

//hàm tạo ndung cho 1 option
function genOption(breed) {
  // return `<option>${breed.breed}</option>`;
  return `${breed.breed}`;
}

//hàm tạo opntion mặc định là Select Breed
function renderSelectType() {
  //xóa các options hiện tại
  breedInput.innerHTML = "";
  const option = document.createElement("option");
  option.innerHTML = "Select Breed";
  breedInput.appendChild(option);
}

//sự kiện chọn giá trị Type - loại thú cưng
typeInput.addEventListener("change", function () {
  const selectValue = typeInput.value;
  if (selectValue === "Dog") {
    dogBreedArr = breedArr.filter((dogBr) => dogBr.type === "Dog");
    // hiển thị các dog's breed options
    renderBreed(dogBreedArr);
  } else if (selectValue === "Cat") {
    catBreedArr = breedArr.filter((catBr) => catBr.type === "Cat");

    // hiển thị các dog's breed options
    renderBreed(catBreedArr);
  } else {
    //hiển thị đầy đủ các Breed
    renderBreedAll(newBreedsAll);
  }
});

////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
//CHỨC NĂNG TÌM KIẾM
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
let vaccinatedArr = [];
let dewormedArr = [];
let sterilizedArr = [];
let vaccinatedDewormedArr = [];
let vaccinatedSterilizedArr = [];
let dewormedSterilizedArr = [];
let healthyPetArr = [];

let petArr = JSON.parse(getFromStorage("petArrStore")); //lấy dữ liệu có sẵn từ Local Storage và chuyển đổi thành dạng Array

//xử lý trường hợp Local Storage không có dữ liệu của petArrStore - kết quả quả về là null
if (petArr === null) petArr = [];

//phục hồi petArr[i].date từ kiểu string sang kiểu date (object), là trường hợp đặc biệt khi lưu trữ vào Local Storage
petArr.forEach((pet) => (pet.date = new Date(pet.date)));

//Them 1 hang thong tin ve Pet
function renderTableData(pets) {
  tableBodyEl.innerHTML = "";

  //tao 1 hang thong tin pet
  pets.forEach((pet) => {
    const row = document.createElement("tr"); //tao 1 new row

    //tao noi dung cho row
    row.innerHTML = genRow(pet);
    tableBodyEl.appendChild(row); //hien thi new row
  });
}

//ham tao noi dung cho 1 row
function genRow(row) {
  return `

      <th scope="row">${row.id}</th>

      <td>${row.name}</td>

      <td>${row.age}</td>

      <td>${row.type}</td>

      <td>${row.weight} kg</td>

      <td>${row.length} cm</td>

      <td>${row.breed}</td>

      <td>

          <i class="bi bi-square-fill" style="color: ${row.color}"></i> 

      </td>

      <td>
      <i class="bi ${
        row.vaccinated ? "bi-check-circle-fill" : "bi bi-x-circle-fill"
      } "></i>
      </td>

      <td>
      <i class="bi ${
        row.dewormed ? "bi-check-circle-fill" : "bi bi-x-circle-fill"
      } "></i>
      </td>

      <td>
      <i class="bi ${
        row.sterilized ? "bi-check-circle-fill" : "bi bi-x-circle-fill"
      } "></i>
      </td>

      <td>${row.date.getDate()} / ${
    row.date.getMonth() + 1
  } / ${row.date.getFullYear()}</td>
  `;
}

//SỰ KIẾN BẤM VÀO NÚT FIND
findBtn.addEventListener("click", function () {
  let result = [];

  //xử lý Điều kiện trường Type
  let typeInputValue;
  if (typeInput.value === "Select Type") typeInputValue = "";
  else typeInputValue = typeInput.value;

  //xử lý Điều kiện trường Breed
  let breedInputValue;
  if (breedInput.value === "Select Breed") breedInputValue = "";
  else breedInputValue = breedInput.value;

  petArr.forEach(function (pet) {
    if (
      pet.id.includes(idInput.value) &&
      pet.name.includes(nameInput.value) &&
      pet.type.includes(typeInputValue) &&
      pet.breed.includes(breedInputValue) &&
      String(pet.vaccinated).includes(String(vaccinatedInput.checked)) &&
      String(pet.dewormed).includes(String(dewormedInput.checked)) &&
      String(pet.sterilized).includes(String(sterilizedInput.checked))
    ) {
      result.push(pet);
    }
  });

  renderTableData(result);
});
