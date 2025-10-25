/** @jsxImportSource @emotion/react */
"use client";

/** @jsxImportSource @emotion/react */
import type React from "react";
import { css, keyframes } from "@emotion/react";

// -------------------- Animations --------------------

// -------------------- Global Styles --------------------
const globalStyles = css`
  * {
    box-sizing: border-box;
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
    color: #fbbf24
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    line-height: 1.7;
  }
  h1,
  h2,
  h3,
  h4 {
    font-family: "Merriweather", Georgia, serif;
    color: black;
    line-height: 1.3;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
`;

// -------------------- Animations --------------------
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-6px); }
  100% { transform: translateY(0px); }
`;

const blink = keyframes`
  0%, 50%, 100% { opacity: 1; }
  25%, 75% { opacity: 0; }
`;

// NEW: slide right to left animation
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

// -------------------- Theme of the Week --------------------
const themeOfWeekStyles = css`
  margin: 40px auto 0;
  padding: 8px 12px;
  text-align: center;
  background: white;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);

  p {
    font-size: 18px;
    margin: 0;
    color: #2563eb;
  }

  .divider {
    margin: 16px auto 20px;
    width: 20%;
    height: 3px;
    border-radius: 2px;
    background: #fbbf24;
  }

  .text {
    color: #111827;
    display: block;
    white-space: nowrap;
    animation: ${slideRightLeft} 7s linear infinite;
  }
`;

// -------------------- CTA --------------------
const ctaPrimary = css`
  background: linear-gradient(90deg, #2563eb, #fbbf24);
  color: #fff;
  border: none;
  padding: 8px 12px;
  margin-top: 10px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 6px 20px rgba(37, 99, 235, 0.25);
  transition: all 200ms ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 28px rgba(37, 99, 235, 0.3);
  }
`;

// -------------------- Hero --------------------
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

  p {
    margin: 0 0 30px 0;
    color: #475569;
    font-size: 18px;
    line-height: 1.7;
    max-width: 540px;
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

// -------------------- Stats Highlight --------------------
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

// -------------------- Layout --------------------
const mainStyles = css`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 22px;
`;

const sectionStyles = css`
  margin-top: 90px;
`;

const sectionHeader = css`
  margin-bottom: 36px;
  text-align: center;

  h2 {
    font-size: 28px;
    margin: 0;
    font-weight: 800;
    color: #0f172a;
  }

  .sub {
    margin-top: 8px;
    font-size: 16px;
    color: #64748b;
  }
`;

const infoCardGrid = css`
  display: grid;
  gap: 24px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const infoCardStyles = css`
  background: #fff;
  padding: 32px 24px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  box-shadow: 0 10px 32px rgba(0, 0, 0, 0.04);
  transition: transform 200ms ease, box-shadow 200ms ease;
  text-align: center;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 50px rgba(2, 6, 23, 0.08);
  }

  .icon {
    font-size: 48px;
    margin-bottom: 16px;
  }

  h3 {
    font-size: 20px;
    font-weight: 700;
    color: #111827;
    margin: 0 0 12px 0;
  }

  p {
    font-size: 15px;
    color: #475569;
    margin: 0;
    line-height: 1.6;
  }
`;

const contactSectionStyles = css`
  background: linear-gradient(135deg, #f0f9ff, #fef3c7);
  padding: 60px 40px;
  width: 100%;
  border-radius: 12px;
  margin-top: 90px;
`;

const contactHeaderStyles = css`
  text-align: center;
  margin-bottom: 48px;

  h2 {
    font-size: 32px;
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

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const contactItemStyles = css`
  text-align: center;

  .label {
    font-size: 14px;
    font-weight: 600;
    color: #2563eb;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 8px;
  }

  .value {
    font-size: 18px;
    font-weight: 700;
    color: #111827;
    margin: 0;
  }

  .detail {
    font-size: 14px;
    color: #64748b;
    margin-top: 4px;
  }
`;

const contactFormStyles = css`
  margin-top: 48px;
  background: white;
  padding: 32px;
  border-radius: 8px;
  box-shadow: 0 10px 32px rgba(0, 0, 0, 0.04);

  h3 {
    font-size: 20px;
    font-weight: 700;
    color: #111827;
    margin: 0 0 24px 0;
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
    padding: 12px 16px;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    font-size: 14px;
    font-family: inherit;
    transition: border-color 200ms ease;

    &:focus {
      outline: none;
      border-color: #2563eb;
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
    padding: 12px 24px;
    background: linear-gradient(90deg, #2563eb, #fbbf24);
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    transition: all 200ms ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(37, 99, 235, 0.25);
    }
  }
`;

const socialMediaSectionStyles = css`
  margin-top: 90px;
  padding: 60px 40px;
  border-radius: 12px;
  text-align: center;
`;

const socialMediaHeaderStyles = css`
  margin-bottom: 48px;

  h2 {
    font-size: 32px;
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

const socialMediaGridStyles = css`
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  max-width: 600px;
  margin: 0 auto;

  @media (min-width: 768px) {
    grid-template-columns: repeat(5, 1fr);
  }
`;

const socialMediaLinkStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  cursor: pointer;
  transition: all 200ms ease;
  text-decoration: none;

  &:hover {
    transform: translateY(-8px);
    border-color: #2563eb;
    box-shadow: 0 12px 32px rgba(37, 99, 235, 0.15);
  }

  .icon {
    font-size: 40px;
    margin-bottom: 12px;
  }

  .label {
    font-size: 14px;
    font-weight: 600;
    color: #111827;
  }
`;

const socialStatsStyles = css`
  margin-top: 48px;
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const socialStatItemStyles = css`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);

  .number {
    font-size: 24px;
    font-weight: 800;
    background: linear-gradient(90deg, #2563eb, #fbbf24);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin: 0;
  }

  .label {
    font-size: 13px;
    color: #64748b;
    margin-top: 8px;
    font-weight: 600;
  }
`;

interface componentProps {
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

// -------------------- Home Component --------------------
export const Home: React.FC<componentProps> = ({ setActiveTab }) => {
  return (
    <div css={globalStyles}>
      <main css={mainStyles}>
        {/* ---------- HERO ---------- */}
        <div id="home" css={heroStyles}>
          <div className="content">
            <h1>
              Welcome to <span style={{ color: "#7c3aed" }}>ministry Desk</span>
            </h1>
            <small>
              Access sermons, events, and ministry updates from the entire
              churrch ministry. Connect with local churches, participate in
              programs, and stay informed. Remember, every Sunday is a day for
              giving tithes.
            </small>

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
            <h2>Why These Matter</h2>
            <div className="sub">
              Understanding the importance of staying connected
            </div>
          </div>

          <div css={infoCardGrid}>
            <div css={infoCardStyles}>
              <div className="icon">📰</div>
              <h3>News & Events</h3>
              <p>
                Stay informed about important announcements, community events,
                and ministry updates. Being connected keeps you engaged with
                your church family and ensures you never miss critical
                information across all assemblies
              </p>
            </div>

            <div css={infoCardStyles}>
              <div className="icon">🎙️</div>
              <h3>Churches & Sermons</h3>
              <p>
                Access powerful sermons and spiritual teachings from pastors
                accross all ministry. Whether you missed a service or want to
                revisit a message, our sermon library helps deepen your faith
                and understanding of God's word.
              </p>
            </div>

            <div css={infoCardStyles}>
              <div className="icon">🤝</div>
              <h3>Assembly Programs</h3>
              <p>
                Discover ways to get involved and serve. Join diverse assembly
                programs which offer opportunities for spiritual growth,
                fellowship, and making a meaningful impact in our community.
              </p>
            </div>
          </div>
        </section>

        {/* ---------- CONTACT US ---------- */}
        <section id="contact" css={contactSectionStyles}>
          <div css={contactHeaderStyles}>
            <h2>Get In Touch</h2>
            <p>
              Have questions? We'd love to hear from you. Reach out to us today.
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
              <input type="email" placeholder="Your Email" required />
              <textarea placeholder="Your Message" required />
              <button type="submit">Send Message</button>
            </form>
          </div>
        </section>

        <section id="social-media" css={socialMediaSectionStyles}>
          <div css={socialMediaHeaderStyles}>
            <h2>Connect With Us</h2>
            <p>
              Follow our ministry on social media for daily inspiration and
              updates
            </p>
          </div>

          <div css={socialMediaGridStyles}>
            <a
              href="https://facebook.com/ministrydesk"
              target="_blank"
              rel="noopener noreferrer"
              css={socialMediaLinkStyles}
            >
              <div className="icon">f</div>
              <div className="label">Facebook</div>
            </a>

            <a
              href="https://twitter.com/ministrydesk"
              target="_blank"
              rel="noopener noreferrer"
              css={socialMediaLinkStyles}
            >
              <div className="icon">𝕏</div>
              <div className="label">Twitter</div>
            </a>

            <a
              href="https://instagram.com/ministrydesk"
              target="_blank"
              rel="noopener noreferrer"
              css={socialMediaLinkStyles}
            >
              <div className="icon">📷</div>
              <div className="label">Instagram</div>
            </a>

            <a
              href="https://linkedin.com/company/ministrydesk"
              target="_blank"
              rel="noopener noreferrer"
              css={socialMediaLinkStyles}
            >
              <div className="icon">in</div>
              <div className="label">LinkedIn</div>
            </a>

            <a
              href="https://youtube.com/@ministrydesk"
              target="_blank"
              rel="noopener noreferrer"
              css={socialMediaLinkStyles}
            >
              <div className="icon">▶</div>
              <div className="label">YouTube</div>
            </a>
          </div>

          <div css={socialStatsStyles}>
            <div css={socialStatItemStyles}>
              <p className="number">15K+</p>
              <p className="label">Followers</p>
            </div>

            <div css={socialStatItemStyles}>
              <p className="number">2.5K+</p>
              <p className="label">Engagements</p>
            </div>

            <div css={socialStatItemStyles}>
              <p className="number">500+</p>
              <p className="label">Posts</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
