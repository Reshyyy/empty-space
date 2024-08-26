import React, { useState } from "react";
import Button from "./Button";
import Icon from "./Icon";
import { IoIosAdd } from "react-icons/io";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../Redux/store";
import { BE_addTaskList } from "../Backend/Queries";

type Props = {};

const AddListBoard = () => {
  const [addLoading, setAddLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleAddTaskList = () => {
    BE_addTaskList(dispatch, setAddLoading);
  };

  return (
    <>
      <Button
        text="Add New ListBoard"
        onClick={handleAddTaskList}
        className="hidden md:flex"
        loading={addLoading}
      />
      <Icon
        onClick={handleAddTaskList}
        IconName={IoIosAdd}
        className="block md:hidden"
        loading={addLoading}
      />
    </>
  );
};

export default AddListBoard;
