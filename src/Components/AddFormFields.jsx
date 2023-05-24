const AddFormFields = ({ fieldNames = [], fieldName, errors, register, remove }) => {
  return (
    <>
      {fieldNames.map((field, index) => (
        <div key={field.id}>
          <div className="form-control d-flex column-gap-10 align-items-start">
            <span>
              <input
                type="text"
                placeholder="Income Source"
                {...register(`${fieldName}.${index}.name`, {
                  required: {
                    value: true,
                    message: "required",
                  },
                })}
              />
              {errors?.[`${fieldName}`]?.[`${index}`]?.name?.message && (
                <p className="text-danger">
                  {errors?.[`${fieldName}`]?.[`${index}`]?.name?.message}
                </p>
              )}
            </span>
            <span>
              <input
                type="text"
                placeholder="Amount"
                {...register(`${fieldName}.${index}.amount`, {
                  valueAsNumber: true,
                  required: {
                    value: true,
                    message: "required",
                  },
                })}
              />
              {errors?.[`${fieldName}`]?.[`${index}`]?.amount?.message && (
                <p className="text-danger">
                  {errors?.[`${fieldName}`]?.[`${index}`].amount.message}
                </p>
              )}
            </span>
            {index > 0 && (
              <button
                className="btn btn-danger form-btn"
                type="button"
                onClick={() => remove(index)}
              >
                X
              </button>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default AddFormFields;
