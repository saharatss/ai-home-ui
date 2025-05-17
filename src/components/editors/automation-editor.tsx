import React, { useEffect, useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  addToast,
  Switch,
} from '@heroui/react';
import Icons from '../icons';
import { Automation, AutomationType } from '@/types/automation';
import { useDevices } from '@/context/device';
import Device, { formatDeviceIdShortened, formatDeviceStatusKey, formatDeviceStatusValue } from '@/types/device';
import AutomationAPI from '@/api/automation';

export const AutomationEditor = ({
  isOpen,
  automation,
  onClose,
}: {
  isOpen: boolean;
  automation: Automation;
  onClose?: () => void;
}) => {

  const [updatedAutomation, setUpdatedAutomation] = useState<Automation>(automation);

  const [triggerDevice, setTriggerDevice] = useState<Device | null>(null);
  const [actionDevice, setActionDevice] = useState<Device | null>(null);

  const { getDeviceById } = useDevices();

  useEffect(() => {
    setUpdatedAutomation(automation);
    if (automation.trigger?.deviceId) {
      const device = getDeviceById(automation.trigger.deviceId);
      if (device) {
        setTriggerDevice(device);
      }
    }
    if (automation.action?.deviceId) {
      const device = getDeviceById(automation.action.deviceId);
      if (device) {
        setActionDevice(device);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [automation]);

  // const removeAutomation = async () => {
  //   if (!updatedAutomation) return;
  //   const response = await AutomationAPI.deleteAutomation(automation.id);
  //   if (response) {
  //     addToast({
  //       title: 'Success',
  //       description: 'Automation removed successfully',
  //       color: 'success',
  //       timeout: 1000,
  //     });
  //     if (onClose) {
  //       onClose();
  //     }
  //   }
  // };

  const updateAutomation = async (automation: Automation) => {
    if (!automation) return;
    const response = await AutomationAPI.updateAutomation(automation);
    if (response) {
      addToast({
        title: 'Success',
        description: 'Automation status updated successfully',
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
                Automation
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
                        <td className='text-sm text-default-400'>Enable</td>
                        <td className='text-sm text-default-500'>
                          <Switch
                            size='sm'
                            isSelected={updatedAutomation.enable}
                            onValueChange={(checked) => {
                              const updated = {
                                ...updatedAutomation,
                                enable: checked,
                              };
                              setUpdatedAutomation(updated);
                              updateAutomation(updated);
                            }}
                          />
                        </td>
                        <td></td>
                      </tr>

                      <tr><td colSpan={3} className='h-3' /></tr>

                      <tr>
                        <td className='text-sm text-default-400'>Name</td>
                        <td className='text-sm text-default-500'>{updatedAutomation.name}</td>
                        <td></td>
                      </tr>
                      <tr>
                        <td className='text-sm text-default-400'>ID</td>
                        <td className='text-sm text-default-500' colSpan={2}>{automation.id}</td>
                      </tr>
                      <tr>
                        <td className='text-sm text-default-400'>Type</td>
                        <td className='text-sm text-default-500'>{updatedAutomation.type}</td>
                        <td></td>
                      </tr>

                      <tr><td colSpan={3} className='h-3' /></tr>                      

                      { updatedAutomation.type === AutomationType.TIMER_TRIGGER && (
                        <tr>
                          <td className='text-sm text-default-400'>Trigger Time</td>
                          <td className='text-sm text-default-500'>{updatedAutomation.trigger?.time?.toString()}</td>
                          <td></td>
                        </tr>
                      )}
                      { updatedAutomation.type === AutomationType.DEVICE_TRIGGER && (<>
                        <tr>
                          <td className='text-sm text-default-400'>Trigger By</td>
                          <td className='text-sm text-default-500'>{triggerDevice?.name}</td>
                          <td className='text-sm text-default-300'>{formatDeviceIdShortened(triggerDevice?.id ?? '')}</td>
                        </tr>
                        <tr>
                          <td className='text-sm text-default-400'>When</td>
                          <td className='text-sm text-default-500 flex flex-row gap-1'>
                            <span>{formatDeviceStatusKey(updatedAutomation.trigger?.attribute ?? '')}</span>
                            <span>{updatedAutomation.trigger?.operator}</span>
                            <span>{formatDeviceStatusValue(updatedAutomation.trigger?.attribute ?? '', updatedAutomation.trigger?.value ?? '')}</span>
                          </td>
                          <td></td>
                        </tr>
                        <tr><td colSpan={3} className='h-3' /></tr>
                        <tr>
                          <td className='text-sm text-default-400'>Update</td>
                          <td className='text-sm text-default-500'>{actionDevice?.name}</td>
                          <td className='text-sm text-default-300'>{formatDeviceIdShortened(actionDevice?.id ?? '')}</td>
                        </tr>
                        <tr>
                          <td className='text-sm text-default-400'>With</td>
                          <td className='text-sm text-default-500'>
                            <span>{formatDeviceStatusKey(updatedAutomation.action?.attribute ?? '')} {formatDeviceStatusValue(updatedAutomation.action?.attribute ?? '', updatedAutomation.action?.value ?? '')}</span>
                          </td>
                        </tr>
                      </>)}

                      <tr>
                        <td colSpan={3} className='h-3'>
                          <div className='flex justify-center items-center mt-12'>
                            <Button
                              variant="light"
                              color='danger'
                              onPress={()=>{}}
                            >
                              <Icons.TrashIcon className='mr-2' size={16} color='hsl(var(--heroui-danger-500))' strokeWidth={2.5} />
                              Delete Automation
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
