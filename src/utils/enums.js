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
        id: '0',
        name: 'Sedan',
    },
    {
        id: '1',
        name: 'Hatchback',
    },
    {
        id: '2',
        name: 'Pickup',
    },
    {
        id: '3',
        name: 'Minivan',
    },
    {
        id: '4',
        name: 'Crossover',
    },
    {
        id: '5',
        name: 'SUV',
    },
    {
        id: '6',
        name: 'Van',
    },
    {
        id: '7',
        name: 'MPV',
    },
];

export const MANUFACTURERS = [
    {
        id: '0',
        name: 'Skoda',
    },
    {
        id: '1',
        name: 'Honda',
    },
    {
        id: '2',
        name: 'BMW',
    },
    {
        id: '3',
        name: 'Fiat',
    },
    {
        id: '4',
        name: 'Renault',
    },
    {
        id: '5',
        name: 'Toyota',
    },
    {
        id: '6',
        name: 'Volkswagen',
    },
    {
        id: '7',
        name: 'Hyundai',
    },
    {
        id: '8',
        name: 'Lexus',
    },
    {
        id: '9',
        name: 'Nissan',
    },
    {
        id: '10',
        name: 'Kia',
    },
    {
        id: '11',
        name: 'Porsche',
    },
    {
        id: '12',
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

export const MILEAGE = [
    {
        id: '0',
        name: '0-10000',
    },
    {
        id: '1',
        name: '10000-50000',
    },
    {
        id: '2',
        name: '50000-100000',
    },
    {
        id: '3',
        name: '100000-200000',
    },
    {
        id: '4',
        name: '200000-500000',
    },
    {
        id: '5',
        name: '500000+',
    }
]

export const CURRENCIES = [
    {
        id: '0',
        name: 'USD',
    },
    {
        id: '1',
        name: 'UAH',
    },
    {
        id: '2',
        name: 'EUR',
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
