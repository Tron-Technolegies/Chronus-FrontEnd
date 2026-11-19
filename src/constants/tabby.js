export const TABBY_REJECTED_MESSAGE =
  "Sorry, Tabby is unable to approve this purchase. Please use an alternative payment method for your order.";

export const TABBY_REJECTED_MESSAGE_AR =
  "نأسف، تابي غير قادرة على الموافقة على هذه العملية. الرجاء استخدام طريقة دفع أخرى.";

export const TABBY_CANCELLED_MESSAGE =
  "You aborted the payment. Please retry or choose another payment method.";

export const TABBY_CANCELLED_MESSAGE_AR =
  "لقد ألغيت الدفعة. فضلاً حاول مجددًا أو اختر طريقة دفع أخرى.";

const isArabic = (lang) => String(lang).toLowerCase().startsWith("ar");

export const getTabbyRejectedMessage = (lang) =>
  isArabic(lang) ? TABBY_REJECTED_MESSAGE_AR : TABBY_REJECTED_MESSAGE;

export const getTabbyCancelledMessage = (lang) =>
  isArabic(lang) ? TABBY_CANCELLED_MESSAGE_AR : TABBY_CANCELLED_MESSAGE;