function Button({ priority }) {
  if (priority == "primary") {
    return <PrimaryButton />;
  }
  return <SecondaryButton />;
}
const PrimaryButton = () => {
  return (
    <button className="Button flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 md:py-4 md:text-lg md:px-10">
      Get started
    </button>
  );
};
const SecondaryButton = () => {
  return (
    <button className="Button flex items-center justify-center px-8 py-3 border-violet-700 border-2  text-base font-medium rounded-md text-violet-700 bg-white hover:bg-gray-100 md:py-4 md:text-lg md:px-10">
      Secondary
    </button>
  );
};

export default Button;
