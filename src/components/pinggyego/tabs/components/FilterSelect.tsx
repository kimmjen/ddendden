import { FC } from 'react';

interface FilterSelectProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: { value: string; label: string; }[];
}

export const FilterSelect: FC<FilterSelectProps> = ({
                                                        label,
                                                        value,
                                                        onChange,
                                                        options
                                                    }) => (
    <div>
        <h3 className="font-medium mb-3">{label}</h3>
        <select
            className="w-full p-2 border rounded transition-colors hover:border-pink-300 focus:border-pink-500 focus:ring-1 focus:ring-pink-500 outline-none"
            value={value}
            onChange={(e) => onChange(e.target.value)}
        >
            {options.map(option => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    </div>
);