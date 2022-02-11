const primaryButtonStyleClassRoot =
  "border border-transparent font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700";

export const primaryButtonStyleClassName = {
  default: primaryButtonStyleClassRoot + " px-4 py-2 text-base",
  small: primaryButtonStyleClassRoot + " px-4 py-1 text-sm",
};

const secondaryButtonStyleRoot =
  "border-violet-700 border-2 font-medium rounded-md text-violet-700 bg-white hover:bg-gray-100";
export const secondaryButtonStyleClassName = {
  default: secondaryButtonStyleRoot + " px-4 py-2 text-base",
  small: secondaryButtonStyleRoot + " px-4 py-1 text-sm",
};
