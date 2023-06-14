import { Col, Row } from "react-bootstrap";
function CouponDetailRow({ label, value }) {
  return (
    <Row>
      <Col xs lg="3">
        {label}:{" "}
      </Col>
      <Col>{value}</Col>
    </Row>
  );
}

export default CouponDetailRow;
