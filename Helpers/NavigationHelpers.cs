using Microsoft.AspNetCore.Mvc.Rendering;

namespace Zone1295.Helpers
{
    public static class NavigationHelper
    {
        public static string IsActive<TModel>(this IHtmlHelper<TModel> htmlHelper, string controller, string action = "")
        {
            if (htmlHelper == null)
                throw new ArgumentNullException(nameof(htmlHelper));

            var routeData = htmlHelper.ViewContext.RouteData;
            var currentController = routeData.Values["controller"]?.ToString();
            var currentAction = routeData.Values["action"]?.ToString();

            if (string.IsNullOrEmpty(currentController))
                return string.Empty;

            if (!string.IsNullOrEmpty(action))
            {
                return string.Equals(controller, currentController, StringComparison.OrdinalIgnoreCase) && 
                       string.Equals(action, currentAction, StringComparison.OrdinalIgnoreCase) 
                       ? "active" : "";
            }

            return string.Equals(controller, currentController, StringComparison.OrdinalIgnoreCase) ? "active" : "";
        }

        public static string IsActive<TModel>(this IHtmlHelper<TModel> htmlHelper, params string[] controllers)
        {
            if (htmlHelper == null)
                throw new ArgumentNullException(nameof(htmlHelper));

            var currentController = htmlHelper.ViewContext.RouteData.Values["controller"]?.ToString();
            
            if (string.IsNullOrEmpty(currentController))
                return string.Empty;

            return controllers.Any(c => string.Equals(c, currentController, StringComparison.OrdinalIgnoreCase)) 
                   ? "active" : "";
        }
    }
}