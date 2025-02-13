"use client";
import { useCallback, useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from 'next/navigation';
import "./multiRangeSlider.css";

const DualRangeSlider = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const min = 0;
  const max = 10000;
  const [minVal, setMinVal] = useState(parseInt(searchParams.get('minPrice') || '0'));
  const [maxVal, setMaxVal] = useState(parseInt(searchParams.get('maxPrice') || '10000'));
  const [inputMin, setInputMin] = useState(minVal.toString());
  const [inputMax, setInputMax] = useState(maxVal.toString());
  const minValRef = useRef(min);
  const maxValRef = useRef(max);
  const range = useRef<HTMLInputElement>(null);

  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  const updateURL = useCallback(
    (min: number, max: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set('minPrice', min.toString());
      params.set('maxPrice', max.toString());
      router.push('?' + params.toString());
    },
    [searchParams, router]
  );

  // Update slider position
  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, getPercent]);

  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxVal, getPercent]);

  // Debounce function
  const debounce = (func: Function, wait: number) => {
    let timeout: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  // Debounced URL update
  const debouncedUpdateURL = useCallback((min: number, max: number) => {
    const timeout = setTimeout(() => updateURL(min, max), 500);
    return () => clearTimeout(timeout);
  }, [updateURL]);

  // Handle input change for minimum value
  const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputMin(value);
    
    if (value === '') return;
    
    const numValue = Math.max(Number(value), min);
    if (!isNaN(numValue) && numValue < maxVal) {
      setMinVal(numValue);
      minValRef.current = numValue;
      debouncedUpdateURL(numValue, maxVal);
    }
  };

  // Handle input change for maximum value
  const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputMax(value);
    
    if (value === '') return;
    
    const numValue = Math.min(Number(value), max);
    if (!isNaN(numValue) && numValue > minVal) {
      setMaxVal(numValue);
      maxValRef.current = numValue;
      debouncedUpdateURL(minVal, numValue);
    }
  };

  // Handle input blur (when user finishes editing)
  const handleMinInputBlur = () => {
    let value = Number(inputMin);
    if (isNaN(value)) value = minVal;
    value = Math.max(min, Math.min(value, maxVal - 1));
    setMinVal(value);
    setInputMin(value.toString());
    debouncedUpdateURL(value, maxVal);
  };

  const handleMaxInputBlur = () => {
    let value = Number(inputMax);
    if (isNaN(value)) value = maxVal;
    value = Math.min(max, Math.max(value, minVal + 1));
    setMaxVal(value);
    setInputMax(value.toString());
    debouncedUpdateURL(minVal, value);
  };

  return (
    <div className="price_container">
      <div className="flex flex-col space-y-4 justify-center items-center">
        {/* Input fields */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <span className="mr-2">৳</span>
            <input
              type="text"
              value={inputMin}
              onChange={handleMinInputChange}
              onBlur={handleMinInputBlur}
              className="w-24 px-2 py-1 border rounded text-center"
              placeholder="Min"
            />
          </div>
          <span className="mx-4">-</span>
          <div className="flex items-center">
            <span className="mr-2">৳</span>
            <input
              type="text"
              value={inputMax}
              onChange={handleMaxInputChange}
              onBlur={handleMaxInputBlur}
              className="w-24 px-2 py-1 border rounded text-center"
              placeholder="Max"
            />
          </div>
        </div>

        {/* Slider */}
        <div className="relative">
          <input
            type="range"
            min={min}
            max={max}
            value={minVal}
            onChange={(event) => {
              const value = Math.min(Number(event.target.value), maxVal - 1);
              setMinVal(value);
              setInputMin(value.toString());
              minValRef.current = value;
              debouncedUpdateURL(value, maxVal);
            }}
            className="thumb thumb--left"
            style={{ zIndex: minVal > max - 100 ? 5 : undefined }}
          />
          <input
            type="range"
            min={min}
            max={max}
            value={maxVal}
            onChange={(event) => {
              const value = Math.max(Number(event.target.value), minVal + 1);
              setMaxVal(value);
              setInputMax(value.toString());
              maxValRef.current = value;
              debouncedUpdateURL(minVal, value);
            }}
            className="thumb thumb--right"
          />

          <div className="slider">
            <div className="slider__track" />
            <div ref={range} className="slider__range" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DualRangeSlider;