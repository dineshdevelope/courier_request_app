import JustValidate from "just-validate";

const formEl = document.getElementById("courier-request-form");
//console.log(formEl);

const validateForm = new JustValidate(formEl, {
  validateBeforeSubmitting: true,
});

validateForm.addField(
  "#name",
  [
    {
      rule: "required",
    },
    {
      rule: "minLength",
      value: 3,
    },
    {
      rule: "maxLength",
      value: 20,
    },
  ],
  {
    errorLabelCssClass: ["form-error"],
  }
);

validateForm.addField(
  "#mobile",
  [
    {
      rule: "required",
    },
    {
      rule: "number",
    },
    {
      rule: "maxLength",
      value: 10,
    },
    {
      rule: "minLength",
      value: 10,
    },
  ],
  {
    errorLabelCssClass: ["form-error"],
  }
);

validateForm.addField(
  "#pickup-date",
  [
    {
      rule: "required",
    },
  ],
  {
    errorLabelCssClass: ["form-error"],
  }
);

validateForm.addField(
  "#pickup-area",
  [
    {
      rule: "required",
    },
  ],
  {
    errorLabelCssClass: ["form-error"],
  }
);

const localStorageKey = "courierData"; //keyName For Getting And Setting localStorage

//console.log(validateForm);
validateForm.onSuccess(() => {
  const formData = new FormData(formEl);

  const formObj = Object.fromEntries(formData.entries());
  //console.log(formObj);

  const newCourierData = [];

  //Get my existing LocalStorage Value
  const existingCourierData = localStorage.getItem(localStorageKey); //get Local Storage
  const existingCourierArray = JSON.parse(existingCourierData); //string to javascript

  if (existingCourierArray) {
    existingCourierArray.push(formObj);
    //console.log(existingCourierArray);

    //LocalStorage
    localStorage.setItem(localStorageKey, JSON.stringify(existingCourierArray));
  } else {
    newCourierData.push(formObj);
    localStorage.setItem(localStorageKey, JSON.stringify(newCourierData));
  }
  alert("Courier Request Submitted Successfully...!");
  formEl.reset();
});

function getAllCourierDatas() {
  // Get All Stored Courier datas which are available in localStorage
  const courierData = localStorage.getItem(localStorageKey);

  const courierDataArr = JSON.parse(courierData);
  //console.log(courierDataArr);

  if (courierDataArr) {
    const courierCardEl = document.getElementById("courierCard");
    courierCardEl.classList.remove("hidden");

    //write those value in UI
    const tableEl = document.getElementById("courierDataTable");

    const newFinalValue = [];

    courierDataArr.map((courierData) => {
      const trE1 = document.createElement("tr");
      const tdE1 = document.createElement("td");
      const tdE2 = document.createElement("td");
      const tdE3 = document.createElement("td");
      const tdE4 = document.createElement("td");
      const tdE5 = document.createElement("td");
      const deleteBtnEl = document.createElement("button");

      tdE1.classList.add("px-2", "py-1", "border");
      tdE1.textContent = courierData.name;

      tdE2.classList.add("px-2", "py-1", "border");
      tdE2.textContent = courierData.mobile;

      tdE3.classList.add("px-2", "py-1", "border");
      tdE3.textContent = courierData["pickup-date"];

      tdE4.classList.add("px-2", "py-1", "border");
      tdE4.textContent = courierData["pickup-area"];

      deleteBtnEl.className =
        "px-2 py-1 rounded bg-red-500 hover:bg-red-600 text-white text-sm";

      deleteBtnEl.textContent = "Delete";

      tdE5.classList.add("px-2", "py-1", "border");
      tdE5.append(deleteBtnEl);

      trE1.append(tdE1, tdE2, tdE3, tdE4, tdE5);

      newFinalValue.push(trE1);
    });

    newFinalValue.forEach((el) => tableEl.append(el));
  } else {
    console.log("No Value Available on localStorage");
  }
}

getAllCourierDatas();
