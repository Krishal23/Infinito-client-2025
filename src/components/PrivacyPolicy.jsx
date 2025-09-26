import React from "react";
import leftLogo from "../../public/infinito-logo.png";   // Replace with your IITP logo path
import rightLogo from "../../public/infinitologo.png"; // Replace with INFINITO logo path
import { FaGlobe } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";


const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen py-16 px-6 bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: "url('./accomBG.jpg')" }}>
      <div className="max-w-5xl mx-auto bg-white/80 shadow-lg rounded-2xl p-10 md:p-14 text-gray-800">
<header className="max-w-6xl mx-auto pb-6 border-b px-4 p-4 mb-8">
  <div className="flex flex-col md:flex-row items-center md:justify-between relative">
    {/* Left Logo */}
    <div className="flex-shrink-0 mb-4 md:mb-0 md:absolute md:left-0">
      <img
        src={leftLogo}
        alt="IIT Patna Logo"
        className="h-12 md:h-16 w-auto mx-auto md:mx-0"
      />
    </div>

    {/* Center Text */}
    <div className="text-center md:absolute md:left-1/2 md:transform md:-translate-x-1/2">
      <h1 className="text-2xl md:text-3xl font-bold">INFINITO 2025</h1>
      <p className="text-lg md:text-xl">Indian Institute of Technology Patna</p>
      <p className="text-base md:text-lg font-medium text-gray-700">
        भारतीय प्रौद्योगिकी संस्थान पटना
      </p>
    </div>
  </div>
</header>



        {/* Page Title */}
        <h2 className="text-2xl md:text-3xl font-semibold text-center mt-8 mb-6">
          Privacy Policy
        </h2>

        {/* Intro */}
        <p className="mb-10 text-lg leading-relaxed text-gray-700">
          This Privacy Policy describes how <strong>INFINITO</strong>, the annual
          sports fest of IIT Patna, collects, uses, and protects the personal
          information of its participants, attendees, and visitors. By
          registering for or attending the Fest, you consent to the practices
          described below.
        </p>

        {/* Section Wrapper */}
        <div className="space-y-10">
          {/* Section 1 */}
          <section>
            <h2 className="text-2xl text-start font-semibold mb-3 text-gray-900">
              1. Information We Collect
            </h2>
            <p className="mb-3">We may collect the following types of information:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>
                <strong>Personal Information:</strong> Name, email, phone
                number, roll number, college/organization, and ID proof (if
                required).
              </li>
              <li>
                <strong>Payment Information:</strong> Transaction details for
                registrations, accommodation, or merchandise.
              </li>
              <li>
                <strong>Technical Information:</strong> Device details, browser
                type, IP address, and usage analytics.
              </li>
            </ul>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl text-start font-semibold mb-3 text-gray-900">
              2. How We Use Your Information
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>To process registrations, payments, and accommodation requests.</li>
              <li>To send event-related updates, notifications, and confirmations.</li>
              <li>To verify participant eligibility and identification.</li>
              <li>To improve website experience and fest operations.</li>
              <li>For compliance with legal or regulatory obligations.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl text-start font-semibold mb-3 text-gray-900">
              3. Information Sharing
            </h2>
            <p className="mb-3">
              We respect your privacy and will{" "}
              <strong>never sell or trade</strong> your data. Information may
              only be shared with:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>
                Authorized event partners, sponsors, or vendors for fest
                operations.
              </li>
              <li>Payment gateways/service providers for secure processing.</li>
              <li>Law enforcement, if legally required.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl text-start font-semibold mb-3 text-gray-900">
              4. Data Security
            </h2>
            <p>
              We use reasonable security practices to protect your information.
              However, no online system is 100% secure, and INFINITO cannot
              guarantee absolute protection against unauthorized access.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl text-start font-semibold mb-3 text-gray-900">
              5. Data Retention
            </h2>
            <p>
              Collected data will be retained only as long as required for fest
              operations, record-keeping, and compliance. After the event, data
              may be anonymized for reporting and research.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl text-start font-semibold mb-3 text-gray-900">
              6. Your Rights
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Request correction of incorrect personal data.</li>
              <li>
                Request deletion of data post-event (subject to compliance).
              </li>
              <li>Opt-out of promotional communications.</li>
            </ul>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-2xl text-start font-semibold mb-3 text-gray-900">
              7. Third-Party Links
            </h2>
            <p>
              Our site may link to external websites (sponsors, partners,
              payment providers). We are not responsible for their privacy
              practices.
            </p>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-2xl text-start font-semibold mb-3 text-gray-900">
              8. Policy Updates
            </h2>
            <p>
              INFINITO reserves the right to update or amend this Privacy Policy
              at any time. Continued participation implies acceptance of the
              revised terms.
            </p>
          </section>

          {/* Section 9 */}
          <section>
            <div className="mt-10">
              <h2 className="text-2xl text-start font-semibold mb-4 text-gray-900">9. Contact Us</h2>
              <p className="mb-4">
                For any queries, please contact the{" "}
                <strong>INFINITO Organizing Committee</strong>:
              </p>

              <div className="space-y-3 text-gray-700">
                {/* Email */}
                <div className="flex items-center gap-3">
                  <MdEmail className="text-blue-600 text-xl" />
                  <a
                    href="mailto:infinito@iitp.ac.in"
                    className="hover:text-blue-800 transition-colors"
                  >
                    infinito@iitp.ac.in
                  </a>
                </div>

                {/* Website */}
                <div className="flex items-center gap-3">
                  <FaGlobe className="text-blue-600 text-lg" />
                  <a
                    href="https://infinito.iitp.ac.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-800 transition-colors"
                  >
                    infinito.iitp.ac.in
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
