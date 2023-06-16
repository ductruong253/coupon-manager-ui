import { getAuthToken } from "../utils/auth";
import { useRouteLoaderData } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Container } from "react-bootstrap";
import CampaignDetailRow from "./CampaignDetailRow";

function CampaignDetail() {
  const campaign = useRouteLoaderData("campaignDetail");
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
          <CampaignDetailRow label="ID" value={campaign.id} />
          <CampaignDetailRow label="Coupon code" value={campaign.campaignCode} />
          <CampaignDetailRow label="Description" value={campaign.description} />
          <CampaignDetailRow label="Group code" value={campaign.vendorCode} />
          <CampaignDetailRow label="Start date" value={campaign.startDate} />
          <CampaignDetailRow label="End date" value={campaign.endDate} />
          <CampaignDetailRow label="Created date" value={campaign.createdDate} />
          <CampaignDetailRow
            label="Approval status"
            value={campaign.approvalStatus}
          />
          <CampaignDetailRow label="Coupon status" value={campaign.status} />
          <CampaignDetailRow
            label="Is active"
            value={campaign.isActive ? "True" : "False"}
          />
          <CampaignDetailRow
            label="Current used"
            value={campaign.currentVoucherCount}
          />
          <CampaignDetailRow
            label="Limit"
            value={
              campaign.voucherLimit === 0 ? "Unlimited" : campaign.voucherLimit
            }
          />
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" href={"./" + campaign.campaignCode + "/update"}>
          Edit
        </Button>
        <Button variant="secondary" href="/campaigns">
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CampaignDetail;

export async function campaignDetailLoader({ params }) {
  const campaignCode = params.campaignCode;
  const token = getAuthToken();
  const response = await fetch(
    `http://localhost:8082/campaigns/campaignCode/${campaignCode}`,
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
  console.log(resData.campaign);
  return resData.campaign;
}
