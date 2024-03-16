"use client";
import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Link,
} from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import { calculateHours } from "@/func/functions";
import { addData } from "@/actions/actions";

export default function AddModal({ subject, setUpdate }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [startTimeRange, setStartTimeRange] = useState("am");
  const [endTimeRange, setEndTimeRange] = useState("am");

  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [finalTimeRange, setFinalTimeRange] = useState("");

  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const handleStartTimeRangeChange = (e) => {
    setStartTimeRange(e.target.value);
  };

  const handleEndTimeRangeChange = (e) => {
    setEndTimeRange(e.target.value);
  };

  useEffect(() => {
    const st = `${startTime}${startTimeRange}`;
    const et = `${endTime}${endTimeRange}`;
    setFinalTimeRange(`${st}-${et}`);
  }, [startTime, endTime, startTimeRange, endTimeRange]);

  const handleAdd = async () => {
    setError(null);
    setIsPending(true);
    const res = await addData(subject, finalTimeRange);
    console.log(res);
    if (res.error) {
      setError(res.error);
    }
    if (res.success) {
      setIsPending(false);
      setUpdate((prev) => prev + 1);
      return res.success;
    }
    setIsPending(false);
  };

  return (
    <>
      <Button onPress={onOpen}>Add</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add Hours - {subject}
                <p>Hours - {finalTimeRange} </p>
              </ModalHeader>
              <ModalBody>
                <div className="flex gap-[10px]">
                  <Input
                    autoFocus
                    label="Start Time"
                    placeholder="Start Time"
                    variant="bordered"
                    value={startTime}
                    onChange={(e) => {
                      setStartTime(e.target.value);
                    }}
                  />
                  <Select
                    label="Time"
                    placeholder="Select am/pm"
                    defaultSelectedKeys={["am"]}
                    className="max-w-[100px]"
                    onChange={handleStartTimeRangeChange}
                  >
                    {["am", "pm"].map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
                <div className="flex gap-[10px]">
                  <Input
                    label="End Time"
                    placeholder="End Time"
                    variant="bordered"
                    value={endTime}
                    onChange={(e) => {
                      setEndTime(e.target.value);
                    }}
                  />
                  <Select
                    label="Time"
                    placeholder="Select am/pm"
                    defaultSelectedKeys={["am"]}
                    className="max-w-[100px]"
                    onChange={handleEndTimeRangeChange}
                  >
                    {["am", "pm"].map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  type="submit"
                  isDisabled={isPending}
                  onPress={async () => {
                    const res = await handleAdd();
                    if (res) {
                      console.log(res);
                      onClose();
                    }
                  }}
                >
                  Add
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
