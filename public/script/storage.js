const importBtn = document.getElementById("import-btn");
let petArr = JSON.parse(getFromStorage("petArrStore")); //lấy dữ liệu có sẵn từ Local Storage và chuyển đổi thành dạng Array

//xử lý trường hợp Local Storage không có dữ liệu của petArrStore - kết quả quả về là null
if (petArr === null) petArr = [];

//hàm lưu trữ data vào Local Storage
function saveToStorage(key, value) {
  localStorage.setItem(key, value);
}

//hàm lấy dữ data từ Local Storage
function getFromStorage(key) {
  return localStorage.getItem(key);
}

//////////////////////////////////////////////////////////////////////////////////
// SỰ KIỆN IMPORT DATA
//////////////////////////////////////////////////////////////////////////////////
importBtn.addEventListener("click", function () {
  //   gán file vừa import vào biến petArrFile
  let petArrFile = document.getElementById("input-file").files[0];
  console.log(petArrFile);
  //nếu file đã được import (petArrFile có giá trị)
  if (petArrFile) {
    //đọc dữ liệu petArrFile
    let petArrReader = new FileReader();
    petArrReader.readAsText(petArrFile, "UTF-8");
    petArrReader.onload = function (reader) {
      //TRƯỜNG HỢP ĐỌC ĐƯỢC petArrFile VỪA IMPORT
      //  reader.target.result có dạng string
      const petStrImportData = reader.target.result;

      ////////////////////////////////////////////////////////////////////////////////
      //XỬ LÝ: những dữ liệu thú cưng trùng ID với thú cưng có sẵn thì ghi đè giá trị
      ////////////////////////////////////////////////////////////////////////////////

      //Chuyển petArrImportData từ string thành array để xử lý data
      const petArrImportData = JSON.parse(petStrImportData);

      //Xóa phần tử phía trc có cùng id với phần tử phía sau (ghi đè)
      const petArrNew = petArr.concat(petArrImportData);
      petArrNew.forEach(function (pet, i) {
        for (let j = 0; j < petArrNew.length; j++) {
          //nếu có 2 phần tử có trùng id
          if (j !== i && petArrNew[j].id === pet.id) {
            //ghi đè kết quả lên phần tử phía trước
            //không dùng phần tử pet thì forEach không làm thay đổi giá trị mảng ban đầu
            petArrNew[i] = petArrNew[j];
            //xóa phần tử sau
            petArrNew.splice(j, 1);
          }
        }
      });
      ////////////////////////////////////////////////////////////////////////////////

      //CẬP NHẬT giá trị petArr mới
      petArr = petArrNew;
      //   LƯU DATA THÚ CƯNG ĐÃ XỬ LÝ VÀO LOCAL STORAGE
      saveToStorage("petArrStore", JSON.stringify(petArr));
    };
    petArrReader.onerror = function (reader) {
      alert("Error reading file!");
    };
    alert("Success!");
  } else alert("Please select the file!");
});
