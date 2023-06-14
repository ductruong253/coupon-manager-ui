import CouponsList from "../components/CouponList";
import { Col, Row, Container, Button } from "react-bootstrap";
import { getAuthToken } from "../utils/auth";
import { Outlet } from "react-router-dom";
import classes from "./Coupons.module.css";

function CouponPage() {
  return (
    <>
      <Outlet></Outlet>
      <Container fluid="md">
        <Row className={classes.btn_group}>
          <Col className={classes.btn_group}>
            <Button
              variant="primary"
              className={classes.btn}
              href="/coupons/new"
            >
              {/* <Link className={classes.link} to="/groups/newGroup">Create group</Link> */}
              New Coupon
            </Button>
          </Col>
        </Row>
        <Row className={classes.list}>
          <Col>
            <CouponsList />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default CouponPage;

export async function couponsLoader() {
  const token = getAuthToken();
  const response = await fetch("http://localhost:8082/coupons", {
    method: "GET",
    credentials: "include",
    headers: {
      Authorization: "Bearer " + token,
      "Access-Control-Allow-Credentials": true,
    },
  });
  const resData = await response.json();
  console.log(resData);
  return resData.coupons;
}
