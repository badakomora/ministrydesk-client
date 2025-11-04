/** @jsxImportSource @emotion/react */
import type React from "react";
import { css, keyframes } from "@emotion/react";

// -------------------- Animations --------------------
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-6px); }
  100% { transform: translateY(0px); }
`;

const fadeInUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideRightLeft = keyframes`
  0% {
    transform: translateX(50%);
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  50% {
    transform: translateX(0);
    opacity: 1;
  }
  80% {
    opacity: 1;
  }
  100% {
    transform: translateX(-50%);
    opacity: 0;
  }
`;

const blink = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
`;

// -------------------- Global Styles --------------------
const globalStyles = css`
  * {
    box-sizing: border-box;
  }

  * p {
    font-size: 14px;
    color: #64748b;
    margin: 0;
    line-height: 1.7;
  }
  html,
  body,
  #root {
    height: 100%;
  }
  body {
    margin: 0;
    font-family: "Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI",
      Roboto, "Helvetica Neue", Arial;
    background: #ffffff;
    color: #1f2937;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    line-height: 1.7;
  }
  h1,
  h2,
  h3,
  h4 {
    font-family: "Merriweather", Georgia, serif;
    color: #0f172a;
    line-height: 1.3;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
`;

const heroStyles = css`
  position: relative;
  overflow: hidden;
  padding: 50px;
  display: grid;
  gap: 50px;
  grid-template-columns: 1fr;
  align-items: center;
  background: linear-gradient(
    135deg,
    rgba(250, 250, 255, 0.9),
    rgba(226, 232, 240, 0.9)
  );
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.08);

  @media (min-width: 900px) {
    grid-template-columns: 1fr 450px;
  }

  /* Decorative glowing circles */
  &::before,
  &::after {
    content: "";
    position: absolute;
    border-radius: 50%;
    filter: blur(90px);
    opacity: 0.4;
    z-index: 0;
  }
  &::before {
    top: -60px;
    left: -60px;
    width: 240px;
    height: 240px;
    background: #93c5fd;
  }
  &::after {
    bottom: -60px;
    right: -60px;
    width: 260px;
    height: 260px;
    background: #fde68a;
  }

  .content {
    position: relative;
    z-index: 2;
  }

  h1 {
    margin: 0 0 20px 0;
    font-size: 42px;
    font-weight: 800;
    line-height: 1.2;
    color: #111827;

    @media (min-width: 900px) {
      font-size: 52px;
    }

    span {
      background: linear-gradient(90deg, #7c3aed, #2563eb);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }

  .visual {
    position: relative;
    z-index: 2;
    overflow: hidden;
    box-shadow: 0 20px 60px rgba(15, 23, 42, 0.12);
    animation: ${float} 8s ease-in-out infinite;

    img {
      width: 100%;
      display: block;
    }

    section {
      margin-top: -40px;
      position: relative;
      z-index: 3;
    }
  }
`;

const statsHighlight = css`
  margin-top: 28px;
  font-size: 17px;
  font-weight: 600;
  color: #1e293b;
  backdrop-filter: blur(12px);
  display: flex;
  gap: 15px;
  transition: all 0.25s ease;

  &:hover {
    transform: translateY(-3px);
  }

  > small {
    display: flex;
    align-items: center;
    gap: 15px;

    &::before {
      content: "•";
      font-size: 22px;
      animation: ${blink} 1.4s infinite;
    }
  }

  /* assign different colors to the dots */
  > small:nth-of-type(1)::before {
    color: #2563eb; /* blue */
  }
  > small:nth-of-type(2)::before {
    color: #fbbf24; /* yellow */
  }
`;

const themeOfWeekStyles = css`
  margin: 40px auto 0;
  padding: 16px 20px;
  text-align: center;
  background: white;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);

  p {
    font-size: 16px;
    margin: 0;
    color: #2563eb;
    font-weight: 600;
  }

  .divider {
    margin: 12px auto 16px;
    width: 20%;
    height: 3px;
    border-radius: 2px;
    background: linear-gradient(90deg, #2563eb, #fbbf24);
  }

  .text {
    color: #111827;
    display: block;
    white-space: nowrap;
    animation: ${slideRightLeft} 7s linear infinite;
    font-size: 14px;
    font-weight: 500;
  }
`;

const ctaPrimary = css`
  background: linear-gradient(90deg, #2563eb, #fbbf24);
  color: #fff;
  border: none;
  padding: 8px 14px;
  margin-top: 12px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 8px 24px rgba(37, 99, 235, 0.3);
  transition: all 200ms ease;
  display: inline-block;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(37, 99, 235, 0.4);
  }

  &:active {
    transform: translateY(-2px);
  }
`;

// -------------------- Layout --------------------
const mainStyles = css`
  max-width: 1200px;
  margin: 0 auto;
  padding: 8px 14px;
`;

const sectionStyles = css`
  margin-top: 100px;
  animation: ${fadeInUp} 0.8s ease-out;
`;

const sectionHeader = css`
  margin-bottom: 48px;
  text-align: center;

  h2 {
    font-size: 36px;
    margin: 0 0 12px 0;
    font-weight: 800;
    color: #0f172a;
  }

  .sub {
    margin-top: 8px;
    font-size: 16px;
    color: #64748b;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }
`;

const infoCardGrid = css`
  display: grid;
  gap: 28px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const infoCardStyles = css`
  background: white;
  padding: 8px 14px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
  transition: all 300ms ease;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #2563eb, #fbbf24);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 300ms ease;
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.1);
    border-color: #2563eb;

    &::before {
      transform: scaleX(1);
    }
  }

  .icon {
    font-size: 48px;
    margin-bottom: 20px;
    display: inline-block;
  }

  h3 {
    font-size: 22px;
    font-weight: 700;
    color: #0f172a;
    margin: 0 0 12px 0;
  }
`;

const contactSectionStyles = css`
  background: white;
  padding: 8px 14px;
  margin-top: 100px;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: -50%;
    right: -10%;
    width: 400px;
    height: 400px;
    background: rgba(255, 255, 255, 0.3);
    filter: blur(80px);
  }

  .content {
    position: relative;
    z-index: 2;
  }
`;

const contactHeaderStyles = css`
  text-align: center;
  margin-bottom: 56px;

  h2 {
    font-size: 36px;
    font-weight: 800;
    color: #0f172a;
    margin: 0 0 12px 0;
  }

  p {
    font-size: 16px;
    color: #475569;
    margin: 0;
  }
`;

const contactGridStyles = css`
  display: grid;
  gap: 32px;
  margin-bottom: 48px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const contactItemStyles = css`
  text-align: center;
  background: white;
  padding: 8px 14px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 200ms ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  }

  .label {
    font-size: 13px;
    font-weight: 700;
    color: #2563eb;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    margin-bottom: 8px;
  }

  .value {
    font-size: 18px;
    font-weight: 700;
    color: #0f172a;
    margin: 0;
  }

  .detail {
    font-size: 14px;
    color: #64748b;
    margin-top: 4px;
  }
`;

const contactFormStyles = css`
  background: white;
  padding: 8px 14px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);

  h3 {
    font-size: 22px;
    font-weight: 700;
    color: #0f172a;
    margin: 0 0 28px 0;
    text-align: center;
  }

  form {
    display: grid;
    gap: 16px;

    @media (min-width: 768px) {
      grid-template-columns: 1fr 1fr;
    }
  }

  input,
  textarea {
    padding: 8px 14px;
    border: 1.5px solid #e5e7eb;
    font-size: 14px;
    font-family: inherit;
    transition: all 200ms ease;
    background: #f9fafb;

    &:focus {
      outline: none;
      border-color: #2563eb;
      background: white;
      box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
    }
  }

  textarea {
    grid-column: 1 / -1;
    resize: vertical;
    min-height: 120px;
  }

  button {
    grid-column: 1 / -1;
    padding: 8px 14px;
    background: #2563eb;
    color: white;
    border: none;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    transition: all 200ms ease;
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(37, 99, 235, 0.3);
    }
  }
`;

const testimonialGridStyles = css`
  display: grid;
  gap: 28px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const testimonialCardStyles = css`
  background: white;
  padding: 8px 14px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
  transition: all 300ms ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
  }

  .stars {
    font-size: 16px;
    margin-bottom: 12px;
    color: #fbbf24;
  }

  .quote {
    font-size: 15px;
    color: #475569;
    margin: 0 0 16px 0;
    line-height: 1.7;
    font-style: italic;
  }

  .author {
    font-size: 14px;
    font-weight: 700;
    color: #0f172a;
    margin: 0;
  }

  .role {
    font-size: 13px;
    color: #64748b;
    margin-top: 4px;
  }
`;

const pricingSectionStyles = css`
  margin-top: 100px;
  padding: 8px 14px;
  text-align: center;
`;

const pricingHeaderStyles = css`
  margin-bottom: 50px;

  h2 {
    font-size: 36px;
    font-weight: 800;
    color: #0f172a;
    margin: 0 0 12px 0;
  }

  p {
    font-size: 16px;
    color: #475569;
    margin: 0;
  }
`;

const pricingCardContainerStyles = css`
  display: flex;
  justify-content: center;
  margin-bottom: 48px;
`;

const pricingCardStyles = css`
  background: white;
  padding: 48px 40px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
  position: relative;
  overflow: hidden;
  border: 2px solid #e5e7eb;
  transition: all 300ms ease;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #2563eb, #fbbf24);
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 16px 48px rgba(37, 99, 235, 0.2);
    border-color: #2563eb;
  }

  .badge {
    display: inline-block;
    background: linear-gradient(90deg, #2563eb, #fbbf24);
    color: white;
    padding: 6px 16px;
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    margin-bottom: 24px;
    border-radius: 4px;
  }

  .plan-name {
    font-size: 28px;
    font-weight: 800;
    color: #0f172a;
    margin: 0 0 16px 0;
  }

  .price {
    font-size: 48px;
    font-weight: 800;
    background: linear-gradient(90deg, #2563eb, #fbbf24);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin: 0 0 8px 0;
  }

  .billing-period {
    font-size: 16px;
    color: #64748b;
    margin-bottom: 32px;
  }

  .divider {
    height: 1px;
    background: #e5e7eb;
    margin: 32px 0;
  }

  .features {
    text-align: left;
    margin-bottom: 32px;
  }

  .feature-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 0;
    font-size: 15px;
    color: #475569;

    &::before {
      content: "✓";
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      background: linear-gradient(90deg, #2563eb, #fbbf24);
      color: white;
      font-weight: 700;
      font-size: 14px;
      flex-shrink: 0;
      border-radius: 50%;
    }
  }

  .cta-button {
    width: 100%;
    padding: 12px 24px;
    background: linear-gradient(90deg, #2563eb, #fbbf24);
    color: white;
    border: none;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    transition: all 200ms ease;
    box-shadow: 0 8px 24px rgba(37, 99, 235, 0.3);

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 32px rgba(37, 99, 235, 0.4);
    }

    &:active {
      transform: translateY(0);
    }
  }
`;

interface componentProps {
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}
interface ModalProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
// -------------------- Home Component --------------------
export const Home: React.FC<componentProps & ModalProps> = ({
  setActiveTab,
  setIsModalOpen,
}) => {
  return (
    <div css={globalStyles}>
      <main css={mainStyles}>
        {/* ---------- HERO ---------- */}
        <div id="home" css={heroStyles}>
          <div className="content">
            <h1>
              Welcome to <span style={{ color: "#7c3aed" }}>Ministry Desk</span>
            </h1>
            <p>
              Ministry Desk began as a small internal platform used by a few
              local churches to share sermons and updates. Over time, as the
              ministry grew and more congregations needed a central place for
              communication, it evolved into the unified system you see today,
              connecting churches, leaders, and members under one organized
              digital space.
            </p>
            <p>
              Access sermons, events, and ministry updates from the entire
              church ministry. Connect with local churches, participate in
              programs, and stay informed. Remember, every Sunday is a day for
              giving tithes.
            </p>

            {/* Highlight Stats */}
            <div css={statsHighlight}>
              <small>2000+ church members</small>
              <small>Men Fellowship Week </small>
            </div>
            {/* Hero CTA */}
            <button
              css={ctaPrimary}
              onClick={() =>
                document
                  .querySelector("#why-important")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Learn More
            </button>
          </div>

          <div className="visual">
            <img
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3"
              alt="church gathering"
              style={{ width: "100%", display: "block" }}
            />
            <section css={themeOfWeekStyles}>
              <p>Theme of the Week</p>
              <div className="divider" />
              <p className="text">
                Standing strong together in Christ our Lord.
              </p>
            </section>
          </div>
        </div>

        {/* ---------- WHY THESE MATTER ---------- */}
        <section id="why-important" css={sectionStyles}>
          <div css={sectionHeader}>
            <h2>Why Join Us?</h2>
            <div className="sub">
              Understanding the importance of staying connected with your church
              community
            </div>
          </div>

          <div css={infoCardGrid}>
            <div css={infoCardStyles}>
              <div className="icon">📰</div>
              <h3>News & Events</h3>
              <p>
                Stay informed about important announcements, community events,
                and ministry updates. Being connected keeps you engaged with
                your church family.
              </p>
            </div>

            <div css={infoCardStyles}>
              <div className="icon">🎙️</div>
              <h3>Churches & Sermons</h3>
              <p>
                Access powerful sermons and spiritual teachings from pastors
                across all ministry. Deepen your faith and understanding of
                God's word.
              </p>
            </div>

            <div css={infoCardStyles}>
              <div className="icon">🌿</div>
              <h3>Assembly Programs</h3>
              <p>
                Discover ways to get involved and serve. Join diverse assembly
                programs which offer opportunities for spiritual growth and
                fellowship.
              </p>
            </div>
          </div>
        </section>

        <section id="membership" css={pricingSectionStyles}>
          <div css={pricingHeaderStyles}>
            <h2>Premium Membership</h2>
            <p>
              Unlock full access to all ministry resources and community
              programs
            </p>
          </div>

          <div css={pricingCardContainerStyles}>
            <div css={pricingCardStyles}>
              <div className="badge">Most Popular</div>
              <h3 className="plan-name">Full Access Membership</h3>
              <div className="price">
                <small>
                  <b>KES</b>
                </small>
                149
              </div>
              <p className="billing-period">per month</p>

              <div className="divider" />

              <div className="features">
                <div className="feature-item">
                  <div className="feature-content">
                    <p className="feature-title">News & Events</p>
                    <p className="feature-description">
                      Access church news and be aware of upcoming events, join
                      discussion groups and build meaningful relationships.
                    </p>
                  </div>
                </div>

                <div className="feature-item">
                  <div className="feature-content">
                    <p className="feature-title">Sermons & Teachings</p>
                    <p className="feature-description">
                      Access complete sermon library, download transcripts,
                      watch teachings from all pastors, participate in forums,
                      offer tithes, share testimonies, request special prayers
                      and stay updated on all ministry announcements
                    </p>
                  </div>
                </div>

                <div className="feature-item">
                  <div className="feature-content">
                    <p className="feature-title">Assembly Programs</p>
                    <p className="feature-description">
                      Participate in all assembly programs, connect with other
                      church members, join volunteer opportunities, attend
                      workshops and etc.
                    </p>
                  </div>
                </div>

                <div className="feature-item">
                  <div className="feature-content">
                    <p className="feature-title">Priority Support</p>
                    <p className="feature-description">
                      Get dedicated support from our team, priority response to
                      inquiries, and exclusive member benefits
                    </p>
                  </div>
                </div>
              </div>

              <button
                className="cta-button"
                onClick={() => {
                  setIsModalOpen(true);
                }}
              >
                Subscribe Now
              </button>
            </div>
          </div>
        </section>

        {/* ---------- TESTIMONIALS ---------- */}
        <section id="testimonials" css={sectionStyles}>
          <div css={sectionHeader}>
            <h2>Member Stories</h2>
            <div className="sub">
              Hear from members who have been transformed through ministry Desk
            </div>
          </div>

          <div css={testimonialGridStyles}>
            <div css={testimonialCardStyles}>
              <div className="stars">★★★★★</div>
              <p>
                "This platform has completely changed how I stay connected with
                my church. I never miss an important update or sermon anymore."
              </p>
              <p className="author">Sarah Johnson</p>
              <p className="role">Church Member</p>
            </div>

            <div css={testimonialCardStyles}>
              <div className="stars">★★★★★</div>
              <p>
                "The sermon library is incredible. I can revisit messages and
                share them with my family. It's strengthened our faith journey."
              </p>
              <p className="author">Michael Chen</p>
              <p className="role">Small Group Leader</p>
            </div>

            <div css={testimonialCardStyles}>
              <div className="stars">★★★★★</div>
              <p>
                "Finding volunteer opportunities and assembly programs has never
                been easier. I feel more connected to my church community."
              </p>
              <p className="author">Grace Okonkwo</p>
              <p className="role">Ministry Volunteer</p>
            </div>
          </div>
        </section>

        {/* ---------- CONTACT US ---------- */}
        <section id="contact" css={contactSectionStyles}>
          <div className="content">
            <div css={contactHeaderStyles}>
              <h2>Get In Touch</h2>
              <p>
                Have questions? We'd love to hear from you. Reach out to us
                today.
              </p>
            </div>

            <div css={contactGridStyles}>
              <div css={contactItemStyles}>
                <div className="label">📍 Location</div>
                <p className="value">Head Office</p>
                <p className="detail">Nairobi, Kenya</p>
              </div>

              <div css={contactItemStyles}>
                <div className="label">📞 Phone</div>
                <p className="value">+254 (0) 123 456 789</p>
                <p className="detail">Mon - Fri, 9am - 5pm</p>
              </div>

              <div css={contactItemStyles}>
                <div className="label">✉️ Email</div>
                <p className="value">info@ministrydesk.org</p>
                <p className="detail">We'll respond within 24 hours</p>
              </div>
            </div>

            <div css={contactFormStyles}>
              <h3>Send us a Message</h3>
              <form onSubmit={(e) => e.preventDefault()}>
                <input type="text" placeholder="Your Name" required />
                <input type="text" placeholder="Your Phone" required />
                <textarea placeholder="Your Message" required />
                <button type="submit">Send Message</button>
              </form>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
