import React, { useCallback, useState, useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Colors } from "styles/theme/color";

interface DateFieldProps {
  inputFormat?: string;
  label?: string;
  value?: Dayjs | null;
  onChange: (date: Dayjs | null) => void;
}

const DateField: React.FC<DateFieldProps> = React.memo(
  ({ label, value = dayjs(), onChange }) => {
    const today = dayjs().subtract(0, "day");

    const [val, setVal] = useState<Dayjs | null>(value);

    useEffect(() => {
      setVal(value);
    }, [value]);

    const handleChange = useCallback(
      (newValue: Dayjs | null) => {
        setVal(newValue);
        onChange(newValue);
      },
      [onChange]
    );

    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DateTimePicker"]}>
          <DemoItem
            label={label}
            sx={{ color: Colors.darkGrey, marginTop: "10px" }}
          >
            <DateTimePicker
              value={val}
              defaultValue={today}
              views={["year", "month", "day", "hours", "minutes"]}
              onChange={handleChange}
            />
          </DemoItem>
        </DemoContainer>
      </LocalizationProvider>
    );
  }
);

export default DateField;
