/** @jsxImportSource @emotion/react */
import type React from "react";
import { useMemo, useState, useEffect } from "react";
import { css } from "@emotion/react";
import axios from "axios";
import { toast } from "react-toastify";
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
    background: #f8fafc;
  }

  &:focus-visible {
    outline: 2px solid ${tokens.primary};
    outline-offset: 2px;
  }
`;

const toggleWrapper = css`
  display: flex;
  gap: ${tokens.spacing.lg};
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

export const Form: React.FC = () => {
  const [formData, setFormData] = useState({
    category: "",
    department: "",
    title: "",
    datePosted: "",
    description: "",
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
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
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

  const isVideoFile = (file: File) => file.type.startsWith("video/");

  const removeDocument = () => setDocumentFile(null);
  const removeAudio = () => setAudioFile(null);

  const addVerse = () => setBibleVerses((prev) => [...prev, ""]);
  const removeVerse = (idx: number) =>
    setBibleVerses((prev) => prev.filter((_, i) => i !== idx));
  const handleVerseChange = (idx: number, value: string) =>
    setBibleVerses((prev) => prev.map((v, i) => (i === idx ? value : v)));

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.category.trim()) newErrors.category = "Category is required";
    if (
      formData.category === "assembly programs" &&
      !formData.department.trim()
    )
      newErrors.department = "Department is required";
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

      // ⭐ Safely get churchid & userid
      const churchId = localStorage.getItem("userChurchId") || "";
      const userId = localStorage.getItem("userId") || "";

      form.append("churchid", churchId);
      form.append("userid", userId);

      form.append("category", formData.category);
      if (formData.department) form.append("department", formData.department);
      form.append("title", formData.title);
      form.append("datePosted", formData.datePosted);
      form.append("description", formData.description);

      Object.entries(formData.buttons).forEach(([k, v]) =>
        form.append(k, v ? "1" : "0")
      );

      form.append(
        "verses",
        JSON.stringify(bibleVerses.filter((v) => v.trim() !== ""))
      );

      if (documentFile) form.append("documentFile", documentFile);
      if (audioFile) form.append("audioFile", audioFile);

      if (carouselImages.length) {
        carouselImages.forEach((f) => form.append("carouselImages", f));
      }

      const url = `${serverurl}/item/create`;

      await axios.post(url, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Submitted successfully!");

      setFormData({
        category: "",
        department: "",
        title: "",
        datePosted: "",
        description: "",
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

  return (
    <div css={containerStyle}>
      <h2 css={headingStyle}>Create Post / Upload Content</h2>

      <div css={formGrid}>
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
                  <span css={filenameText}>{documentFile.name}</span>
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
          <label css={labelStyle}>Videos & Photos (If any)</label>
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
              {carouselImages.length ? (
                <span>{carouselImages.length} file(s)</span>
              ) : (
                <span css={helpText}>No files selected</span>
              )}
            </div>
          </div>
          {imagePreviews.length > 0 && (
            <div css={thumbsWrap}>
              {imagePreviews.map((p, idx) => {
                const isVideo = isVideoFile(p.file);
                return (
                  <div key={idx} css={thumbContainer}>
                    {isVideo ? (
                      <video src={p.url} css={thumbVideo} controls />
                    ) : (
                      <img
                        src={p.url || "/placeholder.svg"}
                        alt={`Thumbnail ${idx}`}
                        css={thumb}
                      />
                    )}
                    {isVideo && <div css={thumbLabel}>VIDEO</div>}
                    <button
                      onClick={() => removeImageAt(idx)}
                      css={removeThumbBtn}
                      aria-label="Remove file"
                    >
                      ✕
                    </button>
                  </div>
                );
              })}
            </div>
          )}
          {errors.carouselImages && (
            <div css={errorText}>{errors.carouselImages}</div>
          )}
        </div>

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
                  <span css={filenameText}>{audioFile.name}</span>
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
          {audioFile && (
            <audio
              controls
              src={URL.createObjectURL(audioFile)}
              css={audioPlayer}
            />
          )}
        </div>

        <div css={fullWidth}>
          <div css={toggleWrapper}>
            {Object.entries(formData.buttons).map(([key, value]) => (
              <label key={key} css={checkboxRow}>
                <input
                  type="checkbox"
                  checked={value === 1}
                  onChange={handleToggle(key as keyof ButtonToggles)}
                  css={checkboxInput}
                />
                <span css={checkboxLabel}>
                  {buttonLabels[key as keyof ButtonToggles]}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div css={bibleVersesSection}>
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
                    aria-label="Remove verse"
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
