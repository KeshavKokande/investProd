import React from 'react';
import termsAndConditions from "./../../assets/images/terms_conditions.svg";
import styles from "./Page.module.css";

const PageThree = ({ agreed, handleCheckboxChange }) => {

  const preStyle = {whiteSpace:'pre-wrap'};

  return (
    <div className={styles.container}>
      <div className={styles.imagecl}>
        <img src={termsAndConditions} alt="image" />
      </div>
      <div className={`${styles['form-container']} ${styles['form-container2']}`}>
        <div className={styles.terms}>
          <h3>Terms and Conditions</h3>
          <h4>By using inVest, you as a client agree to:</h4>
          <p>
            Provide accurate registration information, safeguard account credentials, and report unauthorized use promptly. While we provide financial services and investment tools, information is for informational purposes only. Users may connect with professional advisors through our platform for personalized guidance.
          </p>
          <p>
            They must adhere to lawful usage, respect privacy, and understand the risks of financial markets. We reserve the right to suspend or terminate accounts for violations. Any changes to terms will be communicated. These terms are governed by Indian jurisdiction laws.
          </p>
          {/* <pre prestyle={preStyle}>
            {`
            Terms and Conditions
            
            Welcome to our Investment Advisory Portal! Before you proceed, please take a moment to review the following terms and conditions governing your use of our services.
            
            Acceptance of Terms
            By accessing or using our Investment Advisory Portal, you agree to comply with and be bound by these terms and conditions. If you do not agree with any part of these terms, please do not use our services.
            
            Services Description
            Our portal provides access to various investment strategies and plans for informational purposes. We do not provide personalized investment advice or recommendations. The information provided on the portal is not a substitute for professional financial advice.
            
            User Registration
            To access certain features of the portal, you may be required to register and create an account. You agree to provide accurate and complete information during the registration process and to update your information as necessary to ensure its accuracy.
            
            Account Security
            You are responsible for maintaining the confidentiality of your account credentials, including your username and password. You agree to notify us immediately of any unauthorized use of your account or any other breach of security.
            
            Upload of Photo ID and DP
            To verify your identity and ensure the security of your account, you may be required to upload a scanned copy of your photo ID (such as a driver's license or passport) and a display picture (DP). We will handle your personal information in accordance with our Privacy Policy.
            
            Prohibited Activities
            You agree not to use the portal for any unlawful or prohibited purpose, including but not limited to:
            - Impersonating any person or entity
            - Uploading viruses or other malicious code
            - Attempting to gain unauthorized access to our systems
            - Violating any applicable laws or regulations
            
            Intellectual Property
            All content and materials available on the portal, including but not limited to text, graphics, logos, images, and software, are the property of our company or its licensors and are protected by intellectual property laws.
            
            Limitation of Liability
            We do not guarantee the accuracy, completeness, or reliability of any information provided on the portal. You agree that we will not be liable for any damages arising from your use of or reliance on the information available on the portal.
            
            Changes to Terms
            We reserve the right to modify or update these terms and conditions at any time without prior notice. Your continued use of the portal after any such changes constitutes your acceptance of the revised terms.
            
            Governing Law
            These terms and conditions are governed by and construed in accordance with the laws of [Your Country], without regard to its conflict of laws principles.
            
            By using our Investment Advisory Portal, you acknowledge that you have read, understood, and agree to be bound by these terms and conditions. If you have any questions or concerns, please contact us at [contact email].
            `}
            </pre> */}
        </div>
        <div className={styles['checkbox-container']}>
          <input
            type="checkbox"
            checked={agreed}
            onChange={handleCheckboxChange}
            className={styles['form-control-checkbox']}
          />
          <label htmlFor="agreement">I agree to the terms and conditions</label>
        </div>
      </div>
    </div>
  );
};

export default PageThree;