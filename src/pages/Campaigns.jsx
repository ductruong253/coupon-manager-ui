import CampaignsList from "../components/CampaignList";
import { Col, Row, Container, Button } from "react-bootstrap";
import { getAuthToken } from "../utils/auth";
import { Outlet } from "react-router-dom";
import classes from "./Campaigns.module.css";

function CampaignPage() {
  return (
    <>
      <Outlet></Outlet>
      <Container fluid="md">
        <Row className={classes.btn_group}>
          <Col className={classes.btn_group}>
            <Button
              variant="primary"
              className={classes.btn}
              href="/campaigns/new"
            >
              New Campaign
            </Button>
          </Col>
        </Row>
        <Row className={classes.list}>
          <Col>
            <CampaignsList />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default CampaignPage;

export async function campaignsLoader() {
  const token = getAuthToken();
  const response = await fetch("http://localhost:8082/campaigns", {
    method: "GET",
    credentials: "include",
    headers: {
      Authorization: "Bearer " + token,
      "Access-Control-Allow-Credentials": true,
    },
  });
  const resData = await response.json();
  return resData.campaigns;
}
