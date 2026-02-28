export const sendEnquiryMessage = (email) => {
  const phoneNumber = "+971569778080"; 

  const message =
    `Hello,\n\n` +
    `I would like to receive more information and updates.\n\n` +
    `Email ID: ${email}\n\n` +
    `Thank you.`;

  const encodedMessage = encodeURIComponent(message);

  window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
};

export const sendEnquiryMembership = () => {
  const phoneNumber = "+971569778080"; 

  const message =
    `Hello,\n\n` +
    `I am interested in knowing more about the Chronos Exclusive Membership.\n\n` +
    `Kindly share further details.\n\n` +
    `Thank you.`;

  const encodedMessage = encodeURIComponent(message);

  window.open(
    `https://wa.me/${phoneNumber}?text=${encodedMessage}`,
    "_blank"
  );
};