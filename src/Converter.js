import React, { useState, useEffect } from "react";
import "./Converter.css";

const Converter = () => {
    const [amount, setAmount] = useState(1);
    const [currency, setCurrency] = useState("USD");
    const [converted, setConverted] = useState(null);
    const [rates, setRates] = useState({});

    useEffect(() => {
        fetch(`https://api.exchangerate-api.com/v4/latest/USD`)
            .then((res) => res.json())
            .then((data) => {
                setRates(data.rates);
            })
            .catch((error) => console.error("Error fetching exchange rates:", error));
    }, []);

    const handleConvert = () => {
        if (rates[currency]) {
            setConverted((amount * rates[currency]).toFixed(2));
        }
    };

    return (
        <div className="converter-card">
            <h2 className="title">Currency Converter</h2>&nbsp;
            <h2 className="subtitle">Intially everything is in USD</h2>

            <div className="converter-content">
                <div className="input-section">
                    <label className="label">Amount</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        className="input"
                    />
                </div>

                <div className="currency-section">
                    <label className="label">Currency</label>
                    <select
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                        className="select"
                    >
                        {Object.keys(rates).map((cur) => (
                            <option key={cur} value={cur}>
                                {cur}
                            </option>
                        ))}
                    </select>
                </div>

                <button onClick={handleConvert} className="convert-button">
                    Convert
                </button>
            </div>

            <div className="result-section">
                {converted !== null && <h3>{converted} {currency}</h3>}
            </div>
        </div>
    );
};

export default Converter;
