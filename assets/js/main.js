import JustValidate from "just-validate";

const formEl = document.getElementById("courier-request-form");
console.log(formEl);

const validateForm = new JustValidate(formEl);

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

console.log(validateForm);
