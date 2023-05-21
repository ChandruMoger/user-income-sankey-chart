import React from "react";

import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

const AddUser = ({ data, onSubmit }) => {
  const { t, i18n } = useTranslation();
  const form = useForm({
    defaultValues: {
      name: data.name || "",
      income: data.income || null,
      expenditure: data.expenditure || null,
      expenditures: {
        mobile_bill: data?.expenditures?.mobile_bill || null,
        electricity_bill: data?.expenditures?.electricity_bill || null,
      },
    },
    mode: "onChange",
  });

  const { register, handleSubmit, formState, getValues } = form;
  const { errors, isDirty, isValid } = formState;

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
        <div>
          <label htmlFor="income">{t("income")}</label>
          <input
          data-testid="income"
            className="form-control"
            type="text"
            id="income"
            {...register("income", {
              valueAsNumber: true,
              required: {
                value: true,
                message: "Income is required",
              },
            })}
          />
          <p className="text-danger">{errors.income?.message}</p>
        </div>
        <div>
          <label htmlFor="expenditure">{t("expenditure")}</label>
          <input
          data-testid="expenditure"
            className="form-control"
            type="text"
            id="expenditure"
            {...register("expenditure", {
              valueAsNumber: true,
              required: {
                value: true,
                message: "Expenditure is required",
              },
              validate: {
                maxExpenditure: (fieldValue) => {
                  return (
                    fieldValue <= getValues('income')  ||
                    "Expenditure can not be more than income"
                  );
                },
              },
            })}
          />
          <p className="text-danger">{errors.expenditure?.message}</p>
        </div>
        <h4>{t("expenditures")}</h4>
        <div>
          <label htmlFor="mobile_bill">{t("mobile_bill")}</label>
          <input
          data-testid="mobile_bill"
            className="form-control"
            type="text"
            id="mobile_bill"
            {...register("expenditures.mobile_bill", {
              valueAsNumber: true,
              required: {
                value: true,
                message: "Mobile Bill is required",
              },
              validate: {
                totalMobExp: (fieldValue) => {
                    const total = fieldValue + getValues('expenditures.electricity_bill');
                  return (
                    total <= getValues('expenditure')  ||
                    "Expenditures can not be more than expenditure amount"
                  );
                },
              },
            })}
          />
          <p className="text-danger">
            {errors.expenditures?.mobile_bill?.message}
          </p>
        </div>
        <div>
          <label htmlFor="electricity_bill">{t("electricity_bill")}</label>
          <input
            data-testid="electricity_bill"
            className="form-control"
            type="text"
            id="electricity_bill"
            {...register("expenditures.electricity_bill", {
              valueAsNumber: true,
              required: {
                value: true,
                message: "Electricity Bill is required",
              },
              validate: {
                totalEleExp: (fieldValue) => {
                    const total = fieldValue + getValues('expenditures.mobile_bill');
                  return (
                    total <= getValues('expenditure')  ||
                    "Expenditures can not be more than expenditure amount"
                  );
                },
              },
            })}
          />
          <p className="text-danger">
            {errors.expenditures?.electricity_bill?.message}
          </p>
        </div>
        <button data-testid="submit-btn" type="submit" disabled={!isDirty || !isValid} className="mt-2 btn btn-success">
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
