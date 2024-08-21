import React from "react";
import Button from "./Button";
import Icon from "./Icon";
import { IoIosAdd } from "react-icons/io";

type Props = {};

const AddListBoard = () => {
  return (
    <>
      <Button text="Add New ListBoard" className="hidden md:flex" />
      <Icon IconName={IoIosAdd} className="block md:hidden" />
    </>
  );
};

export default AddListBoard;
