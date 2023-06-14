import { getAuthToken } from "../utils/auth";
import { useRouteLoaderData } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Container } from "react-bootstrap";
import CouponDetailRow from "./CouponDetailRow";

function CouponDetail() {
  const coupon = useRouteLoaderData("couponDetail");
  return (
    <Modal
      show={true}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Coupon details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <CouponDetailRow label="ID" value={coupon.id} />
          <CouponDetailRow label="Coupon code" value={coupon.couponCode} />
          <CouponDetailRow label="Description" value={coupon.description} />
          <CouponDetailRow label="Group code" value={coupon.vendorCode} />
          <CouponDetailRow label="Start date" value={coupon.startDate} />
          <CouponDetailRow label="End date" value={coupon.endDate} />
          <CouponDetailRow label="Created date" value={coupon.createdDate} />
          <CouponDetailRow
            label="Approval status"
            value={coupon.approvalStatus}
          />
          <CouponDetailRow label="Coupon status" value={coupon.status} />
          <CouponDetailRow
            label="Is active"
            value={coupon.isActive ? "True" : "False"}
          />
          <CouponDetailRow
            label="Current used"
            value={coupon.currentVoucherCount}
          />
          <CouponDetailRow
            label="Limit"
            value={
              coupon.voucherLimit === 0 ? "Unlimited" : coupon.voucherLimit
            }
          />
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" href={"./" + coupon.couponCode + "/edit"}>
          Edit
        </Button>
        <Button variant="secondary" href="/coupons">
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CouponDetail;

export async function couponDetailLoader({ params }) {
  const couponCode = params.couponCode;
  const token = getAuthToken();
  const response = await fetch(
    `http://localhost:8082/coupons/couponCode/${couponCode}`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        Authorization: "Bearer " + token,
        "Access-Control-Allow-Credentials": true,
      },
    }
  );
  const resData = await response.json();
  console.log(resData.coupon);
  return resData.coupon;
}
