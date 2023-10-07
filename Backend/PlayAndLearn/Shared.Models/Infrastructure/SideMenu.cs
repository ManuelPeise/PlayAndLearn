namespace Shared.Models.Infrastructure
{
    public class SideMenu
    {
        public SideMenuHeader MenuHeader { get; set; } = new SideMenuHeader();
        public List<SideMenuItem> Items { get; set; } = new List<SideMenuItem>();

    }

    public class SideMenuHeader
    {
        public string MenuTitle { get; set; } = string.Empty;
    }

    public class SideMenuItem
    {
        public string Title { get; set; } = string.Empty;
        public List<SideSubMenuItem> Items { get; set; } = new List<SideSubMenuItem>();
    }

    public class SideSubMenuItem
    {
        public string Title { get; set; } = string.Empty;
        public string Route { get; set; } = string.Empty;
    }
}
