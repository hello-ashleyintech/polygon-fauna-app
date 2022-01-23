import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./AllowlistForm.css";
import { addDocument, findUUID } from "../api/fauna";

export default function AllowlistForm(props) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [formSuccess, setFormSuccess] = useState(false);
  const [formFail, setFormFail] = useState(false);

  useEffect(() => {
    register("firstName", { required: true });
    register("lastName", { required: true });
    register("walletAddress", { required: true });
  }, [register]);

  async function submitForm(data) {
    // generate uuid
    let uuid = "";
    // check for duplicate uuids in db
    while (true) {
      const generatedUUID = crypto.randomUUID();
      const didFindUUID = await findUUID(generatedUUID);
      if (!didFindUUID) {
        uuid = generatedUUID;
        break;
      }
    }
    // add stuff to Fauna
    await addDocument(uuid, data.firstName, data.lastName, data.walletAddress)
      .then((res) => {
        if (!res.ok && res.status >= 400) {
          setFormFail(true);
          return;
        } else {
          // add stuff to contract
          props.contract.methods
            ._createAllowlister(uuid)
            .send({ from: props.accounts[0] })
            .then(() => {
              setFirstName(data.firstName);
              setLastName(data.lastName);
              setWalletAddress(data.walletAddress);
              setFormSuccess(true);
            })
            .catch(() => {
              setFormFail(true);
              return;
            });
        }
      })
      .catch(() => {
        setFormFail(true);
        return;
      });
  }

  return (
    <div className="wrapper">
      {formSuccess && (
        <div className="successMessage">
          <p>
            Successfully submitted allowlist entry for{" "}
            {firstName + " " + lastName} with wallet address {walletAddress}!
          </p>
        </div>
      )}
      {formFail && (
        <div className="errorMessage">
          <p>Failed to submit allowlist entry. Please try again.</p>
        </div>
      )}
      <form onSubmit={handleSubmit((data) => submitForm(data))}>
        <div className="header">
          <h1>Allowlist Form</h1>
          <p>
            Please fill out this form to get allowlisted for this exclusive
            project.
          </p>
        </div>
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          onChange={(e) => setValue("firstName", e.target.value)}
        />
        {errors.firstName && (
          <span role="alert" className="errorField">
            First name is required.
          </span>
        )}
        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          onChange={(e) => setValue("lastName", e.target.value)}
        />
        {errors.lastName && (
          <span role="alert" className="errorField">
            Last name is required.
          </span>
        )}
        <label htmlFor="walletAddress">Wallet Address</label>
        <input
          id="walletAddress"
          onChange={(e) => setValue("walletAddress", e.target.value)}
        />
        {errors.walletAddress && (
          <span role="alert" className="errorField">
            Wallet address is required.
          </span>
        )}
        <input type="submit" className="submitButton" />
      </form>
    </div>
  );
}
