// Wording from Tabby's "Background Pre-scoring Reject" test checklist.
// If Tabby confirms the full-stop version ("purchase. Please"), change it here only.
export const TABBY_REJECTED_MESSAGE =
  "Sorry, Tabby is unable to approve this purchase, please use an alternative payment method for your order.";

export const TABBY_REJECTED_MESSAGE_AR =
  "نأسف، تابي غير قادرة على الموافقة على هذه العملية. الرجاء استخدام طريقة دفع أخرى.";

export const getTabbyRejectedMessage = (lang) =>
  String(lang).toLowerCase().startsWith("ar")
    ? TABBY_REJECTED_MESSAGE_AR
    : TABBY_REJECTED_MESSAGE;