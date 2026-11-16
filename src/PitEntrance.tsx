import { useNavigate } from 'react-router-dom';
import background from './assets/pit-entrance/desktop-background.png';
import desktopMonitor from './assets/pit-entrance/desktop-monitor.png';
import mobileMonitor from './assets/pit-entrance/mobile-monitor.png';
import desktopBack from './assets/pit-entrance/desktop-back.svg';
import mobileBack from './assets/pit-entrance/mobile-back.svg';
import { DesktopPitSign, MobilePitSign } from './PitEntranceSigns';

export default function PitEntrance({ mobile, onEnter }: { mobile: boolean; onEnter: () => void }) {
  const navigate = useNavigate();

  return (
    <div className="pit-entrance-artboard">
      <img className="pit-entrance-background" src={background} alt="" />
      <button type="button" className="pit-splash-entry" onClick={onEnter} aria-label="进入维修区讯号系统">
        <img src={mobile ? mobileMonitor : desktopMonitor} alt="" />
      </button>
      {mobile ? <MobilePitSign /> : <DesktopPitSign />}
      <button type="button" className="pit-entrance-back" onClick={() => navigate('/home')}>
        <img src={mobile ? mobileBack : desktopBack} alt="" />
        <span>返回</span>
      </button>
    </div>
  );
}
