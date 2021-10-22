import React from 'react';
import { VotingProps } from './VotingProps';

const Voting: React.FC<VotingProps> = ({
  proposal,
  hasVoted = false,
}): JSX.Element => {
  console.log(Object.keys(proposal));
  return <></>;
};
export default Voting;
