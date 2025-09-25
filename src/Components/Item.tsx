/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { css, keyframes } from "@emotion/react";

// Floating animation for carousel
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-6px); }
  100% { transform: translateY(0px); }
`;

const styles = {
  container: css({
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "40px 20px",
    display: "grid",
    gridTemplateColumns: "1fr 420px",
    gap: "40px",
    alignItems: "center",
    "@media (max-width: 880px)": {
      gridTemplateColumns: "1fr",
    },
  }),
  hero: css({
    padding: "40px",
    borderRadius: "20px",
    background:
      "linear-gradient(145deg, rgba(250,250,255,0.9), rgba(226,232,240,0.9))",
    boxShadow: "0 20px 50px rgba(0,0,0,0.06)",
  }),
  kicker: css({
    display: "inline-block",
    background: "linear-gradient(90deg, #2563eb15, #fbbf2420)",
    color: "#2563eb",
    padding: "6px 12px",
    borderRadius: "999px",
    fontWeight: 700,
    fontSize: "13px",
    marginBottom: "16px",
  }),
  headline: css({
    margin: "0 0 12px",
    fontSize: "clamp(28px, 3.6vw, 42px)",
    lineHeight: 1.2,
    fontFamily: "Merriweather, Georgia, serif",
    color: "#1e293b",
  }),
  lead: css({
    margin: "0 0 20px",
    color: "#475569",
    fontSize: "17px",
    lineHeight: 1.6,
  }),
  features: css({
    display: "flex",
    gap: "14px",
    flexWrap: "wrap",
    marginBottom: "20px",
  }),
  chip: css({
    background: "#ffffff",
    padding: "10px 14px",
    borderRadius: "10px",
    fontSize: "14px",
    fontWeight: 600,
    color: "#1e293b",
    border: "1px solid #e2e8f0",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
  }),
  ctaRow: css({
    display: "flex",
    gap: "14px",
    marginTop: "20px",
    flexWrap: "wrap",
  }),
  btn: css({
    padding: "12px 20px",
    borderRadius: "999px",
    fontWeight: 700,
    cursor: "pointer",
    border: "none",
    transition: "all 0.25s ease",
  }),
  btnPrimary: css({
    background: "linear-gradient(90deg, #2563eb, #fbbf24)",
    color: "white",
    boxShadow: "0 6px 18px rgba(37,99,235,0.25)",
    "&:hover": {
      transform: "translateY(-3px)",
      boxShadow: "0 10px 26px rgba(37,99,235,0.3)",
    },
  }),
  btnGhost: css({
    background: "white",
    border: "1px solid #e2e8f0",
    color: "#1e293b",
    "&:hover": {
      background: "#f8fafc",
    },
  }),
  aside: css({
    padding: "30px",
    borderRadius: "20px",
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    boxShadow: "0 12px 36px rgba(0,0,0,0.04)",
    textAlign: "center",
  }),
  imgWrapper: css({
    position: "relative",
    borderRadius: "14px",
    overflow: "hidden",
    marginBottom: "20px",
    boxShadow: "0 10px 28px rgba(0,0,0,0.1)",
    animation: `${float} 8s ease-in-out infinite`,
  }),
  img: css({
    width: "100%",
    height: "auto",
    display: "block",
  }),
  navBtn: css({
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    background: "rgba(255,255,255,0.9)",
    border: "none",
    cursor: "pointer",
    padding: "6px 10px",
    borderRadius: "50%",
    boxShadow: "0 3px 8px rgba(0,0,0,0.1)",
    fontWeight: 700,
  }),
  dots: css({
    display: "flex",
    justifyContent: "center",
    gap: "8px",
    marginTop: "10px",
  }),
  dot: (active: boolean) =>
    css({
      width: "10px",
      height: "10px",
      borderRadius: "50%",
      background: active ? "#2563eb" : "#cbd5e1",
      cursor: "pointer",
    }),
  tick: css({
    display: "flex",
    alignItems: "flex-start",
    gap: "12px",
    textAlign: "left",
    marginBottom: "16px",
  }),
  small: css({
    fontSize: "14px",
    color: "#64748b",
  }),
};

const Item: React.FC = () => {
  const images = [
    "https://img.freepik.com/premium-photo/workers-forming-human-pyramid-symbolizing-support-teamwork-labor-day_875755-23315.jpg",
    "https://st2.depositphotos.com/4353975/7779/i/450/depositphotos_77796948-stock-photo-silhouette-of-helping-hand-between.jpg",
    "https://images.stockcake.com/public/d/0/a/d0a3eee8-7063-4dad-aa0b-e9b46c94cd94_large/unity-in-diversity-stockcake.jpg",
  ];

  const [index, setIndex] = useState(0);

  const next = () => setIndex((index + 1) % images.length);
  const prev = () => setIndex((index - 1 + images.length) % images.length);

  return (
    <main css={styles.container} role="main">
      <section css={styles.hero}>
        <div css={styles.kicker}>PAG Diani</div>
        <h1 css={styles.headline}>A Special Update for the PAG Family</h1>
        <p css={styles.lead}>
          We are blessed to share this comprehensive update with our beloved PAG
          family. As one body in Christ, we continue to walk together in prayer,
          worship, and fellowship. This season brings growth, unity, and
          opportunities to strengthen our impact in the community and beyond.
        </p>
        <small>Preacher: Pst Peter Komora Andrew</small>
        <small>Date: Sunday 14th, Jan 2025 </small>
        <br />
        <br />
        <div css={styles.features}>
          <div css={styles.chip}>🙏 John 3:13</div>
          <div css={styles.chip}>📖 2nd Corinthiaans 6:35</div>
          <div css={styles.chip}>🤝 Psalms 18:24</div>
          <div css={styles.chip}>🌍 Revelation 7:2</div>
        </div>

        <div css={styles.ctaRow}>
          <button css={[styles.btn, styles.btnPrimary]}>
            Contribute Offering
          </button>
          <button css={[styles.btn, styles.btnGhost]}>Upcoming Events</button>
          <button css={[styles.btn, styles.btnGhost]}>Read More Updates</button>
        </div>
      </section>

      <aside css={styles.aside}>
        <div css={styles.imgWrapper}>
          <img css={styles.img} src={images[index]} alt="Church community" />
          <button
            css={[styles.navBtn, { left: "10px" }]}
            onClick={prev}
            aria-label="Previous slide"
          >
            ‹
          </button>
          <button
            css={[styles.navBtn, { right: "10px" }]}
            onClick={next}
            aria-label="Next slide"
          >
            ›
          </button>
        </div>

        <div css={styles.dots}>
          {images.map((_, i) => (
            <div
              key={i}
              css={styles.dot(i === index)}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>

        <h3>Why stay connected as a PAG Family?</h3>

        <div css={styles.tick}>
          <div style={{ fontSize: 20 }}>✅</div>
          <div>
            <div style={{ fontWeight: 700 }}>United in Faith</div>
            <div css={styles.small}>
              Together, we grow stronger in prayer, worship, and service.
            </div>
          </div>
        </div>

        <div css={styles.tick}>
          <div style={{ fontSize: 20 }}>🌟</div>
          <div>
            <div style={{ fontWeight: 700 }}>Community Impact</div>
            <div css={styles.small}>
              As a family, we bring light and transformation to our
              neighborhoods and beyond.
            </div>
          </div>
        </div>
      </aside>
    </main>
  );
};

export default Item;
