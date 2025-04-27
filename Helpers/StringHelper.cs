

namespace TokenHive.Helpers
{
	public class StringHelper
	{
		public static string TruncateString(string input, int length)
		{
			if (string.IsNullOrEmpty(input) || input.Length <= length)
				return input;

			return input.Substring(0, length);
		}
	}
}