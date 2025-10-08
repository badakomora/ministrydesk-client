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
    alignItems: "start",
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
  mediaWrapper: css({
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
  video: css({
    width: "100%",
    borderRadius: "14px",
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
  audioPlayer: css({
    width: "100%",
    marginTop: "15px",
    borderRadius: "12px",
  }),
  commentArea: css({
    marginTop: "24px",
    textAlign: "left",
  }),

  eventsBox: css({
    background: "linear-gradient(145deg, #f9fafb, #ffffff)",
    borderRadius: "14px",
    border: "1px solid #e2e8f0",
    padding: "16px",
    marginBottom: "18px",
    boxShadow: "inset 0 2px 6px rgba(0,0,0,0.04)",
  }),

  eventsTitle: css({
    marginBottom: "10px",
    color: "#2563eb",
    fontWeight: 700,
    fontSize: "15px",
  }),

  eventsList: css({
    listStyle: "none",
    padding: 0,
    margin: 0,
    color: "#475569",
    fontSize: "14px",
    lineHeight: 1.6,
  }),
  commentInput: css({
    width: "90%",
    padding: "12px 14px",
    borderRadius: "14px",
    border: "1px solid #cbd5e1",
    marginBottom: "12px",
    fontSize: "15px",
    outline: "none",
    background: "#f8fafc",
    "&:focus": {
      borderColor: "#2563eb",
      boxShadow: "0 0 0 3px rgba(37,99,235,0.15)",
      background: "#ffffff",
    },
  }),
  commentBtn: css({
    padding: "10px 20px",
    borderRadius: "999px",
    fontWeight: 600,
    cursor: "pointer",
    border: "none",
    background: "linear-gradient(90deg, #2563eb, #fbbf24)",
    color: "white",
    boxShadow: "0 4px 12px rgba(37,99,235,0.25)",
    transition: "all 0.25s ease",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 6px 16px rgba(37,99,235,0.35)",
    },
    marginBottom: "18px",
  }),
  commentList: css({
    maxHeight: "220px",
    overflowY: "auto",
    background: "linear-gradient(145deg, #f9fafb, #ffffff)",
    borderRadius: "14px",
    border: "1px solid #e2e8f0",
    padding: "12px",
    boxShadow: "inset 0 2px 6px rgba(0,0,0,0.04)",
  }),
  commentItem: css({
    padding: "10px 12px",
    borderBottom: "1px solid #e2e8f0",
    "&:last-of-type": { borderBottom: "none" },
  }),
  commentAuthor: css({
    fontWeight: 700,
    fontSize: "14px",
    color: "#1e293b",
    marginBottom: "2px",
  }),
  commentText: css({
    fontSize: "14px",
    color: "#475569",
    lineHeight: 1.4,
  }),
};

type Comment = {
  author: string;
  text: string;
};

interface componentProps {
  activeTab: string;
}

const Item: React.FC<componentProps> = ({ activeTab }) => {
  // Each item can be image or video
  const carouselItems = [
    {
      type: "image",
      src: "https://img.freepik.com/premium-photo/workers-forming-human-pyramid-symbolizing-support-teamwork-labor-day_875755-23315.jpg",
    },
    { type: "video", src: "https://www.w3schools.com/html/mov_bbb.mp4" },
    {
      type: "image",
      src: "https://images.stockcake.com/public/d/0/a/d0a3eee8-7063-4dad-aa0b-e9b46c94cd94_large/unity-in-diversity-stockcake.jpg",
    },
  ];

  const audioSrc = "https://www.w3schools.com/html/horse.mp3"; // example

  const [index, setIndex] = useState(0);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<Comment[]>([
    {
      author: "Staff John",
      text: "Welcome everyone! Share your prayer requests here.",
    },
  ]);

  const next = () => setIndex((index + 1) % carouselItems.length);
  const prev = () =>
    setIndex((index - 1 + carouselItems.length) % carouselItems.length);

  const addComment = () => {
    if (!commentText.trim()) return;
    setComments([...comments, { author: "Member", text: commentText }]);
    setCommentText("");
  };

  const currentItem = carouselItems[index];

  return (
    <main css={styles.container}>
      <section css={styles.hero}>
        <div css={styles.kicker}>PAG Diani</div>
        <h1 css={styles.headline}>A Special Update for the PAG Family</h1>
        <small>
          {activeTab === "NewsItem" ? "Read by : Secretary" : "Sermon by : Pst"}{" "}
          Peter Komora Andrew
        </small>
        <br />
        <small>Date: Sunday 14th, Jan 2025</small>
        <br />
        <br />
        <br />
        <p css={styles.lead}>
          We are blessed to share this comprehensive update with our beloved PAG
          family. As one body in Christ, we continue to walk together in prayer,
          worship, and fellowship. This season brings growth, unity, and
          opportunities to strengthen our impact in the community and beyond.
        </p>

        {activeTab === "AssemblyProgramsItem" ? (
          <div css={styles.eventsBox}>
            <h5 css={styles.eventsTitle}>🕊️ Order of Events</h5>
            <ul css={styles.eventsList}>
              <li>1️⃣ Opening Prayer & Praise Session</li>
              <li>2️⃣ Scripture Reading</li>
              <li>3️⃣ Choir Presentation</li>
              <li>4️⃣ Sermon by Pst Peter Komora Andrew</li>
              <li>5️⃣ Tithes & Offering</li>
              <li>6️⃣ Announcements</li>
              <li>7️⃣ Closing Prayer & Fellowship</li>
            </ul>
          </div>
        ) : (
          ""
        )}

        {activeTab === "SermonsItem" || activeTab === "AssemblyProgramsItem" ? (
          <>
            <div css={styles.features}>
              <div css={styles.chip}>🙏 John 3:13</div>
              <div css={styles.chip}>📖 2nd Corinthians 6:35</div>
              <div css={styles.chip}>🤝 Psalms 18:24</div>
              <div css={styles.chip}>🌍 Revelation 7:2</div>
            </div>
            <div css={styles.ctaRow}>
              <button css={[styles.btn, styles.btnPrimary]}>
                Offer tithes and donations
              </button>
              <button css={[styles.btn, styles.btnGhost]}>
                Request Special prayers
              </button>
              <button css={[styles.btn, styles.btnGhost]}>
                Contribute Offering
              </button>
            </div>
          </>
        ) : (
          ""
        )}
      </section>

      <aside css={styles.aside}>
        <div css={styles.mediaWrapper}>
          {currentItem.type === "image" ? (
            <img css={styles.img} src={currentItem.src} alt="Slide" />
          ) : (
            <video css={styles.video} controls>
              <source src={currentItem.src} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
          <button css={[styles.navBtn, { left: "10px" }]} onClick={prev}>
            ‹
          </button>
          <button css={[styles.navBtn, { right: "10px" }]} onClick={next}>
            ›
          </button>
        </div>

        <div css={styles.dots}>
          {carouselItems.map((_, i) => (
            <div
              key={i}
              css={styles.dot(i === index)}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>

        {/* Audio player below carousel */}
        <audio css={styles.audioPlayer} controls>
          <source src={audioSrc} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>

        {/* Comment Section */}
        <div css={styles.commentArea}>
          <h4>
            {activeTab === "AssemblyProgramsItem"
              ? "Community Updates"
              : "Continue the Discussion & Engagement Forum"}
          </h4>
          <input
            css={styles.commentInput}
            type="text"
            placeholder="Write a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <button css={styles.commentBtn} onClick={addComment}>
            Post Comment
          </button>

          <div css={styles.commentList}>
            {comments.map((c, i) => (
              <div key={i} css={styles.commentItem}>
                <div css={styles.commentAuthor}>{c.author}:</div>
                <div css={styles.commentText}>{c.text}</div>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </main>
  );
};

export default Item;
