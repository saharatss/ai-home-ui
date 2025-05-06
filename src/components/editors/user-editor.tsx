import { useState } from 'react';

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
  Input,
} from '@heroui/react'
import User from '@/types/user';

export function useUserEditor() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  return [
    { isOpen, onOpen, onOpenChange },
    { selectedUser, setSelectedUser },
  ];
}

interface UserEditorProps {
  modalState: {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
  };
  userState: {
    selectedUser: User | null;
    setSelectedUser: (user: User) => void;
  };
}

export function UserEditor({ modalState, userState }: UserEditorProps) {

  // eslint-disable-next-line
  const [title, setTitle] = useState("User Editor");

  // const handleInputChange = (user) => {
  //   userState.setSelectedUser(user);
  //   modalState.onOpenChange(false); // Automatically close modal on user selection
  // };

  return (
    <Modal
      isOpen={modalState.isOpen}
      onOpenChange={modalState.onOpenChange}
      // backdrop="blur"
      >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
            <ModalBody>
              <h3 className="text-default-500 text-small">General</h3>
              <Input label="Username" isRequired={true} value={userState.selectedUser?.email} />
              <div className="flex w-full gap-4">
                <Input label="First Name" isRequired={true} value={userState.selectedUser?.firstName} />
                <Input label="Last Name" isRequired={true} value={userState.selectedUser?.lastName} />
              </div>
              <Input label="Phone" isRequired={true} />

              {/* <Button onPress={()=>{ handleUserSelect({'username':'test'}) }}>Test</Button> */}
              {/* <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non
                risus hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor
                quam.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non
                risus hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor
                quam.
              </p>
              <p>
                Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit dolor
                adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis. Velit duis sit
                officia eiusmod Lorem aliqua enim laboris do dolor eiusmod. Et mollit incididunt
                nisi consectetur esse laborum eiusmod pariatur proident Lorem eiusmod et. Culpa
                deserunt nostrud ad veniam.
              </p> */}
            </ModalBody>
            <ModalFooter>
              <Button variant="light" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onPress={onClose}>Save</Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
