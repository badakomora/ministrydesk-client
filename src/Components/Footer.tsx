/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const Footer = () => {
  const footerStyles = css`
    margin-top: 60px;
    background: linear-gradient(180deg, #1e293b, #0f172a);
    color: #f8fafc;
    padding: 50px 20px 30px;
    border-radius: 20px 20px 0 0;
    text-align: center;
    box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.3);

    a {
      color: #fbbf24;
      font-weight: 600;
      text-decoration: none;
      transition: color 0.3s ease, transform 0.2s ease;
    }
    a:hover {
      color: #fde68a;
      text-decoration: underline;
      transform: translateY(-2px);
    }

    .links {
      margin-top: 18px;
      display: flex;
      justify-content: center;
      gap: 20px;
      flex-wrap: wrap;
    }

    .brand {
      font-weight: 800;
      font-size: 20px;
      letter-spacing: 1px;
    }

    .tagline {
      color: #cfe3ff;
      margin-top: 10px;
      font-size: 14px;
    }

    p {
      margin-top: 20px;
      color: #94a3b8;
      font-size: 13px;
    }

    @media (max-width: 600px) {
      padding: 40px 15px 20px;

      .brand {
        font-size: 18px;
      }

      .links {
        gap: 14px;
        font-size: 14px;
      }
    }
  `;

  return (
    <footer css={footerStyles} role="contentinfo">
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <div className="brand">PAG Family</div>
        <div className="tagline">
          Bringing churches together to serve the community.
        </div>

        <nav className="links" aria-label="Footer links">
          <a href=".">Privacy Policy</a>
          <a href=".">Terms of Service</a>
          <a href=".">Contact</a>
        </nav>

        <p>© {new Date().getFullYear()} PAG Family. All rights reserved.</p>
      </div>
    </footer>
  );
};
