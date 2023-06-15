import {
  useRouteLoaderData,
  Form as FormWrapper,
  redirect,
} from "react-router-dom";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Modal from "react-bootstrap/Modal";
import { getAuthToken } from "../utils/auth";
import classes from "./CouponForm.module.css";
import { useState } from "react";
import { formatDate } from "../utils/utils";

function CouponForm() {
  const [isLimited, setLimited] = useState(true);
  const [voucherLimit, setVoucherLimit] = useState("");

  function handleLimitStatusChange(event) {
    console.log(event.target.checked);
    setLimited(event.target.checked);
    if (!event.target.checked) {
      setVoucherLimit("");
      console.log(voucherLimit);
    }
  }

  function handleLimitChange(event) {
    setVoucherLimit(event.target.value);
  }

  const coupon = useRouteLoaderData("couponDetail");
  return (
    <>
      <Modal show={true} size="lg">
        <Modal.Header>
          {coupon ? (
            <Modal.Title>Edit coupon</Modal.Title>
          ) : (
            <Modal.Title>Create new coupon</Modal.Title>
          )}
        </Modal.Header>
        <FormWrapper method="post" className={classes.form}>
          <Row className={classes.row + " mb-3"}>
            <Form.Group as={Col}>
              <Form.Label>Coupon code</Form.Label>
              <Form.Control
                id="couponCode"
                name="couponCode"
                defaultValue={coupon ? coupon.couponCode : ""}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Type</Form.Label>
              <Form.Select
                aria-label="Default select example"
                id="type"
                name="type"
                defaultValue={coupon ? coupon.type : ""}
              >
                <option>Select type...</option>

                <option value="SHIPPING_DISCOUNT" type="text">
                  Shipping discount
                </option>
                <option value="PRICE_DISCOUNT" type="text">
                  Price discount
                </option>
              </Form.Select>
            </Form.Group>
          </Row>
          <Row className={classes.row + " mb-3"}>
            <Form.Group as={Col}>
              <Form.Label>Voucher limit</Form.Label>
              <Form.Control
                id="voucherLimit"
                name="voucherLimit"
                type="number"
                onChange={handleLimitChange}
                disabled={!isLimited}
                defaultValue={coupon ? coupon.voucherLimit : voucherLimit}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label></Form.Label>
              <div className={classes.switch}>
                <Form.Check // prettier-ignore
                  type="switch"
                  id="useLimit"
                  label="Set coupon limit"
                  checked={isLimited}
                  onChange={handleLimitStatusChange}
                />
              </div>
            </Form.Group>
          </Row>
          <Row className={classes.row + " mb-3"}>
            <Form.Group as={Col}>
              <Form.Label>Start date</Form.Label>
              <Form.Control
                id="startDate"
                name="startDate"
                as="input"
                type="datetime-local"
                defaultValue={
                  coupon ? formatDate(coupon.startDate, "PICKER") : ""
                }
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>End date</Form.Label>
              <Form.Control
                id="endDate"
                name="endDate"
                as="input"
                type="datetime-local"
                defaultValue={
                  coupon ? formatDate(coupon.endDate, "PICKER") : ""
                }
              />
            </Form.Group>
          </Row>
          <Row className={classes.row + " mb-3"}>
            <Form.Group as={Col}>
              <Form.Label>Conditions</Form.Label>
              <Form.Control
                id="conditions"
                name="conditions"
                as="textarea"
                defaultValue={coupon ? coupon.conditions : ""}
              />
            </Form.Group>
          </Row>
          <Row className={classes.row + " mb-3"}>
            <Form.Group as={Col}>
              <Form.Label>Description</Form.Label>
              <Form.Control
                id="description"
                name="description"
                as="textarea"
                defaultValue={coupon ? coupon.description : ""}
              />
            </Form.Group>
          </Row>
          <Row className={classes.row + " mb-3"}>
            <Form.Group as={Col}>
              <Form.Label>Discount percentage</Form.Label>
              <Form.Control
                id="discountPercent"
                name="discountPercent"
                as="input"
                type="number"
                defaultValue={coupon ? coupon.discountPercent : ""}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Max discount value</Form.Label>
              <Form.Control
                id="maxDiscountValue"
                name="maxDiscountValue"
                as="input"
                type="number"
                defaultValue={coupon ? coupon.maxDiscountValue : ""}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Currency</Form.Label>
              <Form.Select
                aria-label="Default select example"
                id="unit"
                name="unit"
                defaultValue={coupon ? coupon.unit : ""}
              >
                <option>Select unit...</option>

                <option value="VND" type="text">
                  VND
                </option>
                <option value="USD" type="text">
                  USD
                </option>
              </Form.Select>
            </Form.Group>
          </Row>
          <Modal.Footer>
            <Button variant="primary" type="submit" className={classes.btn}>
              Submit
            </Button>
            <Button variant="secondary" className={classes.btn}>
              <Link className={classes.link} to="/coupons">
                Cancel
              </Link>
            </Button>
          </Modal.Footer>
        </FormWrapper>
      </Modal>
    </>
  );
}

export default CouponForm;

export async function createCoupon(data) {
  const token = getAuthToken();
  const formData = await data.request.formData();
  const postData = Object.fromEntries(formData);
  const response = await fetch("http://localhost:8082/coupons", {
    method: "POST",
    body: JSON.stringify(postData),
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
      "Access-Control-Allow-Credentials": true,
    },
  });
  const resp = await response.json();
  if (!response.ok) {
    alert("Failed to create coupon: " + resp.message);
    return redirect("/coupons/new");
  } else {
    alert("Success!");
    return redirect("/coupons");
  }
}

export async function updateCoupon(data) {
  const token = getAuthToken();
  const couponCode = data.params.couponCode;
  const formData = await data.request.formData();
  const updatedData = Object.fromEntries(formData);
  console.log(updatedData);
  const response = await fetch("http://localhost:8082/coupons", {
    method: "PUT",
    body: JSON.stringify(updatedData),
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
      "Access-Control-Allow-Credentials": true,
    },
  });
  if (!response.ok) {
    alert("Failed to update coupon: " + response.message);
    return redirect(`/coupons/${couponCode}/update`);
  }
  return redirect("/coupons");
}
