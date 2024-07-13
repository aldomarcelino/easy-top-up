import React, { useState } from "react";
import axios from "axios";
import { Box, Modal, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { TextField } from "components/elements";
import { Colors } from "styles/theme/color";
import { X } from "lucide-react";

interface BookingProps {
  open: boolean;
  onClose: () => void;
  actionType: string;
  currentId: string;
  refetch: () => void;
}

const Component = styled(Box)(
  ({ width, padding }) => `
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: ${width};
  background-color: ${Colors.white};
  box-shadow: 0px 10px 40px rgba(164, 149, 107, 0.1);
  padding: ${padding};
  border-radius: 40px;
  outline: none;
`
);

const VerificationModal: React.FC<BookingProps> = ({
  open,
  onClose,
  actionType,
  currentId,
  refetch,
}) => {
  // Initialize State
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Clear state handler
  const handleCancel = () => {
    setError("");
    setReason("");
    setLoading(false);
    onClose();
  };

  // Handle create event form
  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    if (actionType === "Reject" && !reason) {
      setError("The rejected reason is required");
      return;
    }
    try {
      let endpoint = "/api/events/update";
      if (actionType === "Cancel") {
        endpoint = "/api/events/delete";
      }
      const formData = { status: actionType + "ed", id: currentId, reason };
      const response = await axios.put(endpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status) {
        setLoading(false);
        refetch();
        handleCancel();
      }
    } catch (e: any) {
      setLoading(false);
      setError(e.response && e.response.data && e.response.data.message);
    }
  };

  const handleShowButton = () => {
    let bgColor = Colors.gery100;
    const value = actionType && actionType.toLocaleLowerCase();
    switch (value) {
      case "reject":
        bgColor = Colors.red100;
        break;

      case "approve":
        bgColor = Colors.green100;
        break;

      default:
        bgColor = Colors.gery100;
        break;
    }

    return (
      <Box
        display="flex"
        padding="13px"
        justifyContent="center"
        borderRadius="11px"
        width="100%"
        sx={{
          backgroundColor: bgColor,
          color: Colors.white,
          cursor: "pointer",
          "&:hover": {
            opacity: 0.9,
          },
        }}
        onClick={handleSubmit}
      >
        {loading ? "Loading" : actionType}
      </Box>
    );
  };

  return (
    <Modal open={open} aria-labelledby="modal-verify-event">
      <Component width="544px" padding="32px">
        <Box position="relative">
          <Box
            position="absolute"
            right="0"
            top="0"
            zIndex="1"
            style={{ cursor: "pointer" }}
            onClick={handleCancel}
          >
            <X size={24} />
          </Box>
        </Box>

        <Typography variant="h3" fontWeight={600} fontSize="32px">
          Are You Sure ?
        </Typography>
        <Typography variant="body2" marginBottom="40px">
          {`By clicking the button below  you will '${actionType}' this event.`}
        </Typography>
        {actionType === "Reject" && (
          <TextField
            name="reason"
            value={reason}
            handleChange={(e) => setReason(e.target.value)}
            label="Rejected Reason"
            placeholder="The event's date collides with shceduled event."
            width="100%"
          />
        )}

        <Typography
          variant="body2"
          color={Colors.red100}
          margin="8px 0px"
          textAlign="center"
        >
          {error}
        </Typography>

        <Box justifyContent="center" marginTop="24px">
          {handleShowButton()}
        </Box>
      </Component>
    </Modal>
  );
};

export default VerificationModal;
