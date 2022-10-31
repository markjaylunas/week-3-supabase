import { Button, Table } from "@mantine/core";
import React from "react";
import { PeerReview } from "./PeerReviewMain";

const PeerReviewList = ({
  peerReviewList,
}: {
  peerReviewList: PeerReview[];
}) => {
  const rows = peerReviewList.map((peer) => {
    const date = new Date(peer.created_at);
    const dateFormatted = `${date.getMonth()}/${date.getDay()}/${date.getFullYear()}`;
    return (
      <tr key={peer.id}>
        <td>{peer.email}</td>
        <td>{dateFormatted}</td>
        <td>
          <Button>View</Button>
        </td>
        {/* <td>{peer.stood_out}</td> */}
      </tr>
    );
  });
  return (
    <Table>
      <thead>
        <tr>
          <th>Peer</th>
          <th>Created At</th>
          {/* <th>Stood Out</th> */}
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
};

export default PeerReviewList;
