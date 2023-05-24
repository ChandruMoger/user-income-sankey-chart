import React from "react";

import PropTypes from "prop-types";
import { useFieldArray, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import AddFormFields from "./AddFormFields";

const AddUser = ({ data, onSubmit }) => {
  const { t, i18n } = useTranslation();
  const form = useForm({
    defaultValues: {
      name: data.name || "",
      incomes: data.incomes || [],
      expenditures: data.expenditures || [],
    },
    mode: "onChange",
  });

  const { register, handleSubmit, control, formState, getValues } = form;
  const { errors, isDirty, isValid } = formState;
  const {
    fields: incomes,
    append: appendIncomes,
    remove: removeIncomes,
  } = useFieldArray({
    name: "incomes",
    control,
  });

  const {
    fields: expenditures,
    append: appendExpenditures,
    remove: removeExpenditures,
  } = useFieldArray({
    name: "expenditures",
    control,
  });
  return (
    <div>
      <form data-testid="user-form" onSubmit={handleSubmit(onSubmit)}>
        <div data-testid="modal-wrapper">
          <label htmlFor="name">{t("name")}</label>
          <input
            data-testid="name"
            className="form-control"
            type="text"
            id="name"
            {...register("name", {
              required: {
                value: true,
                message: "Name is required",
              },
            })}
          />
          <p className="text-danger">{errors.name?.message}</p>
        </div>
        <h4>{t("incomes")}</h4>
        <div>
          <AddFormFields
            fieldNames={incomes}
            fieldName="incomes"
            errors={errors}
            register={register}
            remove={removeIncomes}
          />
          <button
            type="button"
            className="btn btn-success mt-2"
            onClick={() => appendIncomes({ name: "", income: null })}
          >
            {t("add-income")}
          </button>
        </div>

        <div>
          <h4>{t("expenditures")}</h4>
          <AddFormFields
            fieldNames={expenditures}
            fieldName="expenditures"
            errors={errors}
            register={register}
            remove={removeExpenditures}
          />
          <button
            type="button"
            className="btn btn-success mt-2"
            onClick={() => appendExpenditures({ name: "", income: null })}
          >
            {t("add-expenditure")}
          </button>
        </div>
        <button
          data-testid="submit-btn"
          type="submit"
          disabled={!isDirty || !isValid}
          className="mt-2 btn btn-success mt-2"
        >
          {data?.id ? t("update-user") : t("add-user")}
        </button>
      </form>
    </div>
  );
};

export default AddUser;

AddUser.propTypes = {
  data: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
};
