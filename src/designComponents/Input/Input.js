function Input({ placeholder, onChange }) {
  return (
    <div className="Input border-2 border-gray-400 focus:border-violet-500">
      <label htmlFor="">Testing</label>
      <input
        type="text"
        placeholder={placeholder}
        onChange={(e) => onChange(e)}
      />
    </div>
  );
}

export default Input;
