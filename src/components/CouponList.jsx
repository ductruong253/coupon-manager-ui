import Table from "react-bootstrap/Table";
import { useLoaderData, Link } from "react-router-dom";
import { formatDate } from "../utils/utils";
import classes from "./CouponList.module.css";

function CouponsList() {
  const couponsList = useLoaderData();
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th className={classes.id}>ID</th>
          <th>Coupon Code</th>
          <th>Description</th>
          <th>Start date</th>
          <th>End date</th>
          <th>Created date</th>
          <th>Approval status</th>
          <th>Coupon status</th>
        </tr>
      </thead>
      <tbody>
        {couponsList.map((coupon) => (
          <tr key={coupon.id}>
            <td className={classes.id}>{coupon.id}</td>
            <td>
              <Link to={"" + coupon.couponCode}>{coupon.couponCode}</Link>
            </td>
            <td>{coupon.description}</td>
            <td>{formatDate(coupon.startDate)}</td>
            <td>{formatDate(coupon.endDate)}</td>
            <td>{formatDate(coupon.createdDate)}</td>
            <td>{coupon.approvalStatus}</td>
            <td>{coupon.status}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default CouponsList;
