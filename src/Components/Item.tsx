/** @jsxImportSource @emotion/react */
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { css, keyframes } from "@emotion/react";
import { getCombinedRoles, serverurl } from "./Appconfig";
import { toast } from "react-toastify";

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-6px); }
  100% { transform: translateY(0px); }
`;

const styles = {
  pageContainer: css({
    minHeight: "100vh",
    backgroundColor: "#f8fafc",
  }),
  contentContainer: css({
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "32px 16px",
    display: "grid",
    gridTemplateColumns: "1fr 420px",
    gap: "40px",
    alignItems: "start",
    "@media (max-width: 880px)": {
      gridTemplateColumns: "1fr",
    },
  }),
  hero: css({
    padding: "32px 16px",
    background:
      "linear-gradient(145deg, rgba(250,250,255,0.9), rgba(226,232,240,0.9))",
    boxShadow: "0 20px 50px rgba(0,0,0,0.06)",
  }),
  kicker: css({
    display: "inline-block",
    background: "linear-gradient(90deg, #2563eb15, #fbbf2420)",
    color: "#2563eb",
    padding: "8px 14px",
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
    padding: "8px 14px",
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
    padding: "8px 14px",
    fontWeight: 700,
    cursor: "pointer",
    border: "none",
    transition: "all 0.25s ease",
    borderRadius: "6px",
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
  aside: css({
    padding: "32px 16px",
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    boxShadow: "0 12px 36px rgba(0,0,0,0.04)",
    textAlign: "center",
  }),
  mediaWrapper: css({
    position: "relative",
    padding: "16px",
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
    height: "auto",
    display: "block",
    backgroundColor: "#000",
  }),
  mediaLabel: css({
    position: "absolute",
    top: "20px",
    right: "20px",
    background: "rgba(0,0,0,0.7)",
    color: "#ffffff",
    padding: "4px 10px",
    borderRadius: "4px",
    fontSize: "12px",
    fontWeight: 600,
  }),
  navBtn: css({
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    background: "rgba(255,255,255,0.9)",
    border: "none",
    cursor: "pointer",
    padding: "8px 14px",
    boxShadow: "0 3px 8px rgba(0,0,0,0.1)",
    fontWeight: 700,
    "&:hover": {
      background: "rgba(255,255,255,1)",
    },
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
      background: active ? "#2563eb" : "#cbd5e1",
      cursor: "pointer",
      borderRadius: "50%",
      transition: "all 0.25s ease",
      "&:hover": {
        background: active ? "#2563eb" : "#94a3b8",
      },
    }),
  audioPlayer: css({
    width: "100%",
    margin: "15px auto",
  }),
  commentArea: css({
    marginTop: "24px",
    textAlign: "left",
  }),
  eventsBox: css({
    background: "linear-gradient(145deg, #f9fafb, #ffffff)",
    border: "1px solid #e2e8f0",
    marginBottom: "18px",
    padding: "16px",
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
    padding: "8px 14px",
    border: "1px solid #cbd5e1",
    marginBottom: "12px",
    fontSize: "15px",
    outline: "none",
    background: "#f8fafc",
    borderRadius: "6px",
    "&:focus": {
      borderColor: "#2563eb",
      boxShadow: "0 0 0 3px rgba(37,99,235,0.15)",
      background: "#ffffff",
    },
  }),
  commentBtn: css({
    padding: "8px 14px",
    fontWeight: 600,
    cursor: "pointer",
    border: "none",
    background: "#2563eb",
    color: "white",
    boxShadow: "0 4px 12px rgba(37,99,235,0.25)",
    transition: "all 0.25s ease",
    borderRadius: "6px",
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
    border: "1px solid #e2e8f0",
    padding: "8px 14px",
    boxShadow: "inset 0 2px 6px rgba(0,0,0,0.04)",
    borderRadius: "6px",
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
  emptyContainer: css({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
  }),
};

interface ItemData {
  id: number;
  churchid: number;
  userid: number;
  category: string;
  department: string | null;
  title: string;
  dateposted: string;
  description: string;
  documentfile?: string;
  documentFileName?: string | null;
  audiofile?: string | null;
  created_at: string;
  offertithes: number;
  offerdonations: number;
  requestspecialprayers: number;
  contributeoffering: number;
  verses?: string[];
  postedby?: string | null;
  churchname?: string;
  carouselimages?: string[];
}

interface Comment {
  fullname: string;
  comment: string;
  churchname: string;
  nationalrole: string;
  executiverole: string;
  districtrole: string;
  assemblyrole: string;
}

type Idprops = {
  itemId: number | null;
};
interface ModalProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setModalContent: React.Dispatch<React.SetStateAction<string>>;
}

const isVideoFile = (url: string): boolean => {
  const videoExtensions = [".mp4", ".webm", ".mov", ".ogg", ".mkv"];
  const extension = url.toLowerCase().split("?")[0].split(".").pop() || "";
  return videoExtensions.includes(`.${extension}`);
};

export const Item: React.FC<Idprops & ModalProps> = ({
  itemId,
  setIsModalOpen,
  setModalContent,
}) => {
  const [posteditems, setpostedItems] = useState<ItemData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [index, setIndex] = useState(0);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${serverurl}/item/list/${itemId}`);
        const items = Array.isArray(response.data)
          ? response.data
          : [response.data];
        setpostedItems(items);
        if (items.length > 0) {
          setSelectedItemId(items[0].id);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch items");
        console.error("Error fetching items:", err);
      } finally {
        setLoading(false);
      }
    };

    if (itemId) {
      fetchItems();
    }
  }, [itemId]);

  const parseVerses = (versesData?: string[]): string[] => {
    if (!versesData || versesData.length === 0) return [];
    try {
      return versesData.flatMap((verse) => {
        const parsed = JSON.parse(verse);
        return Array.isArray(parsed) ? parsed : [parsed];
      });
    } catch {
      return [];
    }
  };

  const next = () => {
    const currentItem = posteditems.find((item) => item.id === selectedItemId);
    const media = currentItem?.carouselimages || [];
    if (media.length === 0) return;
    setIndex((index + 1) % media.length);
  };

  const prev = () => {
    const currentItem = posteditems.find((item) => item.id === selectedItemId);
    const media = currentItem?.carouselimages || [];
    if (media.length === 0) return;
    setIndex((index - 1 + media.length) % media.length);
  };

  const fetchComments = useCallback(async () => {
    try {
      const res = await axios.get(`${serverurl}/comment/list/${itemId}`);
      setComments(res.data); // must be an array
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  }, [itemId]); // <-- only depends on itemId

  useEffect(() => {
    if (itemId) {
      fetchComments();
    }
  }, [fetchComments, itemId]);

  const addComment = async () => {
    if (!commentText.trim()) return;

    try {
      const res = await axios.post(`${serverurl}/comment/add`, {
        itemid: itemId,
        userid: localStorage.getItem("userId"),
        comment: commentText,
      });

      toast.success(res.data.message);
      setCommentText("");

      // Reload comments immediately
      await fetchComments();
    } catch (err) {
      toast.error("Error posting comment");
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div css={styles.emptyContainer}>
        <div css={css({ textAlign: "center" })}>
          <p css={css({ color: "#64748b" })}>Loading items...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div css={styles.emptyContainer}>
        <div css={css({ textAlign: "center" })}>
          <p css={css({ color: "#ef4444", marginBottom: "16px" })}>
            Error: {error}
          </p>
          <p css={css({ color: "#64748b" })}>
            Failed to load items from the server.
          </p>
        </div>
      </div>
    );
  }

  if (posteditems.length === 0) {
    return (
      <div css={styles.emptyContainer}>
        <div css={css({ textAlign: "center" })}>
          <p css={css({ color: "#64748b" })}>No items found.</p>
        </div>
      </div>
    );
  }

  const currentItem = posteditems.find((item) => item.id === selectedItemId);
  if (!currentItem) return null;

  const carouselMedia = currentItem.carouselimages || [];
  const currentMedia = carouselMedia[index];
  const isVideo = isVideoFile(currentMedia || "");
  const versesArray = parseVerses(currentItem.verses);

  return (
    <div css={styles.pageContainer}>
      {/* Content Area */}
      <div css={styles.contentContainer}>
        {/* Main Content */}
        <section css={styles.hero}>
          <div css={styles.kicker}>{currentItem.churchname}</div>
          <h1 css={styles.headline}>{currentItem.title}</h1>
          <small>
            {" "}
            {currentItem.department ? currentItem.department + " Program" : ""}
          </small>
          <br />
          <small>Posted by: {currentItem.postedby || "N/A"}</small>
          <br />
          <small>
            Date:{" "}
            {new Date(currentItem.dateposted).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </small>
          <br />
          <br />
          <p css={styles.lead}>{currentItem.description}</p>

          {/* Document Section */}
          {currentItem.documentfile && (
            <>
              <a
                href={currentItem.documentfile}
                download
                css={css({
                  display: "inline-block",
                  padding: "8px 14px",
                  background: "#fbbf24",
                  color: "white",
                  fontWeight: 600,
                  textDecoration: "none",
                  boxShadow: "0 4px 12px rgba(37,99,235,0.25)",
                  borderRadius: "6px",
                  transition: "all 0.25s ease",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 6px 16px rgba(37,99,235,0.35)",
                  },
                })}
              >
                📄 {currentItem.documentFileName || "View Document"}
              </a>
              <br />
              <br />
            </>
          )}

          {/* Display verses from API data */}
          {versesArray.length > 0 && (
            <div css={styles.features}>
              {versesArray.map((verse, idx) => (
                <div key={idx} css={styles.chip}>
                  📖 {verse}
                </div>
              ))}
            </div>
          )}

          <div css={styles.ctaRow}>
            {currentItem.offertithes === 1 && (
              <button
                onClick={() => {
                  setIsModalOpen(true);
                  setModalContent("Tithe");
                }}
                css={[styles.btn, styles.btnPrimary]}
              >
                Offer tithes
              </button>
            )}
            {currentItem.offerdonations === 1 && (
              <button
                onClick={() => {
                  setIsModalOpen(true);
                  setModalContent("Donation");
                }}
                css={[styles.btn, styles.btnPrimary]}
              >
                Offer donations
              </button>
            )}
            {currentItem.requestspecialprayers === 1 && (
              <button onClick={() => {
                  setIsModalOpen(true);
                  setModalContent("SpecialPrayer");
                }} css={[styles.btn, styles.btnPrimary]}>
                Request Special prayers
              </button>
            )}
            {currentItem.contributeoffering === 1 && (
              <button
                onClick={() => {
                  setIsModalOpen(true);
                  setModalContent("Offering");
                }}
                css={[styles.btn, styles.btnPrimary]}
              >
                Contribute Offering
              </button>
            )}
          </div>
        </section>

        {/* Sidebar with Media & Comments */}
        <aside css={styles.aside}>
          {/* Carousel with images and videos from API */}
          {carouselMedia.length > 0 && (
            <>
              <div css={styles.mediaWrapper}>
                {isVideo ? (
                  <video
                    css={styles.video}
                    controls
                    onError={(e) => {
                      e.currentTarget.poster = "/placeholder.svg";
                    }}
                  >
                    <source src={currentMedia} type="video/mp4" />
                    Your browser does not support the video element.
                  </video>
                ) : (
                  <img
                    css={styles.img}
                    src={currentMedia || "/placeholder.svg"}
                    alt={`Slide ${index + 1}`}
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.svg";
                    }}
                  />
                )}
                {isVideo && <div css={styles.mediaLabel}>🎥 VIDEO</div>}
                <button css={[styles.navBtn, { left: "10px" }]} onClick={prev}>
                  ‹
                </button>
                <button css={[styles.navBtn, { right: "10px" }]} onClick={next}>
                  ›
                </button>
              </div>

              {/* Carousel Indicators */}
              <div css={styles.dots}>
                {carouselMedia.map((_, i) => (
                  <div
                    key={i}
                    css={styles.dot(i === index)}
                    onClick={() => setIndex(i)}
                  />
                ))}
              </div>
            </>
          )}

          {/* Audio Player - only show if audiofile exists */}
          {currentItem.audiofile && (
            <div
              css={css({
                margin: "20px auto",
                padding: "16px",
                border: "1px solid #e2e8f0",
                background: "linear-gradient(145deg, #f9fafb, #ffffff)",
                boxShadow: "inset 0 2px 6px rgba(0,0,0,0.04)",
                textAlign: "left",
                borderRadius: "6px",
              })}
            >
              <audio css={styles.audioPlayer} controls>
                <source src={currentItem.audiofile} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          )}

          {/* Comment Section */}
          <div css={styles.commentArea}>
            <h4
              css={css({
                fontSize: "16px",
                color: "#1e293b",
                fontWeight: 700,
                marginBottom: "14px",
                borderBottom: "1px solid #e2e8f0",
                paddingBottom: "6px",
              })}
            >
              Continue the Discussion & Engagement Forum
            </h4>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                addComment();
              }}
            >
              <input
                css={styles.commentInput}
                type="text"
                placeholder="Write a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    addComment();
                  }
                }}
              />

              <button type="submit" css={styles.commentBtn}>
                Post Comment
              </button>
            </form>

            {/* Comments List */}
            <div css={styles.commentList}>
              {comments.length === 0 ? (
                <div
                  css={css({
                    textAlign: "center",
                    color: "#94a3b8",
                    padding: "12px 0",
                    fontStyle: "italic",
                  })}
                >
                  No comments yet. Be the first to comment!
                </div>
              ) : (
                comments.map((c, idx) => (
                  <div key={idx} css={styles.commentItem}>
                    <div css={styles.commentAuthor}>{c.fullname}</div>
                    <div
                      css={css({
                        marginTop: "4px",
                        fontSize: "11px",
                        color: "#94a3b8",
                        display: "flex",
                      })}
                    >
                      <span>{getCombinedRoles(c)}</span>
                      <span>, {c.churchname}</span>
                    </div>

                    <div css={styles.commentText}>{c.comment}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
