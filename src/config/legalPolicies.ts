export type PolicyInline =
  | string
  | { text: string; href: string; external?: boolean };

export type PolicyBlock =
  | { type: "p"; parts: PolicyInline[] }
  | { type: "table"; headers: string[]; rows: string[][] };

export type LegalPolicy = {
  title: string;
  updated?: string;
  sections: { heading?: string; blocks: PolicyBlock[] }[];
};

const refundLink = { text: "Refund Policy", href: "/policies/refund-policy" };
const privacyLink = { text: "Privacy Policy", href: "/policies/privacy-policy" };
const cookieLink = {
  text: "https://www.shopify.com/legal/cookies",
  href: "https://www.shopify.com/legal/cookies",
  external: true,
};
const edpbLink = {
  text: "here",
  href: "https://edpb.europa.eu/about-edpb/about-edpb/members_en",
  external: true,
};

function p(...parts: PolicyInline[]): PolicyBlock {
  return { type: "p", parts };
}

export const LEGAL_POLICIES: Record<string, LegalPolicy> = {
  "terms-of-service": {
    title: "Terms of Service",
    sections: [
      {
        heading: "Overview",
        blocks: [
          p(
            "This website is operated by TJ Vodka. Throughout the site, the terms “we”, “us” and “our” refer to TJ Vodka. TJ Vodka offers this website, including all information, tools and Services available from this site to you, the user, conditioned upon your acceptance of all terms, conditions, policies and notices stated here."
          ),
          p(
            "By visiting our site and/ or purchasing something from us, you engage in our “Service” and agree to be bound by the following terms and conditions (“Terms of Service”, “Terms”), including those additional terms and conditions and policies referenced herein and/or available by hyperlink. These Terms of Service apply to all users of the site, including without limitation users who are browsers, vendors, customers, merchants, and/ or contributors of content."
          ),
          p(
            "Please read these Terms of Service carefully before accessing or using our website. By accessing or using any part of the site, you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions of this agreement, then you may not access the website or use any Services. If these Terms of Service are considered an offer, acceptance is expressly limited to these Terms of Service."
          ),
          p(
            "Any new features or tools which are added to the current store shall also be subject to the Terms of Service. You can review the most current version of the Terms of Service at any time on this page. We reserve the right to update, change or replace any part of these Terms of Service by posting updates and/or changes to our website. It is your responsibility to check this page periodically for changes. Your continued use of or access to the website following the posting of any changes constitutes acceptance of those changes."
          ),
          p(
            "Our store is hosted on Shopify Inc. They provide us with the online e-commerce platform that allows us to sell our products and Services to you."
          ),
        ],
      },
      {
        heading: "Section 1 — Online Store Terms",
        blocks: [
          p(
            "By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence, or that you are the age of majority in your state or province of residence and you have given us your consent to allow any of your minor dependents to use this site."
          ),
          p(
            "You may not use our products for any illegal or unauthorized purpose nor may you, in the use of the Service, violate any laws in your jurisdiction (including but not limited to copyright laws)."
          ),
          p(
            "You must not transmit any worms or viruses or any code of a destructive nature."
          ),
          p(
            "A breach or violation of any of the Terms will result in an immediate termination of your Services."
          ),
        ],
      },
      {
        heading: "Section 2 — General Conditions",
        blocks: [
          p("We reserve the right to refuse Service to anyone for any reason at any time."),
          p(
            "You understand that your content (not including credit card information), may be transferred unencrypted and involve (a) transmissions over various networks; and (b) changes to conform and adapt to technical requirements of connecting networks or devices. Credit card information is always encrypted during transfer over networks."
          ),
          p(
            "You agree not to reproduce, duplicate, copy, sell, resell or exploit any portion of the Service, use of the Service, or access to the Service or any contact on the website through which the Service is provided, without express written permission by us."
          ),
          p(
            "The headings used in this agreement are included for convenience only and will not limit or otherwise affect these Terms."
          ),
        ],
      },
      {
        heading: "Section 3 — Accuracy, Completeness and Timeliness of Information",
        blocks: [
          p(
            "We are not responsible if information made available on this site is not accurate, complete or current. The material on this site is provided for general information only and should not be relied upon or used as the sole basis for making decisions without consulting primary, more accurate, more complete or more timely sources of information. Any reliance on the material on this site is at your own risk."
          ),
          p(
            "This site may contain certain historical information. Historical information, necessarily, is not current and is provided for your reference only. We reserve the right to modify the contents of this site at any time, but we have no obligation to update any information on our site. You agree that it is your responsibility to monitor changes to our site."
          ),
        ],
      },
      {
        heading: "Section 4 — Modifications to the Service and Prices",
        blocks: [
          p("Prices for our products are subject to change without notice."),
          p(
            "We reserve the right at any time to modify or discontinue the Service (or any part or content thereof) without notice at any time."
          ),
          p(
            "We shall not be liable to you or to any third-party for any modification, price change, suspension or discontinuance of the Service."
          ),
        ],
      },
      {
        heading: "Section 5 — Products or Services",
        blocks: [
          p(
            "Certain products or Services may be available exclusively online through the website. These products or Services may have limited quantities and are subject to return or exchange only according to our ",
            refundLink,
            "."
          ),
          p(
            "We have made every effort to display as accurately as possible the colors and images of our products that appear at the store. We cannot guarantee that your computer monitor's display of any color will be accurate."
          ),
          p(
            "We reserve the right, but are not obligated, to limit the sales of our products or Services to any person, geographic region or jurisdiction. We may exercise this right on a case-by-case basis. We reserve the right to limit the quantities of any products or Services that we offer. All descriptions of products or product pricing are subject to change at anytime without notice, at the sole discretion of us. We reserve the right to discontinue any product at any time. Any offer for any product or Service made on this site is void where prohibited."
          ),
          p(
            "We do not warrant that the quality of any products, Services, information, or other material purchased or obtained by you will meet your expectations, or that any errors in the Service will be corrected."
          ),
        ],
      },
      {
        heading: "Section 6 — Accuracy of Billing and Account Information",
        blocks: [
          p(
            "We reserve the right to refuse any order you place with us. We may, in our sole discretion, limit or cancel quantities purchased per person, per household or per order. These restrictions may include orders placed by or under the same customer account, the same credit card, and/or orders that use the same billing and/or shipping address. In the event that we make a change to or cancel an order, we may attempt to notify you by contacting the e-mail and/or billing address/phone number provided at the time the order was made. We reserve the right to limit or prohibit orders that, in our sole judgment, appear to be placed by dealers, resellers or distributors."
          ),
          p(
            "You agree to provide current, complete and accurate purchase and account information for all purchases made at our store. You agree to promptly update your account and other information, including your email address and credit card numbers and expiration dates, so that we can complete your transactions and contact you as needed."
          ),
          p("For more details, please review our ", refundLink, "."),
        ],
      },
      {
        heading: "Section 7 — Optional Tools",
        blocks: [
          p(
            "We may provide you with access to third-party tools over which we neither monitor nor have any control nor input."
          ),
          p(
            "You acknowledge and agree that we provide access to such tools “as is” and “as available” without any warranties, representations or conditions of any kind and without any endorsement. We shall have no liability whatsoever arising from or relating to your use of optional third-party tools."
          ),
          p(
            "Any use by you of the optional tools offered through the site is entirely at your own risk and discretion and you should ensure that you are familiar with and approve of the terms on which tools are provided by the relevant third-party provider(s)."
          ),
          p(
            "We may also, in the future, offer new Services and/or features through the website (including the release of new tools and resources). Such new features and/or Services shall also be subject to these Terms of Service."
          ),
        ],
      },
      {
        heading: "Section 8 — Third-Party Links",
        blocks: [
          p(
            "Certain content, products and Services available via our Service may include materials from third-parties."
          ),
          p(
            "Third-party links on this site may direct you to third-party websites that are not affiliated with us. We are not responsible for examining or evaluating the content or accuracy and we do not warrant and will not have any liability or responsibility for any third-party materials or websites, or for any other materials, products, or Services of third-parties."
          ),
          p(
            "We are not liable for any harm or damages related to the purchase or use of goods, Services, resources, content, or any other transactions made in connection with any third-party websites. Please review carefully the third-party's policies and practices and make sure you understand them before you engage in any transaction. Complaints, claims, concerns, or questions regarding third-party products should be directed to the third-party."
          ),
        ],
      },
      {
        heading: "Section 9 — User Comments, Feedback and Other Submissions",
        blocks: [
          p(
            "If, at our request, you send certain specific submissions (for example contest entries) or without a request from us, you send creative ideas, suggestions, proposals, plans, or other materials, whether online, by email, by postal mail, or otherwise (collectively, 'comments'), you agree that we may, at any time, without restriction, edit, copy, publish, distribute, translate and otherwise use in any medium any comments that you forward to us. We are and shall be under no obligation (1) to maintain any comments in confidence; (2) to pay compensation for any comments; or (3) to respond to any comments."
          ),
          p(
            "We may, but have no obligation to, monitor, edit or remove content that we determine in our sole discretion to be unlawful, offensive, threatening, libelous, defamatory, pornographic, obscene or otherwise objectionable or violates any party’s intellectual property or these Terms of Service."
          ),
          p(
            "You agree that your comments will not violate any right of any third-party, including copyright, trademark, privacy, personality or other personal or proprietary right. You further agree that your comments will not contain libelous or otherwise unlawful, abusive or obscene material, or contain any computer virus or other malware that could in any way affect the operation of the Service or any related website. You may not use a false e-mail address, pretend to be someone other than yourself, or otherwise mislead us or third-parties as to the origin of any comments. You are solely responsible for any comments you make and their accuracy. We take no responsibility and assume no liability for any comments posted by you or any third-party."
          ),
        ],
      },
      {
        heading: "Section 10 — Personal Information",
        blocks: [
          p(
            "Your submission of personal information through the store is governed by our ",
            privacyLink,
            "."
          ),
        ],
      },
      {
        heading: "Section 11 — Errors, Inaccuracies and Omissions",
        blocks: [
          p(
            "Occasionally there may be information on our site or in the Service that contains typographical errors, inaccuracies or omissions that may relate to product descriptions, pricing, promotions, offers, product shipping charges, transit times and availability. We reserve the right to correct any errors, inaccuracies or omissions, and to change or update information or cancel orders if any information in the Service or on any related website is inaccurate at any time without prior notice (including after you have submitted your order)."
          ),
          p(
            "We undertake no obligation to update, amend or clarify information in the Service or on any related website, including without limitation, pricing information, except as required by law. No specified update or refresh date applied in the Service or on any related website, should be taken to indicate that all information in the Service or on any related website has been modified or updated."
          ),
        ],
      },
      {
        heading: "Section 12 — Prohibited Uses",
        blocks: [
          p(
            "In addition to other prohibitions as set forth in the Terms of Service, you are prohibited from using the site or its content: (a) for any unlawful purpose; (b) to solicit others to perform or participate in any unlawful acts; (c) to violate any international, federal, provincial or state regulations, rules, laws, or local ordinances; (d) to infringe upon or violate our intellectual property rights or the intellectual property rights of others; (e) to harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate based on gender, sexual orientation, religion, ethnicity, race, age, national origin, or disability; (f) to submit false or misleading information; (g) to upload or transmit viruses or any other type of malicious code that will or may be used in any way that will affect the functionality or operation of the Service or of any related website, other websites, or the Internet; (h) to collect or track the personal information of others; (i) to spam, phish, pharm, pretext, spider, crawl, or scrape; (j) for any obscene or immoral purpose; or (k) to interfere with or circumvent the security features of the Service or any related website, other websites, or the Internet. We reserve the right to terminate your use of the Service or any related website for violating any of the prohibited uses."
          ),
        ],
      },
      {
        heading: "Section 13 — Disclaimer of Warranties; Limitation of Liability",
        blocks: [
          p(
            "We do not guarantee, represent or warrant that your use of our Service will be uninterrupted, timely, secure or error-free."
          ),
          p(
            "We do not warrant that the results that may be obtained from the use of the Service will be accurate or reliable."
          ),
          p(
            "You agree that from time to time we may remove the Service for indefinite periods of time or cancel the Service at any time, without notice to you."
          ),
          p(
            "You expressly agree that your use of, or inability to use, the Service is at your sole risk. The Service and all products and Services delivered to you through the Service are (except as expressly stated by us) provided 'as is' and 'as available' for your use, without any representation, warranties or conditions of any kind, either express or implied, including all implied warranties or conditions of merchantability, merchantable quality, fitness for a particular purpose, durability, title, and non-infringement."
          ),
          p(
            "In no case shall TJ Vodka, our directors, officers, employees, affiliates, agents, contractors, interns, suppliers, Service providers or licensors be liable for any injury, loss, claim, or any direct, indirect, incidental, punitive, special, or consequential damages of any kind, including, without limitation lost profits, lost revenue, lost savings, loss of data, replacement costs, or any similar damages, whether based in contract, tort (including negligence), strict liability or otherwise, arising from your use of any of the Service or any products procured using the Service, or for any other claim related in any way to your use of the Service or any product, including, but not limited to, any errors or omissions in any content, or any loss or damage of any kind incurred as a result of the use of the Service or any content (or product) posted, transmitted, or otherwise made available via the Service, even if advised of their possibility. Because some states or jurisdictions do not allow the exclusion or the limitation of liability for consequential or incidental damages, in such states or jurisdictions, our liability shall be limited to the maximum extent permitted by law."
          ),
        ],
      },
      {
        heading: "Section 14 — Indemnification",
        blocks: [
          p(
            "You agree to indemnify, defend and hold harmless TJ Vodka and our parent, subsidiaries, affiliates, partners, officers, directors, agents, contractors, licensors, Service providers, subcontractors, suppliers, interns and employees, harmless from any claim or demand, including reasonable attorneys’ fees, made by any third-party due to or arising out of your breach of these Terms of Service or the documents they incorporate by reference, or your violation of any law or the rights of a third-party."
          ),
        ],
      },
      {
        heading: "Section 15 — Severability",
        blocks: [
          p(
            "In the event that any provision of these Terms of Service is determined to be unlawful, void or unenforceable, such provision shall nonetheless be enforceable to the fullest extent permitted by applicable law, and the unenforceable portion shall be deemed to be severed from these Terms of Service, such determination shall not affect the validity and enforceability of any other remaining provisions."
          ),
        ],
      },
      {
        heading: "Section 16 — Termination",
        blocks: [
          p(
            "The obligations and liabilities of the parties incurred prior to the termination date shall survive the termination of this agreement for all purposes."
          ),
          p(
            "These Terms of Service are effective unless and until terminated by either you or us. You may terminate these Terms of Service at any time by notifying us that you no longer wish to use our Services, or when you cease using our site."
          ),
          p(
            "If in our sole judgment you fail, or we suspect that you have failed, to comply with any term or provision of these Terms of Service, we also may terminate this agreement at any time without notice and you will remain liable for all amounts due up to and including the date of termination; and/or accordingly may deny you access to our Services (or any part thereof)."
          ),
        ],
      },
      {
        heading: "Section 17 — Entire Agreement",
        blocks: [
          p(
            "The failure of us to exercise or enforce any right or provision of these Terms of Service shall not constitute a waiver of such right or provision."
          ),
          p(
            "These Terms of Service and any policies or operating rules posted by us on this site or in respect to the Service constitutes the entire agreement and understanding between you and us and governs your use of the Service, superseding any prior or contemporaneous agreements, communications and proposals, whether oral or written, between you and us (including, but not limited to, any prior versions of the Terms of Service)."
          ),
          p(
            "Any ambiguities in the interpretation of these Terms of Service shall not be construed against the drafting party."
          ),
        ],
      },
      {
        heading: "Section 18 — Governing Law",
        blocks: [
          p(
            "These Terms of Service and any separate agreements whereby we provide you Services shall be governed by and construed in accordance with the laws of United Kingdom."
          ),
        ],
      },
      {
        heading: "Section 19 — Changes to Terms of Service",
        blocks: [
          p(
            "You can review the most current version of the Terms of Service at any time at this page."
          ),
          p(
            "We reserve the right, at our sole discretion, to update, change or replace any part of these Terms of Service by posting updates and changes to our website. It is your responsibility to check our website periodically for changes. Your continued use of or access to our website or the Service following the posting of any changes to these Terms of Service constitutes acceptance of those changes."
          ),
        ],
      },
      {
        heading: "Section 20 — Contact Information",
        blocks: [
          p(
            "Questions about the Terms of Service should be sent to us at info@tjvodka.co.uk."
          ),
          p("Our contact information is posted below:"),
          p("TJ Vodka Limited"),
          p("sales@tjvodka.co.uk"),
        ],
      },
    ],
  },
  "privacy-policy": {
    title: "Privacy Policy",
    updated: "Last updated: October 6, 2025",
    sections: [
      {
        blocks: [
          p(
            'This Privacy Policy describes how TJ Vodka (the "Site", "we", "us", or "our") collects, uses, and discloses your personal information when you visit, use our services, or make a purchase from tjvodka.co.uk (the "Site") or otherwise communicate with us regarding the Site (collectively, the "Services"). For purposes of this Privacy Policy, "you" and "your" means you as the user of the Services, whether you are a customer, website visitor, or another individual whose information we have collected pursuant to this Privacy Policy.'
          ),
          p("Please read this Privacy Policy carefully."),
        ],
      },
      {
        heading: "Changes to This Privacy Policy",
        blocks: [
          p(
            'We may update this Privacy Policy from time to time, including to reflect changes to our practices or for other operational, legal, or regulatory reasons. We will post the revised Privacy Policy on the Site, update the "Last updated" date and take any other steps required by applicable law.'
          ),
        ],
      },
      {
        heading: "How We Collect and Use Your Personal Information",
        blocks: [
          p(
            "To provide the Services, we collect personal information about you from a variety of sources, as set out below. The information that we collect and use varies depending on how you interact with us."
          ),
          p(
            "In addition to the specific uses set out below, we may use information we collect about you to communicate with you, provide or improve or improve the Services, comply with any applicable legal obligations, enforce any applicable terms of service, and to protect or defend the Services, our rights, and the rights of our users or others."
          ),
        ],
      },
      {
        heading: "What Personal Information We Collect",
        blocks: [
          p(
            'The types of personal information we obtain about you depends on how you interact with our Site and use our Services. When we use the term "personal information", we are referring to information that identifies, relates to, describes or can be associated with you. The following sections describe the categories and specific types of personal information we collect.'
          ),
        ],
      },
      {
        heading: "Information We Collect Directly from You",
        blocks: [
          p(
            "Information that you directly submit to us through our Services may include:"
          ),
          p(
            "Contact details including your name, address, phone number, and email."
          ),
          p(
            "Order information including your name, billing address, shipping address, payment confirmation, email address, and phone number."
          ),
          p(
            "Account information including your username, password, security questions and other information used for account security purposes."
          ),
          p(
            "Customer support information including the information you choose to include in communications with us, for example, when sending a message through the Services."
          ),
          p(
            "Some features of the Services may require you to directly provide us with certain information about yourself. You may elect not to provide this information, but doing so may prevent you from using or accessing these features."
          ),
        ],
      },
      {
        heading: "Information We Collect about Your Usage",
        blocks: [
          p(
            'We may also automatically collect certain information about your interaction with the Services ("Usage Data"). To do this, we may use cookies, pixels and similar technologies ("Cookies"). Usage Data may include information about how you access and use our Site and your account, including device information, browser information, information about your network connection, your IP address and other information regarding your interaction with the Services.'
          ),
        ],
      },
      {
        heading: "Information We Obtain from Third Parties",
        blocks: [
          p(
            "Finally, we may obtain information about you from third parties, including from vendors and service providers who may collect information on our behalf, such as:"
          ),
          p(
            "Companies who support our Site and Services, such as Shopify."
          ),
          p(
            "Our payment processors, who collect payment information (e.g., bank account, credit or debit card information, billing address) to process your payment in order to fulfill your orders and provide you with products or services you have requested, in order to perform our contract with you."
          ),
          p(
            "When you visit our Site, open or click on emails we send you, or interact with our Services or advertisements, we, or third parties we work with, may automatically collect certain information using online tracking technologies such as pixels, web beacons, software developer kits, third-party libraries, and cookies."
          ),
          p(
            "Any information we obtain from third parties will be treated in accordance with this Privacy Policy. Also see the section below, Third Party Websites and Links."
          ),
        ],
      },
      {
        heading: "How We Use Your Personal Information",
        blocks: [
          p(
            "Providing Products and Services. We use your personal information to provide you with the Services in order to perform our contract with you, including to process your payments, fulfill your orders, to send notifications to you related to your account, purchases, returns, exchanges or other transactions, to create, maintain and otherwise manage your account, to arrange for shipping, facilitate any returns and exchanges and other features and functionalities related to your account. We may also enhance your shopping experience by enabling Shopify to match your account with other Shopify services that you may choose to use. In this case, Shopify will process your information as set forth in its Privacy Policy and Consumer Privacy Policy."
          ),
          p(
            "Marketing and Advertising. We may use your personal information for marketing and promotional purposes, such as to send marketing, advertising and promotional communications by email, text message or postal mail, and to show you advertisements for products or services. This may include using your personal information to better tailor the Services and advertising on our Site and other websites. If you are an EEA resident, the legal basis for these data processing activities is our legitimate interest in selling our products, according to Art. 6 (1) (f) GDPR."
          ),
          p(
            "Security and Fraud Prevention. We use your personal information to detect, investigate or take action regarding possible fraudulent, illegal or malicious activity. If you choose to use the Services and register an account, you are responsible for keeping your account credentials safe. We highly recommend that you do not share your username, password, or other access details with anyone else. If you believe your account has been compromised, please contact us immediately. If you are an EEA resident, the legal basis for these data processing activities is our legitimate interest in keeping our website secure for you and other customers, according to Art. 6 (1) (f) GDPR."
          ),
          p(
            "Communicating with You and Service Improvement. We use your personal information to provide you with customer support and improve our Services. This is in our legitimate interests in order to be responsive to you, to provide effective services to you, and to maintain our business relationship with you according to Art. 6 (1) (f) GDPR."
          ),
        ],
      },
      {
        heading: "Cookies",
        blocks: [
          p(
            "Like many websites, we use Cookies on our Site. For specific information about the Cookies that we use related to powering our store with Shopify, see ",
            cookieLink,
            ". We use Cookies to power and improve our Site and our Services (including to remember your actions and preferences), to run analytics and better understand user interaction with the Services (in our legitimate interests to administer, improve and optimize the Services). We may also permit third parties and services providers to use Cookies on our Site to better tailor the services, products and advertising on our Site and other websites."
          ),
          p(
            "Most browsers automatically accept Cookies by default, but you can choose to set your browser to remove or reject Cookies through your browser controls. Please keep in mind that removing or blocking Cookies can negatively impact your user experience and may cause some of the Services, including certain features and general functionality, to work incorrectly or no longer be available. Additionally, blocking Cookies may not completely prevent how we share information with third parties such as our advertising partners."
          ),
        ],
      },
      {
        heading: "How We Disclose Personal Information",
        blocks: [
          p(
            "In certain circumstances, we may disclose your personal information to third parties for contract fulfillment purposes, legitimate purposes and other reasons subject to this Privacy Policy. Such circumstances may include:"
          ),
          p(
            "With vendors or other third parties who perform services on our behalf (e.g., IT management, payment processing, data analytics, customer support, cloud storage, fulfillment and shipping)."
          ),
          p(
            "With business and marketing partners to provide services and advertise to you. Our business and marketing partners will use your information in accordance with their own privacy notices."
          ),
          p(
            "When you direct, request us or otherwise consent to our disclosure of certain information to third parties, such as to ship you products or through your use of social media widgets or login integrations, with your consent."
          ),
          p(
            "With our affiliates or otherwise within our corporate group, in our legitimate interests to run a successful business."
          ),
          p(
            "In connection with a business transaction such as a merger or bankruptcy, to comply with any applicable legal obligations (including to respond to subpoenas, search warrants and similar requests), to enforce any applicable terms of service, and to protect or defend the Services, our rights, and the rights of our users or others."
          ),
          p(
            'We disclose the following categories of personal information and sensitive personal information about users for the purposes set out above in "How we Collect and Use your Personal Information" and "How we Disclose Personal Information":'
          ),
          {
            type: "table",
            headers: ["Category", "Categories of Recipients"],
            rows: [
              [
                "Identifiers such as basic contact details and certain order and account information",
                "Vendors and third parties who perform services on our behalf (such as Internet service providers, payment processors, fulfillment partners, customer support partners and data analytics providers); Business and marketing partners; Affiliates",
              ],
              [
                "Commercial information such as order information, shopping information and customer support information",
                "Vendors and third parties who perform services on our behalf (such as Internet service providers, payment processors, fulfillment partners, customer support partners and data analytics providers); Business and marketing partners; Affiliates",
              ],
              [
                "Internet or other similar network activity, such as Usage Data",
                "Vendors and third parties who perform services on our behalf (such as Internet service providers, payment processors, fulfillment partners, customer support partners and data analytics providers); Business and marketing partners; Affiliates",
              ],
              [
                "Geolocation data such as locations determined by an IP address or other technical measures",
                "Vendors and third parties who perform services on our behalf (such as Internet service providers, payment processors, fulfillment partners, customer support partners and data analytics providers); Business and marketing partners; Affiliates",
              ],
            ],
          },
          p(
            "We do not use or disclose sensitive personal information without your consent or for the purposes of inferring characteristics about you."
          ),
          p(
            "We have “sold” and “shared” (as those terms are defined in applicable law) personal information over the preceding 12 months for the purpose of engaging in advertising and marketing activities, as follows."
          ),
          {
            type: "table",
            headers: ["Category of Personal Information", "Categories of Recipients"],
            rows: [
              [
                "Identifiers such as name, e-mail address and phone number",
                "Business and marketing partners",
              ],
              [
                "Commercial information such as records of products or services purchased",
                "Business and marketing partners",
              ],
              ["Usage Data", "Business and marketing partners"],
            ],
          },
        ],
      },
      {
        heading: "Third Party Websites and Links",
        blocks: [
          p(
            "Our Site may provide links to websites or other online platforms operated by third parties. If you follow links to sites not affiliated or controlled by us, you should review their privacy and security policies and other terms and conditions. We do not guarantee and are not responsible for the privacy or security of such sites, including the accuracy, completeness, or reliability of information found on these sites. Information you provide on public or semi-public venues, including information you share on third-party social networking platforms may also be viewable by other users of the Services and/or users of those third-party platforms without limitation as to its use by us or by a third party. Our inclusion of such links does not, by itself, imply any endorsement of the content on such platforms or of their owners or operators, except as disclosed on the Services."
          ),
        ],
      },
      {
        heading: "Children's Data",
        blocks: [
          p(
            "The Services are not intended to be used by children, and we do not knowingly collect any personal information about children. If you are the parent or guardian of a child who has provided us with their personal information, you may contact us using the contact details set out below to request that it be deleted."
          ),
          p(
            "As of the Effective Date of this Privacy Policy, we do not have actual knowledge that we “share” or “sell” (as those terms are defined in applicable law) personal information of individuals under 16 years of age."
          ),
        ],
      },
      {
        heading: "Security and Retention of Your Information",
        blocks: [
          p(
            "Please be aware that no security measures are perfect or impenetrable, and we cannot guarantee “perfect security.” In addition, any information you send to us may not be secure while in transit. We recommend that you do not use insecure channels to communicate sensitive or confidential information to us."
          ),
          p(
            "How long we retain your personal information depends on different factors, such as whether we need the information to maintain your account, to provide the Services, comply with legal obligations, resolve disputes or enforce other applicable contracts and policies."
          ),
        ],
      },
      {
        heading: "Your Rights",
        blocks: [
          p(
            "Depending on where you live, you may have some or all of the rights listed below in relation to your personal information. However, these rights are not absolute, may apply only in certain circumstances and, in certain cases, we may decline your request as permitted by law."
          ),
          p(
            "Right to Access / Know: You may have a right to request access to personal information that we hold about you, including details relating to the ways in which we use and share your information."
          ),
          p(
            "Right to Delete: You may have a right to request that we delete personal information we maintain about you."
          ),
          p(
            "Right to Correct: You may have a right to request that we correct inaccurate personal information we maintain about you."
          ),
          p(
            "Right of Portability: You may have a right to receive a copy of the personal information we hold about you and to request that we transfer it to a third party, in certain circumstances and with certain exceptions."
          ),
          p(
            "Restriction of Processing: You may have the right to ask us to stop or restrict our processing of personal information."
          ),
          p(
            "Withdrawal of Consent: Where we rely on consent to process your personal information, you may have the right to withdraw this consent."
          ),
          p(
            "Appeal: You may have a right to appeal our decision if we decline to process your request. You can do so by replying directly to our denial."
          ),
          p(
            "Managing Communication Preferences: We may send you promotional emails, and you may opt out of receiving these at any time by using the unsubscribe option displayed in our emails to you. If you opt out, we may still send you non-promotional emails, such as those about your account or orders that you have made."
          ),
          p(
            "You may exercise any of these rights where indicated on our Site or by contacting us using the contact details provided below."
          ),
          p(
            "We will not discriminate against you for exercising any of these rights. We may need to collect information from you to verify your identity, such as your email address or account information, before providing a substantive response to the request. In accordance with applicable laws, you may designate an authorized agent to make requests on your behalf to exercise your rights. Before accepting such a request from an agent, we will require that the agent provide proof you have authorized them to act on your behalf, and we may need you to verify your identity directly with us. We will respond to your request in a timely manner as required under applicable law."
          ),
        ],
      },
      {
        heading: "Complaints",
        blocks: [
          p(
            "If you have complaints about how we process your personal information, please contact us using the contact details provided below. If you are not satisfied with our response to your complaint, depending on where you live you may have the right to appeal our decision by contacting us using the contact details set out below, or lodge your complaint with your local data protection authority. For the EEA, you can find a list of the responsible data protection supervisory authorities ",
            edpbLink,
            "."
          ),
        ],
      },
      {
        heading: "International Users",
        blocks: [
          p(
            "Please note that we may transfer, store and process your personal information outside the country you live in. Your personal information is also processed by staff and third party service providers and partners in these countries."
          ),
          p(
            "If we transfer your personal information out of Europe, we will rely on recognized transfer mechanisms like the European Commission's Standard Contractual Clauses, or any equivalent contracts issued by the relevant competent authority of the UK, as relevant, unless the data transfer is to a country that has been determined to provide an adequate level of protection."
          ),
        ],
      },
      {
        heading: "Contact",
        blocks: [
          p(
            "Should you have any questions about our privacy practices or this Privacy Policy, or if you would like to exercise any of the rights available to you, please call or email us at sales@tjvodka.co.uk or contact us at 26 Adelaide Road, Leamington Spa, ENG, CV31 3PL, GB."
          ),
          p(
            "For the purpose of applicable data protection laws and if not explicitly stated otherwise, we are the data controller of your personal information."
          ),
        ],
      },
    ],
  },
  "refund-policy": {
    title: "Refund Policy",
    sections: [
      {
        blocks: [
          p(
            "We have a 30-day return policy, which means you have 30 days after receiving your item to request a return."
          ),
          p(
            "To be eligible for a return, your item must be in the same condition that you received it, unworn or unused, with tags, and in its original packaging. You’ll also need the receipt or proof of purchase."
          ),
          p("To start a return, you can contact us at sales@tjvodka.co.uk."),
          p(
            "If your return is accepted, we’ll send you a return shipping label, as well as instructions on how and where to send your package. Items sent back to us without first requesting a return will not be accepted."
          ),
          p(
            "You can always contact us for any return question at sales@tjvodka.co.uk."
          ),
        ],
      },
      {
        heading: "Damages and Issues",
        blocks: [
          p(
            "Please inspect your order upon reception and contact us immediately if the item is defective, damaged or if you receive the wrong item, so that we can evaluate the issue and make it right."
          ),
        ],
      },
      {
        heading: "Exceptions / Non-Returnable Items",
        blocks: [
          p(
            "Certain types of items cannot be returned, such as opened and consumed items. Please get in touch if you have questions or concerns about your specific item."
          ),
          p(
            "Unfortunately, we cannot accept returns on sale items or gift cards."
          ),
        ],
      },
      {
        heading: "Exchanges",
        blocks: [
          p(
            "The fastest way to ensure you get what you want is to return the item you have, and once the return is accepted, make a separate purchase for the new item."
          ),
        ],
      },
      {
        heading: "European Union 14 Day Cooling Off Period",
        blocks: [
          p(
            "Notwithstanding the above, if the merchandise is being shipped into the European Union, you have the right to cancel or return your order within 14 days, for any reason and without a justification. As above, your item must be in the same condition that you received it, unworn or unused, with tags, and in its original packaging. You’ll also need the receipt or proof of purchase."
          ),
        ],
      },
      {
        heading: "Refunds",
        blocks: [
          p(
            "We will notify you once we’ve received and inspected your return, and let you know if the refund was approved or not. If approved, you’ll be automatically refunded on your original payment method within 10 business days. Please remember it can take some time for your bank or credit card company to process and post the refund too."
          ),
          p(
            "If more than 15 business days have passed since we’ve approved your return, please contact us at sales@tjvodka.co.uk."
          ),
        ],
      },
    ],
  },
};
