import { ClimbingBoxLoader } from 'react-spinners';

export default function LoadingScreen() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <ClimbingBoxLoader color="#cd412b" speedMultiplier={0.5} />
    </div>
  );
}
