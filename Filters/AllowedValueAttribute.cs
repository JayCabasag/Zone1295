using System.ComponentModel.DataAnnotations;

namespace Zone1295.Models.Validation
{
    public class AllowedValueAttribute : ValidationAttribute
    {
        private readonly string[] _allowedValues;

        public AllowedValueAttribute(string[] allowedValues)
        {
            _allowedValues = allowedValues;
        }

        public override bool IsValid(object? value)  // Mark the parameter as nullable (object?)
        {
            if (value == null)
                return false;

            var valueAsString = value.ToString();
            return _allowedValues.Contains(valueAsString, StringComparer.OrdinalIgnoreCase);
        }

        public override string FormatErrorMessage(string name)
        {
            return $"{name} must be one of the following values: {string.Join(", ", _allowedValues)}.";
        }
    }
}
