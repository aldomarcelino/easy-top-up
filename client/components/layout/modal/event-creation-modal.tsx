import React, { useState } from "react";
import { Box, Grid, Modal, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { Button, Select, TextField } from "components/elements";
import { Colors } from "styles/theme/color";
import axios from "axios";
import { HandCoins } from "lucide-react";
import { formatNumber } from "utils/crrency-formatter";
import { paymentMethod } from "../../../constants";

interface TopupProps {
  open: boolean;
  onClose: () => void;
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

const initialForm = {
  method: "",
  note: "",
  amount: 0,
  bank: "",
};

const TopupModal: React.FC<TopupProps> = ({ open, onClose, refetch }) => {
  // Initialize State
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [curIdx, setCurIdx] = useState<string | null | undefined | number>();
  const [form, setForm] = useState(initialForm);

  // Event on change handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  // Clear state handler
  const handleCancel = () => {
    setForm(initialForm);
    setError("");
    setLoading(false);
    onClose();
  };

  // Handle create event form
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const formData = {
        method: form.bank,
        note: form.note,
        amount: form.amount,
      };

      const response = await axios.post("/api/events/create", formData, {
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

  return (
    <Modal
      open={open}
      onClose={handleCancel}
      aria-labelledby="modal-event-creation"
    >
      <Component width="544px" padding="32px">
        <Box display="flex" alignItems="center" gap="12px">
          <HandCoins size={28} color={Colors.green100} />
          <Typography variant="h3" fontWeight={600} fontSize="32px">
            Top Up
          </Typography>
        </Box>
        <Typography variant="body2" marginBottom="40px">
          Input form below to add your money.
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Amount"
            type="number"
            name="amount"
            value={form.amount}
            handleChange={handleChange}
            placeholder="1000000"
            width="100%"
          />
          {form.amount > 0 && (
            <Typography>{formatNumber(form.amount)}</Typography>
          )}

          <Grid container style={{ marginTop: "24px" }}>
            <Grid item md={6} paddingRight="5px">
              <Select
                name="method"
                value={form.method}
                label="Payment Method"
                handleChange={(e) => {
                  setForm({ ...form, method: e.target.value });
                  setCurIdx(+e.target.value - 1);
                }}
                placeholder="Select payment method"
                data={paymentMethod}
                loading={false}
                returnValue="id"
              />
            </Grid>
            <Grid item md={6} paddingLeft="5px">
              <Select
                name="bank"
                value={form.bank}
                label="Bank"
                handleChange={(e) => setForm({ ...form, bank: e.target.value })}
                placeholder="Select service/Bank"
                data={paymentMethod[curIdx || 0]?.data}
                loading={false}
                returnValue="id"
              />
            </Grid>
          </Grid>

          <Box marginTop="24px">
            <TextField
              name="note"
              value={form.note}
              handleChange={handleChange}
              label="Note"
              placeholder="July savings"
              width="100%"
            />
          </Box>

          <Typography
            variant="body2"
            color={Colors.red100}
            marginBottom="8px"
            textAlign="center"
          >
            {error}
          </Typography>

          <Box
            display="flex"
            gap="13px"
            justifyContent="center"
            marginTop="24px"
          >
            <Button
              label="Cancel"
              padding="13px 32px"
              borderRadius="20px"
              fontSize="18px"
              onClick={handleCancel}
              buttonType="secondary"
            />
            <Button
              label={loading ? "Loading..." : "Submit"}
              padding="13px 32px"
              borderRadius="20px"
              fontSize="18px"
              disabled={loading}
              submit
            />
          </Box>
        </form>
      </Component>
    </Modal>
  );
};

export default TopupModal;
