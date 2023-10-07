export interface ISideMenu {
  menuHeader: ISideMenuHeader;
  items: ISideMenuItem[];
}

export interface ISideMenuHeader {
  menuTitle: string;
}

export interface ISideMenuItem {
  title: string;
  items: ISideSubMenuItem[];
}

export interface ISideSubMenuItem {
  title: string;
  route: string;
}
