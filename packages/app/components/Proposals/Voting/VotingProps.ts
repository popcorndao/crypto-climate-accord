import { Proposal } from '@popcorn/hardhat/adapters';

export interface VotingProps {
  proposal: Proposal;
  hasVoted?: boolean;
}
