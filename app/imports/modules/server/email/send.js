import { Meteor } from 'meteor/meteor';
import nodemailer from 'nodemailer';
import _ from 'lodash';
import getPrivateFile from '../getPrivateFile';
import templateToText from './handlebarsToTXT';
import templateToHTML from './handlebarsToHTML';

const transporter = domain => {
  const config = _.get(Meteor.settings, 'private.email.smtp', false);
  if (!config) {
    // todo report error to Matt
    throw new Meteor.Error('email.transporter', `There is no email configuration for the domain: ${domain}`);
  }
  return nodemailer.createTransport(config);
};

const sendEmail = (options, { resolve, reject }) => {
  if (_.get(Meteor.settings, 'public.mode', 'fish') === 'testCafe') {
    return;
  }
  Meteor.defer(async () => {
    const { domain, ...rest } = options;
    try {
      const trans = transporter(domain);
      await trans.sendMail(rest);
      resolve();
    } catch (exception2) {
      reject(exception2);
    }
  });
};

export default ({ text, html, template, css, templateVars, ...rest }) => {
  if (text || html || template) {
    return new Promise((resolve, reject) => {
      const cssFile = getPrivateFile(`emailTemplates/${css}.css`);
      const handlebarVars = { ...templateVars, css: cssFile };
      sendEmail(
        {
          ...rest,
          text: template ? templateToText(getPrivateFile(`emailTemplates/${template}.txt`), handlebarVars || {}) : text,
          html: template
            ? templateToHTML(getPrivateFile(`emailTemplates/${template}.html`), handlebarVars || {})
            : html,
        },
        { resolve, reject },
      );
    });
  }
  throw new Error("Please pass a HTML string, text, or template name to compile for your message's body.");
};
