/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";

const containerStyle = css`
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
`;

const headingStyle = css`
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 1rem;
`;

const subHeadingStyle = css`
  text-align: center;
  margin-bottom: 2rem;
  color: #4a5568;
`;

const fieldStyle = css`
  margin-bottom: 1.5rem;
  label {
    display: block;
    font-weight: 500;
    margin-bottom: 0.5rem;
    color: #2d3748;
  }

  input,
  select {
    width: 100%;
    height: 42px;
    box-sizing: border-box;
    border: 1px solid #cbd5e0;
    border-radius: 0;
    font-size: 0.95rem;
    &:focus {
      outline: none;
      border-color: #3182ce;
      box-shadow: 0 0 0 2px rgba(66, 153, 225, 0.3);
    }
  }

  textarea {
    width: 100%;
    border: 1px solid #cbd5e0;
    border-radius: 6px;
    font-size: 0.95rem;
  }
`;

const errorStyle = css`
  color: #e53e3e;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

const submitButtonStyle = css`
  display: block;
  margin: 2rem auto 0;
  background-color: #3182ce;
  color: #fff;
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    background-color: #2b6cb0;
  }
`;

const messageStyle = css`
  text-align: center;
  margin-top: 1rem;
  font-size: 0.95rem;
`;

export const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    businessName: "",
    niche: "",
    otherNiche: "",
    primaryGoal: "",
    secondaryGoal: "",
    colorScheme: "",
    referenceUrls: "",
    logoPreference: "",
    contentPreferences: "",
    advertisingFocus: "",
    targetAudience: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Invalid email address";
    if (!formData.niche) newErrors.niche = "Please select a niche";
    if (!formData.primaryGoal)
      newErrors.primaryGoal = "Please select a primary goal";
    if (!formData.colorScheme.trim())
      newErrors.colorScheme = "Please specify a color scheme";
    if (!formData.advertisingFocus)
      newErrors.advertisingFocus = "Please select advertising focus";
    if (!formData.targetAudience.trim())
      newErrors.targetAudience = "Please describe your target audience";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      // Placeholder for API submission
      // await fetch('/submit', { method: 'POST', body: JSON.stringify(formData) });

      setMessage({
        text: "Request submitted successfully! We’ll get back to you soon.",
        type: "success",
      });
      setFormData({
        name: "",
        email: "",
        businessName: "",
        niche: "",
        otherNiche: "",
        primaryGoal: "",
        secondaryGoal: "",
        colorScheme: "",
        referenceUrls: "",
        logoPreference: "",
        contentPreferences: "",
        advertisingFocus: "",
        targetAudience: "",
      });
    } catch (err) {
      setMessage({
        text: "Error submitting request. Please try again.",
        type: "error",
      });
    }
  };

  return (
    <div css={containerStyle}>
      <h2 css={headingStyle}>Request a Custom Website or Funnel</h2>
      <p css={subHeadingStyle}>
        Tell us about your vision! Fill out the form below to get a tailored
        website or funnel designed for your business.
      </p>

      {/* Form Fields */}
      <div>
        <div css={fieldStyle}>
          <label htmlFor="name">
            Full Name <span style={{ color: "#e53e3e" }}>*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Full Name"
          />
          {errors.name && <p css={errorStyle}>{errors.name}</p>}
        </div>

        <div css={fieldStyle}>
          <label htmlFor="email">
            Email Address <span style={{ color: "#e53e3e" }}>*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email Address"
          />
          {errors.email && <p css={errorStyle}>{errors.email}</p>}
        </div>

        <div css={fieldStyle}>
          <label htmlFor="businessName">Business Name</label>
          <input
            type="text"
            id="businessName"
            name="businessName"
            value={formData.businessName}
            onChange={handleChange}
            placeholder="Your Business Name"
          />
        </div>

        <div css={fieldStyle}>
          <label htmlFor="niche">
            Business Niche <span style={{ color: "#e53e3e" }}>*</span>
          </label>
          <select
            id="niche"
            name="niche"
            value={formData.niche}
            onChange={handleChange}
          >
            <option value="" disabled>
              Select Your Niche
            </option>
            <option value="ecommerce">E-commerce</option>
            <option value="fitness">Fitness & Wellness</option>
            <option value="technology">Technology & SaaS</option>
            <option value="restaurant">Restaurant & Hospitality</option>
            <option value="real-estate">Real Estate</option>
            <option value="education">Education</option>
            <option value="other">Other</option>
          </select>
          {errors.niche && <p css={errorStyle}>{errors.niche}</p>}
        </div>

        {formData.niche === "other" && (
          <div css={fieldStyle}>
            <label htmlFor="otherNiche">If Other, Please Specify</label>
            <input
              type="text"
              id="otherNiche"
              name="otherNiche"
              value={formData.otherNiche}
              onChange={handleChange}
              placeholder="Specify your niche"
            />
          </div>
        )}

        <div css={fieldStyle}>
          <label htmlFor="primaryGoal">
            Primary Goal <span style={{ color: "#e53e3e" }}>*</span>
          </label>
          <select
            id="primaryGoal"
            name="primaryGoal"
            value={formData.primaryGoal}
            onChange={handleChange}
          >
            <option value="" disabled>
              Select Primary Goal
            </option>
            <option value="lead-generation">Lead Generation</option>
            <option value="sales">Sales</option>
            <option value="brand-awareness">Brand Awareness</option>
            <option value="booking">Booking/Appointments</option>
            <option value="content-engagement">Content Engagement</option>
          </select>
          {errors.primaryGoal && <p css={errorStyle}>{errors.primaryGoal}</p>}
        </div>

        <div css={fieldStyle}>
          <label htmlFor="colorScheme">
            Preferred Color Scheme <span style={{ color: "#e53e3e" }}>*</span>
          </label>
          <input
            type="text"
            id="colorScheme"
            name="colorScheme"
            value={formData.colorScheme}
            onChange={handleChange}
            placeholder="e.g., Blue and White, Green and Gold"
          />
          {errors.colorScheme && <p css={errorStyle}>{errors.colorScheme}</p>}
        </div>

        <div css={fieldStyle}>
          <label htmlFor="advertisingFocus">
            Advertising Focus <span style={{ color: "#e53e3e" }}>*</span>
          </label>
          <select
            id="advertisingFocus"
            name="advertisingFocus"
            value={formData.advertisingFocus}
            onChange={handleChange}
          >
            <option value="" disabled>
              Select Advertising Focus
            </option>
            <option value="lead-generation">Lead Generation</option>
            <option value="ecommerce-sales">E-commerce Sales</option>
            <option value="brand-awareness">Brand Awareness</option>
            <option value="event-promotion">Event Promotion</option>
            <option value="other">Other</option>
          </select>
          {errors.advertisingFocus && (
            <p css={errorStyle}>{errors.advertisingFocus}</p>
          )}
        </div>

        <div css={fieldStyle}>
          <label htmlFor="targetAudience">
            Target Audience <span style={{ color: "#e53e3e" }}>*</span>
          </label>
          <textarea
            id="targetAudience"
            name="targetAudience"
            value={formData.targetAudience}
            onChange={handleChange}
            rows={3}
            placeholder="Describe your target audience (e.g., age, interests, location)"
          />
          {errors.targetAudience && (
            <p css={errorStyle}>{errors.targetAudience}</p>
          )}
        </div>

        <button type="button" css={submitButtonStyle} onClick={handleSubmit}>
          Submit Request
        </button>
        {message && (
          <p
            css={messageStyle}
            style={{
              color: message.type === "success" ? "#38a169" : "#e53e3e",
            }}
          >
            {message.text}
          </p>
        )}
      </div>
    </div>
  );
};
