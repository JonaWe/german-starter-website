import Button from '../components/UI/Button';
import useLocalization from '../hooks/useLocalization';
import { NextPage } from 'next';

const Rules: NextPage = () => {
  const t = useLocalization();
  //return <Button text={t.headerText} primary onClick={() => 1} />;
  return (
    <div className="text-sand-500">
      <h2 className="text-5xl">§1. {t.rules[1].title}</h2>
      <p>(1) {t.rules[1][1]}</p>
      <p>(2) {t.rules[1][2]}</p>
      <p>(3) {t.rules[1][3]}</p>
      <p>(4) {t.rules[1][4]}</p>
      <p>(5) {t.rules[1][5]}</p>
      <p>(6) {t.rules[1][6]}</p>
      <p>(7) {t.rules[1][7]}</p>
      <p>(8) {t.rules[1][8]}</p>
      <p>(9) {t.rules[1][9]}</p>
      <p>(10) {t.rules[1][10]}</p>
      <p>(11) {t.rules[1][11]}</p>
      <p>Anmerkung: {t.rules[1].anmerkung}</p>
      <h2 className="text-5xl">§2. {t.rules[2].title}</h2>
      <p>(1) {t.rules[2][1]}</p>
      <p>(2) {t.rules[2][2]}</p>
      <p>(3) {t.rules[2][3]}</p>
      <p>(4) {t.rules[2][4]}</p>
      <p>(5) {t.rules[2][5]}</p>
      <p>(6) {t.rules[2][6]}</p>
      <h2 className="text-5xl">§3. {t.rules[3].title}</h2>
      <p>(1) {t.rules[3][1]}</p>
      <p>(2) {t.rules[3][2]}</p>
      <p>(3) {t.rules[3][3]}</p>
      <p>(4) {t.rules[3][4]}</p>
      <p>(5) {t.rules[3][5]}</p>
      <p>(6) {t.rules[3][6]}</p>
      <p>(7) {t.rules[3][7]}</p>
      <p>(8) {t.rules[3][8]}</p>
      <h2 className="text-5xl">§4. {t.rules[4].title}</h2>
      <p>(1) {t.rules[4][1]}</p>
      <p>(2) {t.rules[4][2]}</p>
      <p>(3) {t.rules[4][3]}</p>
      <p>(4) {t.rules[4][4]}</p>
      <p>(5) {t.rules[4][5]}</p>
      <p>(6) {t.rules[4][6]}</p>
      <p>(7) {t.rules[4][7]}</p>
    </div>
  );
};

export default Rules;
