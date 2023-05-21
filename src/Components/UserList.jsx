import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

const UserList = ({ columns, users = [], onDelete, onUpdate }) => {
  const { t, i18n } = useTranslation();

  //User Action Component
  const UserActions = (userId) => {
    return (
      <div className="d-flex column-gap-10">
        <button data-testid="update-button" className="btn btn-primary" onClick={() => onUpdate(userId)}>
          {t("edit")}
        </button>
        <button data-testid="delete-button" className="btn btn-danger" onClick={() => onDelete(userId)}>
          {t("delete")}
        </button>
      </div>
    );
  };

  const UserExpenditure = ({ user, header }) => {
    return (
      <ul>
        {Object.keys(user[header]).map((key, idx) => (
          <li key={idx}> {`${t(`${key}`)}: ${user[header][key]}`}</li>
        ))}
      </ul>
    );
  };

  const UserTableBody = () => {
    return (
      <tbody>
        {users.map((user, idx) => {
          return (
            <tr data-testid="table-body-row" key={idx}>
              {columns.map((header, index) => {
                return header === "expenditures" ? (
                  <td key={index}>
                    <UserExpenditure header={header} user={user} />
                  </td>
                ) : (
                  <td key={index}>
                    {" "}
                    {header === "actions" ? (
                      <UserActions userId={user.id} />
                    ) : (
                      user[header]
                    )}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    );
  };

  const TableHeader = () => {
    return (
      <thead>
        <tr>
          {columns.map((header, idx) => (
            <th key={idx}>{t(`${header}`)}</th>
          ))}
        </tr>
      </thead>
    );
  };

  return (
    <table className="table w-full">
      <TableHeader />
      <UserTableBody users={users} columns={columns} />
    </table>
  );
}

export default UserList;

UserList.propTypes = {
  columns: PropTypes.array.isRequired,
  users: PropTypes.array.isRequired,
  onDelete: PropTypes.func,
  onUpdate: PropTypes.func,
};
