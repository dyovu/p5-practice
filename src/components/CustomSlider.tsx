interface CustomSliderProps {
  value: number;
  onChange: (value: number) => void;
  label?: string;
  min?: number;
  max?: number;
}

const CustomSlider = ({
  value,
  onChange,
  label,
  min,
  max,
}: CustomSliderProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.currentTarget.value);
    onChange(newValue);
  };

  return (
    <div className='slider-container'>
      <div className='slider-row'>
        <div className='label-container'>
          {label && <span className='slider-label'>{label}:</span>}
        </div>
        <input
          type='range'
          min={min}
          max={max}
          value={value}
          onChange={handleChange}
          className='custom-slider'
        />
      </div>
      <span className='value-display'>{value}</span>
      <style jsx>{`
        .slider-container {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .slider-row {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .label-container {
          width: 100px; /* ラベル部分の幅を固定 */
          text-align: right;
        }

        .value-display {
          font-size: 14px;
        }

        .custom-slider {
          width: 80px;
          height: 10px;
          border: 1px solid black;
          border-radius: 0px;
          outline: none;
          appearance: none;
          background: #ddd;
          background-image: linear-gradient(
            to right,
            #a593e0 ${((value - min) / (max - min)) * 100}%,
            #ddd ${((value - min) / (max - min)) * 100}%
          );
        }

        .custom-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 0;
          height: 0;
        }

        .custom-slider::-moz-range-thumb {
          width: 0;
          height: 0;
        }

        .custom-slider::-ms-thumb {
          width: 0;
          height: 0;
        }
      `}</style>
    </div>
  );
};

export default CustomSlider;
