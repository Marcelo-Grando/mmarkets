import { useEffect, useState } from "react";
import { getSellers } from "../api/Sellers";
import { getAdministrators, sendAdministrator, deleteAdministrator } from "../api/Administrators";

import { sendSeller, deleteSeller, updateSeller } from "../api/Sellers";

export const useMembers = (type) => {
  const [members, setMembers] = useState([]);
  const [member, setMember] = useState({
    name: "",
    lastname: "",
    email: "",
    dni: "",
    password: "",
  });

  const { market_id } = JSON.parse(localStorage.getItem("userData"));

  async function loadMembers() {
    if (type === "seller") {
      const response = await getSellers(market_id);
      setMembers(response.data);
      return;
    }
    const response = await getAdministrators(market_id);
    setMembers(response.data);
  }

  useEffect(() => {
    loadMembers();
  }, []);

  const handleInputsChange = (e) => {
    const { name, value } = e.target;
    setMember({
      ...member,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(type === 'seller') {
      const response = await sendSeller(member, market_id);
    } else {
      const response = await sendAdministrator(member, market_id)
    }
    loadMembers();
    setMember({
      name: "",
      lastname: "",
      email: "",
      dni: "",
      password: "",
    });
  };

  const removeMember = async (member_id) => {
    if(type === 'seller') {
      const response = await deleteSeller(member_id, market_id);
    } else {
      const response = await deleteAdministrator(member_id, market_id)
    }
    loadMembers();
  };

  const updateSellerInfo = async (seller_id, seller) => {
    const response = await updateSeller(seller_id, seller);
    console.log(response.data);
  };

  return [
    members,
    handleInputsChange,
    handleSubmit,
    member,
    removeMember,
    updateSellerInfo,
  ];
};
