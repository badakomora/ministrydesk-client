/** @jsxImportSource @emotion/react */
import type React from "react";
import { useMemo, useState, useEffect } from "react";
import { css } from "@emotion/react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { serverurl } from "./Appconfig";

/* ----------------------
   Design tokens
   ---------------------- */
const tokens = {
  radius: "8px",
  shadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
  containerBg: "#ffffff",
  inputBg: "#fbfdff",
  border: "#e2e8f0",
  text: "#0f1724",
  muted: "#64748b",
  primary: "#2563eb",
  danger: "#ef4444",
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "12px",
    lg: "20px",
    xl: "28px",
  },
};

/* ----------------------
   Styles
   ---------------------- */
const containerStyle = css`
  max-width: 920px;
  margin: 24px auto;
  padding: ${tokens.spacing.xl};
  background: ${tokens.containerBg};
  box-shadow: ${tokens.shadow};
  color: ${tokens.text};
  border: 1px solid ${tokens.border};
`;

const headingStyle = css`
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 ${tokens.spacing.lg} 0;
  color: ${tokens.text};
`;

const formGrid = css`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${tokens.spacing.lg};

  @media (min-width: 920px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const fullWidth = css`
  grid-column: 1 / -1;
`;

const fieldStyle = css`
  display: flex;
  margin: 10px;
  flex-direction: column;
  gap: ${tokens.spacing.xs};
`;

const labelStyle = css`
  font-weight: 600;
  font-size: 0.9rem;
  color: ${tokens.text};
`;

const inputBase = css`
  width: 100%;
  padding: ${tokens.spacing.sm};
  border: 1px solid ${tokens.border};
  background: ${tokens.inputBg};
  font-size: 0.95rem;
  color: ${tokens.text};

  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: ${tokens.primary};
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.1);
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const selectStyle = css`
  ${inputBase};
  cursor: pointer;
`;

const textareaStyle = css`
  ${inputBase};
  min-height: 110px;
  resize: vertical;
`;

const helpText = css`
  font-size: 0.8rem;
  color: #9ca3af;
  margin-top: 2px;
`;

const errorText = css`
  color: ${tokens.danger};
  font-size: 0.8rem;
  margin-top: 4px;
`;

const fileInputWrapper = css`
  display: flex;
  align-items: center;
  gap: ${tokens.spacing.md};
  flex-wrap: wrap;
`;

const fileButton = css`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: ${tokens.spacing.sm} ${tokens.spacing.md};
  background: ${tokens.primary};
  color: white;
  font-weight: 600;
  font-size: 0.9rem;
  border: none;

  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.15);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 2px solid ${tokens.primary};
    outline-offset: 2px;
  }
`;

const filenameBox = css`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: ${tokens.spacing.sm} ${tokens.spacing.md};
  background: #f8fafc;
  border: 1px solid ${tokens.border};

  font-size: 0.9rem;
  color: ${tokens.muted};
`;

const filenameText = css`
  font-weight: 600;
  color: ${tokens.text};
`;

const thumbsWrap = css`
  display: flex;
  gap: ${tokens.spacing.md};
  margin-top: ${tokens.spacing.md};
  flex-wrap: wrap;
`;

const thumbContainer = css`
  position: relative;
  overflow: hidden;
`;

const thumb = css`
  width: 72px;
  height: 72px;
  object-fit: cover;
  border: 1px solid ${tokens.border};
  display: block;
`;

const thumbVideo = css`
  ${thumb};
  background: #f1f5f9;
`;

const thumbLabel = css`
  position: absolute;
  bottom: 2px;
  right: 2px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  font-size: 0.6rem;
  padding: 2px 4px;
  font-weight: 600;
  border-radius: 2px;
`;

const removeThumbBtn = css`
  position: absolute;
  top: -8px;
  right: -8px;
  background: white;
  width: 24px;
  height: 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${tokens.border};
  cursor: pointer;
  font-size: 0.9rem;
  box-shadow: ${tokens.shadow};
  color: ${tokens.danger};
  font-weight: 700;
  transition: all 0.15s ease;

  &:hover {
    background: ${tokens.danger};
    color: white;
  }

  &:focus-visible {
    outline: 2px solid ${tokens.primary};
  }
`;

const actionsRow = css`
  display: flex;
  gap: ${tokens.spacing.md};
  justify-content: flex-end;
  margin-top: ${tokens.spacing.xl};
  grid-column: 1 / -1;
`;

const primaryButton = (disabled = false) => css`
  padding: ${tokens.spacing.md} ${tokens.spacing.lg};
  font-weight: 600;
  font-size: 0.9rem;
  background: ${tokens.primary};
  color: white;
  border: none;

  cursor: ${disabled ? "not-allowed" : "pointer"};
  opacity: ${disabled ? 0.7 : 1};
  transition: all 0.15s ease;

  &:hover:not(:disabled) {
    opacity: 0.9;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.15);
  }

  &:focus-visible:not(:disabled) {
    outline: 2px solid ${tokens.primary};
    outline-offset: 2px;
  }
`;

const checkboxRow = css`
  display: flex;
  cursor: pointer;
  padding: ${tokens.spacing.sm} 0;
`;

const checkboxInput = css`
  position: relative;
  width: 35px;
  height: 14px;
  appearance: none;
  background: #e5e7eb;
  cursor: pointer;
  outline: none;
  transition: background 0.2s ease;

  &:checked {
    background: ${tokens.primary};
  }

  &:focus-visible {
    outline: 2px solid ${tokens.primary};
    outline-offset: 2px;
  }

  &::before {
    content: "";
    position: absolute;
    top: 2px;
    left: 2px;
    width: 10px;
    height: 10px;
    background: white;
    transition: transform 0.2s ease;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  &:checked::before {
    transform: translateX(20px);
  }
`;

const checkboxLabel = css`
  font-weight: 600;
  font-size: 0.9rem;
  color: ${tokens.text};
  user-select: none;
`;

const bibleVersesSection = css`
  ${fullWidth};
`;

const versesList = css`
  display: flex;
  flex-direction: column;
  gap: ${tokens.spacing.md};
  margin-bottom: ${tokens.spacing.md};
`;

const verseRow = css`
  display: flex;
  align-items: center;
  gap: ${tokens.spacing.sm};
`;

const verseInput = css`
  ${inputBase};
  flex: 1;
`;

const removeVerseBtn = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: #fee2e2;
  color: ${tokens.danger};
  border: none;

  cursor: pointer;
  font-weight: 700;
  transition: all 0.15s ease;
  flex-shrink: 0;

  &:hover {
    background: ${tokens.danger};
    color: white;
  }

  &:focus-visible {
    outline: 2px solid ${tokens.danger};
    outline-offset: 2px;
  }
`;

const addVerseBtn = css`
  padding: ${tokens.spacing.md} ${tokens.spacing.lg};
  background: white;
  border: 1px solid ${tokens.border};

  color: ${tokens.muted};
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    border-color: ${tokens.primary};
    color: ${tokens.primary};
    background: #f8fafc;
  }

  &:focus-visible {
    outline: 2px solid ${tokens.primary};
    outline-offset: 2px;
  }
`;

const audioPlayer = css`
  width: 100%;
  margin-top: ${tokens.spacing.md};
`;

const removeFileBtn = css`
  margin-left: ${tokens.spacing.sm};
  background: transparent;
  border: none;
  cursor: pointer;
  color: ${tokens.danger};
  font-weight: 700;
  font-size: 1rem;
  transition: all 0.15s ease;
  padding: 0;

  &:hover {
    transform: scale(1.15);
  }

  &:focus-visible {
    outline: 2px solid ${tokens.danger};
    outline-offset: 2px;
  }
`;

// const otherFormStyle = css`
//   ${containerStyle};
//   text-align: center;
// `;

/* ----------------------
   Component
   ---------------------- */

type ButtonToggles = {
  offerTithes: number;
  offerDonations: number;
  requestSpecialPrayers: number;
  contributeOffering: number;
};

const buttonLabels: Record<keyof ButtonToggles, string> = {
  offerTithes: "Offer Tithes",
  offerDonations: "Offer Donations",
  requestSpecialPrayers: "Request Special Prayers",
  contributeOffering: "Contribute Offering",
};

type Idprops = {
  itemId?: number | null;
};

interface ModalProps {
  pageContent: string;
}

export const Form: React.FC<Idprops & ModalProps> = ({
  itemId = null,
  pageContent,
}) => {
  const [formData, setFormData] = useState({
    visibility: "",
    discussion: "",
    category: "",
    department: "",
    title: "",
    created_at: "",
    description: "",
    comments: "",
    buttons: {
      offerTithes: 1,
      offerDonations: 1,
      requestSpecialPrayers: 1,
      contributeOffering: 1,
    } as ButtonToggles,
  });

  const [documentFile, setDocumentFile] = useState<File | null>(null);
  const [carouselImages, setCarouselImages] = useState<File[]>([]);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [bibleVerses, setBibleVerses] = useState<string[]>([""]);

  const [fetchedDocumentPath, setFetchedDocumentPath] = useState<string>("");
  const [fetchedCarouselPaths, setFetchedCarouselPaths] = useState<string[]>(
    [],
  );
  const [fetchedAudioPath, setFetchedAudioPath] = useState<string>("");

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  // State for fetched data (church members, message inquiries, prayer requests)
  const [fetchedData, setFetchedData] = useState<any>(null);
  const [dataLoading, setDataLoading] = useState(false);
  const [dataError, setDataError] = useState<string>("");

  const imagePreviews = useMemo(() => {
    return carouselImages.map((f) => ({
      file: f,
      url: URL.createObjectURL(f),
    }));
  }, [carouselImages]);

  useEffect(() => {
    return () => {
      imagePreviews.forEach((p) => URL.revokeObjectURL(p.url));
    };
  }, [imagePreviews]);

  const handleInput = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleToggle =
    (key: keyof ButtonToggles) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        buttons: { ...prev.buttons, [key]: e.target.checked ? 1 : 0 },
      }));
    };

  const onDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    setDocumentFile(f);
    setErrors((prev) => ({ ...prev, documentFile: "" }));
  };

  const onCarouselChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    setCarouselImages(Array.from(files));
    setErrors((prev) => ({ ...prev, carouselImages: "" }));
  };

  const onAudioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    setAudioFile(f);
  };

  const removeImageAt = (index: number) =>
    setCarouselImages((prev) => prev.filter((_, i) => i !== index));

  const removeFetchedImageAt = (index: number) =>
    setFetchedCarouselPaths((prev) => prev.filter((_, i) => i !== index));

  const isVideoFile = (file: File) => file.type.startsWith("video/");

  const isVideoFilePath = (path: string) => {
    const videoExtensions = [".mp4", ".webm", ".avi", ".mov", ".mkv"];
    return videoExtensions.some((ext) => path.toLowerCase().endsWith(ext));
  };

  const removeDocument = () => {
    setDocumentFile(null);
    setFetchedDocumentPath("");
  };

  const removeAudio = () => {
    setAudioFile(null);
    setFetchedAudioPath("");
  };

  const addVerse = () => setBibleVerses((prev) => [...prev, ""]);
  const removeVerse = (idx: number) =>
    setBibleVerses((prev) => prev.filter((_, i) => i !== idx));
  const handleVerseChange = (idx: number, value: string) =>
    setBibleVerses((prev) => prev.map((v, i) => (i === idx ? value : v)));

  useEffect(() => {
    if (!itemId) return;

    let mounted = true;

    axios
      .get(`${serverurl}/item/list/${itemId}`)
      .then((res) => {
        if (!mounted) return;

        const data = Array.isArray(res.data) ? res.data[0] : res.data;

        if (data) {
          setFormData({
            visibility: data.visibility || "",
            discussion: data.discussion || "",
            category: data.category || "",
            department: data.department || "",
            title: data.title || "",
            created_at: data.created_at
              ? new Date(data.created_at).toISOString().split("T")[0]
              : "",
            description: data.description || "",
            comments: data.comments || "",
            buttons: {
              offerTithes: data.offertithes ?? 1,
              offerDonations: data.offerdonations ?? 1,
              requestSpecialPrayers: data.requestspecialprayers ?? 1,
              contributeOffering: data.contributeoffering ?? 1,
            },
          });

          if (data.verses && Array.isArray(data.verses)) {
            setBibleVerses(data.verses.length ? data.verses : [""]);
          } else {
            setBibleVerses([""]);
          }

          if (data.documentfile) {
            setFetchedDocumentPath(data.documentfile);
          } else {
            setFetchedDocumentPath("");
          }

          if (data.carouselimages && Array.isArray(data.carouselimages)) {
            setFetchedCarouselPaths(data.carouselimages);
          } else {
            setFetchedCarouselPaths([]);
          }

          if (data.audiofile) {
            setFetchedAudioPath(data.audiofile);
          } else {
            setFetchedAudioPath("");
          }

          setDocumentFile(null);
          setCarouselImages([]);
          setAudioFile(null);
        }
      })
      .catch((err) => {
        console.error("Error fetching item:", err);
      });

    return () => {
      mounted = false;
    };
  }, [itemId]);

  // Fetch data for Church Members, Message Inquiries, and Prayer Requests
  useEffect(() => {
    if (
      !itemId ||
      (pageContent !== "Church Members" &&
        pageContent !== "Message Inquiries" &&
        pageContent !== "Prayer Requests")
    ) {
      return;
    }

    let mounted = true;
    setDataLoading(true);
    setDataError("");

    let endpoint = "";
    if (pageContent === "Church Members") {
      endpoint = `${serverurl}/user/churchmember/${itemId}`;
    } else if (pageContent === "Message Inquiries") {
      endpoint = `${serverurl}/message/messageinquiry/${itemId}`;
    } else if (pageContent === "Prayer Requests") {
      endpoint = `${serverurl}/prayerrequest/requests/${itemId}`;
    }

    axios
      .get(endpoint)
      .then((res) => {
        if (!mounted) return;
        setFetchedData(res.data);
        setDataLoading(false);
      })
      .catch((err) => {
        if (!mounted) return;
        console.error("Error fetching data:", err);
        setDataError(
          err.response?.data?.message ||
            "Failed to fetch data. Please try again.",
        );
        setDataLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [itemId, pageContent]);

  const handleSubmit = async () => {
    setSubmitting(true);

    try {
      const form = new FormData();

      const churchId =
        typeof window !== "undefined"
          ? localStorage.getItem("userChurchId") || ""
          : "";
      const userId =
        typeof window !== "undefined"
          ? localStorage.getItem("userId") || ""
          : "";

      form.append("churchid", churchId);
      form.append("userid", userId);

      form.append("visibility", formData.visibility);
      form.append("discussion", formData.discussion ? "1" : "0");

      form.append("category", formData.category);
      if (formData.department) form.append("department", formData.department);
      form.append("title", formData.title);
      form.append("created_at", formData.created_at);
      form.append("description", formData.description);
      if (formData.comments) form.append("comments", formData.comments);

      Object.entries(formData.buttons).forEach(([k, v]) =>
        form.append(k, v ? "1" : "0"),
      );

      form.append(
        "verses",
        JSON.stringify(bibleVerses.filter((v) => v.trim() !== "")),
      );

      if (documentFile) form.append("documentFile", documentFile);
      if (audioFile) form.append("audioFile", audioFile);

      if (carouselImages.length) {
        carouselImages.forEach((f) => form.append("carouselImages", f));
      }

      // Use PUT for updates when NOT "create post", use POST for creating
      const isCreatePost = pageContent === "create post";
      const url = isCreatePost
        ? `${serverurl}/item/create`
        : `${serverurl}/item/update/${itemId}`;

      const method = isCreatePost ? axios.post : axios.put;

      await method(url, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Submitted successfully!");

      setFormData({
        visibility: "",
        discussion: "",
        category: "",
        department: "",
        title: "",
        created_at: "",
        description: "",
        comments: "",
        buttons: {
          offerTithes: 1,
          offerDonations: 1,
          requestSpecialPrayers: 1,
          contributeOffering: 1,
        },
      });

      setDocumentFile(null);
      setCarouselImages([]);
      setAudioFile(null);
      setBibleVerses([""]);
      setErrors({});
    } catch (err) {
      console.error(err);
      toast.error("Error submitting form!");
    } finally {
      setSubmitting(false);
    }
  };

  const [showComments, setShowComments] = useState(false);
  const [, setShowDiscussionToggle] = useState<boolean>(false);
  const [, setDiscussionEnabled] = useState<boolean>(false);

  const handleVisibility = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "visibility") {
      if (value === "1") {
        setShowDiscussionToggle(true);
      } else {
        setShowDiscussionToggle(false);
        setDiscussionEnabled(false);
      }
    }
  };

  // CONDITIONAL RENDERING: Show the form if pageContent matches
  if (
    pageContent === "News & Events" ||
    pageContent === "Sermons" ||
    pageContent === "Assembly Programs" ||
    pageContent === "create post"
  ) {
    return (
      <div css={containerStyle}>
        <h2 css={headingStyle}>Create Post / Upload Content</h2>

        <div css={formGrid}>
          {localStorage.getItem("nationalRole") === "N5" ||
          localStorage.getItem("districtRole") === "D2" ? (
            <>
              <div css={[fieldStyle, fullWidth]}>
                <label css={labelStyle}>Who can see this post? *</label>
                <select
                  name="visibility"
                  value={formData.visibility}
                  onChange={handleVisibility}
                  css={selectStyle}
                >
                  <option value="">Select visibility</option>
                  <option value="0">Private</option>
                  <option value="1">Public</option>
                </select>

                {errors.visibility && (
                  <div css={errorText}>{errors.visibility}</div>
                )}
              </div>

              {showComments && (
                <div
                  css={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: "rgba(0,0,0,0.5)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 1000,
                  }}
                >
                  <div
                    css={{
                      background: "#fff",
                      padding: "20px",
                      borderRadius: "10px",
                      width: "300px",
                    }}
                  >
                    <h3>Add Comment</h3>

                    <textarea
                      value={formData.comments || ""}
                      onChange={(e) =>
                        setFormData((prev: any) => ({
                          ...prev,
                          comments: e.target.value,
                        }))
                      }
                      css={{
                        width: "100%",
                        minHeight: "80px",
                        marginTop: "10px",
                      }}
                    />

                    <button
                      onClick={() => setShowComments(false)}
                      css={{
                        marginTop: "10px",
                        padding: "8px 12px",
                        cursor: "pointer",
                      }}
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : null}

          <div css={fieldStyle}>
            <label css={labelStyle}>Category *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInput}
              css={selectStyle}
            >
              <option value="">Select a category</option>
              <option value="1">News & Events</option>
              <option value="2">Churches & Sermons</option>
              <option value="3">Assembly Programs</option>
            </select>
            {errors.category && <div css={errorText}>{errors.category}</div>}
          </div>

          {formData.category === "3" && (
            <div css={fieldStyle}>
              <label css={labelStyle}>Department *</label>
              <select
                name="department"
                value={formData.department}
                onChange={handleInput}
                css={selectStyle}
              >
                <option value="">Select a department</option>
                <option value="Youth">Youth</option>
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="CED">CED</option>
                <option value="Sunday School">Sunday School</option>
              </select>
              {errors.department && (
                <div css={errorText}>{errors.department}</div>
              )}
            </div>
          )}

          <div css={fieldStyle}>
            <label css={labelStyle}>Title *</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleInput}
              css={inputBase}
              placeholder="Add a short, descriptive title"
            />
            {errors.title && <div css={errorText}>{errors.title}</div>}
          </div>

          <div css={fieldStyle}>
            <label css={labelStyle}>Date Posted * </label>
            <input
              type="date"
              name="created_at"
              value={formData.created_at}
              onChange={handleInput}
              css={inputBase}
            />
            {errors.created_at && (
              <div css={errorText}>{errors.created_at}</div>
            )}
          </div>

          <div css={fullWidth}>
            <div css={fieldStyle}>
              <label css={labelStyle}>Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInput}
                css={textareaStyle}
                placeholder="Write a short description or summary for the post..."
              />
              <div css={helpText}>{formData.description.length} characters</div>
              {errors.description && (
                <div css={errorText}>{errors.description}</div>
              )}
            </div>
          </div>

          <label css={labelStyle}>Attach files</label>
          <br />

          <div css={fieldStyle}>
            <label css={labelStyle}>Document File (only pdf, doc, docx)</label>
            <div css={fileInputWrapper}>
              <label css={fileButton} aria-hidden>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  style={{ display: "none" }}
                  onChange={onDocumentChange}
                />
                Upload Document
              </label>
              <div css={filenameBox}>
                {documentFile ? (
                  <>
                    <span css={filenameText}>{documentFile.name}</span>
                    <button
                      onClick={removeDocument}
                      css={removeFileBtn}
                      aria-label="Remove document"
                    >
                      ✕
                    </button>
                  </>
                ) : fetchedDocumentPath ? (
                  <>
                    <span css={filenameText}>
                      {fetchedDocumentPath.split("/").pop()}
                    </span>
                    <button
                      onClick={removeDocument}
                      css={removeFileBtn}
                      aria-label="Remove document"
                    >
                      ✕
                    </button>
                  </>
                ) : (
                  <span css={helpText}>No document selected</span>
                )}
              </div>
            </div>
            {errors.documentFile && (
              <div css={errorText}>{errors.documentFile}</div>
            )}
          </div>

          <div css={fieldStyle}>
            <label css={labelStyle}>Videos & Photos</label>
            <div css={fileInputWrapper}>
              <label css={fileButton} aria-hidden>
                <input
                  type="file"
                  accept="image/*,video/*"
                  multiple
                  style={{ display: "none" }}
                  onChange={onCarouselChange}
                />
                Add Files
              </label>
              <div css={filenameBox}>
                {carouselImages.length + fetchedCarouselPaths.length ? (
                  <span>
                    {carouselImages.length + fetchedCarouselPaths.length}{" "}
                    file(s)
                  </span>
                ) : (
                  <span css={helpText}>No files selected</span>
                )}
              </div>
            </div>
            {errors.carouselImages && (
              <div css={errorText}>{errors.carouselImages}</div>
            )}
          </div>

          {carouselImages.length > 0 && fetchedCarouselPaths.length > 0 && (
            <div css={[fieldStyle, fullWidth]}>
              <div css={thumbsWrap}>
                {imagePreviews.map((preview, idx) => (
                  <div key={`new-${idx}`} css={thumbContainer}>
                    {isVideoFile(preview.file) ? (
                      <video css={thumbVideo} src={preview.url} muted />
                    ) : (
                      <img
                        css={thumb}
                        src={preview.url || "/placeholder.svg"}
                        alt={`Preview ${idx}`}
                      />
                    )}
                    {isVideoFile(preview.file) && (
                      <span css={thumbLabel}>VIDEO</span>
                    )}
                    <button
                      css={removeThumbBtn}
                      onClick={() => removeImageAt(idx)}
                      type="button"
                      aria-label={`Remove file ${idx + 1}`}
                    >
                      ✕
                    </button>
                  </div>
                ))}
                {fetchedCarouselPaths.map((path, idx) => (
                  <div key={`fetched-${idx}`} css={thumbContainer}>
                    {isVideoFilePath(path) ? (
                      <video css={thumbVideo} src={path} muted />
                    ) : (
                      <img
                        css={thumb}
                        src={path}
                        alt={`Fetched Preview ${idx}`}
                      />
                    )}
                    {isVideoFilePath(path) && (
                      <span css={thumbLabel}>VIDEO</span>
                    )}
                    <button
                      css={removeThumbBtn}
                      onClick={() => removeFetchedImageAt(idx)}
                      type="button"
                      aria-label={`Remove fetched file ${idx + 1}`}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div css={fieldStyle}>
            <label css={labelStyle}>Audio File </label>
            <div css={fileInputWrapper}>
              <label css={fileButton} aria-hidden>
                <input
                  type="file"
                  accept="audio/*"
                  style={{ display: "none" }}
                  onChange={onAudioChange}
                />
                Upload Audio
              </label>
              <div css={filenameBox}>
                {audioFile ? (
                  <>
                    <span css={filenameText}>{audioFile.name}</span>
                    <button
                      onClick={removeAudio}
                      css={removeFileBtn}
                      aria-label="Remove audio"
                    >
                      ✕
                    </button>
                  </>
                ) : fetchedAudioPath ? (
                  <>
                    <span css={filenameText}>
                      {fetchedAudioPath.split("/").pop()}
                    </span>
                    <button
                      onClick={removeAudio}
                      css={removeFileBtn}
                      aria-label="Remove audio"
                    >
                      ✕
                    </button>
                  </>
                ) : (
                  <span css={helpText}>No audio selected</span>
                )}
              </div>
            </div>
          </div>

          {audioFile && (
            <div css={fieldStyle}>
              <audio
                css={audioPlayer}
                controls
                src={URL.createObjectURL(audioFile)}
              />
            </div>
          )}

          {fetchedAudioPath && !audioFile && (
            <div css={fieldStyle}>
              <audio css={audioPlayer} controls src={fetchedAudioPath} />
            </div>
          )}

          <div css={[fieldStyle, bibleVersesSection]}>
            <label css={labelStyle}>Bible Verses (If any)</label>
            <div css={versesList}>
              {bibleVerses.map((verse, idx) => (
                <div key={idx} css={verseRow}>
                  <input
                    type="text"
                    value={verse}
                    onChange={(e) => handleVerseChange(idx, e.target.value)}
                    css={verseInput}
                    placeholder="e.g., John 3:16"
                  />
                  {bibleVerses.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeVerse(idx)}
                      css={removeVerseBtn}
                      aria-label={`Remove verse ${idx + 1}`}
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button type="button" onClick={addVerse} css={addVerseBtn}>
              + Add Verse
            </button>
          </div>

          <div css={fieldStyle}>
            <label css={labelStyle}>
              Enable Giving Feature / Disable Feature
            </label>

            {Object.entries(buttonLabels).map(([key, label]) => (
              <label key={key} css={checkboxRow}>
                <input
                  type="checkbox"
                  checked={formData.buttons[key as keyof ButtonToggles] === 1}
                  onChange={handleToggle(key as keyof ButtonToggles)}
                  css={checkboxInput}
                />
                <span css={checkboxLabel}>{label}</span>
              </label>
            ))}
          </div>

          <div css={actionsRow}>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting}
              css={primaryButton(submitting)}
            >
              {submitting ? "Submitting..." : "Submit Post"}
            </button>
          </div>
        </div>
      </div>
    );
  } else if (
    pageContent === "Church Members" ||
    pageContent === "Message Inquiries" ||
    pageContent === "Prayer Requests"
  ) {
    return (
      <div css={containerStyle}>
        <h2 css={headingStyle}>{pageContent}</h2>

        {dataLoading && (
          <div css={{ textAlign: "center", padding: "20px" }}>
            <p>Loading data...</p>
          </div>
        )}

        {dataError && (
          <div
            css={{
              color: tokens.danger,
              padding: "12px",
              marginBottom: "16px",
            }}
          >
            <strong>Error:</strong> {dataError}
          </div>
        )}

        {!dataLoading && fetchedData && (
          <div>
            {Array.isArray(fetchedData) && fetchedData.length > 0 ? (
              <div
                css={{ display: "flex", flexDirection: "column", gap: "16px" }}
              >
                {fetchedData.map((item: any, index: number) => (
                  <div
                    key={index}
                    css={{
                      padding: "16px",
                      border: `1px solid ${tokens.border}`,
                      borderRadius: tokens.radius,
                      backgroundColor: tokens.inputBg,
                    }}
                  >
                    {pageContent === "Church Members" && (
                      <div>
                        <h3 css={{ marginBottom: "8px", color: tokens.text }}>
                          {item.name || item.fullname || "N/A"}
                        </h3>
                        <p css={{ margin: "4px 0", color: tokens.muted }}>
                          <strong>Email:</strong> {item.email || "N/A"}
                        </p>
                        <p css={{ margin: "4px 0", color: tokens.muted }}>
                          <strong>Phone:</strong> {item.phone || "N/A"}
                        </p>
                        <p css={{ margin: "4px 0", color: tokens.muted }}>
                          <strong>Role:</strong> {item.role || "Member"}
                        </p>
                        {item.joindate && (
                          <p css={{ margin: "4px 0", color: tokens.muted }}>
                            <strong>Joined:</strong>{" "}
                            {new Date(item.joindate).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    )}

                    {pageContent === "Message Inquiries" && (
                      <div>
                        <h3 css={{ marginBottom: "8px", color: tokens.text }}>
                          {item.name || item.sender || "Unknown Sender"}
                        </h3>
                        <p css={{ margin: "4px 0", color: tokens.muted }}>
                          <strong>Email:</strong> {item.email || "N/A"}
                        </p>
                        <p css={{ margin: "4px 0", color: tokens.muted }}>
                          <strong>Subject:</strong>{" "}
                          {item.subject || item.title || "N/A"}
                        </p>
                        <p css={{ margin: "8px 0", color: tokens.text }}>
                          <strong>Message:</strong>
                        </p>
                        <p css={{ margin: "4px 0", color: tokens.muted }}>
                          {item.message || item.description || "No message"}
                        </p>
                        {item.created_at && (
                          <p
                            css={{
                              margin: "4px 0",
                              color: tokens.muted,
                              fontSize: "0.85rem",
                            }}
                          >
                            <strong>Date:</strong>{" "}
                            {new Date(item.created_at).toLocaleString()}
                          </p>
                        )}
                      </div>
                    )}

                    {pageContent === "Prayer Requests" && (
                      <div>
                        <h3 css={{ marginBottom: "8px", color: tokens.text }}>
                          {item.name || item.requester || "Anonymous"}
                        </h3>
                        <p css={{ margin: "4px 0", color: tokens.muted }}>
                          <strong>Email:</strong> {item.email || "N/A"}
                        </p>
                        <p css={{ margin: "8px 0", color: tokens.text }}>
                          <strong>Prayer Request:</strong>
                        </p>
                        <p css={{ margin: "4px 0", color: tokens.muted }}>
                          {item.request ||
                            item.message ||
                            item.description ||
                            "No request"}
                        </p>
                        {item.category && (
                          <p css={{ margin: "4px 0", color: tokens.muted }}>
                            <strong>Category:</strong> {item.category}
                          </p>
                        )}
                        {item.created_at && (
                          <p
                            css={{
                              margin: "4px 0",
                              color: tokens.muted,
                              fontSize: "0.85rem",
                            }}
                          >
                            <strong>Date:</strong>{" "}
                            {new Date(item.created_at).toLocaleString()}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div
                css={{
                  textAlign: "center",
                  padding: "20px",
                  color: tokens.muted,
                }}
              >
                <p>No data available for {pageContent}</p>
              </div>
            )}
          </div>
        )}

        {!dataLoading && !fetchedData && !dataError && (
          <div
            css={{ textAlign: "center", padding: "20px", color: tokens.muted }}
          >
            <p>No data found</p>
          </div>
        )}
      </div>
    );
  }
  return null;
};
