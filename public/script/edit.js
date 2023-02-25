"use strict";

const sidebarHeader = document.querySelector(".sidebar-header");
const tableBodyEl = document.getElementById("tbody");
const containerFormEl = document.getElementById("container-form");

const submitBtn = document.getElementById("submit-btn");
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

let petArr = JSON.parse(getFromStorage("petArrStore")); //lấy dữ liệu có sẵn từ Local Storage và chuyển đổi thành dạng Array

let petId; //biến petID dùng để edit và submit pet Object trong petArr hiện tại

//xử lý trường hợp Local Storage không có dữ liệu của petArrStore - kết quả quả về là null
if (petArr === null) petArr = [];

//phục hồi petArr[i].date từ kiểu string sang kiểu date (object), là trường hợp đặc biệt khi lưu trữ vào Local Storage
petArr.forEach((pet) => (pet.date = new Date(pet.date)));

////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
//HIỂN THỊ DATA VỀ THÚ CƯNG ĐÃ ĐƯỢC LƯU TRONG LOCAL STORAGE
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
renderTableData(petArr);

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
  
            <button type="button" class="btn btn-warning btn-edit"
  
            id="btn-edit" data-id="${row.id}">Edit</button>
  
        </td>
    `;
}

//hàm lưu trữ data vào Local Storage
function saveToStorage(key, value) {
  localStorage.setItem(key, value);
}

//hàm lấy dữ data từ Local Storage
function getFromStorage(key) {
  return localStorage.getItem(key);
}
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////

//BỔ SUNG ANIMATION CHO SIDEBAR
sidebarHeader.addEventListener("click", () =>
  sidebarHeader.parentElement.classList.toggle("active")
);

////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
//SU KIEN KHI BAM VAO TABLEBODY - NUT EDIT
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////

//SU KIEN KHI BAM VAO NUT EDIT
tableBodyEl.addEventListener("click", function (e) {
  if (e.target.id != "btn-edit") return;
  petId = e.target.getAttribute("data-id");
  if (!petId) return;

  //hiển thị form thông tin
  containerFormEl.classList.remove("hide");
  petArr.forEach(function (pet) {
    if (pet.id === petId) {
      // hiển thị thông tin pet muốn edit lên form
      idInput.value = pet.id;
      nameInput.value = pet.name;
      ageInput.value = pet.age;
      typeInput.value = pet.type;
      weightInput.value = pet.weight;
      lengthInput.value = pet.length;
      colorInput.value = pet.color;

      //nếu không tạo các breed options thì trường Breed sẽ bị trống
      breedOptions(pet.type);
      breedInput.value = pet.breed;
      vaccinatedInput.checked = pet.vaccinated;
      dewormedInput.checked = pet.dewormed;
      sterilizedInput.checked = pet.sterilized;
    }
  });
});

////////////////////////////////////////////////////////////////////////////////////
//LẤY THÔNG TIN VỀ BREED TRONG LOCAL STROGAGE
////////////////////////////////////////////////////////////////////////////////////
const typeSelectInput = document.getElementById("input-type");
const breedInputOption = document.getElementById("input-breed");
let dogBreedArr = [];
let catBreedArr = [];

let breedArr = JSON.parse(getFromStorage("breedArrStore")); //lấy dữ liệu Breed có sẵn từ Local Storage và chuyển đổi thành dạng Array

//xử lý trường hợp Breed trong Local Storage không có dữ liệu của petArrStore - kết quả quả về là null
if (breedArr === null) breedArr = [];

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
  breedInputOption.innerHTML = "";

  breeds.forEach((breed) => {
    //tạo 1 new option element
    const option = document.createElement("option");
    option.innerHTML = genOption(breed);
    breedInputOption.appendChild(option);
  });
}

//hàm tạo ndung cho 1 option
function genOption(breed) {
  //   return `<option>${breed.breed}</option>`;
  return `${breed.breed}`;
}

//hàm tạo option mặc định là Select Breed
function renderSelectType() {
  //xóa các options hiện tại
  breedInputOption.innerHTML = "";
  const option = document.createElement("option");
  option.innerHTML = "Select Breed";
  breedInputOption.appendChild(option);
}

//hàm hiển thị các option breed tương ứng với type đã chọn
function breedOptions(type) {
  if (type === "Dog") {
    dogBreedArr = breedArr.filter((dogBr) => dogBr.type === "Dog");
    // hiển thị các dog's breed options
    renderBreed(dogBreedArr);
  } else if (type === "Cat") {
    catBreedArr = breedArr.filter((catBr) => catBr.type === "Cat");

    // hiển thị các dog's breed options
    renderBreed(catBreedArr);
  } else {
    //tạo 1 option có value là Select Type
    renderSelectType();
  }
}
//sự kiện chọn giá trị Type - loại thú cưng
typeSelectInput.addEventListener("change", function () {
  const selectValue = typeSelectInput.value;
  breedOptions(selectValue);
});

////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
//SU KIEN KHI BAM VAO NUT SUBMIT
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////

//SỰ KIỆN BẤM VÀO NÚT SUBMIT
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

  //Valid data - Du lieu hop le
  // Không được thay đổi giá trị ID nên không cần check id có bị trùng không
  let namePet = false;
  let agePet = false;
  let typePet = false;
  let weightPet = false;
  let lengthPet = false;
  let breedPet = false;

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
    namePet && agePet && typePet && weightPet && lengthPet && breedPet;
  //them thu cung vao Pet Array - YEU CAU 1.4
  if (validated) {
    // Cap nhat du lieu thu cung tu Object data sang petArr[petId]
    for (let i = 0; i < petArr.length; i++) {
      if (petArr[i].id === petId) {
        petArr[i] = data;
      }
    }

    //cập nhật mảng vào LocalStorage -- ASM2////////////////////////////////////////////////
    saveToStorage("petArrStore", JSON.stringify(petArr));

    // reload
    renderTableData(petArr);

    //ẩn Form
    containerFormEl.classList.add("hide");
  }
});
