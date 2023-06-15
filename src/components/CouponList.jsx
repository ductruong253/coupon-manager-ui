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
          <th className={classes.id}>Coupon Code</th>
          <th className={classes.id}>Description</th>
          <th className={classes.id}>Start date</th>
          <th className={classes.id}>End date</th>
          <th className={classes.id}>Created date</th>
          <th className={classes.id}>Approval status</th>
          <th className={classes.id}>Coupon status</th>
        </tr>
      </thead>
      <tbody>
        {couponsList.map((coupon) => (
          <tr key={coupon.id}>
            <td className={classes.id}>{coupon.id}</td>
            <td className={classes.id}>
              <Link to={"" + coupon.couponCode}>{coupon.couponCode}</Link>
            </td>
            <td>
              {coupon.description.length > 50
                ? coupon.description.substring(0, 100) + "..."
                : coupon.description}
            </td>
            <td className={classes.id}>{formatDate(coupon.startDate)}</td>
            <td className={classes.id}>{formatDate(coupon.endDate)}</td>
            <td className={classes.id}>{formatDate(coupon.createdDate)}</td>
            <td className={classes.id}>{coupon.approvalStatus}</td>
            <td className={classes.id}>{coupon.status}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default CouponsList;
