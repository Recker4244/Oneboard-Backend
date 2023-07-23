const sib = require('sib-api-v3-sdk');
const defaultClient = sib.ApiClient.instance;
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.PULSE_KEY;
const transactionalEmailsApi = new sib.TransactionalEmailsApi();

const sendMail = async (sender, to, subject, htmlContent) => {
  try {
    const sent = await transactionalEmailsApi.sendTransacEmail({
      sender,
      to,
      subject,
      htmlContent
    });
    console.log(sent);
  }
  catch (err) {
    console.log(err);
  }
};

module.exports = { sendMail };