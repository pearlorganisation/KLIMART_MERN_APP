import React, { useEffect } from "react";
import "./ResendOtpTimes.css";
// ================================================================================

const ResendOtpTimer = ({
  minutes,
  seconds,
  setMinutes,
  setSeconds,
  showResendOtpField,
}) => {
  // timer code handling
  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        showResendOtpField(false);
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          showResendOtpField(true);
          clearInterval(interval);
        } else {
          showResendOtpField(false);
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds]);

  return (
    <div>
      {seconds > 0 || minutes > 0 ? (
        <p className="remaining-time">
          Time Remaining: {minutes < 10 ? `0${minutes}` : minutes}:
          {seconds < 10 ? `0${seconds}` : seconds}
        </p>
      ) : (
        <p className="remaining-time">Didn't receive code?</p>
      )}
    </div>
  );
};

export default ResendOtpTimer;
// ================================================== THE END ==================================================
