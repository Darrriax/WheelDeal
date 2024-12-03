export const GENDERS = [
    {
        id: 'Female',
        name: 'Female',
    },
    {
        id: 'Male',
        name: 'Male',
    },
];

export const TYPES = [
    {
        id: 'Sedan',
        name: 'Sedan',
    },
    {
        id: 'Hatchback',
        name: 'Hatchback',
    },
    {
        id: 'Pickup',
        name: 'Pickup',
    },
    {
        id: 'Minivan',
        name: 'Minivan',
    },
    {
        id: 'Crossover',
        name: 'Crossover',
    },
    {
        id: 'SUV',
        name: 'SUV',
    },
    {
        id: 'Van',
        name: 'Van',
    },
    {
        id: 'MPV',
        name: 'MPV',
    },
];

export const MANUFACTURERS = [
    {
        id: 'Skoda',
        name: 'Skoda',
    },
    {
        id: 'Honda',
        name: 'Honda',
    },
    {
        id: 'BMW',
        name: 'BMW',
    },
    {
        id: 'Fiat',
        name: 'Fiat',
    },
    {
        id: 'Renault',
        name: 'Renault',
    },
    {
        id: 'Toyota',
        name: 'Toyota',
    },
    {
        id: 'Volkswagen',
        name: 'Volkswagen',
    },
    {
        id: 'Hyundai',
        name: 'Hyundai',
    },
    {
        id: 'Lexus',
        name: 'Lexus',
    },
    {
        id: 'Nissan',
        name: 'Nissan',
    },
    {
        id: 'Kia',
        name: 'Kia',
    },
    {
        id: 'Porsche',
        name: 'Porsche',
    },
    {
        id: 'Mercedes-Benz',
        name: 'Mercedes-Benz',
    },
];

export const CONDITIONS = [
    {
        id: '0',
        name: 'New',
    },
    {
        id: '1',
        name: 'Run and drive',
    },
    {
        id: '2',
        name: 'Need repair',
    },
    {
        id: '3',
        name: 'Not running',
    },
]
export const CURRENCIES = [
    {
        id: 'USD',
        name: '$',
    },
    {
        id: 'UAH',
        name: '₴',
    },
    {
        id: 'EUR',
        name: '€',
    }
]

export const DATES = [
    {
        id: 1,
        type: "date",
        placeholder: "DD/MM/YYYY",
        checked: true,
        min: "1600-01-01",
        max: new Date().toISOString().split('T')[0], // Поточна дата
        text: "ui.lifetime_info_date.exact",
        birthday_text: "ui.birthday_types.date",
        deathdate_text: "ui.deathdate_types.date",
    },
    {
        id: 2,
        type: "month",
        placeholder: "MM/YYYY",
        checked: false,
        min: "1600-01",
        max: new Date().toISOString().split('-').slice(0, 2).join('-'), // Рік-місяць поточної дати
        text: "ui.lifetime_info_date.month",
        birthday_text: "ui.birthday_types.month",
        deathdate_text: "ui.deathdate_types.month",
    },
    {
        id: 3,
        type: "number",
        placeholder: "YYYY",
        checked: false,
        min: "1600",
        max: new Date().getFullYear().toString(), // Поточний рік
        text: "ui.lifetime_info_date.year",
        birthday_text: "ui.birthday_types.number",
        deathdate_text: "ui.deathdate_types.number",
    },
];
