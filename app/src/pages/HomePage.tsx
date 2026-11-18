import { OrbitStage } from '../components/OrbitStage'
import { ContactDock } from '../components/ContactDock'
import { SocialSection } from '../components/SocialSection'
import { AddressSection } from '../components/AddressSection'
import { FollowCue } from '../components/FollowCue'
import { ContactFab } from '../components/ContactFab'

export function HomePage() {
  // the next room page entered from here plays the house's fog reveal
  return (
    <div className="home">
      <div className="home-screen">
        <header className="bar" />

        <p className="idiom">
          <span className="idiom-l1">Make Your Space,</span>
          <span className="idiom-l2">Make Your Lifestyle</span>
          <svg viewBox="0 0 230 16" aria-hidden="true"><path d="M3 11 C 50 4, 110 2, 160 6 S 215 12, 227 5" /></svg>
        </p>

        <OrbitStage />

        <footer className="bar">
          <span>
            <span className="mouse">Hover to preview · Click to shop</span>
            <span className="touch">Tap to preview · Tap again to shop</span>
            <span className="th">
              <span className="mouse">เลื่อนเมาส์ดูรายละเอียด · คลิกเพื่อเลือกซื้อ</span>
              <span className="touch">แตะเพื่อดูรายละเอียด · แตะอีกครั้งเพื่อเลือกซื้อ</span>
            </span>
          </span>
        </footer>
      </div>

      <SocialSection />
      <AddressSection />
      <FollowCue />
      <ContactDock />
      <ContactFab />
    </div>
  )
}
