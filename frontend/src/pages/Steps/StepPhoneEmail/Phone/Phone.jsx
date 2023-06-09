import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setOtp } from "../../../../store/authSlice";

import Button from "../../../../components/shared/Button/Button";
import Card from "../../../../components/shared/Card/Card";
import TextInput from "../../../../components/shared/TextInput/TextInput";

import { sendOtp } from "../../../../http";

import phone from "../../../../assets/phone.png";
import styles from "../StepPhoneEmail.module.css";

const Phone = ({ onNext }) => {
  const [phoneNumber, setPhoneNumber] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = async () => {
    //server request
    try {
      if (!phoneNumber) {
        return;
      }
      const { data } = await sendOtp({ phone: phoneNumber });
      dispatch(setOtp({ phone: data.phone, hash: data.hash }));
      console.log(data);
      onNext();
    } catch (error) {
      console.log("Phone error: ", error);
    }
  };

  return (
    <Card icon={phone} title="Enter your phone no.">
      <TextInput value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
      <div>
        <div className={styles.actionButtonWrap}>
          <Button text="Next" onClick={handleSubmit} />
        </div>
        <p className={styles.bottomParagraph}>
          By entering your number, you're agreeing to our Terms of Services and Privacy Policy. Thanks!
        </p>
      </div>
    </Card>
  );
};

export default Phone;
