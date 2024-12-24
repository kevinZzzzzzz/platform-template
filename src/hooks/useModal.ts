import React, { useState, useEffect } from "react";

function UseModal() {
  const [modalOpen, setModalOpen] = useState(false);

  const showModal = () => {
    setModalOpen(true);
  };
  const onModalClose = () => {
    setModalOpen(false);
  };
  const handleModalOk = () => {
    setModalOpen(false);
  };
  const handleModalCancel = () => {
    setModalOpen(false);
  };
  return {
    modalOpen,
    showModal,
    onModalClose,
    handleModalOk,
    handleModalCancel,
  };
}
export default UseModal;
