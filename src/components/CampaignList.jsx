import Table from "react-bootstrap/Table";
import { useLoaderData, Link } from "react-router-dom";
import { formatDate } from "../utils/utils";
import classes from "./CampaignList.module.css";

function CampaignsList() {
  const CampaignsList = useLoaderData();
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th className={classes.id}>ID</th>
          <th className={classes.id}>Campaign Code</th>
          <th className={classes.id}>Description</th>
          <th className={classes.id}>Start date</th>
          <th className={classes.id}>End date</th>
          <th className={classes.id}>Created date</th>
          <th className={classes.id}>Approval status</th>
          <th className={classes.id}>Campaign status</th>
        </tr>
      </thead>
      <tbody>
        {CampaignsList.map((campaign) => (
          <tr key={campaign.id}>
            <td className={classes.id}>{campaign.id}</td>
            <td className={classes.id}>
              <Link to={"" + campaign.campaignCode}>
                {campaign.campaignCode}
              </Link>
            </td>
            <td>
              {campaign.description.length > 50
                ? campaign.description.substring(0, 100) + "..."
                : campaign.description}
            </td>
            <td className={classes.id}>{formatDate(campaign.startDate)}</td>
            <td className={classes.id}>{formatDate(campaign.endDate)}</td>
            <td className={classes.id}>{formatDate(campaign.createdDate)}</td>
            <td className={classes.id}>{campaign.approvalStatus}</td>
            <td className={classes.id}>{campaign.status}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default CampaignsList;
