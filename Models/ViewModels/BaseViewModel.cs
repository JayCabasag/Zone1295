namespace TokenHive.Models.ViewModels
{
    public class BaseViewModel
    {
        public required string Menu { get; set; }
        public required string MenuTitle { get; set; }
        public string? SubMenu { get; set; }
    }
}