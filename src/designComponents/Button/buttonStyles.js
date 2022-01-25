const primaryButtonStyleClassName =
  "px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 md:py-4 md:text-lg md:px-10";

const secondaryButtonStyleRoot =
  "border-violet-700 border-2 text-base font-medium rounded-md text-violet-700 bg-white hover:bg-gray-100 md:py-4 md:text-lg md:px-10";
const secondaryButtonStyleClassName = {
  default: secondaryButtonStyleRoot + " px-8 py-3",
  small: secondaryButtonStyleRoot + " px-4 py-1",
};

export { primaryButtonStyleClassName, secondaryButtonStyleClassName };
