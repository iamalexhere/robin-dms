// app/components/ui/Input.tsx
import React, { useState } from 'react';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
    variant?: 'text' | 'password' | 'number';
    size?: 'sm' | 'md' | 'lg';
    label?: string;
    error?: string;
    icon?: React.ReactNode;
    isValid?: boolean;
}

export const Input: React.FC<InputProps> = ({
    variant = 'text',
    size = 'md',
    label,
    error,
    icon,
    isValid = false,
    className = '',
    disabled = false,
    ...props
}) => {
    const [showPassword, setShowPassword] = useState(false);

    const baseStyles =
        'w-full rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-100 text-black placeholder:text-gray-400 bg-white';

    const variantStyles = {
        text: 'border-[var(--color-second-header)] focus:border-black focus:ring-black',
        password: 'border-[var(--color-second-header)] focus:border-black focus:ring-black',
        number: 'border-[var(--color-second-header)] focus:border-black focus:ring-black'
    };

    const sizeStyles = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg'
    };

    const errorStyles = error && !isValid ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : '';

    const combinedClassName =
        `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${errorStyles} ${className}`;

    // Padding kiri ekstra untuk icon (jika ada)
    const iconPaddingLeft = icon ? 'pl-10' : '';

    // Padding kanan ekstra untuk password input (ruang untuk icon mata)
    const passwordPadding = variant === 'password' ? 'pr-10' : '';

    // Tentukan type input berdasarkan showPassword state
    const inputType = variant === 'password' && showPassword ? 'text' : variant;

    return (
        <div className="w-full">
            {label && (
                <label
                    className="block mb-2 font-medium"
                    style={{ color: 'var(--color-text-base)' }}
                >
                    {label}
                </label>
            )}

            <div className="relative">
                {/* Icon di kiri */}
                {icon && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                        {icon}
                    </div>
                )}

                <input
                    type={inputType}
                    className={`${combinedClassName} ${iconPaddingLeft} ${passwordPadding}`}
                    disabled={disabled}
                    min={variant === 'number' ? '0' : undefined}
                    onKeyDown={variant === 'number' ? (e) => {
                        // Cegah input minus, plus, dan karakter e/E
                        if (e.key === '-' || e.key === '+' || e.key === 'e' || e.key === 'E') {
                            e.preventDefault();
                        }
                    } : undefined}
                    {...props}
                />

                {/* Toggle Password Visibility Button */}
                {variant === 'password' && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                        tabIndex={-1}
                    >
                        {showPassword ? (
                            // Icon Mata Tertutup (Hide)
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                                />
                            </svg>
                        ) : (
                            // Icon Mata Terbuka (Show)
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                            </svg>
                        )}
                    </button>
                )}
            </div>

            {error && !isValid && (
                <p className="mt-1 text-sm text-red-500">
                    {error}
                </p>
            )}
        </div>
    );
};