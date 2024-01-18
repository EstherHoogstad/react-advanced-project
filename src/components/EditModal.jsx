import { EditForm } from "./EditForm";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

export const EditModal = ({ isOpen, onClose, event, categories, users }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent backgroundColor="green.200">
        <ModalHeader>Edit {event.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <EditForm
            event={event}
            categories={categories}
            users={users}
            onClose={onClose}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
