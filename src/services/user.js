const getAllUsers = async () => {
  const response = await fetch("http://localhost:3001/users");
  return await response.json();
};

const deleteUser = async (id) => {
  const response = await fetch(`http://localhost:3001/users/${id}`, {
    method: "DELETE",
  });
  return await response.json();
};

const addUsers = async (data) => {
  const response = await fetch(`http://localhost:3001/users`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return await response.json();
};

const updateUsers = async (data) => {
  const response = await fetch(`http://localhost:3001/users/${data.id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
      });
      return await response.json();
}

export { getAllUsers, deleteUser, addUsers, updateUsers };
