"use strict";

///////////////////////////////////
//ASSIGNMENT 1
///////////////////////////////////

//Select elements - YEU CAU 1.1
const submitBtn = document.getElementById("submit-btn");
const healthyBtn = document.getElementById("healthy-btn");
const calcBtn = document.getElementById("calculate-btn");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const tableBodyEl = document.getElementById("tbody");

let petArr = JSON.parse(getFromStorage("petArrStore")); //lấy dữ liệu có sẵn từ Local Storage và chuyển đổi thành dạng Array - ASM2////////////////////////////////////////
let healthyCheck = false; //trang thai cua btn de hien thi all hoac healthy pet
let healthyPetArr = []; //array chua healthy pet
let idCheck; //bien chua gia tri id moi nhap vao

//Xoa cac cot co san trong table ds Peto file html
tableBodyEl.innerHTML = "";

//xử lý trường hợp Local Storage không có dữ liệu của petArrStore - kết quả quả về là null
//ASM2//////////////////////////////////////////////////////////////////////////////////
if (petArr === null) petArr = [];

//phục hồi petArr[i].date từ kiểu string sang kiểu date (object), là trường hợp đặc biệt khi lưu trữ vào Local Storage- ASM2/////////////////////////////////////////////////////////////////////////////
petArr.forEach((pet) => (pet.date = new Date(pet.date)));

//hiển thị data đã được lưu trong Local Storage- ASM2/////////////////////////////////////
showPet();

//Them 1 hang thong tin ve Pet - YEU CAU 1.5
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

//ham tao noi dung cho 1 row - YEU CAU 1.5
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

      <td>

          <button type="button" class="btn btn-danger btn-delete"

          id="btn-delete" data-id="${row.id}">Delete</button>

      </td>
  `;
}

//Xoa du lieu vua nhap tren Form - YEU CAU 1.6
function resetForm() {
  idInput.value = "";
  nameInput.value = "";
  ageInput.value = "";
  typeInput.value = "Select Type";
  weightInput.value = "";
  lengthInput.value = "";
  colorInput.value = "#000000";
  breedInput.value = "Select Breed";
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
}

//ham dieu kien de loc cac phan tu thu cung khoe manh - YEU CAU 3
function healthyPetCheck(pet) {
  if (pet.vaccinated && pet.dewormed && pet.sterilized) return pet;
}

//ham hien thi danh sach thu cung la All pet hoac Healthy Pet tuy theo btn hien tai - YEU CAU 3
function showPet() {
  healthyPetArr = petArr.filter(healthyPetCheck); //Loc ds thu cung healthy tu petArr va them vao array healthyPetArr

  //hien thi
  if (healthyCheck) {
    healthyBtn.textContent = "Show All Pet";
    renderTableData(healthyPetArr);
  } else {
    healthyBtn.textContent = "Show Healthy Pet";
    renderTableData(petArr);
  }
}

// SU KIEN BAM VAO NUT SUBMIT - YEU CAU 1.1
submitBtn.addEventListener("click", function () {
  //lay du lieu tu cac input form tao thanh 1 Object - YEU CAU 1.2
  const data = {
    id: idInput.value,
    name: nameInput.value,
    age: ageInput.value,
    type: typeInput.value,
    weight: weightInput.value,
    length: lengthInput.value,
    color: colorInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked, //thuoc tinh checked tra ve gia tri boolean trang thai checkbox da duoc checked hay chua
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    date: new Date(), // new Date() -JS Date Object.Tao ra 1 text string hien thi ngay gio hien tai cua may tinh
  };

  //Validate - Du lieu hop le - YEU CAU 1.3
  let idPet = true; // idPet lan dau tien se la True, sang lan thu 2 se kiem tra id co trung lap khong de gan gia tri moi
  let namePet = false;
  let agePet = false;
  let typePet = false;
  let weightPet = false;
  let lengthPet = false;
  let breedPet = false;

  //lay id cua data moi nhap vao de kiem tra
  idCheck = Number(data.id);

  //Kiem tra VALIDATE va thong bao - YEU CAU 1.3
  if (data.id === "") {
    idPet = false;
    alert("Please fill in Pet ID!");
  } else {
    //Kiem tra xem id moi nhap vao co bi trung lap voi id cu khong
    for (let i = 0; i < petArr.length; i++) {
      if (Number(petArr[i].id) === idCheck) {
        alert("ID must unique!");
        idPet = false;
        break;
      } else idPet = true;
    }
  }

  if (data.name === "") alert("Please fill in Pet Name!");
  else namePet = true;

  if (data.age === "") alert("Please fill in Age!");
  else if (Number(data.age) < 1 || Number(data.age) > 15)
    alert("Age must be between 1 and 15!");
  else agePet = true;

  if (data.type === "Select Type") alert("Please select Type!");
  else typePet = true;

  if (data.weight === "") alert("Please fill in Weight!");
  else if (Number(data.weight) < 1 || Number(data.weight) > 15)
    alert("Weight must be between 1 and 15!");
  else weightPet = true;

  if (data.length === "") alert("Please fill in Length!");
  else if (Number(data.length) < 1 || Number(data.length) > 100)
    alert("Length must be between 1 and 100!");
  else lengthPet = true;

  if (data.breed === "Select Breed") alert("Please select Breed!");
  else breedPet = true;

  //Bien kiem tra du lieu la Validate - YEU CAU 1.4
  const validated =
    idPet && namePet && agePet && typePet && weightPet && lengthPet && breedPet;

  //them thu cung vao Pet Array - YEU CAU 1.4
  if (validated) {
    //Cap nhat du lieu thu cung tu Object data sang mang petArr
    //petArr la mang co phan tu la Object data
    petArr.push(data);

    //lưu mảng vào LocalStorage -- ASM2////////////////////////////////////////////////
    saveToStorage("petArrStore", JSON.stringify(petArr));

    // hien thi danh sach pet theo trang thai btn show healthy pet hoac show all pet
    showPet();

    //Xoa du lieu nhap tren form
    resetForm();
  }
});

//SU KIEN KHI BAM VAO TABLEBODY - NUT DELETE - YEU CAU 2
tableBodyEl.addEventListener("click", function (e) {
  if (e.target.id != "btn-delete") return;
  const petId = e.target.getAttribute("data-id");
  if (!petId) return;
  const isConfirm = confirm("Are you sure?");
  if (!isConfirm) return;

  //remove
  petArr.splice(
    petArr.findIndex((pet) => pet.id == petId),
    1
  );

  // cập nhật petArr vào Local Storage-- ASM2/////////////////////////////////////////////
  saveToStorage("petArrStore", JSON.stringify(petArr));

  //reload
  showPet();
});

//SU KIEN KHI BAM VAO NUT SHOW HEALTHY PET/ SHOW ALL PET - YEU CAU 3
healthyBtn.addEventListener("click", function () {
  healthyCheck = !healthyCheck;

  // hien thi danh sach pet theo trang thai btn show healthy pet hoac show all pet
  showPet();
});

////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
//ASSIGNMENT 2
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////

const sidebarHeader = document.querySelector(".sidebar-header");
// const typeSelectInput = document.getElementById("input-type");
// const breedInputOption = document.getElementById("input-breed");
let dogBreedArr = [];
let catBreedArr = [];

let breedArr = JSON.parse(getFromStorage("breedArrStore")); //lấy dữ liệu Breed có sẵn từ Local Storage và chuyển đổi thành dạng Array

//xử lý trường hợp Breed trong Local Storage không có dữ liệu của petArrStore - kết quả quả về là null
if (breedArr === null) breedArr = [];

//YÊU CẦU 1 - BỔ SUNG ANIMATION CHO SIDEBAR
sidebarHeader.addEventListener("click", () =>
  sidebarHeader.parentElement.classList.toggle("active")
);

//YÊU CẦU 2 - LƯU DỮ LIỆU LƯỚI LOCALSTORAGE

//hàm lưu trữ data vào Local Storage
function saveToStorage(key, value) {
  localStorage.setItem(key, value);
}

//hàm lấy dữ data từ Local Storage
function getFromStorage(key) {
  return localStorage.getItem(key);
}

//YÊU CẦU 4- HIỂN THỊ BREED TRONG QUẢN LÝ THÚ CƯNG

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
    //tạo 1 option có value là Select Type
    renderSelectType();
  }
});
