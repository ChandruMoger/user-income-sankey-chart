import { useEffect, useState, memo } from "react";
import "./App.css";
import SankeyWrapper from "./Components/IncomeSankeyWrapper";
import { useTranslation } from "react-i18next";
import Header from "./Components/Header";
import UserList from "./Components/UserList";
import CustomModal from "./Components/Modal";
import AddUser from "./Components/AddUser";
import {
  addUsers,
  deleteUser,
  getAllUsers,
  updateUsers,
} from "./services/user";
import Loader from "./Components/Loader";
function App() {
  const { t, i18n } = useTranslation();
  const [users, setUsers] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  
  const toggle = () => setModal(!modal);

  useEffect(() => {
    const getUserData = async () => {
      try {
        setIsLoading(true)
        const users = await getAllUsers();
        console.log(users)
        setUsers(users);
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
        console.log(error);
      }
    };

    getUserData();
  }, []);

  const deleteUserHandler = async (userInfo) => {
    try {
      setIsLoading(true)
      const { userId } = userInfo;
      await deleteUser(userId);
      setUsers((prev) => prev.filter((user) => user.id !== userId));
      setIsLoading(false)
    } catch (error) {
      console.log(error);
      setIsLoading(false)
    }
  };

  const updateUserHandler = (userInfo) => {
    const { userId } = userInfo;
    setSelectedUser(users.find((user) => user.id === userId));
    toggle();
  };

  const addUser = () => {
    setSelectedUser({});
    toggle();
  };

  const ModalHeader = () => {
    return Object.keys(selectedUser).length > 0
      ? t("update-user")
      : t("add-user");
  };

  const formSubmit = async (data) => {
    console.log(data);
    toggle();
    if (selectedUser?.id) {
      await updateUser({ ...data, id: selectedUser?.id });
    } else {
      await addNewUser(data);
    }

    setSelectedUser({});
  };

  const addNewUser = async (data) => {
    try {
      setIsLoading(true)
      const response = await addUsers(data);
      setUsers((prev) => [...prev, response]);
      setIsLoading(false)
    } catch (error) {
      console.log(error);
      setIsLoading(false)
    }
  };

  const updateUser = async (data) => {
    try {
      setIsLoading(true) 
      const response = await updateUsers(data);
      let userIndex = users.findIndex((user) => user.id === response.id);
      let allUsers = [...users];
      allUsers[userIndex] = response;
      setUsers(allUsers);
      setIsLoading(false)
    } catch (error) {
      console.log(error);
      setIsLoading(false) 
    }
  };

  const ModalBody = () => {
    return <AddUser data={selectedUser} onSubmit={formSubmit} />;
  };

  return (
    <>
      <Header />
      <section className="container mt-5">
        {users.length > 0 && (
          <>
            <div className="d-flex my-4 column-gap-10">
              <h4 data-testid="users-title">{t("users-list-title")}</h4>
              <button className="btn btn-success" onClick={addUser}>
                {t("add-user")}
              </button>
            </div>
            <div className="m-h-300 overflow-auto">
              <UserList
                columns={[
                  "name",
                  "incomes",
                  "expenditures",
                  "actions",
                ]}
                users={users}
                onDelete={deleteUserHandler}
                onUpdate={updateUserHandler}
              />
            </div>
            {/* <h4 className="my-4">{t("chart-title")}</h4>
            <SankeyWrapper data={users} width={960} height={300} /> */}
          </>
        )}

        {isLoading && (
          <div id="backdrop">
            <div className="d-flex justify-content-center">
              <Loader />
            </div>
          </div>
        )}
        {modal && <CustomModal
          open={modal}
          toggle={toggle}
          body={<ModalBody />}
          header={<ModalHeader />}
        />}
      </section>
    </>
  );
}

export default memo(App);
