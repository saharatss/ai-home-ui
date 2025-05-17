import React, { useEffect, useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  addToast,
  Switch,
  Slider,
  Input,
} from '@heroui/react';
import Device, { formatDeviceStatusKey, formatDeviceStatusValue } from '@/types/device';
import Icons from '../icons';
import DeviceAPI from '@/api/device';

export const DeviceEditor = ({
  isOpen,
  device,
  onClose,
}: {
  isOpen: boolean;
  device: Device;
  onClose?: () => void;
}) => {

  const [updatedDevice, setUpdatedDevice] = useState<Device>(device);

  const [updatedDeviceStatus, setUpdatedDeviceStatus] = useState<object>({});

  useEffect(() => {
    setUpdatedDevice(device);
    try {
      if (typeof device.currentStatus === 'string') {
        const parsedStatus = JSON.parse(device.currentStatus);
        setUpdatedDeviceStatus(parsedStatus);
      } else if (typeof device.currentStatus === 'object') {
        setUpdatedDeviceStatus(device.currentStatus);
      }
    } catch (error) {
      console.warn('Error parsing device status', error);
      setUpdatedDeviceStatus({});
    }
  }, [device]);

  const removeDevice = async () => {
    if (!updatedDevice) return;
    const response = await DeviceAPI.deleteDevice(device.id);
    if (response) {
      addToast({
        title: 'Success',
        description: 'Device removed successfully',
        color: 'success',
        timeout: 1000,
      });
      if (onClose) {
        onClose();
      }
    }
  };

  const updateDeviceStatus = async (status:object) => {
    if (!updatedDevice) return;
    if (!status) return;
    setUpdatedDeviceStatus(status);
    const response = await DeviceAPI.updateDeviceStatus(
      updatedDevice.id,
      status
    );
    if (response) {
      addToast({
        title: 'Success',
        description: 'Device status updated successfully',
        color: 'success',
        timeout: 1000,
      });
    }
  }

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
              <div className='flex flex-col gap-4'>
                <div className='flex flex-row gap-2 items-center'>
                  <table className='w-full' aria-label='Device Info'>
                    <thead>
                      <tr>
                        <th className='w-32'></th>
                        <th className=''></th>
                        <th className=''></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className='text-sm text-default-400'>Device ID</td>
                        <td className='text-sm text-default-500' colSpan={2}>{updatedDevice.id}</td>
                      </tr>
                      <tr>
                        <td className='text-sm text-default-400'>Device Type</td>
                        <td className='text-sm text-default-500'>{updatedDevice.deviceType}</td>
                        <td></td>
                      </tr>
                      <tr>
                        <td className='text-sm text-default-400'>Device Name</td>
                        <td className='text-sm text-default-500'>{updatedDevice.name}</td>
                        <td></td>
                      </tr>

                      <tr><td colSpan={3} className='h-3' /></tr>

                      {Object.entries(updatedDeviceStatus).map(([key, value]) => (
                        <tr key={key}>
                          <td className='text-sm text-default-400'>{formatDeviceStatusKey(key)}</td>
                          <td className='text-sm text-default-500'>{formatDeviceStatusValue(key, value)}</td>
                          <td className='h-12'>
                            {key === 'power' && (
                              <Switch
                                isSelected={value}
                                onChange={() => {
                                  updateDeviceStatus({
                                    ...updatedDeviceStatus,
                                    [key]: !value,
                                  });
                                }}
                                size='md'
                                color='primary'
                              />
                            )}
                            { key === 'brightness' && (
                              <Slider
                                aria-label='Brightness'
                                color='primary'
                                size='md'
                                className='w-full'
                                value={value}
                                onChange={(val) => {
                                  setUpdatedDeviceStatus({
                                    ...updatedDeviceStatus,
                                    [key]: val,
                                  });
                                }}
                                onChangeEnd={(val) => {
                                  updateDeviceStatus({
                                    ...updatedDeviceStatus,
                                    [key]: val,
                                  });
                                }}
                                minValue={0}
                                maxValue={1}
                                step={0.01}
                              />
                            )}
                            { key === 'color' && (
                              <Input
                                fullWidth
                                type='color'
                                radius='sm'
                                className='cursor-pointer'
                                value={value as string}
                                onChange={(e) => {
                                  setUpdatedDeviceStatus({
                                    ...updatedDeviceStatus,
                                    [key]: e.target.value,
                                  });
                                }}
                                onBlur={(e) => {
                                  updateDeviceStatus({
                                    ...updatedDeviceStatus,
                                    [key]: e.target.value,
                                  });
                                }}
                              />
                            )}
                          </td>
                        </tr>
                      ))}

                      <tr>
                        <td colSpan={3} className='h-3'>
                          <div className='flex justify-center items-center mt-12'>
                            <Button
                              variant="light"
                              color='danger'
                              onPress={removeDevice}
                            >
                              <Icons.TrashIcon className='mr-2' size={16} color='hsl(var(--heroui-danger-500))' strokeWidth={2.5} />
                              Remove Device
                            </Button>
                          </div>
                        </td>
                      </tr>

                      <tr><td colSpan={3} className='h-3' /></tr>

                    </tbody>
                  </table>
                </div>
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
