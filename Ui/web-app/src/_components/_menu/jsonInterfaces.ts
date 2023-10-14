export interface ISideMenu {
  menuHeader: ISideMenuHeader;
  items: ISideMenuItem[];
}

export interface ISideMenuHeader {
  menuTitle: string;
}

export interface ISideMenuItem {
  title: string;
  route: string;
}
