import VoteButton from './VoteButton';
import VotingItems from './VotingItems';

export default function Voting() {
  return (
    <div>
      <h1 className="text-7xl text-center mb-4">Map voting</h1>
      <VotingItems id="q0EMcKlzdm8VOpyCmE6Q" />
      <div className='mt-5 flex justify-center'>
        <VoteButton />
      </div>
    </div>
  );
}
