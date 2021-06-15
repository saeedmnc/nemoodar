import { RouteInfo } from './sidebar.metadata';

//Sidebar menu Routes and data
export const ROUTES: RouteInfo[] = [

    // {
    //     path: '', title: 'Dashboard', icon: 'ft-home', class: 'has-sub', badge: '', badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1', isExternalLink: false, submenu: [
    //         { path: '/dashboard/testAnswer', title: 'Dashboard1', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
    //     ]
    // },
    // tslint:disable-next-line:max-line-length
    { path: '/DoctorDashboard/patientList', title: 'داشبورد ', icon: 'ft-home', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
    // tslint:disable-next-line:max-line-length
    // { path: '/DoctorDashboard/laboratoryRequest', title: 'درخواست خدمات ', icon: 'ft-crosshair', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
    {
        path: '', title: 'شاخص های پیامدی', icon: 'ft-edit', class: 'has-sub', badge: '', badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1', isExternalLink: false, submenu: [
            { path: '/DoctorDashboard/tasvir', title: 'شاخص مالی', icon: 'ft-crosshair', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/DoctorDashboard/Physiotherapy', title: 'شاخص دارویی', icon: 'ft-crosshair', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            // { path: '/DoctorDashboard/tasvir', title: 'تصویربرداری', icon: 'ft-crosshair', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            // { path: '/DoctorDashboard/other', title: ' سایر', icon: 'ft-crosshair', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },

        ]
    },
    // { path: '/DoctorDashboard/prescription', title: 'وضعیت تختهای کرونا', icon: 'ft-copy', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },

    {
        path: '', title: 'تنظیمات برنامه', icon: 'ft-settings', class: 'has-sub', badge: '', badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1', isExternalLink: false, submenu: [
            { path: '/DoctorDashboard/historytest', title: 'دریافت اطلاعات ', icon: 'ft-download-cloud', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/DoctorDashboard/base-info', title: 'انتقال اطلاعات پایه', icon: 'ft-download-cloud', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/DoctorDashboard/add-user', title: 'تعریف کاربر ', icon: 'ft-download-cloud', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            // { path: '/DoctorDashboard/histryobser', title: 'تشخیص ها برای بیمار', icon: 'ft-list', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
        ]
    },
    // { path: '/DoctorDashboard/doctorprofile', title: ' پروفایل پزشک ', icon: 'ft-user', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
    //
    //  { path: '/DoctorDashboard/patientList', title: 'لیست بیماران ', icon: 'ft-list', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
    // { path: '/DoctorDashboard/waiting', title: 'Chief Complaint', icon: 'ft-cloud', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
    // { path: '/DoctorDashboard/waiting', title: 'HPI', icon: 'ft-command', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
    // { path: '/DoctorDashboard/drugRecord', title: 'History', icon: 'ft-edit', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
    // { path: '/DoctorDashboard/waiting', title: 'Physical Examination', icon: 'ft-feather', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
    // { path: '/DoctorDashboard/waiting', title: 'Assessment & Plan', icon: 'ft-list', class: 'ft-credit-card', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
    // { path: '/DoctorDashboard/prescription', title: 'ePrescriptions', icon: 'ft-copy', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
    // { path: '/DoctorDashboard/laboratoryRequest', title: 'Orders', icon: 'ft-crosshair', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
    // { path: '/DoctorDashboard/waiting', title: 'Progress Notes', icon: 'ft-codepen', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
    // { path: '/DoctorDashboard/labRecord', title: 'Paraclinical Results', icon: 'ft-monitor', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },


];
