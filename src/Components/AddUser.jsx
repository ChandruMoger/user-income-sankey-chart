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
      incomes: data.incomes || [{ name: "", amount: null }],
      expenditures: data.expenditures || [{ name: "", amount: null }],
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
      <div>
        <div data-testid="input-wrapper">
          <label htmlFor="name">{t("name")}</label>
          <input
            data-testid="name"
            className="form-control border-light-gray border"
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
        <section>
          <h4>{t("incomes")}</h4>
          <div className="border-light-gray border p-2">
            <AddFormFields
              fieldNames={incomes}
              fieldName="incomes"
              errors={errors}
              register={register}
              remove={removeIncomes}
            />
            <button
              type="button"
              className="btn ctm-theme-bg-color text-light mt-2"
              onClick={() => appendIncomes({ name: "", income: null })}
            >
              {t("add-income")}
            </button>
          </div>
        </section>

        <section>
          <h4>{t("expenditures")}</h4>
          <div className="border-light-gray border p-2">
            <AddFormFields
              fieldNames={expenditures}
              fieldName="expenditures"
              errors={errors}
              register={register}
              remove={removeExpenditures}
            />
            <button
              type="button"
              className="btn ctm-theme-bg-color text-light mt-2"
              onClick={() => appendExpenditures({ name: "", income: null })}
            >
              {t("add-expenditure")}
            </button>
          </div>
        </section>
      </div>
      <div className="mt-2">
        <button
          data-testid="submit-btn"
          type="submit"
          disabled={!isDirty || !isValid}
          className="btn ctm-theme-bg-color text-light"
        >
          {data?.id ? t("update-user") : t("add-user")}
        </button>
      </div>
    </form>
    </div>
  );
};

export default AddUser;

AddUser.propTypes = {
  data: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
};
