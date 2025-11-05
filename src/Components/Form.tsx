/** @jsxImportSource @emotion/react */
import React, { useMemo, useState } from "react";
import { css } from "@emotion/react";

/**
 * EnhancedForm.tsx
 * - Responsive 2-column layout on wide screens
 * - Custom file inputs with filename / previews
 * - Professional design tokens (spacing, type scale, radius, shadows)
 * - Refined toggle switches for "Enable Buttons"
 * - Inline error UI and disabled submit state
 */

/* ----------------------
   Design tokens / tokens
   ---------------------- */
const tokens = {
  radius: "8px",
  shadow: "0 6px 18px rgba(12, 22, 39, 0.06)",
  containerBg: "#ffffff",
  surface: "#f7fafc",
  inputBg: "#fbfdff",
  border: "#e6eef6",
  text: "#0f1724",
  muted: "#556070",
  primary: "#2563eb", // accent blue
  danger: "#dc2626",
  spacing: {
    xs: "6px",
    sm: "12px",
    md: "18px",
    lg: "28px",
  },
  font: {
    base: "16px",
    large: "20px",
  },
};

/* ----------------------
   Styles
   ---------------------- */
const containerStyle = css`
  max-width: 980px;
  margin: 28px auto;
  padding: 28px;
  background: ${tokens.containerBg};
  box-shadow: ${tokens.shadow};
  color: ${tokens.text};
  font-size: ${tokens.font.base};
  border: 1px solid ${tokens.border};
`;

/* Header */
const headingStyle = css`
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0 0 ${tokens.spacing.md} 0;
  color: ${tokens.text};
`;

/* Subheading / section */
const sectionTitle = css`
  font-size: 0.95rem;
  font-weight: 600;
  margin-bottom: ${tokens.spacing.sm};
  color: ${tokens.muted};
`;

/* Grid layout: single column by default, two columns above 920px */
const formGrid = css`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${tokens.spacing.md};

  @media (min-width: 920px) {
    grid-template-columns: 1fr 1fr;
    align-items: start;
  }
`;

/* Full width area (for description textarea spanning both columns) */
const fullWidth = css`
  grid-column: 1 / -1;
`;

/* Field wrapper */
const fieldStyle = css`
  display: flex;
  flex-direction: column;
  margin: ${tokens.spacing.xs};
`;

/* Label */
const labelStyle = css`
  font-weight: 600;
  font-size: 0.95rem;
  color: ${tokens.muted};
`;

/* Shared input style */
const inputBase = css`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid ${tokens.border};
  background: ${tokens.inputBg};
  font-size: 0.95rem;
  color: ${tokens.text};
  transition: border-color 0.18s ease, box-shadow 0.18s ease;

  &:focus {
    outline: none;
    border-color: ${tokens.primary};
    box-shadow: 0 6px 18px rgba(37, 99, 235, 0.12);
    background: #ffffff;
  }

  &::placeholder {
    color: #9aa7b8;
  }
`;

/* Textarea */
const textareaStyle = css`
  ${inputBase};
  min-height: 120px;
  resize: vertical;
`;

/* Small helper text */
const helpText = css`
  font-size: 0.85rem;
  color: #6b7280;
`;

/* Error text */
const errorText = css`
  color: ${tokens.danger};
  font-size: 0.85rem;
  margin-top: 6px;
`;

/* Custom file input: hidden native input + styled label */
const fileInputWrapper = css`
  display: flex;
  gap: ${tokens.spacing.sm};
  align-items: center;
  flex-wrap: wrap;
`;

const fileButton = css`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  background: ${tokens.primary};
  color: white;
  font-weight: 600;
  font-size: 0.95rem;
  border: none;
  cursor: pointer;
  box-shadow: none;
  transition: transform 0.12s ease, opacity 0.12s ease;

  &:hover {
    transform: translateY(-2px);
    opacity: 0.95;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const filenameBox = css`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  background: #f3f7fb;
  border: 1px solid ${tokens.border};
  font-size: 0.9rem;
  color: ${tokens.muted};
`;

/* Thumbnails for multiple images */
const thumbsWrap = css`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 8px;
`;

const thumb = css`
  width: 64px;
  height: 64px;
  object-fit: cover;
  border: 1px solid ${tokens.border};
`;

/* Toggle (switch) */
const toggleRow = css`
  display: flex;
  gap: ${tokens.spacing.sm};
  align-items: center;
  flex-wrap: wrap;
`;

const toggleLabel = css`
  display: flex;
  align-items: center;
  gap: 12;
`;

const switchTrack = (checked: boolean) => css`
  width: 20px;
  height: 20px;
  background: ${checked ? tokens.primary : "#e6eef6"};
  padding: 4px;
  position: relative;
  transition: background 0.18s ease;
  box-shadow: ${checked ? "0 6px 18px rgba(37,99,235,0.12)" : "none"};
`;

const switchThumb = (checked: boolean) => css`
  width: 22px;
  height: 22px;
  background: ${checked ? "white" : "white"};
  transform: translateX(${checked ? "22px" : "0"});
  transition: transform 0.18s ease;
  box-shadow: 0 3px 8px rgba(12, 22, 39, 0.12);
`;

/* Submit button */
const actionsRow = css`
  display: flex;
  gap: ${tokens.spacing.sm};
  align-items: center;
  justify-content: flex-end;
  margin-top: ${tokens.spacing.md};
  grid-column: 1 / -1;
`;

const primaryButton = (disabled = false) => css`
  ${fileButton};
  background: ${tokens.primary};
  padding: 10px 16px;
  font-size: 0.95rem;
  cursor: ${disabled ? "not-allowed" : "pointer"};
  opacity: ${disabled ? 0.6 : 1};
`;

/* Secondary button */
const secondaryButton = css`
  padding: 8px 12px;
  font-weight: 600;
  background: transparent;
  border: 1px solid ${tokens.border};
  color: ${tokens.muted};
  cursor: pointer;
`;

/* Small subtle divider for grouping */
const divider = css`
  height: 1px;
  background: ${tokens.border};
  margin: ${tokens.spacing.md} 0;
`;

/* ----------------------
   Component
   ---------------------- */

type ButtonToggles = {
  showDownload: boolean;
  showComment: boolean;
  showShare: boolean;
};

export const Form: React.FC = () => {
  const [formData, setFormData] = useState({
    title: "",
    datePosted: "",
    description: "",
    buttons: {
      showDownload: false,
      showComment: false,
      showShare: false,
    } as ButtonToggles,
  });

  const [documentFile, setDocumentFile] = useState<File | null>(null);
  const [carouselImages, setCarouselImages] = useState<File[]>([]);
  const [audioFile, setAudioFile] = useState<File | null>(null);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  /* Create previews for thumbnails (object URLs) */
  const imagePreviews = useMemo(() => {
    return carouselImages.map((f) => ({
      file: f,
      url: URL.createObjectURL(f),
    }));
    // Note: In a real app you'd revokeObjectURL when component unmounts or image removed
  }, [carouselImages]);

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    const { name, value, type } = target;

    if (type === "checkbox") {
      // not used here; toggles handled separately
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleToggle =
    (key: keyof ButtonToggles) => (e: React.MouseEvent | React.ChangeEvent) => {
      setFormData((prev) => ({
        ...prev,
        buttons: { ...prev.buttons, [key]: !prev.buttons[key] },
      }));
    };

  /* File handlers */
  const onDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    setDocumentFile(f);
    setErrors((prev) => ({ ...prev, documentFile: "" }));
  };

  const onCarouselChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    // convert FileList to array and append (or replace)
    const arr = Array.from(files);
    setCarouselImages(arr);
    setErrors((prev) => ({ ...prev, carouselImages: "" }));
  };

  const onAudioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    setAudioFile(f);
  };

  const removeImageAt = (index: number) => {
    setCarouselImages((prev) => prev.filter((_, i) => i !== index));
  };

  const removeDocument = () => setDocumentFile(null);
  const removeAudio = () => setAudioFile(null);

  /* Validation */
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

  /* Submit */
  const handleSubmit = async () => {
    if (!validate()) return;
    setSubmitting(true);

    try {
      const form = new FormData();
      form.append("title", formData.title);
      form.append("datePosted", formData.datePosted);
      form.append("description", formData.description);
      form.append("showDownload", String(formData.buttons.showDownload));
      form.append("showComment", String(formData.buttons.showComment));
      form.append("showShare", String(formData.buttons.showShare));

      if (documentFile) form.append("documentFile", documentFile);
      if (audioFile) form.append("audioFile", audioFile);
      if (carouselImages.length)
        carouselImages.forEach((f) => form.append("carouselImages", f));

      // TODO: replace with real API request (axios/fetch)
      await new Promise((res) => setTimeout(res, 800)); // fake delay
      // console.log('form ready to upload', form);
      alert("✅ Submitted successfully!");
      // reset lightly
      setFormData({
        title: "",
        datePosted: "",
        description: "",
        buttons: { showDownload: false, showComment: false, showShare: false },
      });
      setDocumentFile(null);
      setCarouselImages([]);
      setAudioFile(null);
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
          <div css={labelStyle}>Title *</div>
          <input
            name="title"
            value={formData.title}
            onChange={handleInput}
            css={inputBase}
            placeholder="Add a short, descriptive title"
            aria-invalid={!!errors.title}
            aria-describedby={errors.title ? "title-error" : undefined}
          />
          {errors.title && (
            <div id="title-error" css={errorText}>
              {errors.title}
            </div>
          )}
        </div>

        {/* Date Posted */}
        <div css={fieldStyle}>
          <div css={labelStyle}>Date Posted *</div>
          <input
            type="date"
            name="datePosted"
            value={formData.datePosted}
            onChange={handleInput}
            css={inputBase}
            aria-invalid={!!errors.datePosted}
            aria-describedby={errors.datePosted ? "date-error" : undefined}
          />
          {errors.datePosted && (
            <div id="date-error" css={errorText}>
              {errors.datePosted}
            </div>
          )}
        </div>

        {/* Description - full width */}
        <div css={fullWidth}>
          <div css={fieldStyle}>
            <div css={labelStyle}>Description *</div>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInput}
              css={textareaStyle}
              placeholder="Write a short description or summary for the post..."
              aria-invalid={!!errors.description}
              aria-describedby={errors.description ? "desc-error" : undefined}
            />
            <div css={helpText}>{formData.description.length} characters</div>
            {errors.description && (
              <div id="desc-error" css={errorText}>
                {errors.description}
              </div>
            )}
          </div>
        </div>

        {/* Document File */}
        <div css={fieldStyle}>
          <div css={labelStyle}>Document File (If any)</div>

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
                  <span style={{ fontWeight: 700 }}>{documentFile.name}</span>
                  <button
                    onClick={removeDocument}
                    style={{
                      marginLeft: 8,
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      color: tokens.muted,
                    }}
                    aria-label="Remove document"
                    title="Remove"
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

        {/* Carousel Photos */}
        <div css={fieldStyle}>
          <div css={labelStyle}>Videos/Photos (If any)</div>

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
                  <img src={p.url} alt={`thumb-${idx}`} css={thumb} />
                  <button
                    onClick={() => removeImageAt(idx)}
                    title="Remove image"
                    style={{
                      position: "absolute",
                      top: -8,
                      right: -8,
                      background: "white",
                      borderRadius: "50%",
                      width: 22,
                      height: 22,
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "1px solid " + tokens.border,
                      cursor: "pointer",
                      boxShadow: "0 6px 18px rgba(12,22,39,0.06)",
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
          <div css={labelStyle}>Audio File((If any))</div>

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
                  <span style={{ fontWeight: 700 }}>{audioFile.name}</span>
                  <button
                    onClick={removeAudio}
                    style={{
                      marginLeft: 8,
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      color: tokens.muted,
                    }}
                    aria-label="Remove audio"
                    title="Remove"
                  >
                    ✕
                  </button>
                </>
              ) : (
                <span css={helpText}>Optional</span>
              )}
            </div>
          </div>

          {audioFile && (
            <div style={{ marginTop: 8 }}>
              <audio controls src={URL.createObjectURL(audioFile)} />
            </div>
          )}
        </div>

        {/* Enable Buttons group - toggles */}
        <div css={fullWidth}>
          <div css={sectionTitle}>Enable Buttons</div>
          <div css={toggleRow}>
            <label css={toggleLabel}>
              <div style={{ minWidth: 140 }} css={labelStyle}>
                show Offer tithes and donations
              </div>
              <button
                type="button"
                onClick={handleToggle("showDownload")}
                aria-pressed={formData.buttons.showDownload}
                css={switchTrack(formData.buttons.showDownload)}
                title="Toggle Show Download"
              >
                <span css={switchThumb(formData.buttons.showDownload)} />
                <input
                  type="checkbox"
                  checked={formData.buttons.showDownload}
                  onChange={handleToggle("showDownload")}
                  style={{ display: "none" }}
                />
              </button>
            </label>

            <label css={toggleLabel}>
              <div style={{ minWidth: 140 }} css={labelStyle}>
                Show Request Special prayers
              </div>
              <button
                type="button"
                onClick={handleToggle("showComment")}
                aria-pressed={formData.buttons.showComment}
                css={switchTrack(formData.buttons.showComment)}
                title="Toggle Show Comment"
              >
                <span css={switchThumb(formData.buttons.showComment)} />
                <input
                  type="checkbox"
                  checked={formData.buttons.showComment}
                  onChange={handleToggle("showComment")}
                  style={{ display: "none" }}
                />
              </button>
            </label>

            <label css={toggleLabel}>
              <div style={{ minWidth: 140 }} css={labelStyle}>
                Show Contribute Offering
              </div>
              <button
                type="button"
                onClick={handleToggle("showShare")}
                aria-pressed={formData.buttons.showShare}
                css={switchTrack(formData.buttons.showShare)}
                title="Toggle Show Share"
              >
                <span css={switchThumb(formData.buttons.showShare)} />
                <input
                  type="checkbox"
                  checked={formData.buttons.showShare}
                  onChange={handleToggle("showShare")}
                  style={{ display: "none" }}
                />
              </button>
            </label>
          </div>
        </div>

        <div css={divider} />

        {/* actions */}
        <div css={actionsRow}>
          <button
            onClick={() => {
              // reset form quick
              setFormData({
                title: "",
                datePosted: "",
                description: "",
                buttons: {
                  showDownload: false,
                  showComment: false,
                  showShare: false,
                },
              });
              setDocumentFile(null);
              setCarouselImages([]);
              setAudioFile(null);
              setErrors({});
            }}
            css={secondaryButton}
            type="button"
          >
            Reset
          </button>

          <button
            css={primaryButton(submitting)}
            onClick={handleSubmit}
            disabled={submitting}
            type="button"
          >
            {submitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Form;
