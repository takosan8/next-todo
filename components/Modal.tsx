import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useState } from "react";

export const BasicUsage = ({
  onClose,
  isOpen,
  handleEdit,
  setData,
  children,
}) => {
  console.log(children);
  return (
    <>
      {/* <Button onClick={onOpen}>Open Modal</Button> */}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <input
              value={children.value}
              onChange={(e) =>
                setData((prevData) => ({ ...prevData, value: e.target.value }))
              }
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost" onClick={() => handleEdit(children)}>
              編集内容を保存
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
