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
    //write those value in UI
    const tableEl = document.getElementById("courierDataTable");

    const finalData = courierDataArr
      .map((courierData) => {
        const newTrTemplate = `

  <tr>
  <td class="px-2 py-1 border">${courierData.name}</td>
  <td class="px-2 py-1 border">${courierData.mobile}</td>
  <td class="px-2 py-1 border">${courierData["pickup-date"]}</td>
   <td class="px-2 py-1 border">${courierData["pickup-area"]}</td>
  <td class="px-2 py-1 border">
                <button
                  type="button"
                  class="px-2 py-1 rounded bg-red-500 hover:bg-red-600 text-white text-sm"
                >
                  Delete
                </button>
              </td>
  </tr>
  `;

        return newTrTemplate;
      })
      .join(" ");

    tableEl.innerHTML += finalData;
  } else {
    console.log("No Value Available on localStorage");
  }
}

getAllCourierDatas();
