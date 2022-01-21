import PropTypes from "prop-types";

function ColorPallete({ colorClassesArray }) {
  return (
    <div className="ColorPallete">
      {colorClassesArray.map((colorClass) => (
        <div className="Color flex items-center mb-2" key={colorClass}>
          <div className={`rounded-lg mr-3 w-20 h-10 ${colorClass}`}></div>
          <p>{colorClass}</p>
        </div>
      ))}
    </div>
  );
}
ColorPallete.propTypes = {
  colorClassesArray: PropTypes.arrayOf(PropTypes.string),
};

export default ColorPallete;
