/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react'

export default function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState(null)

  const sections = [
    { id: 'information-we-collect', title: 'Information we collect' },
    {
      id: 'how-we-use-your-information',
      title: 'How we use your information',
    },
    {
      id: 'how-we-protect-your-information',
      title: 'How we protect your information',
    },
    { id: 'sharing-of-information', title: 'Sharing of information' },
    { id: 'your-data-choices', title: 'Your data choices' },
    { id: 'data-retention', title: 'Data retention' },
    {
      id: 'changes-to-this-privacy-policy',
      title: 'Changes to this privacy policy',
    },
    { id: 'contact-us', title: 'Contact Us' },
  ]

  const toggleSection = (id) => {
    setActiveSection(activeSection === id ? null : id)
  }

  return (
    <div className="container mx-auto py-8 md:px-0 mt-28">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6 bg-gray-50 border-b border-gray-200">
          <h1 className="text-3xl text-center text-gray-600">Privacy Policy</h1>
          <p className="text-center text-gray-600 mt-2">
            Effective Date: 6th October, 2024
          </p>
        </div>
        <div className="p-6">
          <div className="grid md:grid-cols-[300px_1fr] gap-1">
            <nav className="hidden md:block">
              <h2 className="text-lg font-semibold mb-4 text-gray-700">
                Table of content
              </h2>
              <ul className="space-y-2">
                {sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className=" text-sm text-gray-600 hover:text-blue-800 transition-colors duration-200"
                      onClick={(e) => {
                        e.preventDefault()
                        document.getElementById(section.id)?.scrollIntoView({
                          behavior: 'smooth',
                        })
                      }}
                    >
                      {section.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="space-y-5">
              <p className="text-sm text-black-600">
                At <span className="font-semibold">Stock Sight</span> (referred
                to as "we&quot;, "our", or "us"), we value the privacy of our
                users ("you", "your") and are committed to protecting your
                personal information. This Privacy Policy explains how we
                collect, use, store, and protect your data when you use our
                services, specifically through our integration with Google's
                OAuth 2.0 and Gmail API.
              </p>
              {sections.map((section) => (
                <div key={section.id} id={section.id}>
                  <button
                    className="w-full text-left py-2 px-1 bg-gray-150 hover:bg-gray-100 transition-colors duration-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-100"
                    onClick={() => toggleSection(section.id)}
                  >
                    <h2 className="text-l text-black-800 flex items-center justify-between">
                      {section.title}
                      <svg
                        className={`w-6 h-6 transform transition-transform duration-200 ${
                          activeSection === section.id ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </h2>
                  </button>
                  {activeSection === section.id && (
                    <div className="mt-4 pl-4 text-gray-700">
                      {section.id === 'information-we-collect' && (
                        <>
                          <h3 className="mb-2 text-sm font-semibold">
                            1.1 Google Account Information:
                          </h3>
                          <p className="text-sm">
                            When you sign in to our app using your Google
                            account, we collect basic profile information,
                            including:
                          </p>
                          <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
                            <li>Your Google email address</li>
                            <li>Your Google account name</li>
                          </ul>
                          <h3 className="mt-4 mb-2 text-sm font-semibold">
                            1.2 Gmail API Information:
                          </h3>
                          <p className="text-sm">
                            If you authorize our app to access your Gmail
                            account, we may collect and process the following
                            information:
                          </p>
                          <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
                            <li>
                              Emails containing portfolio disclosure files that
                              match specific search criteria.
                            </li>
                            <li>
                              Attachments from these emails, such as `.xlsx`
                              files, for the purpose of processing portfolio
                              data.
                            </li>
                          </ul>
                        </>
                      )}
                      {section.id === 'how-we-use-your-information' && (
                        <>
                          <p className="text-sm">
                            We use the information we collect from the Gmail API
                            in the following ways:
                          </p>
                          <ul className="list-disc pl-5 mt-2 space-y-2 text-sm">
                            <li>
                              <span className="font-semibold">
                                Email Processing:
                              </span>{' '}
                              We access your Gmail account to search for emails
                              containing portfolio disclosure files (e.g.,
                              `.xlsx` attachments). Once found, the app
                              downloads and processes these attachments.
                            </li>
                            <li>
                              <span className="text-sm font-semibold">
                                App Functionality:
                              </span>{' '}
                              Your Google email address is used for
                              authentication purposes and for associating the
                              email processing with your account.
                            </li>
                            <li>
                              <span className="text-sm font-semibold">
                                Data Processing:
                              </span>{' '}
                              The `.xlsx` files are processed to extract and
                              analyze portfolio data.
                            </li>
                          </ul>
                        </>
                      )}
                      {section.id === 'how-we-protect-your-information' && (
                        <>
                          <p className="text-sm">
                            We take data security seriously and have implemented
                            appropriate technical and organizational measures to
                            protect your personal information, including:
                          </p>
                          <ul className="list-disc pl-5 mt-2 space-y-2 text-sm">
                            <li>
                              <span className="text-sm font-semibold">
                                Data Encryption:
                              </span>{' '}
                              Data transferred between our app and Google
                              servers via the Gmail API is encrypted using
                              industry-standard encryption protocols (such as
                              SSL/TLS).
                            </li>
                            <li>
                              <span className="text-sm font-semibold">
                                Restricted Access:
                              </span>{' '}
                              Only authorized personnel have access to the
                              information you provide.
                            </li>
                          </ul>
                        </>
                      )}
                      {section.id === 'sharing-of-information' && (
                        <>
                          <p className="text-sm">
                            We do not sell, trade, or otherwise transfer your
                            personal information to outside parties except in
                            the following circumstances:
                          </p>
                          <ul className="list-disc pl-5 mt-2 space-y-2 text-sm">
                            <li>
                              <span className="font-semibold">
                                Legal Compliance:
                              </span>{' '}
                              We may share information to comply with legal
                              obligations or in response to lawful requests from
                              public authorities.
                            </li>
                            <li>
                              <span className="font-semibold">
                                Service Providers:
                              </span>{' '}
                              We may share data with third-party service
                              providers who help us in operating our app, such
                              as cloud storage providers.
                            </li>
                          </ul>
                        </>
                      )}
                      {section.id === 'your-data-choices' && (
                        <>
                          <p className="text-sm">
                            <span className="text-sm font-semibold">
                              Revoking Access:
                            </span>{' '}
                            You may revoke our access to your Google account at
                            any time by visiting the{' '}
                            <a
                              href="https://myaccount.google.com/permissions"
                              className="text-blue-600 hover:underline"
                            >
                              Google Security Settings
                            </a>{' '}
                            and removing our app's access.
                          </p>
                          <p className="text-sm mt-2">
                            <span className="font-semibold">Deletion:</span> You
                            may request the deletion of your data by contacting
                            us at [your contact email]. Upon your request, we
                            will delete all data we have collected from your
                            Google account.
                          </p>
                        </>
                      )}
                      {section.id === 'data-retention' && (
                        <p className="text-sm">
                          We retain your information only for as long as is
                          necessary to fulfill the purposes outlined in this
                          policy, or as required by law. Once the information is
                          no longer needed, we securely delete or anonymize it.
                        </p>
                      )}
                      {section.id === 'changes-to-this-privacy-policy' && (
                        <p className="text-sm">
                          We may update this privacy policy from time to time.
                          Any changes will be posted on this page with an
                          updated "Effective Date". We encourage you to review
                          this policy periodically to stay informed about how we
                          are protecting your information.
                        </p>
                      )}
                      {section.id === 'contact-us' && (
                        <>
                          <p className="text-sm">
                            If you have any questions or concerns about this
                            Privacy Policy or how we handle your information,
                            please contact us at:
                          </p>
                          <div className="mt-4 space-y-2 text-sm">
                            <div className="flex items-center">
                              <svg
                                className="w-5 h-5 mr-2 text-gray-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                />
                              </svg>
                              <span>shivamsouravjha@gmail.com</span>
                            </div>
                            <div className="flex items-center">
                              <svg
                                className="w-5 h-5 mr-2 text-gray-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                />
                              </svg>
                              <span>7762827770</span>
                            </div>
                            <div className="flex items-center">
                              <svg
                                className="w-5 h-5 mr-2 text-gray-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                              </svg>
                              <span>
                                AVR Towers, 2nd Floor Serenity Layout,
                                Bangalore, Karnataka, India
                              </span>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
