import React, { useEffect, useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@heroui/react';
import Device, { DeviceType } from '@/types/device';
import { DeviceControlLight } from '../device-control/light';
import { Icons } from '../icons';

export const DeviceEditor = ({
  isOpen,
  device,
  onClose,
}: {
  isOpen: boolean;
  device?: Device;
  onClose?: () => void;
}) => {

  const [updatedDevice, setUpdatedDevice] = useState<Device | undefined>(device);
  // const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    setUpdatedDevice(device);
  }, [device]);

  // const handleChange = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  // ) => {
  //   const { name, value, type } = e.target;
  //   const keys = name.split('.').map(k => (isNaN(Number(k)) ? k : Number(k)));
  
  //   setUpdatedDevice(prev => {
  //     const updated = { ...prev };
  //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //     let current: any = updated;
  
  //     for (let i = 0; i < keys.length - 1; i++) {
  //       const key = keys[i];
  //       const nextKey = keys[i + 1];
  
  //       if (typeof nextKey === 'number') {
  //         current[key] = Array.isArray(current[key]) ? [...current[key]] : [];
  //       } else {
  //         current[key] = typeof current[key] === 'object' && current[key] !== null
  //           ? { ...current[key] }
  //           : {};
  //       }
  //       current = current[key];
  //     }
  
  //     const lastKey = keys[keys.length - 1];

  //     if (type === 'number') {
  //       current[lastKey] = Number(value);
  //     } else {
  //       current[lastKey] = value;
  //     }
  
  //     return updated;
  //   });
  // };

  // const handleSave = async () => {
  //   setIsSubmitting(true);
  //   if (updatedDevice) {
  //     const order = await OrderAPI.updateOrder(updatedDevice);
  //     if (order) {
  //       if (onClose) onClose();
  //     }
  //     setIsSubmitting(false);
  //   }
  // };

  // const handleCreate = async () => {
  //   setIsSubmitting(true);
  //   if (updatedDevice) {
  //     const order = await OrderAPI.createOrder(updatedDevice);
  //     if (order) {
  //       if (onClose) onClose();
  //     }
  //     setIsSubmitting(false);
  //   }
  // };

  // const handleDelete = async () => {
  //   setIsSubmitting(true);
  //   if (updatedDevice) {
  //     const order = await OrderAPI.deleteOrder(updatedDevice);
  //     if (order) {
  //       if (onClose) onClose();
  //     }
  //     setIsSubmitting(false);
  //   }
  // };

  // useEffect(() => {
  //   validateForm();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [tabKey, updatedDevice]);

  return (
    <Modal
      size='lg'
      backdrop='blur'
      classNames={{
        backdrop: 'backdrop-blur-lg bg-white/80',
        base: 'shadow-xl shadow-default-200 rounded-3xl',
      }}
      placement='top'
      isOpen={isOpen}
      onClose={onClose}
      hideCloseButton
      motionProps={{
        variants: {
          enter: {
            y: 0,
            opacity: 1,
            transition: {
              duration: 0.3,
              ease: "easeOut",
            },
          },
          exit: {
            y: -20,
            opacity: 0,
            transition: {
              duration: 0.2,
              ease: "easeIn",
            },
          },
        },
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-row gap-4 items-center py-6">
              <Button
                isIconOnly
                variant="flat"
                className="text-default-300 hover:bg-default-200 rounded-full w-12 h-12"
                onPress={onClose}
              >
                <Icons.ArrowLeftIcon strokeWidth={2.5} size={32} />
              </Button>
              <div className='text-3xl font-medium tracking-wide'>
                {updatedDevice?.name}
              </div>
            </ModalHeader>
            <ModalBody>
              {updatedDevice?.deviceType === DeviceType.LIGHT && (<DeviceControlLight device={updatedDevice} />)}
            </ModalBody>
            <ModalFooter>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
