import { createAppContainer, createDrawerNavigator } from 'react-navigation';

import Main from './screens/Main';
import Login from './screens/Login';

import Admin from './screens/Admin/Admin';
import AdminStudent from './screens/Admin/AdminStudent';
import AdminAddStudent from './screens/Admin/AdminAddStudent';
import AdminDepartment from './screens/Admin/AdminDepartment';
import AdminAddDepartment from './screens/Admin/AdminAddDepartment';
import AdminProgramme from './screens/Admin/AdminProgramme';
import AdminAddProgramme from './screens/Admin/AdminAddProgramme';
import AdminAnnouncement from './screens/Admin/AdminAnnouncement';
import AdminAddAnnouncement from './screens/Admin/AdminAddAnnouncement';
import AdminEvent from './screens/Admin/AdminEvent';
import AdminAddEvent from './screens/Admin/AdminAddEvent';
import AdminTimetable from './screens/Admin/AdminTimetable';

import SideMenu from './screens/Student/SideMenu';
import Home from './screens/Student/Home';
import InputScreen from './screens/Student/InputScreen.js'
import SubEnrollment from './screens/Student/SubEnrollment';
import Timetable from './screens/Student/Timetable';
import InsideGroupOrClass from './screens/Student/InsideGroupOrClass';
import QRScanner from './screens/Student/QRScanner';
import EventScreen from './screens/Student/EventScreen';

const MyDrawerNavigator = createDrawerNavigator({
  Main: {
    screen: Main,
  },
  Login: {
    screen: Login,
  },
  // -------------------Admin Screens------------------------
  Admin: {
    screen: Admin,
  },
  AdminStudent: {
    screen: AdminStudent,
  },
  AdminAddStudent: {
    screen: AdminAddStudent,
  },
  AdminDepartment: {
    screen: AdminDepartment,
  },
  AdminAddDepartment: {
    screen: AdminAddDepartment,
  },
  AdminProgramme: {
    screen: AdminProgramme,
  },
  AdminAddProgramme: {
    screen: AdminAddProgramme,
  },
  AdminAnnouncement: {
    screen: AdminAnnouncement,
  },
  AdminAddAnnouncement: {
    screen: AdminAddAnnouncement,
  },
  AdminEvent: {
    screen: AdminEvent,
  },
  AdminAddEvent: {
    screen: AdminAddEvent,
  },
  AdminTimetable: {
    screen: AdminTimetable,
  },
  // -----------------------------Student Screens------------------
  Home: {
    screen: Home,
  },
  InputScreen: {
    screen: InputScreen,
  },
  SubEnrollment: {
    screen: SubEnrollment,
  },
  Timetable: {
    screen: Timetable,
  },
  InsideGroupOrClass: {
    screen: InsideGroupOrClass,
  },
  QRScanner: {
    screen: QRScanner,
  },
  EventScreen: {
    screen: EventScreen,
  }
},
  {
    initialRouteName: 'Main',
    contentComponent: SideMenu,
    drawerWidth: 300,
    drawerBackgroundColor: "transparent",
  }
);

export default createAppContainer(MyDrawerNavigator);