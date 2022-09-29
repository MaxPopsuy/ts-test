import React, { useState } from "react";
import styles from "./Modal.module.css";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";

import { getUserId } from "../../redux/auth/auth-selectors";
import { addBooking } from "../../redux/bookings/bookings-operations";
import { getModal } from "../../redux/selectors";
import { typeModal } from "../../redux/actions";

import Button from "../Button/Button";
import Input from "../Input/Input";
import { ELevel } from "../../types/types";
import { useAppDispatch } from "../../redux/hooks";

const modalRef = document.querySelector("#root-modal");

interface ModalProps {
  level: string;
  title: string;
  duration: number;
  price: number;
  tripId: string;
  onClickFn: () => void;
}

const Modal: React.FC<ModalProps> = ({ level, title, duration, onClickFn, price, tripId }) => {
  const dispatch = useAppDispatch;
  const isOpenModal = useSelector(getModal);
  const userId = useSelector(getUserId);
  const [guests, setGuests] = useState(1);
  const [date, setDate] = useState("2022-07-20");
  const onSubmitForm = (event: React.ChangeEvent) => {
    event.preventDefault();
    const booking = {
      tripId,
      userId,
      guests,
      date,
    };
    dispatch(addBooking(booking));
    dispatch(typeModal(!isOpenModal));
  };
  return createPortal(
    <div className={styles["modal"]}>
      <div className={styles["trip-popup"]}>
        <button onClick={onClickFn} className={styles["trip-popup__close"]}>
          ×
        </button>
        <form
          onSubmit={onSubmitForm}
          className={styles["trip-popup__form"]}
          autoComplete="off"
        >
          <div className={styles["trip-info"]}>
            <h3 className={styles["trip-info__title"]}>{title}</h3>
            <div className={styles["trip-info__content"]}>
              <span className={styles["trip-info__duration"]}>
                <strong>{duration}</strong> days
              </span>
              <span className={styles["trip-info__level"]}>{level}</span>
            </div>
          </div>
          <Input
            num
            minLength="2022-07-20"
            setValue={setDate}
            value={date}
            text="Date"
            style={styles["trip-popup__input"]}
            type="date"
            name="date"
          />
          <Input
            num
            text="Number of guests"
            style={styles["trip-popup__input"]}
            setValue={() => setGuests}
            value={guests}
            name="guests"
            type="number"
            minLength={1}
            maxLength={10}
          />
          <span className="trip-popup__total">
            Total:{" "}
            <output className="trip-popup__total-value">
              {price * guests}$
            </output>
          </span>
          <Button type="submit" text="Book a trip" />
        </form>
      </div>
    </div>,
    modalRef
  );
};

export default Modal;
