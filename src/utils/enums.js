export const GENDERS = [
    {
        id: 'F',
        name: 'Жіноча',
    },
    {
        id: 'M',
        name: 'Чоловіча',
    },
];

export const TYPES = [
    {
        id: '0',
        name: 'Будь-який',
    },
    {
        id: '1',
        name: 'Легкові',
    },
    {
        id: '2',
        name: 'Мото',
    },
    {
        id: '3',
        name: 'Вантажівки',
    },
    {
        id: '4',
        name: 'Прицепи',
    },
    {
        id: '5',
        name: 'Спецтехніка',
    },
    {
        id: '6',
        name: 'Сільгосптехніка',
    },
    {
        id: '7',
        name: 'Автобуси',
    },
    {
        id: '8',
        name: 'Водний транспорт',
    },
    {
        id: '9',
        name: 'Повітряний транспорт',
    },
    {
        id: '10',
        name: 'Автобудинки',
    },
];

export const BRANDS = [
    {
        id: '0',
        name: 'BMW',
    },
    {
        id: '1',
        name: 'Mercedes-Benz',
    },
    {
        id: '2',
        name: 'Toyota',
    },
    {
        id: '3',
        name: 'Audi',
    },
]

export const MODELS = [
    {
        id: '0',
        name: 'M3',
    },
    {
        id: '1',
        name: 'CDI 319',
    },
    {
        id: '2',
        name: 'Supra',
    },
    {
        id: '3',
        name: 'TT',
    },
]

export const REGIONS = [
    {
        id: '0',
        name: 'Kyiv',
    },
    {
        id: '1',
        name: 'Vinnytsa',
    },
    {
        id: '2',
        name: 'Dnipro',
    },
    {
        id: '3',
        name: 'Ternopil',
    },
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