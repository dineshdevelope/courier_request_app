import JustValidate from "just-validate";
import { formatMyDate } from "./utils";

const formEl = document.getElementById("courier-request-form");
const localStorageKey = "courierData"; // Key name for getting and setting localStorage

const validateForm = new JustValidate(formEl, {
  validateBeforeSubmitting: true,
});

validateForm.addField(
  "#name",
  [
    { rule: "required" },
    { rule: "minLength", value: 3 },
    { rule: "maxLength", value: 20 },
  ],
  { errorLabelCssClass: ["form-error"] }
);

validateForm.addField(
  "#mobile",
  [
    { rule: "required" },
    { rule: "number" },
    { rule: "maxLength", value: 10 },
    { rule: "minLength", value: 10 },
  ],
  { errorLabelCssClass: ["form-error"] }
);

validateForm.addField("#pickup-date", [{ rule: "required" }], {
  errorLabelCssClass: ["form-error"],
});

validateForm.addField("#pickup-area", [{ rule: "required" }], {
  errorLabelCssClass: ["form-error"],
});

validateForm.onSuccess(() => {
  const formData = new FormData(formEl);
  const formObj = Object.fromEntries(formData.entries());
  formObj.id = Date.now(); // Assign a unique ID based on timestamp

  const existingCourierData =
    JSON.parse(localStorage.getItem(localStorageKey)) || [];
  existingCourierData.push(formObj);

  localStorage.setItem(localStorageKey, JSON.stringify(existingCourierData));
  alert("Courier Request Submitted Successfully!");
  formEl.reset();
  getAllCourierDatas(); // Refresh the UI with the new data
});

function getAllCourierDatas() {
  const courierData = localStorage.getItem(localStorageKey);
  const courierDataArr = JSON.parse(courierData);

  const courierCardEl = document.getElementById("courierCard");
  const tableEl = document.getElementById("courierDataTable");

  tableEl.innerHTML = ""; // Clear table to avoid duplicates

  if (courierDataArr && courierDataArr.length > 0) {
    courierCardEl.classList.remove("hidden");

    courierDataArr.forEach((courierData) => {
      const trEl = document.createElement("tr");

      const tdName = document.createElement("td");
      tdName.classList.add("px-2", "py-1", "border");
      tdName.textContent = courierData.name;

      const tdMobile = document.createElement("td");
      tdMobile.classList.add("px-2", "py-1", "border");
      tdMobile.textContent = courierData.mobile;

      const tdDate = document.createElement("td");
      tdDate.classList.add("px-2", "py-1", "border");
      tdDate.textContent = formatMyDate(courierData["pickup-date"]);

      const tdArea = document.createElement("td");
      tdArea.classList.add("px-2", "py-1", "border");
      tdArea.textContent = courierData["pickup-area"];

      const tdDelete = document.createElement("td");
      const deleteBtn = document.createElement("button");
      deleteBtn.className =
        "px-2 py-1 rounded bg-red-500 hover:bg-red-600 text-white text-sm";
      deleteBtn.textContent = "Delete";

      deleteBtn.onclick = () => deleteCourierData(courierData.id); // Bind delete function
      tdDelete.classList.add("px-2", "py-1", "border");
      tdDelete.append(deleteBtn);

      trEl.append(tdName, tdMobile, tdDate, tdArea, tdDelete);
      tableEl.append(trEl);
    });
  } else {
    courierCardEl.classList.add("hidden");
    console.log("No data available in localStorage");
  }
}

function deleteCourierData(id) {
  const courierDataArr = JSON.parse(localStorage.getItem(localStorageKey));
  const updatedCourierDataArr = courierDataArr.filter((data) => data.id !== id);

  localStorage.setItem(localStorageKey, JSON.stringify(updatedCourierDataArr));
  alert("Courier Request Deleted Successfully!");
  getAllCourierDatas(); // Refresh the UI with the updated data
}

getAllCourierDatas();
