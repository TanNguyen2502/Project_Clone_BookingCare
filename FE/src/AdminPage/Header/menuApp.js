export const adminMenu = [
    {
        name: 'menu.admin.manage-user', 
        menus: [
            { name: 'menu.admin.crud-redux', link: '/system/user-redux' },
            { name: 'menu.admin.manage-doctor', link: '/system/manage-doctor' },
            { name: 'menu.admin.manage-schedule', link: '/system/manage-schedule' },
            { name: 'menu.admin.manage-patient', link: '/system/manage-patient' },
        ]
    },
    {
        name: 'menu.admin.clinic',
        menus: [
            { name: 'menu.admin.manage-clinic', link: '/system/manage-clinic' },
        ]
    },
    {
        name: 'menu.admin.specialty',
        menus: [
            { name: 'menu.admin.manage-specialty', link: '/system/manage-specialty' },
        ]
    },
];