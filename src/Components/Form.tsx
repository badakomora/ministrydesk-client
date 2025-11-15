/** @jsxImportSource @emotion/react */
import React, { useMemo, useState, useEffect } from "react";
import { css } from "@emotion/react";

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

const sectionTitle = css`
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: ${tokens.spacing.md};
  color: ${tokens.muted};
  text-transform: uppercase;
  letter-spacing: 0.4px;
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
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
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
  padding: ${tokens.spacing.sm} ${tokens.spacing.sm};
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
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const filenameBox = css`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: ${tokens.spacing.sm} ${tokens.spacing.sm};
  background: #f8fafc;
  border: 1px solid ${tokens.border};
  font-size: 0.9rem;
  color: ${tokens.muted};
`;

const thumbsWrap = css`
  display: flex;
  gap: ${tokens.spacing.md};
  margin-top: ${tokens.spacing.md};
  flex-wrap: wrap;
`;

const thumb = css`
  width: 72px;
  height: 72px;
  object-fit: cover;
  border: 1px solid ${tokens.border};
`;

const divider = css`
  height: 1px;
  background: ${tokens.border};
  margin: ${tokens.spacing.lg} 0;
  grid-column: 1 / -1;
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
  }
`;

const secondaryButton = css`
  padding: ${tokens.spacing.md} ${tokens.spacing.lg};
  font-weight: 600;
  font-size: 0.9rem;
  background: white;
  border: 1px solid ${tokens.border};
  color: ${tokens.muted};
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    border-color: ${tokens.primary};
    color: ${tokens.primary};
  }
`;

const toggleWrapper = css`
  display: flex;
  gap: ${tokens.spacing.md};
  flex-wrap: wrap;
`;

const checkboxRow = css`
  display: flex;
  align-items: center;
  gap: ${tokens.spacing.md};
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
  }
`;

/* ----------------------
   Component
   ---------------------- */

type ButtonToggles = {
  showDownload: boolean;
  showComment: boolean;
  showContribution: boolean;
  showDonation: boolean;
};

export const Form: React.FC = () => {
  const [formData, setFormData] = useState({
    title: "",
    datePosted: "",
    description: "",
    buttons: {
      showDownload: false,
      showComment: false,
      showContribution: false,
      showDonation: false,
    } as ButtonToggles,
  });

  const [documentFile, setDocumentFile] = useState<File | null>(null);
  const [carouselImages, setCarouselImages] = useState<File[]>([]);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [bibleVerses, setBibleVerses] = useState<string[]>([""]);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleToggle =
    (key: keyof ButtonToggles) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        buttons: { ...prev.buttons, [key]: !prev.buttons[key] },
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
  const removeDocument = () => setDocumentFile(null);
  const removeAudio = () => setAudioFile(null);

  const addVerse = () => setBibleVerses((prev) => [...prev, ""]);
  const removeVerse = (idx: number) =>
    setBibleVerses((prev) => prev.filter((_, i) => i !== idx));
  const handleVerseChange = (idx: number, value: string) =>
    setBibleVerses((prev) => prev.map((v, i) => (i === idx ? value : v)));

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.datePosted.trim()) newErrors.datePosted = "Date is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!documentFile) newErrors.documentFile = "Document file is required";
    if (!carouselImages.length)
      newErrors.carouselImages = "At least one carousel image is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setSubmitting(true);

    try {
      const form = new FormData();
      form.append("title", formData.title);
      form.append("datePosted", formData.datePosted);
      form.append("description", formData.description);
      Object.entries(formData.buttons).forEach(([k, v]) =>
        form.append(k, String(v))
      );
      bibleVerses.forEach((v, i) => form.append(`bibleVerse[${i}]`, v));

      if (documentFile) form.append("documentFile", documentFile);
      if (audioFile) form.append("audioFile", audioFile);
      if (carouselImages.length)
        carouselImages.forEach((f) => form.append("carouselImages", f));

      await new Promise((res) => setTimeout(res, 800));
      alert("✅ Submitted successfully!");

      setFormData({
        title: "",
        datePosted: "",
        description: "",
        buttons: {
          showDownload: false,
          showComment: false,
          showContribution: false,
          showDonation: false,
        },
      });
      setDocumentFile(null);
      setCarouselImages([]);
      setAudioFile(null);
      setBibleVerses([""]);
      setErrors({});
    } catch (err) {
      console.error(err);
      alert("❌ Error submitting");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div css={containerStyle}>
      <h2 css={headingStyle}>Create Post / Upload Content</h2>

      <div css={formGrid}>
        {/* Title */}
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

        {/* Date Posted */}
        <div css={fieldStyle}>
          <label css={labelStyle}>Date Posted *</label>
          <input
            type="date"
            name="datePosted"
            value={formData.datePosted}
            onChange={handleInput}
            css={inputBase}
          />
          {errors.datePosted && <div css={errorText}>{errors.datePosted}</div>}
        </div>

        {/* Description */}
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

        {/* Document File */}
        <div css={fieldStyle}>
          <label css={labelStyle}>Document File (If any)</label>
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
                  <span style={{ fontWeight: 600 }}>{documentFile.name}</span>
                  <button
                    onClick={removeDocument}
                    style={{
                      marginLeft: 8,
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      color: tokens.danger,
                      fontWeight: 700,
                      fontSize: "1rem",
                    }}
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

        {/* Carousel Images */}
        <div css={fieldStyle}>
          <label css={labelStyle}>Videos/Photos (If any)</label>
          <div css={fileInputWrapper}>
            <label css={fileButton} aria-hidden>
              <input
                type="file"
                accept="image/*"
                multiple
                style={{ display: "none" }}
                onChange={onCarouselChange}
              />
              Add Files
            </label>
            <div css={filenameBox}>
              {carouselImages.length ? (
                <span>{carouselImages.length} image(s)</span>
              ) : (
                <span css={helpText}>No images selected</span>
              )}
            </div>
          </div>
          {imagePreviews.length > 0 && (
            <div css={thumbsWrap}>
              {imagePreviews.map((p, idx) => (
                <div key={idx} style={{ position: "relative" }}>
                  <img
                    src={p.url || "/placeholder.svg"}
                    alt={`Thumbnail ${idx}`}
                    css={thumb}
                  />
                  <button
                    onClick={() => removeImageAt(idx)}
                    title="Remove image"
                    style={{
                      position: "absolute",
                      top: -8,
                      right: -8,
                      background: "white",
                      borderRadius: "50%",
                      width: 24,
                      height: 24,
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "1px solid " + tokens.border,
                      cursor: "pointer",
                      fontSize: "0.9rem",
                      boxShadow: tokens.shadow,
                    }}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
          {errors.carouselImages && (
            <div css={errorText}>{errors.carouselImages}</div>
          )}
        </div>

        {/* Audio File */}
        <div css={fieldStyle}>
          <label css={labelStyle}>Audio File (If any)</label>
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
                  <span style={{ fontWeight: 600 }}>{audioFile.name}</span>
                  <button
                    onClick={removeAudio}
                    style={{
                      marginLeft: 8,
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      color: tokens.danger,
                      fontWeight: 700,
                      fontSize: "1rem",
                    }}
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
          {audioFile && (
            <audio
              controls
              src={URL.createObjectURL(audioFile)}
              style={{ width: "100%", marginTop: tokens.spacing.md }}
            />
          )}
        </div>

        <div css={divider} />

        {/* Button Toggles */}
        <div css={fullWidth}>
          <div css={sectionTitle}>Enable Buttons</div>
          <div css={toggleWrapper}>
            {Object.entries(formData.buttons).map(([key, value]) => (
              <label key={key} css={checkboxRow}>
                <input
                  type="checkbox"
                  checked={value}
                  onChange={handleToggle(key as keyof ButtonToggles)}
                  css={checkboxInput}
                />
                <span css={checkboxLabel}>
                  {key
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase())}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Bible Verses */}
        <div css={bibleVersesSection}>
          <div css={sectionTitle}>Bible Verses (Optional)</div>
          <div css={versesList}>
            {bibleVerses.map((verse, idx) => (
              <div key={idx} css={verseRow}>
                <input
                  value={verse}
                  onChange={(e) => handleVerseChange(idx, e.target.value)}
                  css={verseInput}
                  placeholder={`Verse ${idx + 1}`}
                />
                {bibleVerses.length > 1 && (
                  <button
                    type="button"
                    css={removeVerseBtn}
                    onClick={() => removeVerse(idx)}
                    title="Remove verse"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
          </div>
          <button type="button" css={addVerseBtn} onClick={addVerse}>
            + Add Verse
          </button>
        </div>

        <div css={actionsRow}>
          <button
            css={secondaryButton}
            type="button"
            onClick={() => window.location.reload()}
            disabled={submitting}
          >
            Reset
          </button>
          <button
            css={primaryButton(submitting)}
            type="button"
            onClick={handleSubmit}
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};
