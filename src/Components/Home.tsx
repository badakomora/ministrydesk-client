/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";

const globalStyles = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  }

  body {
    background-color: #f5f7fa;
    color: #333;
  }
`;

const containerStyles = css`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const headerStyles = css`
  padding: 20px 0;
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 100;
`;

const headerContentStyles = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const logoStyles = css`
  font-size: 24px;
  font-weight: 700;
  color: #5b68e4;
  text-decoration: none;
`;

const navStyles = css`
  ul {
    display: flex;
    list-style: none;

    li {
      margin-left: 30px;

      a {
        text-decoration: none;
        color: #555;
        font-weight: 500;
        transition: color 0.3s;

        &:hover {
          color: #5b68e4;
        }
      }
    }
  }
`;

const ctaButtonStyles = css`
  background-color: #5b68e4;
  color: white;
  padding: 10px 20px;
  border-radius: 25px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #4850c8;
  }
`;

const heroStyles = css`
  padding: 80px 0 40px;
  text-align: center;

  h1 {
    font-size: 42px;
    font-weight: 700;
    margin-bottom: 15px;

    span {
      color: #5b68e4;
      font-weight: 400;
      font-style: italic;
    }
  }

  p {
    font-size: 18px;
    color: #666;
    max-width: 600px;
    margin: 0 auto 30px;
    line-height: 1.6;
  }
`;

const toggleStyles = css`
  display: inline-flex;
  background-color: #f0f2fa;
  border-radius: 25px;
  padding: 5px;
  margin-bottom: 40px;

  button {
    padding: 8px 20px;
    border: none;
    background: none;
    border-radius: 20px;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.3s;

    &.active {
      background-color: #5b68e4;
      color: white;
    }
  }
`;

const pricingCardsStyles = css`
  display: flex;
  justify-content: center;
  gap: 30px;
  flex-wrap: wrap;
  margin-bottom: 80px;
`;

const cardStyles = css`
  background-color: white;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  flex: 1;
  min-width: 300px;
  max-width: 350px;
  position: relative;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }

  &.popular {
    border-top: 4px solid #ffcc5c;
  }
`;

const popularTagStyles = css`
  position: absolute;
  top: -12px;
  right: 30px;
  background-color: #ffcc5c;
  color: #333;
  font-size: 12px;
  font-weight: 600;
  padding: 5px 15px;
  border-radius: 20px;
`;

const cardIconStyles = css`
  width: 50px;
  height: 50px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;

  &.starter {
    background-color: #e6eeff;
    color: #5b68e4;
  }

  &.pro {
    background-color: #fff5e6;
    color: #ffaa33;
  }

  &.enterprise {
    background-color: #e6f9ff;
    color: #33aaff;
  }
`;

const cardContentStyles = css`
  h2 {
    font-size: 22px;
    margin-bottom: 10px;
  }

  .subtitle {
    color: #666;
    margin-bottom: 25px;
    font-size: 14px;
  }

  .price {
    font-size: 38px;
    font-weight: 700;
    margin-bottom: 30px;

    span {
      font-size: 16px;
      color: #888;
      font-weight: 400;
    }
  }
`;

const featuresStyles = css`
  margin-bottom: 30px;

  .feature {
    display: flex;
    align-items: flex-start;
    margin-bottom: 15px;
    font-size: 14px;

    svg {
      flex-shrink: 0;
      margin-right: 10px;
      margin-top: 3px;
    }
  }
`;

const cardButtonStyles = css`
  width: 100%;
  padding: 12px 0;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;

  &.starter {
    background-color: #f0f2fa;
    color: #5b68e4;
    border: 1px solid #e0e4f5;

    &:hover {
      background-color: #e6eaff;
    }
  }

  &.pro {
    background-color: #333;
    color: white;
    border: none;

    &:hover {
      background-color: #222;
    }
  }

  &.enterprise {
    background-color: white;
    color: #5b68e4;
    border: 1px solid #5b68e4;

    &:hover {
      background-color: #f0f2fa;
    }
  }
`;

export const Home = () => {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annually">(
    "monthly"
  );

  return (
    <div css={globalStyles}>
      <header css={headerStyles}>
        <div css={[containerStyles, headerContentStyles]}>
          <a href="." css={logoStyles}>
            WPDean
          </a>
          <nav css={navStyles}>
            <ul>
              <li>
                <a href=".">Features</a>
              </li>
              <li>
                <a href=".">Solutions</a>
              </li>
              <li>
                <a href=".">Pricing</a>
              </li>
              <li>
                <a href=".">Resources</a>
              </li>
            </ul>
          </nav>
          <button css={ctaButtonStyles}>Start Free Trial</button>
        </div>
      </header>

      <main>
        <section css={[heroStyles, containerStyles]}>
          <h1>
            Simple pricing plans for <span>every business</span>
          </h1>
          <p>
            Transparent and scalable pricing options designed to grow with your
            needs. No hidden fees, no surprises.
          </p>

          <div css={toggleStyles}>
            <button
              className={billingPeriod === "monthly" ? "active" : ""}
              onClick={() => setBillingPeriod("monthly")}
            >
              Monthly
            </button>
            <button
              className={billingPeriod === "annually" ? "active" : ""}
              onClick={() => setBillingPeriod("annually")}
            >
              Annually
            </button>
          </div>
        </section>

        <section css={[pricingCardsStyles, containerStyles]}>
          {/* Starter Card */}
          <div css={cardStyles} className="starter">
            <div css={cardIconStyles} className="starter">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 16L7 11L8.4 9.55L12 13.15L19.6 5.55L21 7L12 16Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <div css={cardContentStyles}>
              <h2>Starter</h2>
              <p className="subtitle">
                Perfect for individuals and small teams
              </p>
              <div className="price">
                $0 <span>/ month</span>
              </div>
            </div>

            <div css={featuresStyles}>
              <div className="feature">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 16L7 11L8.4 9.55L12 13.15L19.6 5.55L21 7L12 16Z"
                    fill="#5b68e4"
                  />
                </svg>
                <span>Basic features with usage limits</span>
              </div>
              <div className="feature">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 16L7 11L8.4 9.55L12 13.15L19.6 5.55L21 7L12 16Z"
                    fill="#5b68e4"
                  />
                </svg>
                <span>Up to 3 projects</span>
              </div>
              <div className="feature">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 16L7 11L8.4 9.55L12 13.15L19.6 5.55L21 7L12 16Z"
                    fill="#5b68e4"
                  />
                </svg>
                <span>Basic analytics and reporting</span>
              </div>
              <div className="feature">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 16L7 11L8.4 9.55L12 13.15L19.6 5.55L21 7L12 16Z"
                    fill="#5b68e4"
                  />
                </svg>
                <span>Email support</span>
              </div>
            </div>

            <button css={cardButtonStyles} className="starter">
              Get Started
            </button>
          </div>

          {/* Professional Card */}
          <div css={cardStyles} className="popular">
            <div css={popularTagStyles}>Most Popular</div>
            <div css={cardIconStyles} className="pro">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <div css={cardContentStyles}>
              <h2>Professional</h2>
              <p className="subtitle">Ideal for growing businesses</p>
              <div className="price">
                $49 <span>/ month</span>
              </div>
            </div>

            <div css={featuresStyles}>
              <div className="feature">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 16L7 11L8.4 9.55L12 13.15L19.6 5.55L21 7L12 16Z"
                    fill="#ffaa33"
                  />
                </svg>
                <span>All Starter features, plus:</span>
              </div>
              <div className="feature">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 16L7 11L8.4 9.55L12 13.15L19.6 5.55L21 7L12 16Z"
                    fill="#ffaa33"
                  />
                </svg>
                <span>Advanced analytics with insights</span>
              </div>
              <div className="feature">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 16L7 11L8.4 9.55L12 13.15L19.6 5.55L21 7L12 16Z"
                    fill="#ffaa33"
                  />
                </svg>
                <span>Unlimited projects and collaborators</span>
              </div>
              <div className="feature">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 16L7 11L8.4 9.55L12 13.15L19.6 5.55L21 7L12 16Z"
                    fill="#ffaa33"
                  />
                </svg>
                <span>Priority support and training</span>
              </div>
              <div className="feature">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 16L7 11L8.4 9.55L12 13.15L19.6 5.55L21 7L12 16Z"
                    fill="#ffaa33"
                  />
                </svg>
                <span>Automation tools</span>
              </div>
            </div>

            <button css={cardButtonStyles} className="pro">
              Get Started
            </button>
          </div>

          {/* Enterprise Card */}
          <div css={cardStyles} className="enterprise">
            <div css={cardIconStyles} className="enterprise">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 8L15 13.2L21 14.1L16.5 18.2L17.6 24L12 21.3L6.4 24L7.5 18.2L3 14.1L9 13.2L12 8Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <div css={cardContentStyles}>
              <h2>Enterprise</h2>
              <p className="subtitle">Custom solutions for larger teams</p>
              <div className="price">
                $89 <span>/ month</span>
              </div>
            </div>

            <div css={featuresStyles}>
              <div className="feature">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 16L7 11L8.4 9.55L12 13.15L19.6 5.55L21 7L12 16Z"
                    fill="#33aaff"
                  />
                </svg>
                <span>All Professional features, plus:</span>
              </div>
              <div className="feature">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 16L7 11L8.4 9.55L12 13.15L19.6 5.55L21 7L12 16Z"
                    fill="#33aaff"
                  />
                </svg>
                <span>No limits on usage or data</span>
              </div>
              <div className="feature">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 16L7 11L8.4 9.55L12 13.15L19.6 5.55L21 7L12 16Z"
                    fill="#33aaff"
                  />
                </svg>
                <span>Dedicated account manager</span>
              </div>
              <div className="feature">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 16L7 11L8.4 9.55L12 13.15L19.6 5.55L21 7L12 16Z"
                    fill="#33aaff"
                  />
                </svg>
                <span>Advanced security features</span>
              </div>
              <div className="feature">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 16L7 11L8.4 9.55L12 13.15L19.6 5.55L21 7L12 16Z"
                    fill="#33aaff"
                  />
                </svg>
                <span>Custom integration options</span>
              </div>
            </div>

            <button css={cardButtonStyles} className="enterprise">
              Contact Sales
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};
