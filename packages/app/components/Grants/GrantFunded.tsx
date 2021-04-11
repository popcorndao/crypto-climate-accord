import { ElectionMetadata } from '@popcorn/utils/Contracts';
import { ContractsContext } from 'app/contracts';
import { useContext, useEffect, useState } from 'react';
import { Check } from 'react-feather';
import { BeneficiaryMetadata } from './BeneficiaryCard';

interface IGrantFunded {
  beneficiary: BeneficiaryMetadata;
  election: ElectionMetadata;
}


export default function GrantFunded({  election, beneficiary }: IGrantFunded): JSX.Element {
  const { contracts } = useContext(ContractsContext);
  const [awarded, setAwarded] = useState(false);
  const isBeneficiaryGrantRecipient = async () =>{
    setAwarded((await contracts.grant.getActiveAwardees(election.electionTerm)).includes(beneficiary.address));
  }

  useEffect(() => {
    if (contracts?.grant) {
      isBeneficiaryGrantRecipient();
    }
  }, [contracts]);

  if (!awarded) {
    return <></>;
  }

  return (
    <span className="flex flex-row">
      <div className="h-12 w-12 mr-2 rounded-full border-4 border-green-400 flex items-center justify-center flex-shrink-0">
        <Check size={38} className="text-green-400" />
      </div>
      <div>
        <p className="text-lg text-gray-700 font-bold">Funded</p>
        <p className="text-gray-700 text-base">{beneficiary?.totalVotes || 0} votes</p>
      </div>
    </span>
  );
}
