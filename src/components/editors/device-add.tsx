import React, { useEffect, useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  addToast,
  Input,
  Select,
  SelectItem,
} from '@heroui/react';
import Device, { DeviceType } from '@/types/device';
import Icons from '../icons';
import DeviceAPI from '@/api/device';

const DefaultDevice = {
  id: '',
  name: '',
  ownerId: '',
  deviceType: DeviceType.SWITCH,
  currentStatus: {},
  config: {},
};

export const DeviceAdd = ({
  isOpen,
  onClose,
  onDeviceAdded,
}: {
  isOpen: boolean;
  onClose?: () => void;
  onDeviceAdded?: (device: Device) => void;
}) => {

  const [updatedDevice, setUpdatedDevice] = useState<Device>(DefaultDevice);

  const [isFormValid, setIsFormValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createDevice = async () => {
    setIsSubmitting(true);
    const response = await DeviceAPI.createDevice({
      ...updatedDevice,
      // @ts-expect-error convert to JSON string
      currentStatus: JSON.stringify(updatedDevice.currentStatus),
      // @ts-expect-error convert to JSON string
      config: JSON.stringify(updatedDevice.config),
    });
    if (response) {
      addToast({
        title: 'Success',
        description: 'Device created successfully',
        color: 'success',
        timeout: 3000,
      });
      if (onDeviceAdded) {
        onDeviceAdded(response);
      }
      if (onClose) {
        onClose();
      }
    } else {
      addToast({
        title: 'Error',
        description: 'Error creating device',
        color: 'danger',
        timeout: 3000,
      });
    }
    setIsSubmitting(false);
  };

  const handleDeviceTypeChange = () => {
    if (updatedDevice.deviceType === DeviceType.SWITCH) {
      setUpdatedDevice((prev) => ({...prev, currentStatus: {"power": false},}));
    } else if (updatedDevice.deviceType === DeviceType.OUTLET) {
      setUpdatedDevice((prev) => ({...prev, currentStatus: {"power": false},}));
    } else if (updatedDevice.deviceType === DeviceType.LIGHT) {
      setUpdatedDevice((prev) => ({...prev, currentStatus: {"power": false, "brightness": 0},}));
    } else if (updatedDevice.deviceType === DeviceType.FAN) {
      setUpdatedDevice((prev) => ({...prev, currentStatus: {"power": false, "brightness": 0},}));
    } else if (updatedDevice.deviceType === DeviceType.DOORBELL) {
      setUpdatedDevice((prev) => ({...prev, currentStatus: {"power": false, "motion": false},}));
    } else if (updatedDevice.deviceType === DeviceType.THERMOSTAT) {
      setUpdatedDevice((prev) => ({...prev, currentStatus: {"power": false, "temperature": 20, "humidity": 50},}));
    } else if (updatedDevice.deviceType === DeviceType.THERMOSTAT_SENSOR) {
      setUpdatedDevice((prev) => ({...prev, currentStatus: {"temperature": 20, "humidity": 50},}));
    } else if (updatedDevice.deviceType === DeviceType.MOTION_SENSOR) {
      setUpdatedDevice((prev) => ({...prev, currentStatus: {"motion": false},}));
    } else if (updatedDevice.deviceType === DeviceType.LIGHT_SENSOR) {
      setUpdatedDevice((prev) => ({...prev, currentStatus: {"brightness": 0},}));
    } else {
      setUpdatedDevice((prev) => ({...prev, currentStatus: {},}));
    }
  }

  useEffect(() => {
    if((updatedDevice.name?.trim() || '') === '' ) { setIsFormValid(false); return; }
    if (updatedDevice.deviceType == null) { setIsFormValid(false); return;}
    setIsFormValid(true);
  }, [updatedDevice]);

  useEffect(() => {
    handleDeviceTypeChange();
    // eslint-disable-next-line
  }, [updatedDevice.deviceType]);

  useEffect(() => {
    setUpdatedDevice(DefaultDevice);
    handleDeviceTypeChange();
    setIsFormValid(false);
    setIsSubmitting(false);
    // eslint-disable-next-line
  }, [isOpen]);

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
                Add Device
              </div>
            </ModalHeader>
            <ModalBody>
              <div className='flex flex-col gap-4'>
                <Input
                  label="Device Name"
                  value={updatedDevice.name}
                  onChange={(e) => setUpdatedDevice({ ...updatedDevice, name: e.target.value })}
                  className='w-full'
                />
                <Select
                  label="Device Type"
                  selectedKeys={[updatedDevice.deviceType]}
                  onChange={(e) => setUpdatedDevice({ ...updatedDevice, deviceType: e.target.value as DeviceType })}
                  className='w-full'
                  disallowEmptySelection
                >
                  {Object.values(DeviceType).map((type) => (
                    <SelectItem key={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1).replace(/_/g, ' ').toLowerCase()}
                    </SelectItem>
                  ))}
                </Select>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                variant="light"
                onPress={() => {
                  if (onClose) {
                    onClose();
                  }
                }}
              >
                Cancel
              </Button>
              <Button
                variant="solid"
                color='primary'
                className='hover:bg-blue-600'
                onPress={createDevice}
                isDisabled={!isFormValid || isSubmitting}
              >
                Add
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
