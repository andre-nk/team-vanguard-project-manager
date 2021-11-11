import { Snackbar, Alert, AlertColor } from "@mui/material";

export const CustomSnackbar = ({ openTrigger, onClose, severity, message }) => {
  return (
    <Snackbar open={openTrigger}>
      <Alert
        onClose={onClose}
        severity={severity}
        className="bg-primary-white border border-primary-border text-major-text"
      >
        {message != null
          ? message
              .replace("Firebase: ", "")
              .slice(0, message.replace("Firebase: ", "").indexOf(". ("))
          : ""}
      </Alert>
    </Snackbar>
  );
};