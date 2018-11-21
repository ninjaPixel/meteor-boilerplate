import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Typography, withStyles } from '@material-ui/core';

/*
  Please change these for your needs. I am not a lawyer!
 */

const variantTitle = 'h5';
const companyName = 'ACME Ltd.';
const emailAddress = 'hello@acme.io';
const companyAddress = '1 ACME Way, Cambridge, England';
const companyNumber = '123456789';
const appUrl = Meteor.settings.public.appUrl;

const Legal = (props) => {
  const { classes } = props;
  return (
    <div>
      <div className={classes.section}>
        <Typography gutterBottom variant="h3">
          Terms and conditions of use
        </Typography>
        <Typography variant="caption">Last updated: 2018-11-21</Typography>
        <Typography variant={variantTitle} className={classes.title}>
          Introduction
        </Typography>
        <Typography>
          These terms and conditions apply between you, the User of this Website (including any sub-domains, unless
          expressly excluded by their own terms and conditions), and {companyName}, the owner and operator of this
          Website. Please read these terms and conditions carefully, as they affect your legal rights. Your agreement to
          comply with and be bound by these terms and conditions is deemed to occur upon your first use of the Website.
          If you do not agree to be bound by these terms and conditions, you should stop using the Website immediately.
        </Typography>
        <Typography>
          In these terms and conditions, User or Users means any third party that accesses the Website and is not either
          (i) employed by {companyName} and acting in the course of their employment or (ii) engaged as a consultant or
          otherwise providing services to {companyName} and accessing the Website in connection with the provision of
          such services.
        </Typography>
        <Typography>
          By using the Website and agreeing to these terms and conditions, you represent and warrant that you are at
          least 18 years of age.
        </Typography>
        <Typography variant={variantTitle} className={classes.title}>
          Intellectual property and acceptable use
        </Typography>
        <Typography>
          All Content included on the Website, unless uploaded by Users, is the property of {companyName}, our
          affiliates or other relevant third parties. In these terms and conditions, Content means any text, graphics,
          images, audio, video, software, data compilations, page layout, underlying code and software and any other
          form of information capable of being stored in a computer that appears on or forms part of this Website,
          including any such content uploaded by Users. By continuing to use the Website you acknowledge that such
          Content is protected by copyright, trademarks, database rights and other intellectual property rights. Nothing
          on this site shall be construed as granting, by implication, estoppel, or otherwise, any license or right to
          use any trademark, logo or service mark displayed on the site without the owner's prior written permission You
          may, for your own personal, non-commercial use only, do the following:
        </Typography>
        <Typography>retrieve, display and view the Content on a computer screen</Typography>
        <Typography>
          You must not otherwise reproduce, modify, copy, distribute or use for commercial purposes any Content without
          the written permission of {companyName}.
        </Typography>
        <Typography>
          You acknowledge that you are responsible for any Content you may submit via the Website, including the
          legality, reliability, appropriateness, originality and copyright of any such Content. You may not upload to,
          distribute or otherwise publish through the Website any Content that (i) is confidential, proprietary, false,
          fraudulent, libellous, defamatory, obscene, threatening, invasive of privacy or publicity rights, infringing
          on intellectual property rights, abusive, illegal or otherwise objectionable; (ii) may constitute or encourage
          a criminal offence, violate the rights of any party or otherwise give rise to liability or violate any law; or
          (iii) may contain software viruses, political campaigning, chain letters, mass mailings, or any form of
          "spam." You may not use a false email address or other identifying information, impersonate any person or
          entity or otherwise mislead as to the origin of any content. You may not upload commercial content onto the
          Website.
        </Typography>
        <Typography>
          You represent and warrant that you own or otherwise control all the rights to the Content you post; that the
          Content is accurate; that use of the Content you supply does not violate any provision of these terms and
          conditions and will not cause injury to any person; and that you will indemnify {companyName} for all claims
          resulting from Content you supply.
        </Typography>
        <Typography variant={variantTitle} className={classes.title}>
          Prohibited use
        </Typography>
        <Typography>You may not use the Website for any of the following purposes:</Typography>
        <Typography>
          in any way which causes, or may cause, damage to the Website or interferes with any other person's use or
          enjoyment of the Website;
        </Typography>
        <Typography>
          in any way which is harmful, unlawful, illegal, abusive, harassing, threatening or otherwise objectionable or
          in breach of any applicable law, regulation, governmental order;
        </Typography>
        <Typography>
          making, transmitting or storing electronic copies of Content protected by copyright without the permission of
          the owner.
        </Typography>
        <Typography variant={variantTitle} className={classes.title}>
          Registration
        </Typography>
        <Typography>
          You must ensure that the details provided by you on registration or at any time are correct and complete.
        </Typography>
        <Typography>
          You must inform us immediately of any changes to the information that you provide when registering by updating
          your personal details to ensure we can communicate with you effectively.
        </Typography>
        <Typography>
          We may suspend or cancel your registration with immediate effect for any reasonable purposes or if you breach
          these terms and conditions.
        </Typography>
        <Typography>
          You may cancel your registration at any time by informing us in writing to the address at the end of these
          terms and conditions. If you do so, you must immediately stop using the Website. Cancellation or suspension of
          your registration does not affect any statutory rights.
        </Typography>
        <Typography variant={variantTitle} className={classes.title}>
          Password and security
        </Typography>
        <Typography>
          When you register on this Website, you will be asked to create a password, which you should keep confidential
          and not disclose or share with anyone.
        </Typography>
        <Typography>
          If we have reason to believe that there is or is likely to be any misuse of the Website or breach of security,
          we may require you to change your password or suspend your account.
        </Typography>
        <Typography variant={variantTitle} className={classes.title}>
          Links to other websites
        </Typography>
        <Typography>
          This Website may contain links to other sites. Unless expressly stated, these sites are not under the control
          of {companyName} or that of our affiliates.
        </Typography>
        <Typography>
          We assume no responsibility for the content of such Websites and disclaim liability for any and all forms of
          loss or damage arising out of the use of them.
        </Typography>
        <Typography>
          The inclusion of a link to another site on this Website does not imply any endorsement of the sites themselves
          or of those in control of them.
        </Typography>
        <Typography variant={variantTitle} className={classes.title}>
          Availability of the Website and disclaimers
        </Typography>
        <Typography>
          Any online facilities, tools, services or information that {companyName} makes available through the Website
          (the Service) is provided "as is" and on an "as available" basis. We give no warranty that the Service will be
          free of defects and/or faults. To the maximum extent permitted by the law, we provide no warranties (express
          or implied) of fitness for a particular purpose, accuracy of information, compatibility and satisfactory
          quality. {companyName} is under no obligation to update information on the Website.
        </Typography>
        <Typography>
          Whilst {companyName} uses reasonable endeavours to ensure that the Website is secure and free of errors,
          viruses and other malware, we give no warranty or guaranty in that regard and all Users take responsibility
          for their own security, that of their personal details and their computers. {companyName} accepts no liability
          for any disruption or non-availability of the Website. {companyName} reserves the right to alter, suspend or
          discontinue any part (or the whole of) the Website including, but not limited to, any products and/or services
          available. These terms and conditions shall continue to apply to any modified version of the Website unless it
          is expressly stated otherwise.
        </Typography>
        <Typography variant={variantTitle} className={classes.title}>
          Limitation of liability
        </Typography>
        <Typography>
          Nothing in these terms and conditions will: (a) limit or exclude our or your liability for death or personal
          injury resulting from our or your negligence, as applicable; (b) limit or exclude our or your liability for
          fraud or fraudulent misrepresentation; or (c) limit or exclude any of our or your liabilities in any way that
          is not permitted under applicable law.
        </Typography>
        <Typography>
          To the extent that the Website and Content are provided free of charge, we will not be liable to you for any
          loss or damage of any kind. We will not be liable to you in respect of any losses arising out of events beyond
          our reasonable control. To the maximum extent permitted by law, {companyName} accepts no liability for any of
          the following: any business losses, such as loss of profits, income, revenue, anticipated savings, business,
          contracts, goodwill or commercial opportunities; loss or corruption of any data, database or software; any
          special, indirect or consequential loss or damage.
        </Typography>

        <Typography variant={variantTitle} className={classes.title}>
          General
        </Typography>
        <Typography>
          You may not transfer any of your rights under these terms and conditions to any other person. We may transfer
          our rights under these terms and conditions where we reasonably believe your rights will not be affected.
        </Typography>
        <Typography>
          These terms and conditions may be varied by us from time to time. Such revised terms will apply to the Website
          from the date of publication. Users should check the terms and conditions regularly to ensure familiarity with
          the then current version.
        </Typography>
        <Typography>
          These terms and conditions together with the Privacy Policy contain the whole agreement between the parties
          relating to its subject matter and supersede all prior discussions, arrangements or agreements that might have
          taken place in relation to the terms and conditions.
        </Typography>
        <Typography>
          The Contracts (Rights of Third Parties) Act 1999 shall not apply to these terms and conditions and no third
          party will have any right to enforce or rely on any provision of these terms and conditions.
        </Typography>
        <Typography>
          If any court or competent authority finds that any provision of these terms and conditions (or part of any
          provision) is invalid, illegal or unenforceable, that provision or part-provision will, to the extent
          required, be deemed to be deleted, and the validity and enforceability of the other provisions of these terms
          and conditions will not be affected.
        </Typography>
        <Typography>
          Unless otherwise agreed, no delay, act or omission by a party in exercising any right or remedy will be deemed
          a waiver of that, or any other, right or remedy.
        </Typography>
        <Typography>
          This Agreement shall be governed by and interpreted according to the law of England and Wales and all disputes
          arising under the Agreement (including non-contractual disputes or claims) shall be subject to the exclusive
          jurisdiction of the English and Welsh courts. {companyName} details {companyName} is a company incorporated in
          England and Wales with registered number {companyNumber} whose registered address is {companyAddress} and it
          operates the Website {appUrl}. You can contact {companyName} by email on {emailAddress}.
        </Typography>
      </div>
      <div className={classes.section}>
        <Typography gutterBottom variant="h3">
          Privacy policy
        </Typography>

        <Typography>
          At {companyName} we are committed to maintaining the trust and confidence of our visitors. Here you’ll find
          information on how we treat data that we collect from visitors.
        </Typography>

        <Typography>
          We’ll collect certain personal information from you when you use one of our websites, when you get in touch
          with us about any of our products or services, and during any process to sign up, change or cancel your
          products and services. The purpose of our privacy policy is to let you know:
        </Typography>

        <Typography className={classes.inset}>how and why we collect your personal information</Typography>
        <Typography className={classes.inset}>
          how we use and disclose your personal information (and to whom)
        </Typography>
        <Typography className={classes.inset}>your legal rights and how the law protects you</Typography>
        <Typography>If we make any changes to our privacy policy, we’ll post changes on this page.</Typography>

        <Typography variant={variantTitle} className={classes.title}>
          Google Analytics
        </Typography>
        <Typography>
          When someone visits a website in our Network we use a third party service, Google Analytics, to collect
          standard internet log information and details of visitor behaviour patterns. We do this to find out things
          such as the number of visitors to the various parts of the site and where they came from (e.g was it a Google
          search that brought them here, or a link on a someone's blog page?). Most of the Google Analytic data is
          stored indefinitely, as this means that we can look at meaningful trends over time. However, we will regularly
          consider if this retention period is necessary to see meaningful trends. If we decide that it's just overkill,
          then we'll reduce the period accordingly.
        </Typography>

        <Typography variant={variantTitle} className={classes.title}>
          FullStory
        </Typography>
        <Typography>
          We use FullStory help us identify areas where visitors are experiencing issues. For example, it helps us spot
          bugs in the system or just places where things are confusing for our visitors. For example, FullStory helps us
          to detect instances where people click things that aren't actually clickable buttons. When we see issues like
          this, it means that we can improve the design of our products to make them more intuitive, which ultimately
          makes the user's experience less frustrating. FullStory data is stored for one month, it allows us to:
        </Typography>

        <Typography className={classes.inset}>see where people click on a webpage</Typography>
        <Typography className={classes.inset}>follow mouse patterns</Typography>
        <Typography className={classes.inset}>
          track non-sensitive text that people might type into the site.
        </Typography>
        <Typography variant={variantTitle} className={classes.title}>
          Postmark
        </Typography>
        <Typography>
          Emails are sent using Postmark. Postmark collects and retains content and metadata for all emails for 45 days
          to give their customers the ability to access their full message history during that time. After 45 days,
          original email content and metadata are removed from Postmark's system. For bounce reports the original email
          content is also removed after 45 days, but metadata and the content of the actual bounce message are retained
          for up to 1 year to enable troubleshooting. After this time the bounce message content and some metadata are
          removed, but Postmark retain certain fields like Recipient, Subject, Sender, Date, and Bounce details
          indefinitely for compliance purposes. This is essential data for accurate spam and delivery monitoring, and to
          have a record in circumstances where end users ask about why/how they are getting emails from certain
          companies.
        </Typography>

        <Typography variant={variantTitle} className={classes.title}>
          Facebook
        </Typography>
        <Typography>
          We use Facebook technologies such as the Facebook Pixel to show you interest-based marketing content from our
          brands if you have viewed a {companyName} website. Data collected by the Facebook Pixel may also be anonymised
          and used in aggregate to help improve the quality and effectiveness of our websites and marketing efforts. You
          can find out more about Facebook Advertising and manage your Facebook Advertising settings or opt-out of
          Facebook interest-based advertising by visiting Facebook's site.
        </Typography>

        <Typography variant={variantTitle} className={classes.title}>
          Stripe
        </Typography>
        <Typography>
          We use Stripe to process payments. In addition to using your card data, Stripe may also use additional data
          such as your IP address and email address to perform operations such as Know Your Customer (“KYC”) and Anti
          Money Laundering (“AML”).
        </Typography>

        <Typography>
          If you are on a subscription plan, or have asked {companyName} to save your card details for future purposes,
          we will save a Stripe ID; this lets us securely use your payment details again, without the need for us to
          hold all of your credit card information (Stripe hold it, instead). For your benefit, we will store (on our
          own servers) the last 4 digits of your card, it's expiry date and the brand of your card. This is purely so
          that you know which card is associated with your account.
        </Typography>

        <Typography>
          When you save a card with us, we also record your IP address. This is because if you take a subscription plan
          with {companyName}, we may need to pay VAT (depending on where you are located) and IP address is one of ways
          that the EU VAT policy recommends that location is determined.
        </Typography>

        <Typography variant={variantTitle} className={classes.title}>
          Cookies 🍪
        </Typography>
        <Typography>
          Cookies are little files that are saved in your web browser. Some of the third party services we use (e.g.
          Google Analytics, Facebook and Stripe) use cookies to enable them to deliver their services. We also use
          cookies to make sure that you're using the latest version of our websites and also to be useful and save
          stuff, like your preferences.You can disable the saving of cookies, from within your web browser, but this
          will mean that certain features may not work as intended and you may run into strange behaviour on our
          websites.
        </Typography>

        <Typography variant={variantTitle} className={classes.title}>
          Marketing emails
        </Typography>
        <Typography>
          If you consent to promotional emails from {companyName}, we may send you marketing emails, from time to time.
          You can remove your consent by following the link at the bottom of the email, or logging into your account and
          changing your notification settings.
        </Typography>

        <Typography variant={variantTitle} className={classes.title}>
          Essential emails
        </Typography>
        <Typography>
          Sometimes it is really important that we send you an email. For example, if there was a security breach. These
          types of emails are to aid you and you usually won't be able to opt-out of these, purely because we think it
          would be a disaster (for you) if you did. If you have any concerns about this, or disagree with it, please
          contact us.
        </Typography>

        <Typography variant={variantTitle} className={classes.title}>
          Things we store, and why we store it
        </Typography>
        <Typography>
          The GDPR has defined six lawful bases for processing personnel data. Below are what we record and our basis
          for doing it.
        </Typography>

        <Typography className={classes.inset}>What - Why</Typography>
        <Typography className={classes.inset}>Stripe Charge ID - Contract</Typography>
        <Typography className={classes.inset}>IP address - Legitimate interests, Legal obligation</Typography>
        <Typography className={classes.inset}>
          Card Details - Contract, Legitimate interests, Legal obligation
        </Typography>
        <Typography className={classes.inset}>Invitations - Contract</Typography>
        <Typography className={classes.inset}>Email address and your name - Contract</Typography>
        <Typography className={classes.inset}>Phone number - Consent</Typography>

        <Typography variant={variantTitle} className={classes.title}>
          Third party service that we use, and why.
        </Typography>
        <Typography>
          We use some third party service to process data. Below are who we use and our basis for using them.
        </Typography>

        <Typography className={classes.inset}>Who - Why</Typography>
        <Typography className={classes.inset}>Google Calendar - Consent, Contract</Typography>
        <Typography className={classes.inset}>Stripe account info - Consent, Contract, Legal obligation</Typography>
        <Typography className={classes.inset}>Fullstory - Legitimate interests</Typography>
        <Typography className={classes.inset}>Google Analytics - Legitimate interests</Typography>
        <Typography className={classes.inset}>Postmark - Contract, Legitimate interests</Typography>
        <Typography className={classes.inset}>Facebook pixel - Legitimate interests</Typography>

        <Typography variant={variantTitle} className={classes.title}>
          Your legal rights
        </Typography>
        <Typography>
          You have various rights in relation to your personal information. These rights are as follows:
        </Typography>

        <Typography className={classes.inset}>
          request access to your personal information - you can request a copy of the personal information we hold on
          you.
        </Typography>
        <Typography className={classes.inset}>
          request correction of your personal information - if any personal information we hold on you is incorrect, you
          can request to have it corrected.
        </Typography>
        <Typography className={classes.inset}>
          request erasure of your personal information - you can ask us to delete your personal information in certain
          circumstances.
        </Typography>
        <Typography className={classes.inset}>
          object to processing or restrict processing of your personal information - you may object to our processing of
          your personal data in certain circumstances.
        </Typography>
        <Typography className={classes.inset}>
          request the transfer of your personal information - to provide you, or a third party you have chosen, with
          your personal information.
        </Typography>
        <Typography className={classes.inset}>
          withdraw consent where we’re relying on consent to process your personal information - if you withdraw your
          consent, we may not be able to provide certain products or services to you.
        </Typography>
        <Typography>
          You are able to exercise your rights free of charge, but if you make unfounded, repetitive or excessive
          requests, we may charge you to carry these out or refuse to act on such requests. We’ll try to respond to all
          requests within one month. If your request is complex or if you make lots of requests, we may extend our time
          to respond — if this is the case, we’ll let you know.
        </Typography>
      </div>
    </div>
  );
};
const style = (theme) => ({
  section: {
    marginBottom: theme.spacing.unit * 10,
  },
  title: {
    marginTop: theme.spacing.unit * 2,
  },
  inset: {
    marginLeft: theme.spacing.unit * 2,
  },
});

export default withStyles(style)(Legal);
