namespace Zone1295.Models.DataModels
{
    public class Pagination<T>
    {
        public IEnumerable<T> Items { get; set; } = Enumerable.Empty<T>();
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public int TotalItems { get; set; }
        public Pagination(IEnumerable<T> items, int totalItems, int pageNumber, int pageSize)
        {
            Items = items;
            TotalItems = totalItems;
            PageNumber = pageNumber;
            PageSize = pageSize;
        }

        public int TotalPages => (int)Math.Ceiling((double)TotalItems / PageSize);
        public bool HasPreviousPage => PageNumber > 1;
        public bool HasNextPage => PageNumber < TotalPages;

        public List<int> Pages
        {
            get
            {
                int maxVisiblePages = 10;
                int startPage = Math.Max(1, PageNumber - maxVisiblePages / 2);
                int endPage = Math.Min(TotalPages, startPage + maxVisiblePages - 1);
                startPage = Math.Max(1, endPage - maxVisiblePages + 1);
                return Enumerable.Range(startPage, endPage - startPage + 1).ToList();
            }
        }
    }
}