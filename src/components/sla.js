import React from "react";
import { Heading, Text, Box } from "@chakra-ui/react";

function PrivacyPolicy() {
    return (
        <>
            <Heading size='2xl'>Privacy Policy</Heading>
            <Box padding="30px">
                <Text fontWeight="bold">Effective Date: 6th October 2024</Text>
            </Box>
            
            <Box padding="30px">
                <Text>
                    At <b>Stock-Backend</b> (referred to as "we", "our", or "us"), we value the privacy of our users ("you", "your") and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, store, and protect your data when you use our services, specifically through our integration with Google's OAuth 2.0 and Gmail API.
                </Text>
            </Box>

            <Heading size='md'>1. Information We Collect</Heading>
            <Box padding="30px">
                <Text fontWeight="bold">1.1 Google Account Information:</Text>
                <Text>
                    When you sign in to our app using your Google account, we collect basic profile information, including:
                    <ul>
                        <li>Your Google email address</li>
                        <li>Your Google account name</li>
                    </ul>
                </Text>
                <Text fontWeight="bold" mt={4}>1.2 Gmail API Information:</Text>
                <Text>
                    If you authorize our app to access your Gmail account, we may collect and process the following information:
                    <ul>
                        <li>Emails containing portfolio disclosure files that match specific search criteria.</li>
                        <li>Attachments from these emails, such as `.xlsx` files, for the purpose of processing portfolio data.</li>
                    </ul>
                </Text>
            </Box>

            <Heading size='md'>2. How We Use Your Information</Heading>
            <Box padding="30px">
                <Text>
                    We use the information we collect from the Gmail API in the following ways:
                    <ul>
                        <li><b>Email Processing:</b> We access your Gmail account to search for emails containing portfolio disclosure files (e.g., `.xlsx` attachments). Once found, the app downloads and processes these attachments.</li>
                        <li><b>App Functionality:</b> Your Google email address is used for authentication purposes and for associating the email processing with your account.</li>
                        <li><b>Data Processing:</b> The `.xlsx` files are processed to extract and analyze portfolio data.</li>
                    </ul>
                </Text>
            </Box>

            <Heading size='md'>3. How We Protect Your Information</Heading>
            <Box padding="30px">
                <Text>
                    We take data security seriously and have implemented appropriate technical and organizational measures to protect your personal information, including:
                    <ul>
                        <li><b>Data Encryption:</b> Data transferred between our app and Google servers via the Gmail API is encrypted using industry-standard encryption protocols (such as SSL/TLS).</li>
                        <li><b>Restricted Access:</b> Only authorized personnel have access to the information you provide.</li>
                    </ul>
                </Text>
            </Box>

            <Heading size='md'>4. Sharing of Information</Heading>
            <Box padding="30px">
                <Text>
                    We do not sell, trade, or otherwise transfer your personal information to outside parties except in the following circumstances:
                    <ul>
                        <li><b>Legal Compliance:</b> We may share information to comply with legal obligations or in response to lawful requests from public authorities.</li>
                        <li><b>Service Providers:</b> We may share data with third-party service providers who help us in operating our app, such as cloud storage providers.</li>
                    </ul>
                </Text>
            </Box>

            <Heading size='md'>5. Your Data Choices</Heading>
            <Box padding="30px">
                <Text>
                    <b>Revoking Access:</b> You may revoke our access to your Google account at any time by visiting the <a href="https://myaccount.google.com/permissions">Google Security Settings</a> and removing our app's access.<br />
                    <b>Deletion:</b> You may request the deletion of your data by contacting us at [your contact email]. Upon your request, we will delete all data we have collected from your Google account.
                </Text>
            </Box>

            <Heading size='md'>6. Data Retention</Heading>
            <Box padding="30px">
                <Text>
                    We retain your information only for as long as is necessary to fulfill the purposes outlined in this policy, or as required by law. Once the information is no longer needed, we securely delete or anonymize it.
                </Text>
            </Box>

            <Heading size='md'>7. Changes to This Privacy Policy</Heading>
            <Box padding="30px">
                <Text>
                    We may update this privacy policy from time to time. Any changes will be posted on this page with an updated "Effective Date". We encourage you to review this policy periodically to stay informed about how we are protecting your information.
                </Text>
            </Box>

            <Heading size='md'>8. Contact Us</Heading>
            <Box padding="30px">
                <Text>
                    If you have any questions or concerns about this Privacy Policy or how we handle your information, please contact us at:
                </Text>
                <Text mt={4}>
                    <b>Email:</b> shivamsouravjha@gmail.com <br />
                    <b>Phone:</b> 7762827770 <br />
                    <b>Mailing Address:</b> AVR Towers, 2nd Floor Serenity Layout , Bangalore, Karnataka, India
                </Text>
            </Box>
        </>
    );
}

export default PrivacyPolicy;
