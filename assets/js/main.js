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

//console.log(validateForm);
validateForm.onSuccess(() => {
  const formData = new FormData(formEl);

  const formObj = Object.fromEntries(formData.entries());
  //console.log(formObj);

  const newCourierData = [];

  //Get my existing LocalStorage Value
  const existingCourierData = localStorage.getItem("courierData"); //get Local Storage
  const existingCourierArray = JSON.parse(existingCourierData); //string to javascript

  if (existingCourierArray) {
    existingCourierArray.push(formObj);
    //console.log(existingCourierArray);

    //LocalStorage
    localStorage.setItem("courierData", JSON.stringify(existingCourierArray));
  } else {
    newCourierData.push(formObj);
    localStorage.setItem("courierData", JSON.stringify(newCourierData));
  }
  alert("Courier Request Submitted Successfully...!");
  formEl.reset();
});
