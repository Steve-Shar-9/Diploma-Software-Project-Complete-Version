import { createAppContainer, createStackNavigator, createDrawerNavigator, createSwitchNavigator } from 'react-navigation';

import Main from './screens/Main';
import Login from './screens/Login';

import Admin from './screens/Admin/Admin';
// import AdminStudent from './screens/Admin/AdminStudent';
// import AdminDepartment from './screens/Admin/AdminDepartment';
// import AdminAnnouncement from './screens/Admin/AdminAnnouncement';
// import AdminEvent from './screens/Admin/AdminEvent';
// import AdminGraph from './screens/Admin/AdminGraph';

import SideMenu from './screens/Student/SideMenu';
import Home from './screens/Student/Home';
import InputScreen from './screens/Student/InputScreen.js'
import SubEnrollment from './screens/Student/SubEnrollment';
import Timetable from './screens/Student/Timetable';
import GroupOrClass from './screens/Student/GroupOrClass';
import QRScanner from './screens/Student/QRScanner';
import InsideGroupOrClass from './screens/Student/InsideGroupOrClass';

const AuthStackNavigation  = createStackNavigator({
  Main: {
    screen: Main,
  },
  Login: {
    screen: Login,
  },
  Admin: {
    screen: Admin,
  },
  // AdminStudent: {
  //   screen: AdminStudent,
  // },
  // AdminDepartment: {
  //   screen: AdminDepartment,
  // },
  // AdminAnnouncement: {
  //   screen: AdminAnnouncement,
  // },
  // AdminEvent: {
  //   screen: AdminEvent,
  // },
  // AdminGraph: {
  //   screen: AdminGraph,
  // },
}, {
  initialRouteName: 'Main',
  headerMode: 'none'
});

const DrawerNav = createDrawerNavigator({
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
  GroupOrClass: {
    screen: GroupOrClass,
  },
  InsideGroupOrClass: {
    screen: InsideGroupOrClass,
  },
  QRScanner: {
    screen: QRScanner,
  },
},{
    initialRouteName:'Home',
    contentComponent: SideMenu,
    drawerWidth: 300
});

const MainNavigation = createSwitchNavigator({
  // HomeDrawer: DrawerNav,
  AuthStack: AuthStackNavigation,
  HomeDrawer: DrawerNav,
});

export default createAppContainer(MainNavigation);