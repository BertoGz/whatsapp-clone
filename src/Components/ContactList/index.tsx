import React from "react";
import { users } from "../../data";
import ContactListItem from "../ContactListItem";


const ContactList = () => {
  return (
    <>
      {users.map((item) => (
        <ContactListItem {...{ item }} />
      ))}
    </>
  );
};
export default ContactList;
