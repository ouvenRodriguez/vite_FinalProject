import React from "react";
import { Box } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const Calendar = ({ startDate, endDate, onDateChange }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ display: 'flex', gap: 2, flex: 2 }}>
        <DatePicker
          label="Fecha de inicio"
          value={startDate}
          onChange={(date) => onDateChange('startDate', date)}
          format="DD/MM/YYYY"
          slotProps={{
            textField: {
              required: true,
              fullWidth: true
            }
          }}
        />
        <DatePicker
          label="Fecha de fin"
          value={endDate}
          onChange={(date) => onDateChange('endDate', date)}
          format="DD/MM/YYYY"
          minDate={startDate}
          slotProps={{
            textField: {
              required: true,
              fullWidth: true
            }
          }}
        />
      </Box>
    </LocalizationProvider>
  );
};

export default Calendar;
