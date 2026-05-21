/** Same rule as phone step: 10 digits starting with 6–9 (India mobile). */
export const isValidMobile = (mobile: string | null): mobile is string => {
    if (!mobile) return false;
    const trimmed = mobile.trim();
    return /^[6-9]\d{9}$/.test(trimmed);
};

export const parseAmountToNumber = (amount: string | number | undefined): number => {
    if (!amount) return 0;

    const value = String(amount).toLowerCase().trim();

    // Handle lakh / lakhs
    if (value.includes('lakh')) {
        const numeric = parseFloat(value.replace(/[^\d.]/g, ''));
        return isNaN(numeric) ? 0 : numeric * 100000;
    }

    // Handle normal numbers like 50000 or ₹1,20,000
    const numeric = parseFloat(value.replace(/[^\d.]/g, ''));
    return isNaN(numeric) ? 0 : numeric;
};

/** Formats offer amount for card display (e.g. ₹4,50,000). */
export const formatOfferDisplayAmount = (
    amount: string | number | undefined
): string => {
    const numeric = parseAmountToNumber(amount);
    if (numeric <= 0) return '₹0';
    return `₹${numeric.toLocaleString('en-IN')}`;
};

/** Formats tenure in months for offer cards. */
export const formatOfferTenureMonths = (tenure: string | number | undefined): string => {
    const months = Number(tenure);
    if (!tenure || Number.isNaN(months) || months <= 0) return '—';
    return `${months} Month${months === 1 ? '' : 's'}`;
};

/** Formats interest rate for offer cards. */
export const formatOfferInterestRate = (intRate: string | number | undefined): string => {
    if (intRate === undefined || intRate === null || intRate === '') return '—';
    const rate = String(intRate).replace(/%/g, '').trim();
    if (!rate) return '—';
    return `${rate}% p.a.`;
};

export const mapingLenderNameToLenderCode = (lenderName: string): string => {
    switch (lenderName) {
        case 'lnt':
            return 'L&T';
        case 'upswing_lnt':
            return 'Upswing L&T';
        case 'upswing_dmi':
            return 'DMI';
        default:
            return lenderName;
    }
};

export const isUpswingRedirectAllowed = (lenderName: string): boolean => {
    return lenderName.toLowerCase() === 'lnt' || lenderName.toLowerCase() === 'upswing_lnt' || lenderName.toLowerCase() === 'upswing_dmi';
};